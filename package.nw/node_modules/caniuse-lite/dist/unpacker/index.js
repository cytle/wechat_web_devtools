'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var browsers = require('../../data/browsers');

var browserVersions = require('../../data/browserVersions');

var agentsData = require('../../data/agents');
function unpackBrowserVersions (versionsData) {
    return Object.keys(versionsData).reduce(function (usage, version) {
        usage[browserVersions[version]] = versionsData[version];
        return usage;
    }, {});
}
var agents = Object.keys(agentsData).reduce(function (map, key) {
    var versionsData = agentsData[key];
    map[browsers[key]] = Object.keys(versionsData).reduce(function (data, entry) {
        if (entry === 'A') {
            data.usage_global = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'C') {
            data.versions = versionsData[entry].reduce(function (list, version) {
                if (version === '') {
                    list.push(null);
                } else {
                    list.push(browserVersions[version]);
                }
                return list;
            }, []);
        } else if (entry === 'D') {
            data.prefix_exceptions = unpackBrowserVersions(versionsData[entry]);
        } else if (entry === 'E') {
            data.browser = versionsData[entry];
        } else {
            data.prefix = versionsData[entry];
        }
        return data;
    }, {});
    return map;
}, {});

var statuses = {
    1: "ls",
    2: "rec",
    3: "pr",
    4: "cr",
    5: "wd",
    6: "other",
    7: "unoff",
};

var supported = {
    y: 1 << 0,
    n: 1 << 1,
    a: 1 << 2,
    p: 1 << 3,
    u: 1 << 4,
    x: 1 << 5,
    d: 1 << 6,
};

function unpackSupport (cipher) {
    var stats = Object.keys(supported).reduce(function (list, support) {
        if (cipher & supported[support]) { list.push(support); }
        return list;
    }, []);
    var notes = cipher >> 7;
    var notesArray = [];
    while (notes) {
        var note = Math.floor(Math.log2(notes)) + 1;
        notesArray.unshift(("#" + note));
        notes -= Math.pow(2, note - 1);
    }
    return stats.concat(notesArray).join(' ');
}
function unpackFeature (packed) {
    var unpacked = {status: statuses[packed.B], title: packed.C};
    unpacked.stats = Object.keys(packed.A).reduce(function (browserStats, key) {
        var browser = packed.A[key];
        browserStats[browsers[key]] = Object.keys(browser).reduce(function (stats, support) {
            var packedVersions = browser[support].split(' ');
            var unpacked = unpackSupport(support);
            packedVersions.forEach(function (v) { return stats[browserVersions[v]] = unpacked; });
            return stats;
        }, {});
        return browserStats;
    }, {});
    return unpacked;
}

var features = require('../../data/features');

function unpackRegion (packed) {
    return Object.keys(packed).reduce(function (list, browser) {
        var data = packed[browser];
        list[browsers[browser]] = Object.keys(data).reduce(function (memo, key) {
            var stats = data[key];
            if (key === '_') {
                stats.split(' ').forEach(function (version) { return memo[version] = null; });
            } else {
                memo[key] = stats;
            }
            return memo;
        }, {});
        return list;
    }, {});
}

exports.agents = agents;
exports.feature = unpackFeature;
exports.features = features;
exports.region = unpackRegion;
