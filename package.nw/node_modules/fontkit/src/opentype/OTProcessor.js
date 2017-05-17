import GlyphIterator from './GlyphIterator';
import * as Script from '../layout/Script';

const DEFAULT_SCRIPTS = ['DFLT', 'dflt', 'latn'];

export default class OTProcessor {
  constructor(font, table) {
    this.font = font;
    this.table = table;

    this.script = null;
    this.scriptTag = null;

    this.language = null;
    this.languageTag = null;

    this.features = {};
    this.lookups = {};

    // initialize to default script + language
    this.selectScript();

    // current context (set by applyFeatures)
    this.glyphs = [];
    this.positions = []; // only used by GPOS
    this.ligatureID = 1;
  }

  findScript(script) {
    if (this.table.scriptList == null) {
      return null;
    }

    if (!Array.isArray(script)) {
      script = [ script ];
    }

    for (let entry of this.table.scriptList) {
      for (let s of script) {
        if (entry.tag === s) {
          return entry;
        }
      }
    }

    return null;
  }

  selectScript(script, language) {
    let changed = false;
    let entry;
    if (!this.script || script !== this.scriptTag) {
      entry = this.findScript(script);
      if (script) {
        entry = this.findScript(script);
      }

      if (!entry) {
        entry = this.findScript(DEFAULT_SCRIPTS);
      }

      if (!entry) {
        return;
      }

      this.scriptTag = entry.tag;
      this.script = entry.script;
      this.direction = Script.direction(script);
      this.language = null;
      changed = true;
    }

    if (!language && language !== this.langugeTag) {
      for (let lang of this.script.langSysRecords) {
        if (lang.tag === language) {
          this.language = lang.langSys;
          this.langugeTag = lang.tag;
          changed = true;
          break;
        }
      }
    }

    if (!this.language) {
      this.language = this.script.defaultLangSys;
    }

    // Build a feature lookup table
    if (changed) {
      this.features = {};
      if (this.language) {
        for (let featureIndex of this.language.featureIndexes) {
          let record = this.table.featureList[featureIndex];
          this.features[record.tag] = record.feature;
        }
      }
    }
  }

  lookupsForFeatures(userFeatures = [], exclude) {
    let lookups = [];
    for (let tag of userFeatures) {
      let feature = this.features[tag];
      if (!feature) {
        continue;
      }

      for (let lookupIndex of feature.lookupListIndexes) {
        if (exclude && exclude.indexOf(lookupIndex) !== -1) {
          continue;
        }

        lookups.push({
          feature: tag,
          index: lookupIndex,
          lookup: this.table.lookupList.get(lookupIndex)
        });
      }
    }

    lookups.sort((a, b) => a.index - b.index);
    return lookups;
  }

  applyFeatures(userFeatures, glyphs, advances) {
    let lookups = this.lookupsForFeatures(userFeatures);
    this.applyLookups(lookups, glyphs, advances);
  }

  applyLookups(lookups, glyphs, positions) {
    this.glyphs = glyphs;
    this.positions = positions;
    this.glyphIterator = new GlyphIterator(glyphs);

    for (let {feature, lookup} of lookups) {
      this.glyphIterator.reset(lookup.flags);

      while (this.glyphIterator.index < glyphs.length) {
        if (!(feature in this.glyphIterator.cur.features)) {
          this.glyphIterator.next();
          continue;
        }

        for (let table of lookup.subTables) {
          let res = this.applyLookup(lookup.lookupType, table);
          if (res) {
            break;
          }
        }

        this.glyphIterator.next();
      }
    }
  }

  applyLookup(lookup, table) {
    throw new Error("applyLookup must be implemented by subclasses");
  }

  applyLookupList(lookupRecords) {
    let glyphIndex = this.glyphIterator.index;

    for (let lookupRecord of lookupRecords) {
      this.glyphIterator.index = glyphIndex;
      this.glyphIterator.increment(lookupRecord.sequenceIndex);

      let lookup = this.table.lookupList.get(lookupRecord.lookupListIndex);
      for (let table of lookup.subTables) {
        this.applyLookup(lookup.lookupType, table);
      }
    }

    this.glyphIterator.index = glyphIndex;
    return true;
  }

  coverageIndex(coverage, glyph) {
    if (glyph == null) {
      glyph = this.glyphIterator.cur.id;
    }

    switch (coverage.version) {
      case 1:
        return coverage.glyphs.indexOf(glyph);

      case 2:
        for (let range of coverage.rangeRecords) {
          if (range.start <= glyph && glyph <= range.end) {
            return range.startCoverageIndex + glyph - range.start;
          }
        }

        break;
    }

    return -1;
  }

  match(sequenceIndex, sequence, fn, matched) {
    let pos = this.glyphIterator.index;
    let glyph = this.glyphIterator.increment(sequenceIndex);
    let idx = 0;

    while (idx < sequence.length && glyph && fn(sequence[idx], glyph.id)) {
      if (matched) {
        matched.push(this.glyphIterator.index);
      }

      idx++;
      glyph = this.glyphIterator.next();
    }

    this.glyphIterator.index = pos;
    if (idx < sequence.length) {
      return false;
    }

    return matched || true;
  }

  sequenceMatches(sequenceIndex, sequence) {
    return this.match(sequenceIndex, sequence, (component, glyph) => component === glyph);
  }

  sequenceMatchIndices(sequenceIndex, sequence) {
    return this.match(sequenceIndex, sequence, (component, glyph) => component === glyph, []);
  }

  coverageSequenceMatches(sequenceIndex, sequence) {
    return this.match(sequenceIndex, sequence, (coverage, glyph) =>
      this.coverageIndex(coverage, glyph) >= 0
    );
  }

  getClassID(glyph, classDef) {
    switch (classDef.version) {
      case 1: // Class array
        let i = glyph - classDef.startGlyph;
        if (i >= 0 && i < classDef.classValueArray.length) {
          return classDef.classValueArray[i];
        }

        break;

      case 2:
        for (let range of classDef.classRangeRecord) {
          if (range.start <= glyph && glyph <= range.end) {
            return range.class;
          }
        }

        break;
    }

    return 0;
  }

  classSequenceMatches(sequenceIndex, sequence, classDef) {
    return this.match(sequenceIndex, sequence, (classID, glyph) =>
      classID === this.getClassID(glyph, classDef)
    );
  }

  applyContext(table) {
    switch (table.version) {
      case 1:
        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        let set = table.ruleSets[index];
        for (let rule of set) {
          if (this.sequenceMatches(1, rule.input)) {
            return this.applyLookupList(rule.lookupRecords);
          }
        }

        break;

      case 2:
        if (this.coverageIndex(table.coverage) === -1) {
          return false;
        }

        index = this.getClassID(this.glyphIterator.cur.id, table.classDef);
        if (index === -1) {
          return false;
        }

        set = table.classSet[index];
        for (let rule of set) {
          if (this.classSequenceMatches(1, rule.classes, table.classDef)) {
            return this.applyLookupList(rule.lookupRecords);
          }
        }

        break;

      case 3:
        if (this.coverageSequenceMatches(0, table.coverages)) {
          return this.applyLookupList(table.lookupRecords);
        }

        break;
    }

    return false;
  }

  applyChainingContext(table) {
    switch (table.version) {
      case 1:
        let index = this.coverageIndex(table.coverage);
        if (index === -1) {
          return false;
        }

        let set = table.chainRuleSets[index];
        for (let rule of set) {
          if (this.sequenceMatches(-rule.backtrack.length, rule.backtrack)
              && this.sequenceMatches(1, rule.input)
              && this.sequenceMatches(1 + rule.input.length, rule.lookahead)) {
            return this.applyLookupList(rule.lookupRecords);
          }
        }

        break;

      case 2:
        if (this.coverageIndex(table.coverage) === -1) {
          return false;
        }

        index = this.getClassID(this.glyphIterator.cur.id, table.inputClassDef);
        let rules = table.chainClassSet[index];
        if (!rules) {
          return false;
        }

        for (let rule of rules) {
          if (this.classSequenceMatches(-rule.backtrack.length, rule.backtrack, table.backtrackClassDef) &&
              this.classSequenceMatches(1, rule.input, table.inputClassDef) &&
              this.classSequenceMatches(1 + rule.input.length, rule.lookahead, table.lookaheadClassDef)) {
            return this.applyLookupList(rule.lookupRecords);
          }
        }

        break;

      case 3:
        if (this.coverageSequenceMatches(-table.backtrackGlyphCount, table.backtrackCoverage) &&
            this.coverageSequenceMatches(0, table.inputCoverage) &&
            this.coverageSequenceMatches(table.inputGlyphCount, table.lookaheadCoverage)) {
          return this.applyLookupList(table.lookupRecords);
        }

        break;
    }

    return false;
  }
}
