import KernProcessor from './KernProcessor';
import UnicodeLayoutEngine from './UnicodeLayoutEngine';
import GlyphRun from './GlyphRun';
import GlyphPosition from './GlyphPosition';
import * as Script from './Script';
import unicode from 'unicode-properties';
import AATLayoutEngine from '../aat/AATLayoutEngine';
import OTLayoutEngine from '../opentype/OTLayoutEngine';

export default class LayoutEngine {
  constructor(font) {
    this.font = font;
    this.unicodeLayoutEngine = null;
    this.kernProcessor = null;

    // Choose an advanced layout engine. We try the AAT morx table first since more
    // scripts are currently supported because the shaping logic is built into the font.
    if (this.font.morx) {
      this.engine = new AATLayoutEngine(this.font);

    } else if (this.font.GSUB || this.font.GPOS) {
      this.engine = new OTLayoutEngine(this.font);
    }
  }

  layout(string, features = [], script, language) {
    // Make the features parameter optional
    if (typeof features === 'string') {
      script = features;
      language = script;
      features = [];
    }

    // Map string to glyphs if needed
    if (typeof string === 'string') {
      // Attempt to detect the script from the string if not provided.
      if (script == null) {
        script = Script.forString(string);
      }

      var glyphs = this.font.glyphsForString(string);
    } else {
      // Attempt to detect the script from the glyph code points if not provided.
      if (script == null) {
        let codePoints = [];
        for (let glyph of string) {
          codePoints.push(...glyph.codePoints);
        }

        script = Script.forCodePoints(codePoints);
      }

      var glyphs = string;
    }

    // Return early if there are no glyphs
    if (glyphs.length === 0) {
      return new GlyphRun(glyphs, []);
    }

    // Setup the advanced layout engine
    if (this.engine && this.engine.setup) {
      this.engine.setup(glyphs, features, script, language);
    }

    // Substitute and position the glyphs
    glyphs = this.substitute(glyphs, features, script, language);
    let positions = this.position(glyphs, features, script, language);

    // Let the layout engine clean up any state it might have
    if (this.engine && this.engine.cleanup) {
      this.engine.cleanup();
    }

    return new GlyphRun(glyphs, positions);
  }

  substitute(glyphs, features, script, language) {
    // Call the advanced layout engine to make substitutions
    if (this.engine && this.engine.substitute) {
      glyphs = this.engine.substitute(glyphs, features, script, language);
    }

    return glyphs;
  }

  position(glyphs, features, script, language) {
    // Get initial glyph positions
    let positions = glyphs.map(glyph => new GlyphPosition(glyph.advanceWidth));
    let positioned = null;

    // Call the advanced layout engine. Returns the features applied.
    if (this.engine && this.engine.position) {
      positioned = this.engine.position(glyphs, positions, features, script, language);
    }

    // if there is no GPOS table, use unicode properties to position marks.
    if (!positioned) {
      if (!this.unicodeLayoutEngine) {
        this.unicodeLayoutEngine = new UnicodeLayoutEngine(this.font);
      }

      this.unicodeLayoutEngine.positionGlyphs(glyphs, positions);
    }

    // if kerning is not supported by GPOS, do kerning with the TrueType/AAT kern table
    if ((!positioned || !positioned.kern) && this.font.kern) {
      if (!this.kernProcessor) {
        this.kernProcessor = new KernProcessor(this.font);
      }

      this.kernProcessor.process(glyphs, positions);
    }

    return positions;
  }

  getAvailableFeatures(script, language) {
    let features = [];

    if (this.engine) {
      features.push(...this.engine.getAvailableFeatures(script, language));
    }

    if (this.font.kern && features.indexOf('kern') === -1) {
      features.push('kern');
    }

    return features;
  }

  stringsForGlyph(gid) {
    let result = new Set;

    let codePoints = this.font._cmapProcessor.codePointsForGlyph(gid);
    for (let codePoint of codePoints) {
      result.add(String.fromCodePoint(codePoint));
    }

    if (this.engine && this.engine.stringsForGlyph) {
      for (let string of this.engine.stringsForGlyph(gid)) {
        result.add(string);
      }
    }

    return Array.from(result);
  }
}
