unicode = require '../'
assert = require 'assert'

describe 'unicode-properties', ->
  it 'getCategory', ->
    assert.equal unicode.getCategory('2'.charCodeAt()), 'Nd'
    assert.equal unicode.getCategory('x'.charCodeAt()), 'Ll'
    
  it 'getCombiningClass', ->
    assert.equal unicode.getCombiningClass('x'.charCodeAt()), 'Not_Reordered'
    assert.equal unicode.getCombiningClass('́'.charCodeAt()), 'Above'
    assert.equal unicode.getCombiningClass('ٕ'.charCodeAt()), 'Below'
    assert.equal unicode.getCombiningClass('ٔ'.charCodeAt()), 'Above'

  it 'getScript', ->
    assert.equal unicode.getScript('x'.charCodeAt()), 'Latin'
    assert.equal unicode.getScript('غ'.charCodeAt()), 'Arabic'
    
  it 'getEastAsianWidth', ->
    assert.equal unicode.getEastAsianWidth('x'.charCodeAt()), 'Na'
    assert.equal unicode.getEastAsianWidth('杜'.charCodeAt()), 'W'
    assert.equal unicode.getEastAsianWidth('Æ'.charCodeAt()), 'A'
    
  it 'getNumericValue', ->
    assert.equal unicode.getNumericValue('2'.charCodeAt()), 2
    assert.equal unicode.getNumericValue('x'.charCodeAt()), null
    
  it 'isAlphabetic', ->
    assert unicode.isAlphabetic('x'.charCodeAt())
    assert !unicode.isAlphabetic('2'.charCodeAt())
    
  it 'isDigit', ->
    assert !unicode.isDigit('x'.charCodeAt())
    assert unicode.isDigit('2'.charCodeAt())
    
  it 'isPunctuation', ->
    assert !unicode.isPunctuation('x'.charCodeAt())
    assert unicode.isPunctuation('.'.charCodeAt())
    
  it 'isLowerCase', ->
    assert !unicode.isLowerCase('X'.charCodeAt())
    assert !unicode.isLowerCase('2'.charCodeAt())
    assert unicode.isLowerCase('x'.charCodeAt())
    
  it 'isUpperCase', ->
    assert unicode.isUpperCase('X'.charCodeAt())
    assert !unicode.isUpperCase('2'.charCodeAt())
    assert !unicode.isUpperCase('x'.charCodeAt())
    
  it 'isTitleCase', ->
    assert unicode.isTitleCase('ǲ'.charCodeAt())
    assert !unicode.isTitleCase('2'.charCodeAt())
    assert !unicode.isTitleCase('x'.charCodeAt())
    
  it 'isWhiteSpace', ->
    assert unicode.isWhiteSpace(' '.charCodeAt())
    assert !unicode.isWhiteSpace('2'.charCodeAt())
    assert !unicode.isWhiteSpace('x'.charCodeAt())
    
  it 'isBaseForm', ->
    assert unicode.isBaseForm('2'.charCodeAt())
    assert unicode.isBaseForm('x'.charCodeAt())
    assert !unicode.isBaseForm('́'.charCodeAt())
    
  it 'isMark', ->
    assert !unicode.isMark('2'.charCodeAt())
    assert !unicode.isMark('x'.charCodeAt())
    assert unicode.isMark('́'.charCodeAt())
    