
# Log.js

 Light-weight logging for [NodeJS](http://nodejs.org), including a 
 streaming log reader.

## Installation

    $ npm install log

## Example

Log level defaults to __DEBUG__ however here we specify __info__, and the stream defaults to _stdout_:

    var Log = require('log')
      , log = new Log('info');

    log.debug('preparing email');
    log.info('sending email');
    log.error('failed to send email');

Specifying a specific stream:

    var fs = require('fs')
      , Log = require('log')
      , log = new Log('debug', fs.createWriteStream('my.log'));

Instead of the log level constants, you may also supply a string:

    var Log = require('log')
      , log = new Log('warning');

 We can also use `%s` much like `console.log()` to pass arguments:
 
     log.error('oh no, failed to send mail to %s.', user.email);

## Reader

 To stream a log, simply pass a readable stream instead of a writable:

    var Log = require('log')
      , fs = require('fs')
      , stream = fs.createReadStream(__dirname + '/file.log')
      , log = new Log('debug', stream);
   
    log.on('line', function(line){
      console.log(line);
    });

 __Note: log.js assumes utf8 encoded data.__ 
Example stdout:

    { date: Sun, 26 Sep 2010 01:26:14 GMT
    , level: 1
    , levelString: 'ALERT'
    , msg: 'a alert message'
    }
    { date: Sun, 26 Sep 2010 01:26:14 GMT
    , level: 0
    , levelString: 'EMERGENCY'
    , msg: 'a emergency message'
    }

## Log Levels

 Mirror that of syslog:
 
  - 0 __EMERGENCY__  system is unusable
  - 1 __ALERT__ action must be taken immediately
  - 2 __CRITICAL__ the system is in critical condition
  - 3 __ERROR__ error condition
  - 4 __WARNING__ warning condition
  - 5 __NOTICE__ a normal but significant condition
  - 6 __INFO__ a purely informational message
  - 7 __DEBUG__ messages to debug an application

## License 

(The MIT License)

Copyright (c) 2009-2010 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
