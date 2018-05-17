# comment-regex [![Build Status](https://travis-ci.org/sindresorhus/comment-regex.svg?branch=master)](https://travis-ci.org/sindresorhus/comment-regex)

> Regular expression for matching JavaScript comments

*This is pretty fragile and created for perf reasons where using a real parser would be overkill.*


## Install

```sh
$ npm install --save comment-regex
```


## Usage

```js
var commentRegex = require('comment-regex');

// contains a comment
commentRegex().test('/* unicorn */\nvar foo = true;');
//=> true

// get the contents of a comment
commentRegex().exec('/* unicorn */\nvar foo = true;')[2].trim();

// get all the comments
'/* unicorn */\nvar foo = true;\nvar unicorn = "rainbows"; // rainbow'.match(commentRegex());
//=> ['/* unicorn */', ' // rainbow']
```


## API

The contents of the comment is in the first submatch.

### commentRegex()

Returns a regex for matching line and block comments.

### commentRegex.line()

Returns a regex for matching line comments.

### commentRegex.block()

Returns a regex for matching block comments.


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
