module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http = __webpack_require__(9);
const EventEmitter = __webpack_require__(8);
const url_1 = __webpack_require__(11);
const request = __webpack_require__(10);
const config_1 = __webpack_require__(1);
/// <reference path="./index.d.ts" />
const HOST = 'http://127.0.0.1';
const LOGIN_STATUS = {
    SUCCESS: 'SUCCESS',
    FAIL: 'FAIL',
    CANCEL: 'CANCEL',
    REQUEST: 'REQUEST',
    PENDING: 'PENDING',
    EXPIRED: 'EXPIRED',
};
// ===== Network connections
let IDE_PORT;
let CLI_PORT;
class Updater extends EventEmitter {
    constructor(onUpdate) {
        super();
        this.onUpdate = onUpdate;
    }
    getPort() {
        return this.port;
    }
    update(port) {
        this.port = port;
        this.onUpdate(port);
        this.emit('update', port);
    }
    reset() {
        this.port = undefined;
    }
}
exports.idePortManager = new Updater(port => IDE_PORT = port);
exports.cliPortManager = new Updater(port => CLI_PORT = port);
let HTTP_PROXY_PORT = 3799;
function tryListen(cb) {
    let port = HTTP_PROXY_PORT;
    let server = http.createServer(() => { });
    server.on('error', (err) => {
        HTTP_PROXY_PORT++;
        tryListen(cb);
    });
    server.listen(port, '127.0.0.1', (err) => {
        server.once('close', () => {
            HTTP_PROXY_PORT = port + 1;
            cb(port);
        });
        server.close();
    });
}
function getAvailablePort() {
    return new Promise(tryListen);
}
exports.getAvailablePort = getAvailablePort;
function startServer(port) {
    return new Promise((resolve, reject) => {
        try {
            // http
            const server = http.createServer((req, res) => {
                try {
                    if (!req.url) {
                        return;
                    }
                    const match = req.url.match(/^\/updatePort\?port=(\d+)$/);
                    if (match && match[1] && parseInt(match[1]) && !isNaN(parseInt(match[1]))) {
                        const idePort = parseInt(match[1]);
                        exports.idePortManager.update(idePort);
                        console.log(`IDE server has started, listening on http://127.0.0.1:${idePort}`);
                        res.statusCode = 200;
                        res.end();
                    }
                    else {
                        const chainReq = http.request({
                            host: HOST,
                            port: IDE_PORT,
                            path: req.url,
                            method: req.method,
                        }, (chainRes) => {
                            chainRes.pipe(res);
                        }).end();
                    }
                }
                catch (err) {
                    res.end();
                }
            });
            server.listen(port, '127.0.0.1');
            resolve();
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.startServer = startServer;
function getIDEPort() {
    return new Promise((resolve, reject) => {
        if (IDE_PORT) {
            resolve(IDE_PORT);
            return;
        }
        exports.idePortManager.once('update', port => {
            resolve(port);
        });
    });
}
exports.getIDEPort = getIDEPort;
function notifyCLIPort(cliPort, idePort) {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await request({
                url: `${HOST}:${idePort}/updatePort?port=${cliPort}`,
                timeout: 1000,
                resolveWithFullResponse: true,
            });
            if (res.statusCode === 200) {
                exports.idePortManager.update(idePort);
                resolve();
            }
            else {
                console.error('err:', res);
                reject(res.status);
            }
        }
        catch (err) {
            if (err && err.error && (err.error.code === 'ETIMEOUT' || err.error.code === 'ECONNREFUSED')) {
                // ide has not been started
                reject(err);
            }
            else {
                reject(err);
            }
        }
    });
}
exports.notifyCLIPort = notifyCLIPort;
function openIDE(projectpath) {
    return new Promise(async (resolve, reject) => {
        try {
            const port = await getIDEPort();
            const params = createURLSearchParams();
            if (projectpath) {
                params.set('projectpath', encodeURIComponent(projectpath));
            }
            const res = await request({
                url: `${HOST}:${port}/open?${params.toString()}`,
                resolveWithFullResponse: true,
            });
            if (res.statusCode === 200) {
                resolve();
            }
            else {
                reject(new Error('Fail to open IDE'));
            }
        }
        catch (err) {
            reject(err);
        }
    });
}
exports.openIDE = openIDE;
function checkIDEStatus() {
    return new Promise(async (resolve, reject) => {
        if (!IDE_PORT) {
            resolve(config_1.IDEStatus.Offline);
            exports.idePortManager.reset();
        }
        else {
            try {
                await notifyCLIPort(CLI_PORT, IDE_PORT);
                resolve(config_1.IDEStatus.Online);
            }
            catch (err) {
                resolve(config_1.IDEStatus.Offline);
                exports.idePortManager.reset();
            }
        }
    });
}
exports.checkIDEStatus = checkIDEStatus;
// ==== IDE commands
exports.login = (format, QRCodeDest) => new Promise(async (resolve, reject) => {
    const port = await getIDEPort();
    try {
        // 1. QR
        format = format || 'terminal';
        const params = createURLSearchParams();
        params.set('format', format);
        if (QRCodeDest) {
            params.set('qroutput', encodeURIComponent(QRCodeDest));
        }
        const body = await request({
            url: `${HOST}:${port}/login?${params.toString()}`
        });
        if (!QRCodeDest) {
            printQRCode(body);
        }
    }
    catch (err) {
        reject(err.toString());
    }
    try {
        // 2. poll
        await pollHelper();
    }
    catch (err) {
        reject(err.toString());
    }
    resolve();
    function pollHelper() {
        return new Promise((resolve, reject) => {
            poll(resolve, reject);
        });
    }
    async function poll(resolve, reject) {
        try {
            let body = await request({
                url: `${HOST}:${port}/loginresult`
            });
            if (body) {
                body = JSON.parse(body);
                switch (body.loginStatus) {
                    case LOGIN_STATUS.SUCCESS: {
                        resolve();
                        break;
                    }
                    case LOGIN_STATUS.PENDING: {
                        setTimeout(poll.bind(this), 300, resolve, reject);
                        break;
                    }
                    case LOGIN_STATUS.CANCEL: {
                        reject('login cancelled');
                        break;
                    }
                    case LOGIN_STATUS.EXPIRED: {
                        reject('login expired');
                        break;
                    }
                    case LOGIN_STATUS.FAIL: {
                        reject('login failed');
                        break;
                    }
                    default: {
                        reject('login failed');
                        break;
                    }
                }
            }
            else {
                reject('Error while getting login result');
            }
        }
        catch (err) {
            reject(err);
        }
    }
});
exports.preview = (options) => new Promise(async (resolve, reject) => {
    const { projectpath, format = 'terminal', qroutput, infoOutput, } = options;
    if (!projectpath) {
        reject('project path must be provided');
        return;
    }
    const port = await getIDEPort();
    try {
        const params = createURLSearchParams();
        params.set('projectpath', encodeURIComponent(projectpath));
        params.set('format', format);
        params.set('qroutput', encodeURIComponent(qroutput || ''));
        params.set('infooutput', encodeURIComponent(infoOutput || ''));
        const body = await request({
            url: `${HOST}:${port}/preview?${params.toString()}`
        });
        if (!qroutput) {
            printQRCode(body);
        }
        resolve();
    }
    catch (err) {
        reject(err.toString());
    }
});
exports.upload = (options) => new Promise(async (resolve, reject) => {
    const { projectpath, version, desc, format = 'terminal', qroutput, infoOutput } = options;
    if (!projectpath || !version) {
        reject('version and project path must be provided');
        return;
    }
    const port = await getIDEPort();
    try {
        const params = createURLSearchParams();
        params.set('projectpath', encodeURIComponent(projectpath));
        params.set('version', encodeURIComponent(version));
        params.set('desc', encodeURIComponent(desc || ''));
        params.set('infooutput', encodeURIComponent(infoOutput || ''));
        const response = await request({
            url: `${HOST}:${port}/upload?${params.toString()}`,
            resolveWithFullResponse: true,
        });
        if (response.statusCode !== 200) {
            reject(response.body);
        }
        if (!qroutput) {
            console.log(response.body);
        }
        resolve();
    }
    catch (err) {
        reject(err);
    }
});
exports.autoTest = (options) => new Promise(async (resolve, reject) => {
    const { projectpath, } = options;
    if (!projectpath) {
        reject('project path must be provided');
        return;
    }
    const port = await getIDEPort();
    try {
        const params = createURLSearchParams();
        params.set('projectpath', encodeURIComponent(projectpath));
        const response = await request({
            url: `${HOST}:${port}/test?${params.toString()}`,
            resolveWithFullResponse: true,
        });
        if (response.statusCode !== 200) {
            reject(response.body);
        }
        resolve();
    }
    catch (err) {
        reject(err && err.error);
    }
});
// utils
function printQRCode(code) {
    const len = code.length;
    const matches = code.match(/.+?\n/g);
    const lastLine = code.match(/[^\n]+?$/);
    if (!matches) {
        console.log(code);
        return;
    }
    function getCutPosition(len, matches) {
        const logMaxLen = 8000;
        let i = 1;
        while (len / i > logMaxLen) {
            i++;
        }
        if (i == 1)
            return [];
        let linesLen = matches.length + 1;
        let chunkSize = Math.floor(linesLen / i);
        let positions = [];
        for (let j = 1; j < i; j++) {
            positions.push(chunkSize * j);
        }
        return positions;
    }
    const positions = getCutPosition(len, matches);
    if (positions.length === 0) {
        console.log(code);
    }
    else {
        for (var i = 0; i < positions.length; i++) {
            console.log(matches.slice(positions[i - 1] || 0, positions[i]).join('').slice(0, -1));
        }
        console.log(matches.slice(positions[positions.length - 1]).join('') + lastLine);
    }
}
function createURLSearchParams() {
    const init = {
        cli: '1'
    };
    if (global.from) {
        init.from = global.from;
    }
    return new url_1.URLSearchParams(init);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2pzL3V0aWxzL25ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2QkFBNEI7QUFDNUIsdUNBQXNDO0FBQ3RDLDZCQUFxQztBQUNyQyxrREFBaUQ7QUFDakQsc0NBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQTtBQUUvQixNQUFNLFlBQVksR0FBRztJQUNuQixPQUFPLEVBQUUsU0FBUztJQUNsQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUE7QUFFRCw0QkFBNEI7QUFDNUIsSUFBSSxRQUE0QixDQUFBO0FBQ2hDLElBQUksUUFBNEIsQ0FBQTtBQUVoQyxhQUFjLFNBQVEsWUFBWTtJQUloQyxZQUFvQixRQUE0QztRQUM5RCxLQUFLLEVBQUUsQ0FBQTtRQURXLGFBQVEsR0FBUixRQUFRLENBQW9DO0lBRWhFLENBQUM7SUFFRCxPQUFPO1FBQ0wsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxNQUFNLENBQUMsSUFBWTtRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNoQixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQzNCLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLElBQUksR0FBRyxTQUFTLENBQUE7SUFDdkIsQ0FBQztDQUNGO0FBRVksUUFBQSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFDckQsUUFBQSxjQUFjLEdBQUcsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLENBQUE7QUFFbEUsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFBO0FBQzFCLG1CQUFtQixFQUFZO0lBQzdCLElBQUksSUFBSSxHQUFHLGVBQWUsQ0FBQTtJQUMxQixJQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFBO0lBRXpDLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDekIsZUFBZSxFQUFFLENBQUE7UUFDakIsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2YsQ0FBQyxDQUFDLENBQUE7SUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQyxHQUFVLEVBQUUsRUFBRTtRQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7WUFDeEIsZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUE7WUFDMUIsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDaEIsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBRUQ7SUFDRSxPQUFPLElBQUksT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0FBQy9CLENBQUM7QUFGRCw0Q0FFQztBQUVELHFCQUE0QixJQUFZO0lBQ3RDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSTtZQUNGLE9BQU87WUFDUCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO2dCQUM1QyxJQUFJO29CQUNGLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO3dCQUNaLE9BQU07cUJBQ1A7b0JBQ0QsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQTtvQkFDekQsSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRTt3QkFDekUsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUNsQyxzQkFBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTt3QkFFOUIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5REFBeUQsT0FBTyxFQUFFLENBQUMsQ0FBQTt3QkFFL0UsR0FBRyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUE7d0JBQ3BCLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtxQkFDVjt5QkFBTTt3QkFDTCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDOzRCQUM1QixJQUFJLEVBQUUsSUFBSTs0QkFDVixJQUFJLEVBQUUsUUFBUTs0QkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLEdBQUc7NEJBQ2IsTUFBTSxFQUFFLEdBQUcsQ0FBQyxNQUFNO3lCQUNuQixFQUFFLENBQUMsUUFBUSxFQUFFLEVBQUU7NEJBQ2QsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTt3QkFDcEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUE7cUJBQ1Q7aUJBQ0Y7Z0JBQUMsT0FBTyxHQUFHLEVBQUU7b0JBQ1osR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFBO2lCQUNWO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQTtZQUVoQyxPQUFPLEVBQUUsQ0FBQTtTQUNWO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7U0FDWjtJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQztBQXhDRCxrQ0F3Q0M7QUFFRDtJQUNFLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDckMsSUFBSSxRQUFRLEVBQUU7WUFDWixPQUFPLENBQUMsUUFBUSxDQUFDLENBQUE7WUFDakIsT0FBTTtTQUNQO1FBRUQsc0JBQWMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNmLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBWEQsZ0NBV0M7QUFFRCx1QkFBOEIsT0FBZSxFQUFFLE9BQWU7SUFDNUQsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNDLElBQUk7WUFDRixNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFDeEIsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLE9BQU8sb0JBQW9CLE9BQU8sRUFBRTtnQkFDcEQsT0FBTyxFQUFFLElBQUk7Z0JBQ2IsdUJBQXVCLEVBQUUsSUFBSTthQUM5QixDQUFDLENBQUE7WUFFRixJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO2dCQUMxQixzQkFBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDOUIsT0FBTyxFQUFFLENBQUE7YUFDVjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDMUIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUNuQjtTQUNGO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssVUFBVSxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLGNBQWMsQ0FBQyxFQUFFO2dCQUM1RiwyQkFBMkI7Z0JBQzNCLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNaO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTthQUNaO1NBQ0Y7SUFDSCxDQUFDLENBQUMsQ0FBQTtBQUNKLENBQUM7QUF6QkQsc0NBeUJDO0FBRUQsaUJBQXdCLFdBQW9CO0lBQzFDLE9BQU8sSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUMzQyxJQUFJO1lBQ0YsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQTtZQUMvQixNQUFNLE1BQU0sR0FBRyxxQkFBcUIsRUFBRSxDQUFBO1lBQ3RDLElBQUksV0FBVyxFQUFFO2dCQUNmLE1BQU0sQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUE7YUFDM0Q7WUFDRCxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFDeEIsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLElBQUksU0FBUyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7Z0JBQ2hELHVCQUF1QixFQUFFLElBQUk7YUFDOUIsQ0FBQyxDQUFBO1lBRUYsSUFBSSxHQUFHLENBQUMsVUFBVSxLQUFLLEdBQUcsRUFBRTtnQkFDMUIsT0FBTyxFQUFFLENBQUE7YUFDVjtpQkFBTTtnQkFDTCxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFBO2FBQ3RDO1NBQ0Y7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNaO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBdEJELDBCQXNCQztBQUVEO0lBQ0UsT0FBTyxJQUFJLE9BQU8sQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPLENBQUMsa0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUMxQixzQkFBYyxDQUFDLEtBQUssRUFBRSxDQUFBO1NBQ3ZCO2FBQU07WUFDTCxJQUFJO2dCQUNGLE1BQU0sYUFBYSxDQUFDLFFBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDeEMsT0FBTyxDQUFDLGtCQUFTLENBQUMsTUFBTSxDQUFDLENBQUE7YUFDMUI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixPQUFPLENBQUMsa0JBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtnQkFDMUIsc0JBQWMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTthQUN2QjtTQUNGO0lBQ0gsQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDO0FBZkQsd0NBZUM7QUFFRCxvQkFBb0I7QUFFUCxRQUFBLEtBQUssR0FBRyxDQUFDLE1BQWUsRUFBRSxVQUFtQixFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ3pHLE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUE7SUFFL0IsSUFBSTtRQUNGLFFBQVE7UUFDUixNQUFNLEdBQUcsTUFBTSxJQUFJLFVBQVUsQ0FBQTtRQUU3QixNQUFNLE1BQU0sR0FBRyxxQkFBcUIsRUFBRSxDQUFBO1FBQ3RDLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVCLElBQUksVUFBVSxFQUFFO1lBQ2QsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQTtTQUN2RDtRQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxJQUFJLFVBQVUsTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO1NBQ2xELENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxVQUFVLEVBQUU7WUFDZixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEI7S0FFRjtJQUFDLE9BQU8sR0FBRyxFQUFFO1FBQ1osTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFBO0tBQ3ZCO0lBRUQsSUFBSTtRQUNGLFVBQVU7UUFDVixNQUFNLFVBQVUsRUFBRSxDQUFBO0tBQ25CO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDdkI7SUFFRCxPQUFPLEVBQUUsQ0FBQTtJQUVUO1FBQ0UsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELEtBQUssZUFBZSxPQUFtQixFQUFFLE1BQThCO1FBQ3JFLElBQUk7WUFDRixJQUFJLElBQUksR0FBRyxNQUFNLE9BQU8sQ0FBQztnQkFDdkIsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLElBQUksY0FBYzthQUNuQyxDQUFDLENBQUE7WUFFRixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtnQkFDdkIsUUFBUSxJQUFJLENBQUMsV0FBVyxFQUFFO29CQUN4QixLQUFLLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekIsT0FBTyxFQUFFLENBQUE7d0JBQ1QsTUFBSztxQkFDTjtvQkFDRCxLQUFLLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDekIsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMsQ0FBQTt3QkFDakQsTUFBSztxQkFDTjtvQkFDRCxLQUFLLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQzt3QkFDeEIsTUFBTSxDQUFDLGlCQUFpQixDQUFDLENBQUE7d0JBQ3pCLE1BQUs7cUJBQ047b0JBQ0QsS0FBSyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ3pCLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQTt3QkFDdkIsTUFBSztxQkFDTjtvQkFDRCxLQUFLLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDdEIsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFBO3dCQUN0QixNQUFLO3FCQUNOO29CQUNELE9BQU8sQ0FBQyxDQUFDO3dCQUNQLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQTt3QkFDdEIsTUFBSztxQkFDTjtpQkFDRjthQUNGO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxrQ0FBa0MsQ0FBQyxDQUFBO2FBQzNDO1NBRUY7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNaLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUNaO0lBQ0gsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFBO0FBRVcsUUFBQSxPQUFPLEdBQUcsQ0FBQyxPQUF1QixFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBRTlGLE1BQU0sRUFDSixXQUFXLEVBQ1gsTUFBTSxHQUFHLFVBQVUsRUFDbkIsUUFBUSxFQUNSLFVBQVUsR0FDWCxHQUFHLE9BQU8sQ0FBQTtJQUVYLElBQUksQ0FBQyxXQUFXLEVBQUU7UUFDaEIsTUFBTSxDQUFDLCtCQUErQixDQUFDLENBQUE7UUFDdkMsT0FBTTtLQUNQO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQTtJQUUvQixJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcscUJBQXFCLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzVCLE1BQU0sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLGtCQUFrQixDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLGtCQUFrQixDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQzlELE1BQU0sSUFBSSxHQUFHLE1BQU0sT0FBTyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxHQUFHLElBQUksSUFBSSxJQUFJLFlBQVksTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFFO1NBQ3BELENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEI7UUFFRCxPQUFPLEVBQUUsQ0FBQTtLQUVWO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7S0FDdkI7QUFDSCxDQUFDLENBQUMsQ0FBQTtBQUVXLFFBQUEsTUFBTSxHQUFHLENBQUMsT0FBc0IsRUFBRSxFQUFFLENBQUMsSUFBSSxPQUFPLENBQU8sS0FBSyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUU1RixNQUFNLEVBQ0osV0FBVyxFQUNYLE9BQU8sRUFDUCxJQUFJLEVBQ0osTUFBTSxHQUFHLFVBQVUsRUFDbkIsUUFBUSxFQUNSLFVBQVUsRUFDWCxHQUFHLE9BQU8sQ0FBQTtJQUdYLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLEVBQUU7UUFDNUIsTUFBTSxDQUFDLDJDQUEyQyxDQUFDLENBQUE7UUFDbkQsT0FBTTtLQUNQO0lBRUQsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVLEVBQUUsQ0FBQTtJQUUvQixJQUFJO1FBQ0YsTUFBTSxNQUFNLEdBQUcscUJBQXFCLEVBQUUsQ0FBQTtRQUN0QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFBO1FBQzFELE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUE7UUFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEQsTUFBTSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsa0JBQWtCLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDOUQsTUFBTSxRQUFRLEdBQUcsTUFBTSxPQUFPLENBQUM7WUFDN0IsR0FBRyxFQUFFLEdBQUcsSUFBSSxJQUFJLElBQUksV0FBVyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDbEQsdUJBQXVCLEVBQUUsSUFBSTtTQUM5QixDQUFDLENBQUE7UUFFRixJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDdEI7UUFFRCxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDM0I7UUFFRCxPQUFPLEVBQUUsQ0FBQTtLQUVWO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDWjtBQUNILENBQUMsQ0FBQyxDQUFBO0FBRVcsUUFBQSxRQUFRLEdBQUcsQ0FBQyxPQUEwQixFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBTyxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO0lBQ2xHLE1BQU0sRUFDSixXQUFXLEdBQ1osR0FBRyxPQUFPLENBQUE7SUFFWCxJQUFJLENBQUMsV0FBVyxFQUFFO1FBQ2hCLE1BQU0sQ0FBQywrQkFBK0IsQ0FBQyxDQUFBO1FBQ3ZDLE9BQU07S0FDUDtJQUVELE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVSxFQUFFLENBQUE7SUFFL0IsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLHFCQUFxQixFQUFFLENBQUE7UUFDdEMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsa0JBQWtCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQTtRQUMxRCxNQUFNLFFBQVEsR0FBRyxNQUFNLE9BQU8sQ0FBQztZQUM3QixHQUFHLEVBQUUsR0FBRyxJQUFJLElBQUksSUFBSSxTQUFTLE1BQU0sQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNoRCx1QkFBdUIsRUFBRSxJQUFJO1NBQzlCLENBQUMsQ0FBQTtRQUVGLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxHQUFHLEVBQUU7WUFDL0IsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtTQUN0QjtRQUVELE9BQU8sRUFBRSxDQUFBO0tBQ1Y7SUFBQyxPQUFPLEdBQUcsRUFBRTtRQUNaLE1BQU0sQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFBO0tBQ3pCO0FBRUgsQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRO0FBQ1IscUJBQXFCLElBQVk7SUFDL0IsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUN2QixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO0lBQ3BDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUE7SUFFdkMsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNaLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDakIsT0FBTTtLQUNQO0lBRUQsd0JBQXdCLEdBQVcsRUFBRSxPQUF5QjtRQUM1RCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUE7UUFFdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsT0FBTyxHQUFHLEdBQUcsQ0FBQyxHQUFHLFNBQVMsRUFBRTtZQUMxQixDQUFDLEVBQUUsQ0FBQTtTQUNKO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sRUFBRSxDQUFBO1FBRXJCLElBQUksUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO1FBQ2pDLElBQUksU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQTtRQUNsQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQzFCLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFBO1NBQzlCO1FBRUQsT0FBTyxTQUFTLENBQUE7SUFDbEIsQ0FBQztJQUVELE1BQU0sU0FBUyxHQUFHLGNBQWMsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUE7SUFFOUMsSUFBSSxTQUFTLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ2xCO1NBQU07UUFDTCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN6QyxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ3RGO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFBO0tBQ2hGO0FBQ0gsQ0FBQztBQUVEO0lBQ0UsTUFBTSxJQUFJLEdBQVE7UUFDaEIsR0FBRyxFQUFFLEdBQUc7S0FDVCxDQUFBO0lBRUQsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1FBQ2YsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO0tBQ3hCO0lBRUQsT0FBTyxJQUFJLHFCQUFlLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbEMsQ0FBQyJ9

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var IDEStatus;
(function (IDEStatus) {
    IDEStatus[IDEStatus["Online"] = 0] = "Online";
    IDEStatus[IDEStatus["Offline"] = 1] = "Offline";
})(IDEStatus = exports.IDEStatus || (exports.IDEStatus = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vanMvY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsSUFBWSxTQUdYO0FBSEQsV0FBWSxTQUFTO0lBQ25CLDZDQUFNLENBQUE7SUFDTiwrQ0FBTyxDQUFBO0FBQ1QsQ0FBQyxFQUhXLFNBQVMsR0FBVCxpQkFBUyxLQUFULGlCQUFTLFFBR3BCIn0=

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const child_process = __webpack_require__(7);
const network = __webpack_require__(0);
const config_1 = __webpack_require__(1);
/// <reference path="./index.d.ts"/>
const isMac = process.platform === 'darwin';
const AppRelativePath = {
    Dev: '../../../../dist'
};
exports.start = (port, isDev) => {
    if (isDev) {
        let nw;
        let nwInd = process.argv.indexOf('--nw');
        if (nwInd > -1) {
            nw = process.argv[nwInd + 1];
        }
        else {
            nw = 'nw';
        }
        const shouldInspect = process.argv.indexOf('--inspect') > -1;
        const subprocess = child_process.spawn(nw, ['.', '--cli', port.toString(), shouldInspect ? '--inspect' : ''], {
            // cwd: '/Users/daniel/Projects/wx/ide/main/dist',
            cwd: AppRelativePath.Dev,
            detached: true,
            stdio: [0, 1, 2],
        });
        subprocess.unref();
    }
    else {
        const subprocess = child_process.spawn(global.appPath, ['--cli', port.toString()], {
            detached: true,
            stdio: 'ignore',
        });
        subprocess.unref();
    }
};
exports.open = (projectpath) => new Promise(async (resolve, reject) => {
    try {
        const status = await network.checkIDEStatus();
        if (status === config_1.IDEStatus.Offline) {
            const port = network.cliPortManager.getPort();
            if (port) {
                exports.start(port, process.argv.indexOf('--idev') > -1);
                await network.getIDEPort();
                await network.openIDE(projectpath);
            }
            else {
                reject('CLI error');
            }
        }
        else {
            await network.openIDE(projectpath);
            resolve();
        }
    }
    catch (err) {
        reject(err ? err.toString() : '');
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vanMvdXRpbHMvaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsK0NBQThDO0FBQzlDLHFDQUFvQztBQUNwQyxzQ0FBcUM7QUFDckMsb0NBQW9DO0FBRXBDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFBO0FBRTNDLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLEdBQUcsRUFBRSxrQkFBa0I7Q0FDeEIsQ0FBQTtBQUVZLFFBQUEsS0FBSyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWMsRUFBRSxFQUFFO0lBRXBELElBQUksS0FBSyxFQUFFO1FBQ1QsSUFBSSxFQUFVLENBQUE7UUFFZCxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUN4QyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtZQUNkLEVBQUUsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQTtTQUM3QjthQUFNO1lBQ0wsRUFBRSxHQUFHLElBQUksQ0FBQTtTQUNWO1FBRUQsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDNUQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDNUcsa0RBQWtEO1lBQ2xELEdBQUcsRUFBRSxlQUFlLENBQUMsR0FBRztZQUN4QixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO1NBQ2YsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO0tBQ25CO1NBQU07UUFDTCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUU7WUFDakYsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsUUFBUTtTQUNoQixDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7S0FDbkI7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLFdBQW9CLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbEYsSUFBSTtRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0sT0FBTyxDQUFDLGNBQWMsRUFBRSxDQUFBO1FBQzdDLElBQUksTUFBTSxLQUFLLGtCQUFTLENBQUMsT0FBTyxFQUFFO1lBQ2hDLE1BQU0sSUFBSSxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsT0FBTyxFQUFFLENBQUE7WUFFN0MsSUFBSSxJQUFJLEVBQUU7Z0JBQ1IsYUFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoRCxNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtnQkFDMUIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO2FBQ25DO2lCQUFNO2dCQUNMLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQTthQUNwQjtTQUVGO2FBQU07WUFDTCxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDbEMsT0FBTyxFQUFFLENBQUE7U0FDVjtLQUNGO0lBQUMsT0FBTyxHQUFHLEVBQUU7UUFDWixNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQ2xDO0FBQ0gsQ0FBQyxDQUFDLENBQUEifQ==

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(4);
const path = __webpack_require__(5);
const program = __webpack_require__(3);
const ide = __webpack_require__(2);
const network = __webpack_require__(0);
const isMac = process.platform === 'darwin';
process.on('uncaughtException', err => {
    console.error(`Runtime error: ${err.name} \n ${err.toString()}`);
});
(async function () {
    // let spinner = ora('Initializing')
    /*
    var questions = [
      {
        type: 'input',
        name: 'first_name',
        message: 'What\'s your first name'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'What\'s your last name',
        default: function () {
          return 'Doe';
        }
      }
    ];
  
    inquirer.prompt(questions).then(function (answers) {
      console.log(JSON.stringify(answers, null, '  '));
    });
  
    await new Promise((resolve, reject) => setTimeout(resolve, 20000))
    */
    try {
        const isDev = process.argv.indexOf('--idev') > -1;
        global.isDev = isDev;
        // 0. pre-requisite
        try {
            if (!isDev) {
                if (isMac) {
                    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../package.json'), 'utf8'));
                    global.userDirName = packageJson.name;
                    global.appname = packageJson.appname;
                    global.userDirPath = path.join(process.env.HOME || '~', `Library/Application Support/${global.userDirName}/Default`);
                    global.appPath = path.join(__dirname, `../../../../../MacOS/${global.appname}`);
                }
                else {
                    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../package.json'), 'utf8'));
                    global.userDirName = packageJson.name;
                    global.appname = packageJson.name;
                    global.userDirPath = path.join(process.env.USERPROFILE || '~', `AppData/Local/${global.userDirName}/User Data/Default`);
                    global.appPath = `./${global.appname}.exe`;
                }
            }
            else {
                if (isMac) {
                    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../../dist/package.json'), 'utf8'));
                    global.userDirName = packageJson.name;
                    global.appname = packageJson.appname;
                    global.userDirPath = path.join(process.env.HOME || '~', `Library/Application Support/${global.userDirName}/Default`);
                    global.appPath = `../../../MacOS/${global.appname}`;
                }
                else {
                    const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '../../../../../dist/package.json'), 'utf8'));
                    global.userDirName = packageJson.name;
                    global.appname = packageJson.name;
                    global.userDirPath = path.join(process.env.USERPROFILE || '~', `AppData/Local/${global.userDirName}/User Data/Default`);
                    global.appPath = `./${global.appname}.exe`;
                }
            }
        }
        catch (err) {
            console.log('File corrupted, please re-install');
        }
        // 0. Pick out the hidden options, don't let them parsed by commander
        const alteredArgv = process.argv.slice();
        let from = '';
        let ind = alteredArgv.indexOf('--inspect');
        if (ind > -1)
            alteredArgv.splice(ind, 1);
        ind = alteredArgv.indexOf('--idev');
        if (ind > -1)
            alteredArgv.splice(ind, 1);
        ind = alteredArgv.indexOf('--nw');
        if (ind > -1)
            alteredArgv.splice(ind, 2);
        ind = alteredArgv.indexOf('-f');
        if (ind > -1) {
            from = alteredArgv[ind + 1];
            alteredArgv.splice(ind, 2);
        }
        else {
            ind = alteredArgv.indexOf('--from');
            if (ind > -1) {
                from = alteredArgv[ind + 1];
                alteredArgv.splice(ind, 2);
            }
        }
        if (from) {
            global.from = from;
        }
        program
            .version('1.0.0')
            .allowUnknownOption()
            // open
            .option('-o, --open [path]', 'Open IDE. If path is specified, IDE will try to open the project in the path.')
            // login
            .option('-l, --login', 'Login')
            .option('--login-qr-output [format@path]', 'Customize output of QR Code. format can be terminal or base64. If path is used, QR code will be written to the path')
            // preview
            .option('-p, --preview <project_root>', 'Preview mini program')
            .option('--preview-qr-output [format@path]', 'Customize output of QR Code. format can be terminal or base64. If path is used, QR code will be written to the path')
            .option('--preview-info-output [path]', 'Output path of extra information generated during preview, such as package size including subpackages. Output format is JSON')
            // upload
            .option('-u, --upload <version@project_root>', 'Upload mini program')
            .option('--upload-desc <desc>', 'Description of the uploaded version')
            .option('--upload-info-output [path]', 'Output path of extra information generated during upload, such as package size including subpackages. Output format is JSON')
            // test
            .option('-t, --test <project_root>', 'Request an auto mobile test')
            // interactive
            // .option('-i, --interactive', 'Enable interactive dialog')
            .parse(alteredArgv);
        // spinner.start()
        console.info('Initializing...');
        let port;
        try {
            // 1. get port
            port = await network.getAvailablePort();
            network.cliPortManager.update(port);
            // 2. start server
            await network.startServer(port);
            // console.log(`server started, listening on http://127.0.0.1:${port}`)
            // 3. write to user dir
            let appname = '微信web开发者工具';
            let appdataDir = global.userDirPath;
            let cliPortFile = path.join(appdataDir, '.cli');
            try {
                fs.writeFileSync(cliPortFile, port, 'utf8');
            }
            catch (err) {
                console.error('Please ensure that the IDE has been properly installed');
                throw err;
            }
            // 4. try to get IDE port
            let idePortFile = path.join(appdataDir, '.ide');
            let idePort;
            try {
                console.log(`idePortFile: ${idePortFile}`);
                idePort = parseInt(fs.readFileSync(idePortFile, 'utf8'));
                await network.notifyCLIPort(port, idePort);
                console.log(`IDE server has started, listening on http://127.0.0.1:${idePort}`);
            }
            catch (err) {
                // no ide port file or ide not started
                console.info('starting ide...');
                ide.start(port, isDev);
            }
            await network.getIDEPort();
            console.log('initialization finished');
        }
        catch (err) {
            console.error('init error: ', err);
            return;
        }
        // 1. Open IDE
        if (program.open) {
            if (typeof program.open === 'boolean') {
                await ide.open();
            }
            else {
                await ide.open(program.open);
            }
            console.log('open IDE success');
        }
        // 2. Login
        if (program.login) {
            // spinner.text = 'Initializing login'
            console.info('initializing login...');
            if (program.loginQrOutput) {
                const loginQrOutput = program.loginQrOutput;
                const fragments = (loginQrOutput.match && loginQrOutput.match(/^(.+?)(?:@(.*))?$/)) || [];
                await network.login(fragments[1], fragments[2]);
            }
            else {
                await network.login();
            }
            console.log('login success');
        }
        // 3. Preview
        if (program.preview) {
            // spinner.text = 'Initializing preview'
            console.info('preparing preview...');
            const previewOptions = {
                projectpath: program.preview
            };
            if (program.previewQrOutput) {
                const previewQrOutput = program.previewQrOutput;
                const qrFragments = (previewQrOutput.match && previewQrOutput.match(/^(.+?)(?:@(.*))?$/)) || [];
                previewOptions.format = qrFragments[1];
                previewOptions.qroutput = qrFragments[2];
            }
            if (program.previewInfoOutput) {
                previewOptions.infoOutput = program.previewInfoOutput;
            }
            await network.preview(previewOptions);
            console.log('preview success');
        }
        // 4. Upload
        if (program.upload) {
            // spinner.text = 'Initializing upload'
            console.info('uploading project...');
            const upload = program.upload;
            const mainFragments = (upload.match && upload.match(/^(.+?)(?:@(.*))?$/)) || [];
            const uploadOptions = {
                version: mainFragments[1],
                projectpath: mainFragments[2],
                desc: program.uploadDesc,
            };
            if (program.uploadQrOutput) {
                const uploadQrOutput = program.uploadQrOutput;
                const qrFragments = (uploadQrOutput.match && uploadQrOutput.match(/^(.+?)(?:@(.*))?$/)) || [];
                uploadOptions.format = qrFragments[1];
                uploadOptions.qroutput = qrFragments[2];
            }
            if (program.uploadInfoOutput) {
                uploadOptions.infoOutput = program.uploadInfoOutput;
            }
            await network.upload(uploadOptions);
            console.log('upload success');
        }
        // 5. Auto-test
        if (program.test) {
            console.info('test project...');
            const test = program.test;
            if (!test || (test === true)) {
                console.log('projectpath must be provided');
            }
            else {
                await network.autoTest({
                    projectpath: program.test,
                });
                console.log('submit test success');
            }
        }
        // 6. Interactive
        // 7. server
        // Exit
        if (!program.interactive && !program.server) {
            // spinner.stop()
            process.exit(0);
        }
    }
    catch (err) {
        // spinner.stop()
        console.error(err);
        process.exit(-1);
    }
}());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9qcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFHNUIscUNBQW9DO0FBQ3BDLG1DQUFrQztBQUNsQywyQ0FBMEM7QUFFMUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUE7QUFFM0MsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBRUQ7QUFBQyxDQUFDLEtBQUs7SUFFTixvQ0FBb0M7SUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzQkU7SUFFRixJQUFJO1FBR0YsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDakQsTUFBTSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7UUFFcEIsbUJBQW1CO1FBQ25CLElBQUk7WUFDRixJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLElBQUksS0FBSyxFQUFFO29CQUNULE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx1QkFBdUIsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBQ3RHLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFBO29CQUVwQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENB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

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })
/******/ ]);