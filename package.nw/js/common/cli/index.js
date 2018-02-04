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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http = __webpack_require__(8);
const EventEmitter = __webpack_require__(9);
const url_1 = __webpack_require__(10);
const request = __webpack_require__(11);
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
    const { projectpath, format = 'terminal', qroutput, } = options;
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
    const { projectpath, version, desc, format = 'terminal', qroutput, } = options;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2pzL3V0aWxzL25ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFDQSw2QkFBNEI7QUFDNUIsdUNBQXNDO0FBQ3RDLDZCQUFxQztBQUNyQyxrREFBaUQ7QUFDakQsc0NBQXFDO0FBQ3JDLHFDQUFxQztBQUNyQyxNQUFNLElBQUksR0FBRyxrQkFBa0IsQ0FBQTtBQUUvQixNQUFNLFlBQVksR0FBRztJQUNuQixPQUFPLEVBQUUsU0FBUztJQUNsQixJQUFJLEVBQUUsTUFBTTtJQUNaLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE9BQU8sRUFBRSxTQUFTO0NBQ25CLENBQUE7QUFFRCw0QkFBNEI7QUFDNUIsSUFBSSxRQUE0QixDQUFBO0FBQ2hDLElBQUksUUFBNEIsQ0FBQTtBQUVoQyxhQUFjLFNBQVEsWUFBWTtJQUloQyxZQUFvQixRQUE0QztRQUM5RCxLQUFLLEVBQUUsQ0FBQTtRQURXLGFBQVEsR0FBUixRQUFRLENBQW9DO0lBRWhFLENBQUM7SUFFRCxPQUFPO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUE7SUFDbEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxJQUFZO1FBQ2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxHQUFHLFNBQVMsQ0FBQTtJQUN2QixDQUFDO0NBQ0Y7QUFFWSxRQUFBLGNBQWMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsQ0FBQTtBQUNyRCxRQUFB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

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
/* WEBPACK VAR INJECTION */(function(__dirname) {
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(3);
const path = __webpack_require__(4);
const program = __webpack_require__(5);
const ide = __webpack_require__(6);
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
                    const packageJson = JSON.parse(fs.readFileSync('../package.json', 'utf8'));
                    global.userDirName = packageJson.name;
                    global.appname = packageJson.appname;
                    global.userDirPath = path.join(process.env.HOME || '~', `Library/Application Support/${global.userDirName}/Default`);
                    global.appPath = `../../../MacOS/${global.appname}`;
                }
                else {
                    const packageJson = JSON.parse(fs.readFileSync('./package.nw/package.json', 'utf8'));
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
            .option('-o, --open [path]', 'Open IDE. If path is specified, IDE will try to open the project in the path.')
            .option('-l, --login', 'Login')
            .option('--login-qr-output [format@path]', 'Customize output of QR Code. format can be terminal or base64. If path is used, QR code will be written to the path')
            .option('-p, --preview <project_root>', 'Preview mini program')
            .option('--preview-qr-output [format@path]', 'Customize output of QR Code. format can be terminal or base64. If path is used, QR code will be written to the path')
            .option('-u, --upload <version@project_root>', 'Upload mini program')
            .option('--upload-desc <desc>', 'Description of the uploaded version')
            .option('-t, --test <project_root>', 'Request an auto mobile test')
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
            if (program.previewQrOutput) {
                const previewQrOutput = program.previewQrOutput;
                // const fragments = (program.previewQrOutput.split && program.previewQrOutput.split('@')) || []
                const fragments = (previewQrOutput.match && previewQrOutput.match(/^(.+?)(?:@(.*))?$/)) || [];
                await network.preview({
                    projectpath: program.preview,
                    format: fragments[1],
                    qroutput: fragments[2],
                });
            }
            else {
                await network.preview({
                    projectpath: program.preview
                });
            }
            console.log('preview success');
        }
        // 4. Upload
        if (program.upload) {
            // spinner.text = 'Initializing upload'
            console.info('uploading project...');
            const upload = program.upload;
            // const mainFragments = (program.upload.split && program.upload.split('@')) || []
            const mainFragments = (upload.match && upload.match(/^(.+?)(?:@(.*))?$/)) || [];
            if (program.uploadQrOutput) {
                const uploadQrOutput = program.uploadQrOutput;
                // const qrFragments = (program.uploadQrOutput.split && program.uploadQrOutput.split('@')) || []
                const qrFragments = (uploadQrOutput.match && uploadQrOutput.match(/^(.+?)(?:@(.*))?$/)) || [];
                await network.upload({
                    version: mainFragments[1],
                    projectpath: mainFragments[2],
                    format: qrFragments[1],
                    qroutput: qrFragments[2],
                    desc: program.uploadDesc,
                });
            }
            else {
                await network.upload({
                    version: mainFragments[1],
                    projectpath: mainFragments[2],
                    desc: program.uploadDesc,
                });
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9qcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFHNUIscUNBQW9DO0FBR3BDLG1DQUFrQztBQUNsQywyQ0FBMEM7QUFFMUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUE7QUFFM0MsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBRUQ7QUFBQyxDQUFDLEtBQUs7SUFFTixvQ0FBb0M7SUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzQkU7SUFFRixJQUFJLENBQUM7UUFHSCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVwQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBQzFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFBO29CQUVwQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLCtCQUErQixNQUFNLENBQUMsV0FBVyxVQUFVLENBQUMsQ0FBQTtvQkFDcEgsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNyRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQywyQkFBMkIsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFBO29CQUNwRixNQUFNLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUE7b0JBQ3JDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFFakMsTUFBTSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxJQUFJLEdBQUcsRUFBRSxpQkFBaUIsTUFBTSxDQUFDLFdBQVcsb0JBQW9CLENBQUMsQ0FBQTtvQkFDdkgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLE1BQU0sQ0FBQyxPQUFPLE1BQU0sQ0FBQTtnQkFDNUMsQ0FBQztZQUNILENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUNWLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2xILE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFBO29CQUVwQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLCtCQUErQixNQUFNLENBQUMsV0FBVyxVQUFVLENBQUMsQ0FBQTtvQkFDcEgsTUFBTSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUNyRCxDQUFDO2dCQUFDLElBQUksQ0FBQyxDQUFDO29CQUNOLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7b0JBQ2xILE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFBO29CQUVqQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLElBQUksR0FBRyxFQUFFLGlCQUFpQixNQUFNLENBQUMsV0FBVyxvQkFBb0IsQ0FBQyxDQUFBO29CQUN2SCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssTUFBTSxDQUFDLE9BQU8sTUFBTSxDQUFBO2dCQUM1QyxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFFRCxxRUFBcUU7UUFDckUsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUE7UUFDYixJQUFJLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQzFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2pDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ3hDLEdBQUcsR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLEdBQUcsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUMzQixXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM1QixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixHQUFHLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtZQUNuQyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksR0FBRyxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFBO2dCQUMzQixXQUFXLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUM1QixDQUFDO1FBQ0gsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDVCxNQUFNLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQTtRQUNwQixDQUFDO1FBRUQsT0FBTzthQUNKLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDaEIsa0JBQWtCLEVBQUU7YUFFcEIsTUFBTSxDQUFDLG1CQUFtQixFQUFFLCtFQUErRSxDQUFDO2FBRTVHLE1BQU0sQ0FBQyxhQUFhLEVBQUUsT0FBTyxDQUFDO2FBQzlCLE1BQU0sQ0FBQyxpQ0FBaUMsRUFBRSxxSEFBcUgsQ0FBQzthQUVoSyxNQUFNLENBQUMsOEJBQThCLEVBQUUsc0JBQXNCLENBQUM7YUFDOUQsTUFBTSxDQUFDLG1DQUFtQyxFQUFFLHFIQUFxSCxDQUFDO2FBRWxLLE1BQU0sQ0FBQyxxQ0FBcUMsRUFBRSxxQkFBcUIsQ0FBQzthQUNwRSxNQUFNLENBQUMsc0JBQXNCLEVBQUUscUNBQXFDLENBQUM7YUFFckUsTUFBTSxDQUFDLDJCQUEyQixFQUFFLDZCQUE2QixDQUFDO2FBR2xFLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQTtRQUVyQixrQkFBa0I7UUFDbEIsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBRS9CLElBQUksSUFBWSxDQUFBO1FBRWhCLElBQUksQ0FBQztZQUNILGNBQWM7WUFDZCxJQUFJLEdBQUcsTUFBTSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQTtZQUN2QyxPQUFPLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNuQyxrQkFBa0I7WUFDbEIsTUFBTSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQy9CLHVFQUF1RTtZQUN2RSx1QkFBdUI7WUFDdkIsSUFBSSxPQUFPLEdBQUcsWUFBWSxDQUFBO1lBQzFCLElBQUksVUFBVSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7WUFDbkMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUE7WUFDL0MsSUFBSSxDQUFDO2dCQUNILEVBQUUsQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFDYixPQUFPLENBQUMsS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUE7Z0JBQ3ZFLE1BQU0sR0FBRyxDQUFBO1lBQ1gsQ0FBQztZQUNELHlCQUF5QjtZQUN6QixJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQTtZQUMvQyxJQUFJLE9BQU8sQ0FBQTtZQUNYLElBQUksQ0FBQztnQkFDSCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixXQUFXLEVBQUUsQ0FBQyxDQUFBO2dCQUMxQyxPQUFPLEdBQUcsUUFBUSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7Z0JBQ3hELE1BQU0sT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUE7Z0JBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseURBQXlELE9BQU8sRUFBRSxDQUFDLENBQUE7WUFDakYsQ0FBQztZQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2Isc0NBQXNDO2dCQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUE7Z0JBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO1lBQ3hCLENBQUM7WUFFRCxNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUNsQyxNQUFNLENBQUE7UUFDUixDQUFDO1FBRUQsY0FBYztRQUNkLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sT0FBTyxDQUFDLElBQUksS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN0QyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNsQixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM5QixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQ2pDLENBQUM7UUFFRCxXQUFXO1FBQ1gsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDbEIsc0NBQXNDO1lBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQTtZQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDMUIsTUFBTSxhQUFhLEdBQVcsT0FBTyxDQUFDLGFBQWEsQ0FBQTtnQkFDbkQsTUFBTSxTQUFTLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxJQUFJLGFBQWEsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtnQkFDekYsTUFBTSxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUNqRCxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxPQUFPLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDdkIsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7UUFDOUIsQ0FBQztRQUVELGFBQWE7UUFDYixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQix3Q0FBd0M7WUFDeEMsT0FBTyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1lBQ3BDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDO2dCQUM1QixNQUFNLGVBQWUsR0FBVyxPQUFPLENBQUMsZUFBZSxDQUFBO2dCQUN2RCxnR0FBZ0c7Z0JBQ2hHLE1BQU0sU0FBUyxHQUFHLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxlQUFlLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzdGLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQztvQkFDcEIsV0FBVyxFQUFFLE9BQU8sQ0FBQyxPQUFpQjtvQkFDdEMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUN2QixDQUFDLENBQUE7WUFDSixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDO29CQUNwQixXQUFXLEVBQUUsT0FBTyxDQUFDLE9BQWlCO2lCQUN2QyxDQUFDLENBQUE7WUFDSixDQUFDO1lBQ0QsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFFRCxZQUFZO1FBQ1osRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbkIsdUNBQXVDO1lBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQTtZQUNwQyxNQUFNLE1BQU0sR0FBVyxPQUFPLENBQUMsTUFBTSxDQUFBO1lBQ3JDLGtGQUFrRjtZQUNsRixNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFBO1lBQy9FLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixNQUFNLGNBQWMsR0FBVyxPQUFPLENBQUMsY0FBYyxDQUFBO2dCQUNyRCxnR0FBZ0c7Z0JBQ2hHLE1BQU0sV0FBVyxHQUFHLENBQUMsY0FBYyxDQUFDLEtBQUssSUFBSSxjQUFjLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUMsSUFBSSxFQUFFLENBQUE7Z0JBQzdGLE1BQU0sT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDbkIsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7b0JBQ3pCLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUM3QixNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDdEIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3hCLElBQUksRUFBRSxPQUFPLENBQUMsVUFBb0I7aUJBQ25DLENBQUMsQ0FBQTtZQUNKLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLE9BQU8sQ0FBQyxNQUFNLENBQUM7b0JBQ25CLE9BQU8sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO29CQUN6QixXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQztvQkFDN0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFvQjtpQkFDbkMsQ0FBQyxDQUFBO1lBQ0osQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUMvQixDQUFDO1FBRUQsZUFBZTtRQUNmLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUMvQixNQUFNLElBQUksR0FBaUMsT0FBTyxDQUFDLElBQUksQ0FBQTtZQUN2RCxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQTtZQUM3QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxPQUFPLENBQUMsUUFBUSxDQUFDO29CQUNyQixXQUFXLEVBQUUsT0FBTyxDQUFDLElBQUk7aUJBQzFCLENBQUMsQ0FBQTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixDQUFDLENBQUE7WUFDcEMsQ0FBQztRQUNILENBQUM7UUFFRCxpQkFBaUI7UUFFakIsWUFBWTtRQUVaLE9BQU87UUFDUCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM1QyxpQkFBaUI7WUFDakIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqQixDQUFDO0lBRUgsQ0FBQztJQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDYixpQkFBaUI7UUFDakIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNsQixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7SUFDbEIsQ0FBQztBQUNILENBQUMsRUFBRSxDQUFDLENBQUEifQ==
/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("commander");

/***/ }),
/* 6 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vanMvdXRpbHMvaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsK0NBQThDO0FBQzlDLHFDQUFvQztBQUNwQyxzQ0FBcUM7QUFDckMsb0NBQW9DO0FBRXBDLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxDQUFBO0FBRTNDLE1BQU0sZUFBZSxHQUFHO0lBQ3RCLEdBQUcsRUFBRSxrQkFBa0I7Q0FDeEIsQ0FBQTtBQUVZLFFBQUEsS0FBSyxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWMsRUFBRSxFQUFFO0lBRXBELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDVixJQUFJLEVBQVUsQ0FBQTtRQUVkLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3hDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDZixFQUFFLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFDOUIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxHQUFHLElBQUksQ0FBQTtRQUNYLENBQUM7UUFFRCxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUM1RCxNQUFNLFVBQVUsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUM1RyxrREFBa0Q7WUFDbEQsR0FBRyxFQUFFLGVBQWUsQ0FBQyxHQUFHO1lBQ3hCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDZixDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDcEIsQ0FBQztJQUFDLElBQUksQ0FBQyxDQUFDO1FBQ04sTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFO1lBQ2pGLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQyxDQUFBO1FBQ0YsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFBO0lBQ3BCLENBQUM7QUFDSCxDQUFDLENBQUE7QUFFWSxRQUFBLElBQUksR0FBRyxDQUFDLFdBQW9CLEVBQUUsRUFBRSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7SUFDbEYsSUFBSSxDQUFDO1FBQ0gsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUE7UUFDN0MsRUFBRSxDQUFDLENBQUMsTUFBTSxLQUFLLGtCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNqQyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFBO1lBRTdDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ1QsYUFBSyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2dCQUNoRCxNQUFNLE9BQU8sQ0FBQyxVQUFVLEVBQUUsQ0FBQTtnQkFDMUIsTUFBTSxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ3BDLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDckIsQ0FBQztRQUVILENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNsQyxPQUFPLEVBQUUsQ0FBQTtRQUNYLENBQUM7SUFDSCxDQUFDO0lBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNiLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDbkMsQ0FBQztBQUNILENBQUMsQ0FBQyxDQUFBIn0=

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("request-promise-native");

/***/ })
/******/ ]);