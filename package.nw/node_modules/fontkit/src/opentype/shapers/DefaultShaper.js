import unicode from 'unicode-properties';

const COMMON_FEATURES = ['ccmp', 'locl', 'rlig', 'mark', 'mkmk'];
const FRACTIONAL_FEATURES = ['frac', 'numr', 'dnom'];
const HORIZONTAL_FEATURES = ['calt', 'clig', 'liga', 'rclt', 'curs', 'kern'];
const VERTICAL_FEATURES = ['vert'];
const DIRECTIONAL_FEATURES = {
  ltr: ['ltra', 'ltrm'],
  rtl: ['rtla', 'rtlm']
};

export default class DefaultShaper {
  static zeroMarkWidths = 'AFTER_GPOS';
  static plan(plan, glyphs, features) {
    // Plan the features we want to apply
    this.planPreprocessing(plan);
    this.planFeatures(plan);
    this.planPostprocessing(plan, features);

    // Assign the global features to all the glyphs
    plan.assignGlobalFeatures(glyphs);

    // Assign local features to glyphs
    this.assignFeatures(plan, glyphs);
  }

  static planPreprocessing(plan) {
    plan.add({
      global: DIRECTIONAL_FEATURES[plan.direction],
      local: FRACTIONAL_FEATURES
    });
  }

  static planFeatures(plan) {
    // Do nothing by default. Let subclasses override this.
  }

  static planPostprocessing(plan, userFeatures) {
    plan.add([...COMMON_FEATURES, ...HORIZONTAL_FEATURES, ...userFeatures]);
  }

  static assignFeatures(plan, glyphs) {
    // Enable contextual fractions
    let i = 0;
    while (i < glyphs.length) {
      let glyph = glyphs[i];
      if (glyph.codePoints[0] === 0x2044) { // fraction slash
        let start = i - 1;
        let end = i + 1;

        // Apply numerator
        while (start >= 0 && unicode.isDigit(glyphs[start].codePoints[0])) {
          glyphs[start].features.numr = true;
          glyphs[start].features.frac = true;
          start--;
        }

        // Apply denominator
        while (end < glyphs.length && unicode.isDigit(glyphs[end].codePoints[0])) {
          glyphs[end].features.dnom = true;
          glyphs[end].features.frac = true;
          end++;
        }

        // Apply fraction slash
        glyph.features.frac = true;
        i = end - 1;

      } else {
        i++;
      }
    }
  }
}
