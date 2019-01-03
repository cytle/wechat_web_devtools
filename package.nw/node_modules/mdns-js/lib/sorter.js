

var sorter = module.exports = {};


/**
 * Sorts the passed list of string IPs in-place.
 * @private
 */
sorter.sortIps = function doSortIps(arg) {
  arg.sort(sorter.sortIps.sort);
  return arg;
};


sorter.sortIps.sort = function doSort(l, r) {
  // TODO: support v6.
  var lp = l.split('.').map(sorter.sortIps._toInt);
  var rp = r.split('.').map(sorter.sortIps._toInt);
  for (var i = 0; i < Math.min(lp.length, rp.length); ++i) {
    if (lp[i] < rp[i]) {
      return -1;
    }
    else if (lp[i] > rp[i]) {
      return +1;
    }
  }
  return 0;
};

sorter.sortIps._toInt = function addI(i) {
  return +i;
};
