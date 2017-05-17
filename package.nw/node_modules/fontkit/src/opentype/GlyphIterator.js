export default class GlyphIterator {
  constructor(glyphs, flags) {
    this.glyphs = glyphs;
    this.reset(flags);
  }

  reset(flags = {}) {
    this.flags = flags;
    this.index = 0;
  }

  get cur() {
    return this.glyphs[this.index] || null;
  }

  shouldIgnore(glyph, flags) {
    return ((flags.ignoreMarks && glyph.isMark) ||
           (flags.ignoreBaseGlyphs && !glyph.isMark) ||
           (flags.ignoreLigatures && glyph.isLigature));
  }

  move(dir) {
    this.index += dir;
    while (0 <= this.index && this.index < this.glyphs.length && this.shouldIgnore(this.glyphs[this.index], this.flags)) {
      this.index += dir;
    }

    if (0 > this.index || this.index >= this.glyphs.length) {
      return null;
    }

    return this.glyphs[this.index];
  }

  next() {
    return this.move(+1);
  }

  prev() {
    return this.move(-1);
  }

  peek(count = 1) {
    let idx = this.index;
    let res = this.increment(count);
    this.index = idx;
    return res;
  }

  peekIndex(count = 1) {
    let idx = this.index;
    this.increment(count);
    let res = this.index;
    this.index = idx;
    return res;
  }

  increment(count = 1) {
    let dir = count < 0 ? -1 : 1;
    count = Math.abs(count);
    while (count--) {
      this.move(dir);
    }

    return this.glyphs[this.index];
  }
}
