# ES6 `String.prototype.repeat` polyfill [![Build status](https://travis-ci.org/mathiasbynens/String.prototype.repeat.svg?branch=master)](https://travis-ci.org/mathiasbynens/String.prototype.repeat)

A robust & optimized ES3-compatible polyfill for [the `String.prototype.repeat` method in ECMAScript 6](http://people.mozilla.org/~jorendorff/es6-draft.html#sec-string.prototype.repeat).

Other polyfills for `String.prototype.repeat` are available:

* <https://github.com/paulmillr/es6-shim/blob/d8c4ec246a15e7df55da60b7f9b745af84ca9021/es6-shim.js#L146-L154> by [Paul Miller](http://paulmillr.com/) (~~[fails 8 tests](https://github.com/paulmillr/es6-shim/issues/164)~~ now passes all tests)

## Installation

In a browser:

```html
<script src="repeat.js"></script>
```

Via [npm](http://npmjs.org/):

```bash
npm install string.prototype.repeat
```

Then, in [Node.js](http://nodejs.org/):

```js
require('string.prototype.repeat');

// On Windows and on Mac systems with default settings, case doesn’t matter,
// which allows you to do this instead:
require('String.prototype.repeat');
```

## Author

| [![twitter/mathias](https://gravatar.com/avatar/24e08a9ea84deb17ae121074d0f17125?s=70)](https://twitter.com/mathias "Follow @mathias on Twitter") |
|---|
| [Mathias Bynens](http://mathiasbynens.be/) |

## License

This polyfill is available under the [MIT](http://mths.be/mit) license.
