codePoints = require 'codepoints'
fs = require 'fs'
UnicodeTrieBuilder = require 'unicode-trie/builder'

log2 = Math.log2 or (n) ->
  Math.log(n) / Math.LN2
  
bits = (n) ->
  (log2(n) + 1) | 0

categories = {}
combiningClasses = {}
scripts = {}
eaws = {}
categoryCount = 0
combiningClassCount = 0
scriptCount = 0
eawCount = 0

for codePoint in codePoints when codePoint?
  categories[codePoint.category] ?= categoryCount++  
  combiningClasses[codePoint.combiningClassName] ?= combiningClassCount++
  scripts[codePoint.script] ?= scriptCount++
  eaws[codePoint.eastAsianWidth] ?= eawCount++

numberBits = 10
categoryBits = bits(categoryCount - 1)
combiningClassBits = bits(combiningClassCount - 1)
bidiMirrorBits = 1
scriptBits = bits(scriptCount - 1)
eawBits = bits(eawCount - 1)

categoryShift = combiningClassBits + scriptBits + eawBits + numberBits
combiningShift = scriptBits + eawBits + numberBits
scriptShift = eawBits + numberBits
eawShift = numberBits

numericValue = (numeric) ->
  if numeric
    if m = numeric.match /^(\-?\d+)\/(\d+)$/
      # fraction
      num = parseInt m[1]
      den = parseInt m[2]
      ((num + 12) << 4) + (den - 1)
    else if /^\d0+$/.test numeric
      # base 10
      mant = parseInt numeric[0]
      exp = numeric.length - 1
      ((mant + 14) << 5) + (exp - 2)
    else
      val = parseInt numeric
      if val <= 50
        1 + val
      else
        # base 60
        mant = val
        exp = 0
        while (mant % 60) is 0
          mant /= 60
          ++exp
      
        ((mant + 0xbf) << 2) + (exp - 1)
  else
    0

trie = new UnicodeTrieBuilder
for codePoint in codePoints when codePoint?  
  category = categories[codePoint.category]
  combiningClass = combiningClasses[codePoint.combiningClassName] or 0
  script = scripts[codePoint.script] or 0
  eaw = eaws[codePoint.eastAsianWidth] or 0
  
  val = (category << categoryShift) |
        (combiningClass << combiningShift) |
        (script << scriptShift) |
        (eaw << eawShift) |
        numericValue(codePoint.numeric)
  
  trie.set codePoint.code, val

fs.writeFileSync 'data.trie', trie.toBuffer()
fs.writeFileSync 'data.json', JSON.stringify
  categories: Object.keys(categories)
  combiningClasses: Object.keys(combiningClasses)
  scripts: Object.keys(scripts)
  eaw: Object.keys(eaws)
