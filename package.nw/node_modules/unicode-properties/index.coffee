UnicodeTrie = require 'unicode-trie'
data = require './data.json'
fs = require 'fs'
trie = new UnicodeTrie fs.readFileSync __dirname + '/data.trie'

log2 = Math.log2 or (n) ->
  Math.log(n) / Math.LN2
  
bits = (n) ->
  (log2(n) + 1) | 0

# compute the number of bits stored for each field
CATEGORY_BITS = bits(data.categories.length - 1)
COMBINING_BITS = bits(data.combiningClasses.length - 1)
SCRIPT_BITS = bits(data.scripts.length - 1)
EAW_BITS = bits(data.eaw.length - 1)
NUMBER_BITS = 10

# compute shift and mask values for each field
CATEGORY_SHIFT = COMBINING_BITS + SCRIPT_BITS + EAW_BITS + NUMBER_BITS
COMBINING_SHIFT = SCRIPT_BITS + EAW_BITS + NUMBER_BITS
SCRIPT_SHIFT = EAW_BITS + NUMBER_BITS
EAW_SHIFT = NUMBER_BITS

CATEGORY_MASK = (1 << CATEGORY_BITS) - 1
COMBINING_MASK = (1 << COMBINING_BITS) - 1
SCRIPT_MASK = (1 << SCRIPT_BITS) - 1
EAW_MASK = (1 << EAW_BITS) - 1
NUMBER_MASK = (1 << NUMBER_BITS) - 1

exports.getCategory = (codePoint) ->
  val = trie.get codePoint
  data.categories[(val >> CATEGORY_SHIFT) & CATEGORY_MASK]
  
exports.getCombiningClass = (codePoint) ->
  val = trie.get codePoint
  data.combiningClasses[(val >> COMBINING_SHIFT) & COMBINING_MASK]
  
exports.getScript = (codePoint) ->
  val = trie.get codePoint
  data.scripts[(val >> SCRIPT_SHIFT) & SCRIPT_MASK]
  
exports.getEastAsianWidth = (codePoint) ->
  val = trie.get codePoint
  data.eaw[(val >> EAW_SHIFT) & EAW_MASK]
  
exports.getNumericValue = (codePoint) ->
  val = trie.get codePoint
  num = val & NUMBER_MASK
    
  if num is 0
    return null
  else if num <= 50
    return num - 1
  else if num < 0x1e0
    # fraction
    numerator = (num >> 4) - 12
    denominator = (num & 0xf) + 1
    return numerator / denominator
  else if num < 0x300
    # base 10
    val = (num >> 5) - 14
    exp = (num & 0x1f) + 2
    
    while exp > 0
      val *= 10
      exp--
      
    return val
  else
    # base 60
    val = (num >> 2) - 0xbf
    exp = (num & 3) + 1
    
    while exp > 0
      val *= 60
      exp--
    
    return val
  
exports.isAlphabetic = (codePoint) ->
  exports.getCategory(codePoint) in ['Lu', 'Ll', 'Lt', 'Lm', 'Lo', 'Nl']
  
exports.isDigit = (codePoint) ->
  exports.getCategory(codePoint) is 'Nd'
  
exports.isPunctuation = (codePoint) ->
  exports.getCategory(codePoint) in ['Pc', 'Pd', 'Pe', 'Pf', 'Pi', 'Po', 'Ps']
  
exports.isLowerCase = (codePoint) ->
  exports.getCategory(codePoint) is 'Ll'
  
exports.isUpperCase = (codePoint) ->
  exports.getCategory(codePoint) is 'Lu'
  
exports.isTitleCase = (codePoint) ->
  exports.getCategory(codePoint) is 'Lt'
  
exports.isWhiteSpace = (codePoint) ->
  exports.getCategory(codePoint) in ['Zs', 'Zl', 'Zp']
    
exports.isBaseForm = (codePoint) ->
  exports.getCategory(codePoint) in ['Nd', 'No', 'Nl', 'Lu', 'Ll', 'Lt', 'Lm', 'Lo', 'Me', 'Mc']
  
exports.isMark = (codePoint) ->
  exports.getCategory(codePoint) in ['Mn', 'Me', 'Mc']
