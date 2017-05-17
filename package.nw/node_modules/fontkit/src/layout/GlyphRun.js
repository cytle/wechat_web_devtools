import BBox from '../glyph/BBox';

/**
 * Represents a run of Glyph and GlyphPosition objects.
 * Returned by the font layout method.
 */
export default class GlyphRun {
  constructor(glyphs, positions) {
    /**
     * An array of Glyph objects in the run
     * @type {Glyph[]}
     */
    this.glyphs = glyphs;

    /**
     * An array of GlyphPosition objects for each glyph in the run
     * @type {GlyphPosition[]}
     */
    this.positions = positions;
  }

  /**
   * The total advance width of the run.
   * @type {number}
   */
  get advanceWidth() {
    let width = 0;
    for (let position of this.positions) {
      width += position.xAdvance;
    }

    return width;
  }

 /**
  * The total advance height of the run.
  * @type {number}
  */
  get advanceHeight() {
    let height = 0;
    for (let position of this.positions) {
      height += position.yAdvance;
    }

    return height;
  }

 /**
  * The bounding box containing all glyphs in the run.
  * @type {BBox}
  */
  get bbox() {
    let bbox = new BBox;

    let x = 0;
    let y = 0;
    for (let index = 0; index < this.glyphs.length; index++) {
      let glyph = this.glyphs[index];
      let p = this.positions[index];
      let b = glyph.bbox;

      bbox.addPoint(b.minX + x + p.xOffset, b.minY + y + p.yOffset);
      bbox.addPoint(b.maxX + x + p.xOffset, b.maxY + y + p.yOffset);

      x += p.xAdvance;
      y += p.yAdvance;
    }

    return bbox;
  }
}
