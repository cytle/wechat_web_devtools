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
            const query = projectpath ? `?cli=1&projectpath=${encodeURIComponent(projectpath)}` : '?cli=1';
            const res = await request({
                url: `${HOST}:${port}/open${query}`,
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
        let query = `format=${format}`;
        if (QRCodeDest) {
            query += `&qroutput=${encodeURIComponent(QRCodeDest)}`;
        }
        const body = await request({
            url: `${HOST}:${port}/login?cli=1&${query}`
        });
        if (!QRCodeDest) {
            console.log(body);
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
        let query = `cli=1&projectpath=${encodeURIComponent(projectpath)}&format=${format}&qroutput=${encodeURIComponent(qroutput || '')}`;
        const body = await request({
            url: `${HOST}:${port}/preview?${query}`
        });
        if (!qroutput) {
            console.log(body);
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
        let query = `cli=1&projectpath=${encodeURIComponent(projectpath)}&version=${encodeURIComponent(version)}&format=${format}&qroutput=${encodeURIComponent(qroutput || '')}&desc=${encodeURIComponent(desc || '')}`;
        const response = await request({
            url: `${HOST}:${port}/upload?${query}`,
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
        let query = `cli=1&projectpath=${encodeURIComponent(projectpath)}`;
        const response = await request({
            url: `${HOST}:${port}/test?${query}`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmV0d29yay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL2pzL3V0aWxzL25ldHdvcmsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBNEI7QUFDNUIsdUNBQXNDO0FBQ3RDLGtEQUFpRDtBQUNqRCxzQ0FBcUM7QUFDckMscUNBQXFDO0FBQ3JDLE1BQU0sSUFBSSxHQUFHLGtCQUFrQixDQUFBO0FBRS9CLE1BQU0sWUFBWSxHQUFFO0lBQ2xCLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLElBQUksRUFBRSxNQUFNO0lBQ1osTUFBTSxFQUFFLFFBQVE7SUFDaEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7SUFDbEIsT0FBTyxFQUFFLFNBQVM7Q0FDbkIsQ0FBQTtBQUVELDRCQUE0QjtBQUM1QixJQUFJLFFBQTRCLENBQUE7QUFDaEMsSUFBSSxRQUE0QixDQUFBO0FBRWhDLGFBQWMsU0FBUSxZQUFZO0lBSWhDLFlBQW9CLFFBQTRDO1FBQzlELEtBQUssRUFBRSxDQUFBO1FBRFcsYUFBUSxHQUFSLFFBQVEsQ0FBb0M7SUFFaEUsQ0FBQztJQUVELE9BQU87UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQTtJQUNsQixDQUFDO0lBRUQsTUFBTSxDQUFDLElBQVk7UUFDakIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUE7UUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUMzQixDQUFDO0lBRUQsS0FBSztRQUNILElBQUksQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFBO0lBQ3ZCLENBQUM7Q0FDRjtBQUVZLFFBQUEsY0FBYyxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxDQUFBO0FBQ3JELFFBQUEsY0FBYyxHQUFHLElB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

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
        let ind = alteredArgv.indexOf('--inspect');
        if (ind > -1)
            alteredArgv.splice(ind, 1);
        ind = alteredArgv.indexOf('--idev');
        if (ind > -1)
            alteredArgv.splice(ind, 1);
        ind = alteredArgv.indexOf('--nw');
        if (ind > -1)
            alteredArgv.splice(ind, 2);
        program
            .version('1.0.0')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9qcy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFHNUIscUNBQW9DO0FBR3BDLG1DQUFrQztBQUNsQywyQ0FBMEM7QUFFMUMsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUE7QUFFM0MsT0FBTyxDQUFDLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRTtJQUNwQyxPQUFPLENBQUMsS0FBSyxDQUFDLGtCQUFrQixHQUFHLENBQUMsSUFBSSxPQUFPLEdBQUcsQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFDbEUsQ0FBQyxDQUFDLENBRUQ7QUFBQyxDQUFDLEtBQUs7SUFFTixvQ0FBb0M7SUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFzQkU7SUFFRixJQUFJLENBQUM7UUFHSCxNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxNQUFNLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtRQUVwQixtQkFBbUI7UUFDbkIsSUFBSSxDQUFDO1lBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNYLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQ1YsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLGlCQUFpQixFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUE7b0JBQzFFLE1BQU0sQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQTtvQkFDckMsTUFBTSxDQUFDLE9BQU8sR0FBRyxXQUFXLENBQUMsT0FBTyxDQUFBO29CQUVwQyxNQUFNLENBQUMsV0FBVyxHQUFHLElB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
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

module.exports = require("request-promise-native");

/***/ })
/******/ ]);