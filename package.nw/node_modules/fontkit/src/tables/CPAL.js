import r from 'restructure';

let ColorRecord = new r.Struct({
  blue: r.uint8,
  green: r.uint8,
  red: r.uint8,
  alpha: r.uint8
});

export default new r.Struct({
  version: r.uint16,
  numPaletteEntries: r.uint16,
  numPalettes: r.uint16,
  numColorRecords: r.uint16,
  colorRecords: new r.Pointer(r.uint32, new r.Array(ColorRecord, 'numColorRecords')),
  colorRecordIndices: new r.Array(r.uint16, 'numPalettes')
});
