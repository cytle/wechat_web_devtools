# adbkit-logcat

**adbkit-logcat** provides a [Node.js][nodejs] interface for working with output produced by the Android [`logcat` tool][logcat-site]. It takes a log stream (that you must create separately), parses it, and emits log entries in real-time as they occur. Possible use cases include storing logs in a database, forwarding logs via [MessagePack][msgpack], or just advanced filtering.

## Getting started

Install via NPM:

```bash
npm install --save adbkit-logcat
```

Note that while adbkit-logcat is written in CoffeeScript, it is compiled to JavaScript before publishing to NPM, which means that you are not required to use CoffeeScript.

### Examples

#### Output all log messages

##### JavaScript

```javascript
var logcat = require('adbkit-logcat');
var spawn = require('child_process').spawn;

// Retrieve a binary log stream
var proc = spawn('adb', ['logcat', '-B']);

// Connect logcat to the stream
reader = logcat.readStream(proc.stdout);
reader.on('entry', function(entry) {
  console.log(entry.message);
});

// Make sure we don't leave anything hanging
process.on('exit', function() {
  proc.kill();
});
```

##### CoffeeScript

```coffeescript
Logcat = require 'adbkit-logcat'
{spawn} = require 'child_process'

# Retrieve a binary log stream
proc = spawn 'adb', ['logcat', '-B']

# Connect logcat to the stream
reader = Logcat.readStream proc.stdout
reader.on 'entry', (entry) ->
  console.log entry.message

# Make sure we don't leave anything hanging
process.on 'exit', ->
  proc.kill()
```

## API

### Logcat

#### logcat.Priority

Exposes `Priority`. See below for details.

#### logcat.Reader

Exposes `Reader`. See below for details.

#### logcat.readStream(stream[, options])

Creates a logcat reader instance from the provided logcat event [`Stream`][node-stream]. Note that you must create the stream separately.

* **stream** The event stream to read.
* **options** Optional. The following options are supported:
    - **format** The format of the stream. Currently, the only supported value is `'binary'`, which (for example) `adb logcat -B` produces. Defaults to `'binary'`.
    - **fixLineFeeds** All programs run via the ADB shell transform any `'\n'` in the output to `'\r\n'`, which breaks binary content. If set, this option reverses the transformation before parsing the stream. Defaults to `true`.
* Returns: The `Reader` instance.

### Priority

#### Constants

The following static properties are available:

* **Priority.UNKNOWN** i.e. `0`.
* **Priority.DEFAULT** i.e. `1`. Not available when reading a stream.
* **Priority.VERBOSE** i.e. `2`.
* **Priority.DEBUG** i.e. `3`.
* **Priority.INFO** i.e. `4`.
* **Priority.WARN** i.e. `5`.
* **Priority.ERROR** i.e. `6`.
* **Priority.FATAL** i.e. `7`.
* **Priority.SILENT** i.e. `8`. Not available when reading a stream.

#### Priority.fromLetter(letter)

Static method to convert the given `letter` into a numeric priority. For example, `Priority.fromName('d')` would return `Priority.DEBUG`.

* **letter** The priority as a `String`. Any single, case-insensitive character matching the first character of any `Priority` constant is accepted.
* Returns: The priority as a `Number`, or `undefined`.

#### Priority.fromName(name)

Static method to convert the given `name` into a numeric priority. For example, `Priority.fromName('debug')` (or `Priority.fromName('d')`) would return `Priority.DEBUG`.

* **name** The priority as a `String`. Any full, case-insensitive match of the `Priority` constants is accepted. If no match is found, falls back to `Priority.fromLetter()`.
* Returns: The priority as a `Number`, or `undefined`.

#### Priority.toLetter(priority)

Static method to convert the numeric priority into its letter representation. For example, `Priority.toLetter(Priority.DEBUG)` would return `'D'`.

* **priority** The priority as a `Number`. Any `Priority` constant value is accepted.
* Returns: The priority as a `String` letter, or `undefined`.

#### Priority.toName(priority)

Static method to convert the numeric priority into its full string representation. For example, `Priority.toLetter(Priority.DEBUG)` would return `'DEBUG'`.

* **priority** The priority as a `Number`. Any `Priority` constant value is accepted.
* Returns: The priority as a `String`, or `undefined`.

### Reader

A reader instance, which is an [`EventEmitter`][node-events].

#### Events

The following events are available:

* **error** **(err)** Emitted when an error occurs.
    * **err** An `Error`.
* **end** Emitted when the stream ends.
* **finish** Emitted when the stream finishes.
* **entry** **(entry)** Emitted when the stream finishes.
    * **entry** A log `Entry`. See below for details.

#### constructor([options])

For advanced users. Manually constructs a `Reader` instance. Useful for testing and/or playing around. Normally you would use `logcat.readStream()` to create the instance.

* **options** See `logcat.readStream()` for details.
* Returns: N/A

#### reader.connect(stream)

For advanced users. When instantiated manually (not via `logcat.readStream()`), connects the `Reader` instance to the given stream.

* **stream** See `logcat.readStream()` for details.
* Returns: The `Reader` instance.

#### reader.end()

Convenience method for ending the stream.

* Returns: The `Reader` instance.

#### reader.exclude(tag)

Skip entries with the provided tag. Alias for `reader.include(tag, Priority.SILENT)`. Note that even skipped events have to be parsed so that they can be ignored.

* **tag** The tag string to exclude. If `'*'`, works the same as `reader.excludeAll()`.
* Returns: The `Reader` instance.

#### reader.excludeAll()

Skip **ALL** entries. Alias for `reader.includeAll(Priority.SILENT)`. Any entries you wish to see must be included via `include()`/`includeAll()`.

* Returns: The `Reader` instance.

#### reader.include(tag[, priority])

Include all entries with the given tag and a priority higher or equal to the given `priority`.

* **tag** The tag string to include. If `'*'`, works the same as `reader.includeAll(priority)`.
* **priority** Optional. A lower bound for the priority. Any numeric `Priority` constant or any `String` value accepted by `Priority.fromName()` is accepted. Defaults to `Priority.DEBUG`.
* Returns: The `Reader` instance.

#### reader.includeAll([priority])

Include all entries with a priority higher or equal to the given `priority`.

* **tag** The tag string to exclude.
* **priority** Optional. See `reader.include()` for details.
* Returns: The `Reader` instance.

#### reader.resetFilters()

Resets all inclusions/exclusions.

* Returns: The `Reader` instance.

### Entry

A log entry.

#### Properties

The following properties are available:

* **date** Event time as a `Date`.
* **pid** Process ID as a `Number`.
* **tid** Thread ID as a `Number`.
* **priority** Event priority as a `Number`. You can use `logcat.Priority` to convert the value into a `String`.
* **tag** Event tag as a `String`.
* **message** Message as a `String`.

#### entry.toBinary()

Converts the entry back to the binary log format.

* Returns: The binary event as a [`Buffer`][node-buffer].

## More information

* [logprint.c](https://github.com/android/platform_system_core/blob/master/liblog/logprint.c)
* [logcat.cpp](https://github.com/android/platform_system_core/blob/master/logcat/logcat.cpp)
* [logger.h](https://github.com/android/platform_system_core/blob/master/include/log/logger.h)

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).

Copyright © The OpenSTF Project. All Rights Reserved.

[nodejs]: <http://nodejs.org/>
[msgpack]: <http://msgpack.org/>
[logcat-site]: <http://developer.android.com/tools/help/logcat.html>
[node-stream]: <http://nodejs.org/api/stream.html>
[node-events]: <http://nodejs.org/api/events.html>
[node-buffer]: <http://nodejs.org/api/buffer.html>
