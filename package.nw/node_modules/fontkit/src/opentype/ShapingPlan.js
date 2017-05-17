import * as Script from '../layout/Script';

/**
 * ShapingPlans are used by the OpenType shapers to store which
 * features should by applied, and in what order to apply them.
 * The features are applied in groups called stages. A feature
 * can be applied globally to all glyphs, or locally to only
 * specific glyphs.
 *
 * @private
 */
export default class ShapingPlan {
  constructor(font, script, language) {
    this.font = font;
    this.script = script;
    this.language = language;
    this.direction = Script.direction(script);
    this.stages = [];
    this.globalFeatures = {};
    this.allFeatures = {};
  }

  /**
   * Adds the given features to the last stage.
   * Ignores features that have already been applied.
   */
  _addFeatures(features) {
    let stage = this.stages[this.stages.length - 1];
    for (let feature of features) {
      if (!this.allFeatures[feature]) {
        stage.push(feature);
        this.allFeatures[feature] = true;
      }
    }
  }

  /**
   * Adds the given features to the global list
   */
  _addGlobal(features) {
    for (let feature of features) {
      this.globalFeatures[feature] = true;
    }
  }

  /**
   * Add features to the last stage
   */
  add(arg, global = true) {
    if (this.stages.length === 0) {
      this.stages.push([]);
    }

    if (typeof arg === 'string') {
      arg = [arg];
    }

    if (Array.isArray(arg)) {
      this._addFeatures(arg);
      if (global) {
        this._addGlobal(arg);
      }
    } else if (typeof arg === 'object') {
      let features = (arg.global || []).concat(arg.local || []);
      this._addFeatures(features);
      if (arg.global) {
        this._addGlobal(arg.global);
      }
    } else {
      throw new Error("Unsupported argument to ShapingPlan#add");
    }
  }

  /**
   * Add a new stage
   */
  addStage(arg, global) {
    if (typeof arg === 'function') {
      this.stages.push(arg, []);
    } else {
      this.stages.push([]);
      this.add(arg, global);
    }
  }

  /**
   * Assigns the global features to the given glyphs
   */
  assignGlobalFeatures(glyphs) {
    for (let glyph of glyphs) {
      for (let feature in this.globalFeatures) {
        glyph.features[feature] = true;
      }
    }
  }

  /**
   * Executes the planned stages using the given OTProcessor
   */
  process(processor, glyphs, positions) {
    processor.selectScript(this.script, this.language);

    for (let stage of this.stages) {
      if (typeof stage === 'function') {
        if (!positions) {
          stage(this.font, glyphs, positions);
        }

      } else if (stage.length > 0) {
        processor.applyFeatures(stage, glyphs, positions);
      }
    }
  }
}
