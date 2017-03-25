(function() {
  var Filesystem, crawlFilesystem, createSnapshot, disk, fs, isUnpackDir, minimatch, mkdirp, os, path;

  fs = require('fs');

  path = require('path');

  os = require('os');

  minimatch = require('minimatch');

  mkdirp = require('mkdirp');

  Filesystem = require('./filesystem');

  disk = require('./disk');

  crawlFilesystem = require('./crawlfs');

  createSnapshot = require('./snapshot');

  isUnpackDir = function(path, pattern) {
    return path.indexOf(pattern) === 0 || minimatch(path, pattern);
  };

  module.exports.createPackage = function(src, dest, callback) {
    return module.exports.createPackageWithOptions(src, dest, {}, callback);
  };

  module.exports.createPackageWithOptions = function(src, dest, options, callback) {
    var dot;
    dot = options.dot;
    if (dot === void 0) {
      dot = true;
    }
    return crawlFilesystem(src, {
      dot: dot
    }, function(error, filenames, metadata) {
      if (error) {
        return callback(error);
      }
      module.exports.createPackageFromFiles(src, dest, filenames, metadata, options, callback);
    });
  };

  /*
  createPackageFromFiles - Create an asar-archive from a list of filenames
  src: Base path. All files are relative to this.
  dest: Archive filename (& path).
  filenames: Array of filenames relative to src.
  metadata: Object with filenames as keys and {type='directory|file|link', stat: fs.stat} as values. (Optional)
  options: The options.
  callback: The callback function. Accepts (err).
  */


  module.exports.createPackageFromFiles = function(src, dest, filenames, metadata, options, callback) {
    var file, filenamesSorted, files, filesystem, handleFile, insertsDone, missing, names, next, ordering, orderingFiles, pathComponent, pathComponents, str, total, _i, _j, _k, _l, _len, _len1, _len2, _len3;
    if (metadata == null) {
      metadata = {};
    }
    filesystem = new Filesystem(src);
    files = [];
    if (options.ordering) {
      orderingFiles = fs.readFileSync(options.ordering).toString().split('\n').map(function(line) {
        if (line.indexOf(':') !== -1) {
          line = line.split(':').pop();
        }
        line = line.trim();
        if (line[0] === '/') {
          line = line.slice(1);
        }
        return line;
      });
      ordering = [];
      for (_i = 0, _len = orderingFiles.length; _i < _len; _i++) {
        file = orderingFiles[_i];
        pathComponents = file.split(path.sep);
        str = src;
        for (_j = 0, _len1 = pathComponents.length; _j < _len1; _j++) {
          pathComponent = pathComponents[_j];
          str = path.join(str, pathComponent);
          ordering.push(str);
        }
      }
      filenamesSorted = [];
      missing = 0;
      total = filenames.length;
      for (_k = 0, _len2 = ordering.length; _k < _len2; _k++) {
        file = ordering[_k];
        if (filenamesSorted.indexOf(file) === -1 && filenames.indexOf(file) !== -1) {
          filenamesSorted.push(file);
        }
      }
      for (_l = 0, _len3 = filenames.length; _l < _len3; _l++) {
        file = filenames[_l];
        if (filenamesSorted.indexOf(file) === -1) {
          filenamesSorted.push(file);
          missing += 1;
        }
      }
      console.log("Ordering file has " + ((total - missing) / total * 100) + "% coverage.");
    } else {
      filenamesSorted = filenames;
    }
    handleFile = function(filename, done) {
      var dirName, shouldUnpack, stat, type;
      file = metadata[filename];
      if (!file) {
        stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
          type = 'directory';
        }
        if (stat.isFile()) {
          type = 'file';
        }
        if (stat.isSymbolicLink()) {
          type = 'link';
        }
        file = {
          stat: stat,
          type: type
        };
      }
      switch (file.type) {
        case 'directory':
          shouldUnpack = options.unpackDir ? isUnpackDir(path.relative(src, filename), options.unpackDir) : false;
          filesystem.insertDirectory(filename, shouldUnpack);
          break;
        case 'file':
          shouldUnpack = false;
          if (options.unpack) {
            shouldUnpack = minimatch(filename, options.unpack, {
              matchBase: true
            });
          }
          if (!shouldUnpack && options.unpackDir) {
            dirName = path.relative(src, path.dirname(filename));
            shouldUnpack = isUnpackDir(dirName, options.unpackDir);
          }
          files.push({
            filename: filename,
            unpack: shouldUnpack
          });
          filesystem.insertFile(filename, shouldUnpack, file, options, done);
          return;
        case 'link':
          filesystem.insertLink(filename, file.stat);
      }
      return process.nextTick(done);
    };
    insertsDone = function() {
      return mkdirp(path.dirname(dest), function(error) {
        if (error) {
          return callback(error);
        }
        return disk.writeFilesystem(dest, filesystem, files, metadata, function(error) {
          if (error) {
            return callback(error);
          }
          if (options.snapshot) {
            return createSnapshot(src, dest, filenames, metadata, options, callback);
          } else {
            return callback(null);
          }
        });
      });
    };
    names = filenamesSorted.slice();
    next = function(name) {
      if (!name) {
        return insertsDone();
      }
      return handleFile(name, function() {
        return next(names.shift());
      });
    };
    return next(names.shift());
  };

  module.exports.statFile = function(archive, filename, followLinks) {
    var filesystem;
    filesystem = disk.readFilesystemSync(archive);
    return filesystem.getFile(filename, followLinks);
  };

  module.exports.listPackage = function(archive) {
    return disk.readFilesystemSync(archive).listFiles();
  };

  module.exports.extractFile = function(archive, filename) {
    var filesystem;
    filesystem = disk.readFilesystemSync(archive);
    return disk.readFileSync(filesystem, filename, filesystem.getFile(filename));
  };

  module.exports.extractAll = function(archive, dest) {
    var content, destFilename, error, file, filename, filenames, filesystem, followLinks, linkDestPath, linkSrcPath, linkTo, relativePath, _i, _len, _results;
    filesystem = disk.readFilesystemSync(archive);
    filenames = filesystem.listFiles();
    followLinks = process.platform === 'win32';
    mkdirp.sync(dest);
    _results = [];
    for (_i = 0, _len = filenames.length; _i < _len; _i++) {
      filename = filenames[_i];
      filename = filename.substr(1);
      destFilename = path.join(dest, filename);
      file = filesystem.getFile(filename, followLinks);
      if (file.files) {
        _results.push(mkdirp.sync(destFilename));
      } else if (file.link) {
        linkSrcPath = path.dirname(path.join(dest, file.link));
        linkDestPath = path.dirname(destFilename);
        relativePath = path.relative(linkDestPath, linkSrcPath);
        try {
          fs.unlinkSync(destFilename);
        } catch (_error) {
          error = _error;
        }
        linkTo = path.join(relativePath, path.basename(file.link));
        _results.push(fs.symlinkSync(linkTo, destFilename));
      } else {
        content = disk.readFileSync(filesystem, filename, file);
        _results.push(fs.writeFileSync(destFilename, content));
      }
    }
    return _results;
  };

}).call(this);
