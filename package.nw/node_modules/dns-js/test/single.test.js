var Lab = require('lab');
var lab = exports.lab = Lab.script();
var describe = lab.describe;
var helper = require('./helper');

describe('single', function () {
  if (process.env.SINGLE) {
    describe('parsing', function () {
      helper.createFileParsingTest(lab, process.env.SINGLE, true);
    });
  }
});
