### Qap

[![NPM VERSION](http://img.shields.io/npm/v/qap.svg?style=flat)](https://www.npmjs.org/package/qap)
[![CODACY BADGE](https://img.shields.io/codacy/b18ed7d95b0a4707a0ff7b88b30d3def.svg?style=flat)](https://www.codacy.com/public/44gatti/qap)
[![CODECLIMATE-TEST-COVERAGE](https://img.shields.io/codeclimate/coverage/github/rootslab/qap.svg?style=flat)](https://codeclimate.com/github/rootslab/qap)
[![LICENSE](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://github.com/rootslab/qap#mit-license)

![NODE VERSION](https://img.shields.io/node/v/qap.svg)
[![TRAVIS CI BUILD](http://img.shields.io/travis/rootslab/qap.svg?style=flat)](http://travis-ci.org/rootslab/qap)
[![BUILD STATUS](http://img.shields.io/david/rootslab/qap.svg?style=flat)](https://david-dm.org/rootslab/qap)
[![DEVDEPENDENCY STATUS](http://img.shields.io/david/dev/rootslab/qap.svg?style=flat)](https://david-dm.org/rootslab/qap#info=devDependencies)

[![NPM MONTHLY](http://img.shields.io/npm/dm/qap.svg?style=flat)](http://npm-stat.com/charts.html?package=qap)
![NPM YEARLY](https://img.shields.io/npm/dy/qap.svg)

[![NPM GRAPH](https://nodei.co/npm/qap.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/qap/)


 * __Qap__ is a quick parser for string or buffer patterns. 
 * It is optimized for using with pattern strings <= 255 bytes.
 * Better results are achieved with long and sparse patterns.
 * It is an implementation of QuickSearch algorithm.

### Main features

> Given a m-length pattern and n-length data and σ-length alphabet ( σ = 256 ):

 - simplification of the Boyer-Moore algorithm ( *see [Bop](https://github.com/rootslab/bop)* ).
 - uses only a bad-character shift table.
 - preprocessing phase in __O(m+σ)__ time and __O(σ)__ space complexity.
 - searching phase in __O(m*n)__ time complexity.
 - very fast in practice for short patterns and large alphabets.

> See __[Lecroq](http://www-igm.univ-mlv.fr/~lecroq/string/node19.html)__ for reference and also __[Bop](https://github.com/rootslab/bop)__, a Boyer-Moore parser.

### Install
```bash
$ npm install qap [-g]
```

> __require__:

```javascript
var Qap = require( 'qap' );
```

### Run Tests

```javascript
$cd qap/
$npm test
```

### Run Benchmarks

```bash
$ cd qap/
$ npm run-script bench
```

### Constructor

> Create an instance with a Buffer or String pattern.

```javascript
Qap( Buffer || String pattern )
// or
neq Qap( Buffer || String pattern )
```

### Methods

> List all pattern occurrences into a String or Buffer data.
> It returns a new array of indexes, or populates an array passed as the last argument to parse method.

```javascript
// slower with String
Qap#parse( String data [, Number startFromIndex [, Number limitResultsTo [, Array array ] ] ] ) : Array

// faster with Buffer
Qap#parse( Buffer data [, Number startFromIndex [, Number limitResultsTo [, Array array ] ] ] ) : Array
```

> Change the pattern :

```javascript
Qap#set( Buffer || String pattern ) : Buffer
```

### Usage Example

```javascript
var log = console.log
    , assert = require( 'assert' )
    , Qap = require( 'qap' )
    , pattern = 'hellofolks\r\n\r\n'
    , text = 'hehe' + pattern +'loremipsumhellofolks\r\n' + pattern
    , bresult = null
    ;

// create an instance and parse the pattern
var qap = Qap( pattern )
    // parse data from beginning
    , results = qap.parse( text )
    ;

// set a new Buffer pattern
qap.set( new Buffer( pattern ) );

// parse data Buffer instead of a String
bresults = qap.parse( new Buffer( text ) );

// parser results ( starting indexes ) [ 4, 40 ]
log( results, bresults );

// results are the same
assert.deepEqual( results, bresults );

```

#### Benchmark for a small pattern ( length <= 255 bytes )

> Parser uses a Buffer 256-bytes long to build the shifting table, then:

> - Pattern parsing / table creation space and time complexity is O(σ).
> - Very low memory footprint.
> - Ultra fast to preprocess pattern ( = table creation ).

```bash
  $ node bench/small-pattern-data-rate
```

for default it:

> - uses a pattern string of 57 bytes/chars
> - builds a data buffer of 700 MB in memory
> - uses a redundancy/distance factor for pattern strings equal to 2. The bigger the value, 
the lesser are occurrences of pattern string into the text buffer.

 **Custom Usage**:

```bash
  # with [testBufferSizeInMB] [distanceFactor] [aStringPattern]
  $ node bench/small-pattern-data-rate.js 700 4 "that'sallfolks"
```

#### Benchmark for a big pattern ( length > 255 bytes )

> Parser uses one Array to build the shifting table for a big pattern, then:

> - table has a size of 256 elements, every element is an integer value that
> could be between 0 and the pattern length.
> - Fast to preprocess pattern ( = table creation ).
> - Low memory footprint

```bash
  $ node bench/big-pattern-data-rate
```

> - it uses a pattern size of 20MB
> - builds a data buffer of 300MB copying pattern 12 times

See __[bench](./bench)__ dir.

### MIT License

> Copyright (c) 2013-present &lt; Guglielmo Ferri : 44gatti@gmail.com &gt;

> Permission is hereby granted, free of charge, to any person obtaining
> a copy of this software and associated documentation files (the
> 'Software'), to deal in the Software without restriction, including
> without limitation the rights to use, copy, modify, merge, publish,
> distribute, sublicense, and/or sell copies of the Software, and to
> permit persons to whom the Software is furnished to do so, subject to
> the following conditions:

> __The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.__

> THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
> MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
> IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
> CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
> TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
> SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
