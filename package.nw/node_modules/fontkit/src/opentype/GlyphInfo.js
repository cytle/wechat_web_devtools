import unicode from 'unicode-properties';
import OTProcessor from './OTProcessor';

export default class GlyphInfo {
  constructor(font, id, codePoints = [], features = []) {
    this._font = font;
    this.codePoints = codePoints;
    this.id = id;

    this.features = {};
    if (Array.isArray(features)) {
      for (let i = 0; i < features.length; i++) {
        let feature = features[i];
        this.features[feature] = true;
      }
    } else if (typeof features === 'object') {
      Object.assign(this.features, features);
    }

    this.ligatureID = null;
    this.ligatureComponent = null;
    this.ligated = false;
    this.cursiveAttachment = null;
    this.markAttachment = null;
    this.shaperInfo = null;
    this.substituted = false;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
    this.substituted = true;

    if (this._font.GDEF && this._font.GDEF.glyphClassDef) {
      // TODO: clean this up
      let classID = OTProcessor.prototype.getClassID(id, this._font.GDEF.glyphClassDef);
      this.isMark = classID === 3;
      this.isLigature = classID === 2;
    } else {
      this.isMark = this.codePoints.every(unicode.isMark);
      this.isLigature = this.codePoints.length > 1;
    }
  }
}
