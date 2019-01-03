var Code = require('code');   // assertion library
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var describe = lab.describe;
var it = lab.it;
//var before = lab.before;
//var after = lab.after;
var expect = Code.expect;

var BufferConsumer = require('../lib/bufferconsumer');
var BufferWriter = require('../lib/bufferwriter');


describe('BufferConsumer', function () {

  it('throw if no buffer as argument', function (done) {
    var throws = function () {
      return (new BufferConsumer());
    };

    expect(throws).to.throw(Error, 'Expected instance of Buffer');
    done();
  });

  it('throw if seek before 0', function (done) {
    var throws = function () {
      var b = new Buffer(512);
      var consumer = new BufferConsumer(b);
      consumer.seek(-1);
    };

    expect(throws).to.throw(Error, 'Negative pos not allowed');
    done();
  });

  it('throw if seek after end', function (done) {
    var throws = function () {
      var b = new Buffer(512);
      var consumer = new BufferConsumer(b);
      consumer.seek(515);
    };

    expect(throws).to.throw(Error, 'Cannot seek after EOF. 515 > 512');
    done();
  });

  it('thow if slice after end', function (done) {
    var throws = function () {
      var b = new Buffer(512);
      var consumer = new BufferConsumer(b);
      consumer.seek(500);
      consumer.slice(100);
    };

    expect(throws).to.throw(Error, 'Buffer overflow');
    done();
  });

  it('#string with length', function (done) {
    var b = new Buffer('qwertasdfg');
    var consumer = new BufferConsumer(b);
    var s = consumer.string('utf8', 3);
    expect(s).to.equal('qwe');
    s = consumer.string();
    expect(s).to.equal('rtasdfg');
    done();
  });

});


describe('BufferWriter', function () {
  it('#name on empty buffer', function (done) {
    var out = new BufferWriter();
    out.name('');
    out.dump();
    var consumer = new BufferConsumer(out.dump());
    var s = consumer.name();
    expect(s).to.equal('');
    done();
  });
});
