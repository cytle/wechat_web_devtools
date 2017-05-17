import DefaultShaper from './DefaultShaper';
import ArabicShaper from './ArabicShaper';
import HangulShaper from './HangulShaper';
import UniversalShaper from './UniversalShaper';

const SHAPERS = {
  arab: ArabicShaper,    // Arabic
  mong: ArabicShaper,    // Mongolian
  syrc: ArabicShaper,    // Syriac
  'nko ': ArabicShaper,  // N'Ko
  phag: ArabicShaper,    // Phags Pa
  mand: ArabicShaper,    // Mandaic
  mani: ArabicShaper,    // Manichaean
  phlp: ArabicShaper,    // Psalter Pahlavi

  hang: HangulShaper,    // Hangul

  bali: UniversalShaper, // Balinese
  batk: UniversalShaper, // Batak
  brah: UniversalShaper, // Brahmi
  bugi: UniversalShaper, // Buginese
  buhd: UniversalShaper, // Buhid
  cakm: UniversalShaper, // Chakma
  cham: UniversalShaper, // Cham
  dupl: UniversalShaper, // Duployan
  egyp: UniversalShaper, // Egyptian Hieroglyphs
  gran: UniversalShaper, // Grantha
  hano: UniversalShaper, // Hanunoo
  java: UniversalShaper, // Javanese
  kthi: UniversalShaper, // Kaithi
  kali: UniversalShaper, // Kayah Li
  khar: UniversalShaper, // Kharoshthi
  khoj: UniversalShaper, // Khojki
  sind: UniversalShaper, // Khudawadi
  lepc: UniversalShaper, // Lepcha
  limb: UniversalShaper, // Limbu
  mahj: UniversalShaper, // Mahajani
  // mand: UniversalShaper, // Mandaic
  // mani: UniversalShaper, // Manichaean
  mtei: UniversalShaper, // Meitei Mayek
  modi: UniversalShaper, // Modi
  // mong: UniversalShaper, // Mongolian
  // 'nko ': UniversalShaper, // N’Ko
  hmng: UniversalShaper, // Pahawh Hmong
  // phag: UniversalShaper, // Phags-pa
  // phlp: UniversalShaper, // Psalter Pahlavi
  rjng: UniversalShaper, // Rejang
  saur: UniversalShaper, // Saurashtra
  shrd: UniversalShaper, // Sharada
  sidd: UniversalShaper, // Siddham
  sinh: UniversalShaper, // Sinhala
  sund: UniversalShaper, // Sundanese
  sylo: UniversalShaper, // Syloti Nagri
  tglg: UniversalShaper, // Tagalog
  tagb: UniversalShaper, // Tagbanwa
  tale: UniversalShaper, // Tai Le
  lana: UniversalShaper, // Tai Tham
  tavt: UniversalShaper, // Tai Viet
  takr: UniversalShaper, // Takri
  tibt: UniversalShaper, // Tibetan
  tfng: UniversalShaper, // Tifinagh
  tirh: UniversalShaper, // Tirhuta

  latn: DefaultShaper,   // Latin
  DFLT: DefaultShaper    // Default
};

export function choose(script) {
  let shaper = SHAPERS[script];
  if (shaper) { return shaper; }

  return DefaultShaper;
}
