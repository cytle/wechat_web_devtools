# adbkit-monkey

**adbkit-monkey** provides a [Node.js][nodejs] interface for working with the Android [`monkey` tool][monkey-site]. Albeit undocumented, they monkey program can be started in TCP mode with the `--port` argument. In this mode, it accepts a [range of commands][monkey-proto] that can be used to interact with the UI in a non-random manner. This mode is also used internally by the [`monkeyrunner` tool][monkeyrunner-site], although the documentation claims no relation to the monkey tool.

## Getting started

Install via NPM:

```bash
npm install --save adbkit-monkey
```

Note that while adbkit-monkey is written in CoffeeScript, it is compiled to JavaScript before publishing to NPM, which means that you are not required to use CoffeeScript.

### Examples

The following examples assume that monkey is already running (via `adb shell monkey --port 1080`) and a port forwarding (`adb forward tcp:1080 tcp:1080`) has been set up.

#### Press the home button

```javascript
var assert = require('assert');
var monkey = require('adbkit-monkey');

var client = monkey.connect({ port: 1080 });

client.press(3 /* KEYCODE_HOME */, function(err) {
  assert.ifError(err);
  console.log('Pressed home button');
  client.end();
});
```

#### Drag out the notification bar

```javascript
var assert = require('assert');
var monkey = require('adbkit-monkey');

var client = monkey.connect({ port: 1080 });

client.multi()
  .touchDown(100, 0)
  .sleep(5)
  .touchMove(100, 20)
  .sleep(5)
  .touchMove(100, 40)
  .sleep(5)
  .touchMove(100, 60)
  .sleep(5)
  .touchMove(100, 80)
  .sleep(5)
  .touchMove(100, 100)
  .sleep(5)
  .touchUp(100, 100)
  .sleep(5)
  .execute(function(err) {
    assert.ifError(err);
    console.log('Dragged out the notification bar');
    client.end();
  });
```

#### Get display size

```javascript
var assert = require('assert');
var monkey = require('adbkit-monkey');

var client = monkey.connect({ port: 1080 });

client.getDisplayWidth(function(err, width) {
  assert.ifError(err);
  client.getDisplayHeight(function(err, height) {
    assert.ifError(err);
    console.log('Display size is %dx%d', width, height);
    client.end();
  });
});
```

#### Type text

Note that you should manually focus a text field first.

```javascript
var assert = require('assert');
var monkey = require('adbkit-monkey');

var client = monkey.connect({ port: 1080 });

client.type('hello monkey!', function(err) {
  assert.ifError(err);
  console.log('Said hello to monkey');
  client.end();
});
```

## API

### Monkey

#### monkey.connect(options)

Uses [Net.connect()][node-net] to open a new TCP connection to monkey. Useful when combined with `adb forward`.

* **options** Any options [`Net.connect()`][node-net] accepts.
* Returns: A new monkey `Client` instance.

#### monkey.connectStream(stream)

Attaches a monkey client to an existing monkey protocol stream.

* **stream** The monkey protocol [`Stream`][node-stream].
* Returns: A new monkey `Client` instance.

### Client

Implements `Api`. See below for details.

#### Events

The following events are available:

* **error** **(err)** Emitted when an error occurs.
    * **err** An `Error`.
* **end** Emitted when the stream ends.
* **finish** Emitted when the stream finishes.

#### client.end()

Ends the underlying stream/connection.

* Returns: The `Client` instance.

#### client.multi()

Returns a new API wrapper that buffers commands for simultaneous delivery instead of sending them individually. When used with `api.sleep()`, allows simple gestures to be executed.

* Returns: A new `Multi` instance. See `Multi` below.

#### client.send(command, callback)

Sends a raw protocol command to monkey.

* **command** The command to send. When `String`, a single command is sent. When `Array`, a series of commands is sent at once.
* **callback(err, value, command)** Called when monkey responds to the command. If multiple commands were sent, the callback will be called once for each command.
    * **err** `null` when successful, `Error` otherwise.
    * **value** The response value, if any.
    * **command** The command the response is for.
* Returns: The `Client` instance.

### Api

The monkey API implemented by `Client` and `Multi`.

#### api.done(callback)

Closes the current monkey session and allows a new session to connect.

* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.flipClose(callback)

Simulates closing the keyboard.

* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.flipOpen(callback)

Simulates opening the keyboard.

* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.get(name, callback)

Gets the value of a variable. Use `api.list()` to retrieve a list of supported variables.

* **name** The name of the variable.
* **callback(err, value)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
    * **value** The value of the variable.
* Returns: The `Api` implementation instance.

#### api.getAmCurrentAction(callback)

Alias for `api.get('am.current.action', callback)`.

#### api.getAmCurrentCategories(callback)

Alias for `api.get('am.current.categories', callback)`.

#### api.getAmCurrentCompClass(callback)

Alias for `api.get('am.current.comp.class', callback)`.

#### api.getAmCurrentCompPackage(callback)

Alias for `api.get('am.current.comp.package', callback)`.

#### api.getCurrentData(callback)

Alias for `api.get('am.current.data', callback)`.

#### api.getAmCurrentPackage(callback)

Alias for `api.get('am.current.package', callback)`.

#### api.getBuildBoard(callback)

Alias for `api.get('build.board', callback)`.

#### api.getBuildBrand(callback)

Alias for `api.get('build.brand', callback)`.

#### api.getBuildCpuAbi(callback)

Alias for `api.get('build.cpu_abi', callback)`.

#### api.getBuildDevice(callback)

Alias for `api.get('build.device', callback)`.

#### api.getBuildDisplay(callback)

Alias for `api.get('build.display', callback)`.

#### api.getBuildFingerprint(callback)

Alias for `api.get('build.fingerprint', callback)`.

#### api.getBuildHost(callback)

Alias for `api.get('build.host', callback)`.

#### api.getBuildId(callback)

Alias for `api.get('build.id', callback)`.

#### api.getBuildManufacturer(callback)

Alias for `api.get('build.manufacturer', callback)`.

#### api.getBuildModel(callback)

Alias for `api.get('build.model', callback)`.

#### api.getBuildProduct(callback)

Alias for `api.get('build.product', callback)`.

#### api.getBuildTags(callback)

Alias for `api.get('build.tags', callback)`.

#### api.getBuildType(callback)

Alias for `api.get('build.type', callback)`.

#### api.getBuildUser(callback)

Alias for `api.get('build.user', callback)`.

#### api.getBuildVersionCodename(callback)

Alias for `api.get('build.version.codename', callback)`.

#### api.getBuildVersionIncremental(callback)

Alias for `api.get('build.version.incremental', callback)`.

#### api.getBuildVersionRelease(callback)

Alias for `api.get('build.version.release', callback)`.

#### api.getBuildVersionSdk(callback)

Alias for `api.get('build.version.sdk', callback)`.

#### api.getClockMillis(callback)

Alias for `api.get('clock.millis', callback)`.

#### api.getClockRealtime(callback)

Alias for `api.get('clock.realtime', callback)`.

#### api.getClockUptime(callback)

Alias for `api.get('clock.uptime', callback)`.

#### api.getDisplayDensity(callback)

Alias for `api.get('display.density', callback)`.

#### api.getDisplayHeight(callback)

Alias for `api.get('display.height', callback)`. Note that the height may exclude any virtual home button row.

#### api.getDisplayWidth(callback)

Alias for `api.get('display.width', callback)`.

#### api.keyDown(keyCode, callback)

Sends a key down event. Should be coupled with `api.keyUp()`. Note that `api.press()` performs the two events automatically.

* **keyCode** The [key code][android-keycodes]. All monkeys support numeric keycodes, and some support automatic conversion from key names to key codes (e.g. `'home'` to `KEYCODE_HOME`). This will not work for number keys however. The most portable method is to simply use numeric key codes.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.keyUp(keyCode, callback)

Sends a key up event. Should be coupled with `api.keyDown()`. Note that `api.press()` performs the two events automatically.

* **keyCode** See `api.keyDown()`.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.list(callback)

Lists supported variables.

* **callback(err, vars)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
    * **vars** An array of supported variable names, to be used with `api.get()`.
* Returns: The `Api` implementation instance.

#### api.press(keyCode, callback)

Sends a key press event.

* **keyCode** See `api.keyDown()`.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.quit(callback)

Closes the current monkey session and quits monkey.

* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.sleep(ms, callback)

Sleeps for the given duration. Can be useful for simulating gestures.

* **ms** How many milliseconds to sleep for.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.tap(x, y, callback)

Taps the given coordinates.

* **x** The x coordinate.
* **y** The y coordinate.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.touchDown(x, y, callback)

Sends a touch down event on the given coordinates.

* **x** The x coordinate.
* **y** The y coordinate.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.touchMove(x, y, callback)

Sends a touch move event on the given coordinates.

* **x** The x coordinate.
* **y** The y coordinate.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.touchUp(x, y, callback)

Sends a touch up event on the given coordinates.

* **x** The x coordinate.
* **y** The y coordinate.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.trackball(x, y, callback)

Sends a trackball event on the given coordinates.

* **x** The x coordinate.
* **y** The y coordinate.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.type(text, callback)

Types the given text.

* **text** A text `String`. Note that only characters for which [key codes][android-keycodes] exist can be entered. Also note that any IME in use may or may not transform the text.
* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

#### api.wake(callback)

Wakes the device from sleep and allows user input.

* **callback(err)** Called when monkey responds.
    * **err** `null` when successful, `Error` otherwise.
* Returns: The `Api` implementation instance.

### Multi

Buffers `Api` commands and delivers them simultaneously for greater control over timing.

Implements all `Api` methods, but without the last `callback` parameter.

#### multi.execute(callback)

Sends all buffered commands.

* **callback(err, values)** Called when monkey has responded to all commands (i.e. just once at the end).
    * **err** `null` when successful, `Error` otherwise.
    * **values** An array of all response values, identical to individual `Api` responses.

## More information

* [Monkey][monkey-site]
    - [Source code][monkey-source]
    - [Protocol][monkey-proto]
* [Monkeyrunner][monkeyrunner-site]

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

See [LICENSE](LICENSE).

Copyright © CyberAgent, Inc. All Rights Reserved.

[nodejs]: <http://nodejs.org/>
[monkey-site]: <http://developer.android.com/tools/help/monkey.html>
[monkey-source]: <https://github.com/android/platform_development/blob/master/cmds/monkey/>
[monkey-proto]: <https://github.com/android/platform_development/blob/master/cmds/monkey/README.NETWORK.txt>
[monkeyrunner-site]: <http://developer.android.com/tools/help/monkeyrunner_concepts.html>
[node-net]: <http://nodejs.org/api/net.html>
[node-stream]: <http://nodejs.org/api/stream.html>
[android-keycodes]: <http://developer.android.com/reference/android/view/KeyEvent.html>
