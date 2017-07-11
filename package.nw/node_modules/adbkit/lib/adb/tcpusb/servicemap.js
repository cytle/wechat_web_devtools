var ServiceMap;

ServiceMap = (function() {
  function ServiceMap() {
    this.remotes = Object.create(null);
    this.count = 0;
  }

  ServiceMap.prototype.end = function() {
    var ref, remote, remoteId;
    ref = this.remotes;
    for (remoteId in ref) {
      remote = ref[remoteId];
      remote.end();
    }
    this.remotes = Object.create(null);
    this.count = 0;
  };

  ServiceMap.prototype.insert = function(remoteId, socket) {
    if (this.remotes[remoteId]) {
      throw new Error("Remote ID " + remoteId + " is already being used");
    } else {
      this.count += 1;
      return this.remotes[remoteId] = socket;
    }
  };

  ServiceMap.prototype.get = function(remoteId) {
    return this.remotes[remoteId] || null;
  };

  ServiceMap.prototype.remove = function(remoteId) {
    var remote;
    if (remote = this.remotes[remoteId]) {
      delete this.remotes[remoteId];
      this.count -= 1;
      return remote;
    } else {
      return null;
    }
  };

  return ServiceMap;

})();

module.exports = ServiceMap;
