# run-applescript [![Build Status](https://travis-ci.org/sindresorhus/run-applescript.svg?branch=master)](https://travis-ci.org/sindresorhus/run-applescript)

> Run AppleScript and get the result


## Install

```
$ npm install run-applescript
```


## Usage

```js
const runApplescript = require('run-applescript');

(async () => {
	const result = await runApplescript('return "unicorn"');

	console.log(result);
	//=> 'unicorn'
})();
```


## API

### runAppleScript(script)

Returns a `Promise<string>` with the script result.

### runAppleScript.sync(script)

Returns a `string` with the script result.


## Related

- [run-jxa](https://github.com/sindresorhus/run-jxa) - Run JXA code and get the result


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
