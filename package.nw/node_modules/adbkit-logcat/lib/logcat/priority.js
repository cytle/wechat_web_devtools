(function() {
  var Priority;

  Priority = (function() {
    var letterNames, letters, names;

    function Priority() {}

    Priority.UNKNOWN = 0;

    Priority.DEFAULT = 1;

    Priority.VERBOSE = 2;

    Priority.DEBUG = 3;

    Priority.INFO = 4;

    Priority.WARN = 5;

    Priority.ERROR = 6;

    Priority.FATAL = 7;

    Priority.SILENT = 8;

    names = {
      0: 'UNKNOWN',
      1: 'DEFAULT',
      2: 'VERBOSE',
      3: 'DEBUG',
      4: 'INFO',
      5: 'WARN',
      6: 'ERROR',
      7: 'FATAL',
      8: 'SILENT'
    };

    letters = {
      '?': Priority.UNKNOWN,
      'V': Priority.VERBOSE,
      'D': Priority.DEBUG,
      'I': Priority.INFO,
      'W': Priority.WARN,
      'E': Priority.ERROR,
      'F': Priority.FATAL,
      'S': Priority.SILENT
    };

    letterNames = {
      0: '?',
      1: '?',
      2: 'V',
      3: 'D',
      4: 'I',
      5: 'W',
      6: 'E',
      7: 'F',
      8: 'S'
    };

    Priority.fromName = function(name) {
      var value;
      value = Priority[name.toUpperCase()];
      if (value || value === 0) {
        return value;
      }
      return Priority.fromLetter(name);
    };

    Priority.toName = function(value) {
      return names[value];
    };

    Priority.fromLetter = function(letter) {
      return letters[letter.toUpperCase()];
    };

    Priority.toLetter = function(value) {
      return letterNames[value];
    };

    return Priority;

  })();

  module.exports = Priority;

}).call(this);
