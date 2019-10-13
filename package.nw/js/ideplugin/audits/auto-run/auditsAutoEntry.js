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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log4js = __webpack_require__(18);
// @todo 运营规范日志格式为 /home/qspace/log/应用名/error/yyyyMMddhh.log
// log4js不支持只有pattern的文件名，这里投机取巧一把，文件名为20, 后加年份后两位，在2100前没有问题。@qybdshen
const isProd = "production" == 'production';
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : ( false ? undefined : 'info');
class LoggerClass {
    constructor() {
        this.logPath = process.cwd() + '/logs/';
        if (isProd) {
            this.logger = log4js.getLogger('production');
        }
        else {
            this.logger = log4js.getLogger('debug');
        }
    }
    initLogger(logPath, appid) {
        this.logPath = logPath;
        log4js.configure({
            appenders: {
                console: {
                    type: 'console',
                    layout: {
                        type: 'pattern',
                        pattern: `[%d{yyyy-MM-dd hh:mm:ss}] %[[%c] [%p] %m%]`,
                    }
                },
                file: {
                    type: 'file',
                    filename: `${this.logPath}/${appid}.log`,
                    maxLogSize: 524288000,
                    alwaysIncludePattern: true,
                    backups: 20,
                    layout: {
                        type: 'pattern',
                        pattern: `[%d{yyyy-MM-dd hh:mm:ss}] [%c] [%p] %m%`,
                    }
                },
            },
            categories: {
                production: { appenders: ['console', 'file'], level: logLevel },
                debug: { appenders: ['console', 'file'], level: logLevel },
                default: { appenders: ['console'], level: logLevel },
            }
        });
        if (isProd) {
            this.logger = log4js.getLogger('production');
        }
        else {
            this.logger = log4js.getLogger('debug');
        }
    }
    trace(firstArg, ...args) {
        this.logger.trace(firstArg, ...args);
    }
    debug(firstArg, ...args) {
        this.logger.debug(firstArg, ...args);
    }
    info(firstArg, ...args) {
        this.logger.info(firstArg, ...args);
    }
    warn(firstArg, ...args) {
        this.logger.warn(firstArg, ...args);
    }
    error(firstArg, ...args) {
        this.logger.error(firstArg, ...args);
    }
    fatal(firstArg, ...args) {
        this.logger.fatal(firstArg, ...args);
    }
    log(firstArg, ...args) {
        this.logger.log(firstArg, ...args);
    }
}
const Logger = new LoggerClass();
exports.default = Logger;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(10);
const log_1 = __webpack_require__(0);
const requireFunc =  true ? require : undefined;
const isProd = "production" === 'production';
let lib;
if (isProd) {
    const ffi = requireFunc('ffi');
    lib = ffi.Library(config_1.IDK_LIB, {
        'OssAttrInc': ['int', ['int', 'int', 'int']],
    });
}
function report(id, key, val) {
    if (isProd) {
        try {
            lib.OssAttrInc(id, key, val);
        }
        catch (err) {
            log_1.default.error('reportIdKey fail', err);
        }
    }
    else {
        log_1.default.debug('reportIdKey report', id, key, val);
    }
}
/**
 * 上报监控数据
 * @param key
 * @param {number} val
 */
function reportIdKey(key, val = 1) {
    const temp = (key + '').split('_');
    if (temp.length === 2) {
        report(parseInt(temp[0], 10), parseInt(temp[1], 10), val);
    }
    else if (config_1.MainIdKey && temp.length === 1) {
        report(config_1.MainIdKey, key, val);
    }
}
exports.reportIdKey = reportIdKey;
var config_2 = __webpack_require__(10);
exports.IdKey = config_2.IdKey;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Jimp = __webpack_require__(17);
// import {ElementHandle} from "puppeteer";
const qs = __webpack_require__(8);
const urlUtil = __webpack_require__(7);
// import {IdKey} from "../config";
const log_1 = __webpack_require__(0);
// import {reportIdKey} from "../reportIdKey";
const devices = __webpack_require__(9);
function sleep(time) {
    return new Promise((resolve) => {
        setTimeout(resolve, time);
    });
}
exports.sleep = sleep;
function frameEvaluate(frame, func, ...args) {
    if (!frame.isDetached()) {
        return frame.evaluate(func, ...args);
    }
    else {
        // reportIdKey(IdKey.FRAME_DETACHED);
        log_1.default.error(`frameEvaluate failed frame[${frame.name()}] detached!`);
        throw new Error(`frame detached! name:${frame.name()}`);
    }
}
exports.frameEvaluate = frameEvaluate;
function frame$$(frame, selector) {
    if (!frame.isDetached()) {
        return frame.$$(selector);
    }
    else {
        // reportIdKey(IdKey.FRAME_DETACHED);
        log_1.default.error(`frame.$$ failed frame detached!`);
        throw new Error(`frame detached! name: ${frame.name()}`);
    }
}
exports.frame$$ = frame$$;
function frame$$eval(frame, selector, func, ...args) {
    if (!frame.isDetached()) {
        return frame.$$eval(selector, func, ...args);
    }
    else {
        // reportIdKey(IdKey.FRAME_DETACHED);
        log_1.default.error(`frame.$$ failed frame detached!`);
        throw new Error(`frame detached! name: ${frame.name()}`);
    }
}
exports.frame$$eval = frame$$eval;
function frame$(frame, selector) {
    if (!frame.isDetached()) {
        return frame.$(selector);
    }
    else {
        // reportIdKey(IdKey.FRAME_DETACHED);
        log_1.default.error(`frame.$ failed frame detached!`);
        throw new Error(`frame detached! name: ${frame.name()}`);
    }
}
exports.frame$ = frame$;
function getDataReportDefault(params) {
    const { TaskUrl, ResultStatus, IsWebView = 0, ParentUrl = '', PkgUnexisted = 0 } = params;
    return {
        TaskPage: TaskUrl.split('?')[0],
        TaskUrl: TaskUrl.substr(0, 1000),
        ResultPage: '',
        ResultUrl: '',
        HasAutoClick: 0,
        IsNetworkIdleTimeOut: 0,
        IsWebviewWaitTimeOut: 0,
        TimeCost: 0,
        IsWebView,
        WaitForWebviewError: 0,
        ResultStatus: ResultStatus || 0,
        UrlCrawlBeginTime: Date.now(),
        PkgUnexisted,
        ParentUrl: ParentUrl.substr(0, 1000)
    };
}
exports.getDataReportDefault = getDataReportDefault;
function getDeviceInfo() {
    const iPhone = devices['iPhone 6'];
    iPhone.viewport.deviceScaleFactor = 1;
    return iPhone;
}
exports.getDeviceInfo = getDeviceInfo;
function getCookieInfo(appuin, url) {
    const domain = url.match(/^https?:\/\/([^:\/]+)[:\/]/i);
    const wxuin = appuin ? appuin : Date.now() * 1000 + parseInt(Math.random() * 1000 + '', 10);
    return {
        name: 'wxuin',
        value: wxuin + '',
        expires: new Date('2038-01-19T03:14:07.00').getTime(),
        domain: domain ? domain[1] : 'wxacrawler.com',
        path: '/',
        httpOnly: false,
    };
}
exports.getCookieInfo = getCookieInfo;
function getFileNameByUrl(url) {
    let name = url.replace(/\.|\/|\\|\*|\?|=|&|%/g, '_');
    if (name.length > 168) {
        name = name.substr(0, 168) + '_' + Math.round(Date.now() / 1000);
    }
    else {
        name += '_' + Math.round(Date.now() / 1000);
    }
    return name;
}
exports.getFileNameByUrl = getFileNameByUrl;
function checkImageValid(imageUrl) {
    return Promise.resolve(0);
    /*
    const rand = Math.floor(Math.random()*(100));
    if (rand > 0) {
        return Promise.resolve(0);
    }
    return new Promise((resolve) => {
        try {
            request({
                url: imageUrl,
                method: "GET",
                timeout: 3000,
            }, (error, response) => {
                if (!error && /2\d\d|304/.test(response.statusCode.toString())) {
                    const contentType: string = response.headers['content-type'] || '';
                    Logger.info(`${contentType}`);
                    if (/image/i.test(contentType)) {
                        return resolve(0);
                    }
                    else {
                        reportIdKey(IdKey.INVALID_SHARE_IMAGE);
                        return resolve(-1);
                    }
                } else {
                    reportIdKey(IdKey.CHECK_SHARE_IMAGE_ERR);
                    Logger.error(`checkShareDataImageUrl ${imageUrl} failed! ${error}`);
                    return resolve(-1);
                }
            });
        } catch (e) {
            reportIdKey(IdKey.CHECK_SHARE_IMAGE_CATCH_ERR);
            Logger.error(`checkShareDataImageUrl request error ${imageUrl}! ${e.message}`);
            return resolve(-1);
        }
    });
    */
}
exports.checkImageValid = checkImageValid;
const prefix = String(Date.now()).substr(0, 5);
const timeReg = new RegExp(`=${prefix}\\d{8,}($|&)`);
function replaceTimeStamp(url) {
    if (!url)
        return url;
    if (!timeReg.test(url))
        return url;
    // 需要替换
    const [path, params] = url.split('?');
    if (params) {
        const query = qs.parse(params);
        const newQuery = Object.keys(query).reduce((obj, key) => {
            if (/^\d{13,}$/.test(query[key])) {
                return obj;
            }
            obj[key] = query[key];
            return obj;
        }, {});
        const newUrl = `${path}?${qs.stringify(newQuery)}`;
        log_1.default.info(`replace timestamp: ${url} => ${newUrl}`);
        return newUrl;
    }
    return url;
}
exports.replaceTimeStamp = replaceTimeStamp;
function removeUselessParam(url) {
    if (!url)
        return url;
    const urlObj = new urlUtil.URL(url, 'http://mpcrawler');
    urlObj.searchParams.delete('ptp');
    urlObj.searchParams.delete('ref_page_name');
    urlObj.searchParams.delete('ref_page_id');
    urlObj.searchParams.delete('acm');
    urlObj.searchParams.delete('openid');
    urlObj.searchParams.delete('comefrom');
    const newUrl = urlObj.href.replace('http://mpcrawler/', '');
    log_1.default.info(`newUrl is ${newUrl}`);
    return newUrl;
}
exports.removeUselessParam = removeUselessParam;
function isBlackRequest(url, blackUrlList) {
    if (!url)
        return false;
    const urlObj = new urlUtil.URL(url, 'http://mpcrawler');
    const requestUrl = urlObj.searchParams.get('url');
    if (requestUrl) {
        const reMatch = requestUrl.split('?')[0].match(/https:\/\/(.+?)\//i);
        const host = reMatch ? reMatch[1].replace(/^\s+|\s+$/g, "") : "";
        // Logger.info(`black host is ${host}`)
        if (blackUrlList.indexOf(host) !== -1) {
            log_1.default.info(`black url is ${host}`);
            return true;
        }
    }
    // const host = requestUrl ? requestUrl.split('?')[0].replace(/^\s+|\s+$/g,"") : "";
    // Logger.info(`urlhost is ${host} black url is ${JSON.stringify(blackUrlList)}`);
    // if (requestUrl && requestUrl.split('?')[0] in blackUrlList) {
    return false;
}
exports.isBlackRequest = isBlackRequest;
function isBlankPicture(pic) {
    const result = Jimp.read(pic).then(image => {
        image = image.greyscale(); // .write('lajigou.jpg');
        // const threshold = 80; // 阈值
        const pixelColorInfo = {}; // : Map<number, number> = new Map();
        // 像素检测
        log_1.default.info(`width=${image.bitmap.width} height=${image.bitmap.height}`);
        image.scan(0, 67, image.bitmap.width - 1, image.bitmap.height - 67, function (x, y, idx) {
            if (x !== image.bitmap.width - 1 && y !== image.bitmap.height - 1) {
                const bit = this.bitmap.data[idx + 0];
                if (!pixelColorInfo[bit]) {
                    pixelColorInfo[bit] = 0;
                }
                pixelColorInfo[bit] += 1;
                if (bit === undefined) {
                    log_1.default.info(`undefine bit x=${x} y=${y} idx=${idx} bit=${bit}`);
                }
            }
        });
        // 降序
        const pixelColorList = Object.keys(pixelColorInfo).sort((a, b) => {
            return pixelColorInfo[a] < pixelColorInfo[b] ? 1 : -1;
        });
        let maxPixelPercent = pixelColorInfo[pixelColorList[0]] / (image.bitmap.width * image.bitmap.height);
        const secondPixelPercent = pixelColorInfo[pixelColorList[1]] / (image.bitmap.width * image.bitmap.height);
        log_1.default.info(`maxPixelPercent = ${maxPixelPercent} secondPixelPercent = ${secondPixelPercent}`);
        if (maxPixelPercent > 0.5 && secondPixelPercent > 0.2) {
            maxPixelPercent += 0.1;
        }
        return maxPixelPercent * 100;
        // for (const key of pixelColorList) {
        //     Logger.info(`${key} count is ${pixelColorInfo[key]}`);
        // }
        // if (maxPixelPercent*100 > threshold) {
        //     return true;
        // } else {
        //     return false;
        // }
    })
        .catch((err) => {
        log_1.default.error(`isBlankPicture failed! ${err}`);
        return 0;
    });
    return result;
}
exports.isBlankPicture = isBlankPicture;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("await-to-js");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("puppeteer/DeviceDescriptors");

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.IDK_LIB = '/home/qspace/mmbizwxacrawlerworker/lib64/libossattrapi';
exports.MainIdKey = 118722;
var IdKey;
(function (IdKey) {
    IdKey[IdKey["TASK_START"] = 1] = "TASK_START";
    IdKey[IdKey["PROCESS_CRASH"] = 2] = "PROCESS_CRASH";
    IdKey[IdKey["PAGE_CRASH"] = 3] = "PAGE_CRASH";
    IdKey[IdKey["TASK_SUCC"] = 4] = "TASK_SUCC";
    IdKey[IdKey["CRAWLER_ERROR"] = 5] = "CRAWLER_ERROR";
    IdKey[IdKey["FIRST_PAGE_REDIRECT"] = 6] = "FIRST_PAGE_REDIRECT";
    IdKey[IdKey["FIRST_PAGE_WEBVIEW"] = 7] = "FIRST_PAGE_WEBVIEW";
    IdKey[IdKey["AUDITS_FRAME_DETACHED"] = 8] = "AUDITS_FRAME_DETACHED";
    IdKey[IdKey["GEN_RESULT_ERROR"] = 9] = "GEN_RESULT_ERROR";
    IdKey[IdKey["GEN_RESULT_OUT_OF_TIME"] = 10] = "GEN_RESULT_OUT_OF_TIME";
    IdKey[IdKey["PAGE_IS_WEBVIEW"] = 11] = "PAGE_IS_WEBVIEW";
    IdKey[IdKey["PAGE_NO_FRAME"] = 12] = "PAGE_NO_FRAME";
    IdKey[IdKey["GET_CLICKABLE_ELEMENT_ERROR"] = 13] = "GET_CLICKABLE_ELEMENT_ERROR";
    IdKey[IdKey["FOUND_NO_CLICKABLE_ELEMENTS"] = 14] = "FOUND_NO_CLICKABLE_ELEMENTS";
    IdKey[IdKey["CLICK_ELEMENT_ERROR"] = 15] = "CLICK_ELEMENT_ERROR";
    IdKey[IdKey["PAGE_EXCEPTION"] = 16] = "PAGE_EXCEPTION";
    IdKey[IdKey["CODESVR_REQUEST_FAILED"] = 17] = "CODESVR_REQUEST_FAILED";
    IdKey[IdKey["CODESVR_REQUEST_SUCC"] = 18] = "CODESVR_REQUEST_SUCC";
    IdKey[IdKey["REQUEST_SW_FAILED"] = 19] = "REQUEST_SW_FAILED";
    IdKey[IdKey["REQUEST_SW_SUCC"] = 20] = "REQUEST_SW_SUCC";
    IdKey[IdKey["REQUEST_FAILED"] = 21] = "REQUEST_FAILED";
    IdKey[IdKey["REQUEST_SUCC"] = 22] = "REQUEST_SUCC";
    IdKey[IdKey["SQUID_REQUEST_FAILED"] = 23] = "SQUID_REQUEST_FAILED";
    IdKey[IdKey["SQUID_REQUEST_SUCC"] = 24] = "SQUID_REQUEST_SUCC";
    IdKey[IdKey["NETWORK_IDLE_TIMEOUT"] = 25] = "NETWORK_IDLE_TIMEOUT";
    IdKey[IdKey["TASK_NO_RESULT"] = 26] = "TASK_NO_RESULT";
})(IdKey = exports.IdKey || (exports.IdKey = {}));


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(4);
const fs = __webpack_require__(5);
const puppeteer = __webpack_require__(12);
const AuditsAuto_1 = __webpack_require__(13);
const log_1 = __webpack_require__(0);
const reportIdKey_1 = __webpack_require__(2);
const isProd = "production" === 'production';
const getTaskEnv = function () {
    const appid = process.env.appid;
    const taskid = process.env.taskid;
    const appuin = parseInt(process.env.appuin, 10) || 0;
    const indexPageUrl = process.env.indexPageUrl;
    const testTicket = process.env.ticket;
    let RESULT_PATH = path.resolve(process.cwd(), `./task/${appid}_${taskid}/result`);
    if (process.env.taskPath) {
        RESULT_PATH = path.resolve(process.env.taskPath, `./${appid}_${taskid}/result`);
    }
    const auditBusiness = [2, 4, 7, 10, 13, 14, 15];
    const reMatch = indexPageUrl.match(/wxacrawler\/\d{1,2}_(\d{1,2})\//i);
    const businessId = reMatch ? parseInt(reMatch[1], 10) : 0;
    let isMpcrawler = false;
    if (auditBusiness.indexOf(businessId) === -1) {
        isMpcrawler = true;
    }
    let paramList = [];
    try {
        const paramJson = JSON.parse(process.env.taskParam);
        if (paramJson.hasOwnProperty('param_list')) {
            paramList = paramJson.param_list;
        }
    }
    catch (e) {
        log_1.default.error(`json parse error! ${process.env.taskParam}`);
    }
    return {
        appid,
        taskid,
        appuin,
        indexPageUrl,
        testTicket,
        RESULT_PATH,
        isMpcrawler,
        businessId,
        paramList
    };
};
(async () => {
    reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.TASK_START);
    const taskStartTime = Date.now();
    const taskEnv = getTaskEnv();
    const { paramList } = taskEnv;
    if (paramList.length === 0) {
        log_1.default.error(`paramList error! ${process.env.taskParam}`);
        return -4000;
    }
    const config = {
        url: taskEnv.indexPageUrl,
        appid: taskEnv.appid,
        taskid: taskEnv.taskid,
        appuin: taskEnv.appuin,
        businessId: taskEnv.businessId,
        resultPath: taskEnv.RESULT_PATH,
        taskStartTime,
        crawl_type: paramList[0].crawl_type,
        longitude: paramList[0].longitude,
        latitude: paramList[0].latitude,
    };
    const logPath = `${taskEnv.RESULT_PATH}`;
    fs.ensureDirSync(logPath);
    fs.ensureDirSync(`${taskEnv.RESULT_PATH}/screenshot`);
    fs.ensureDirSync(`${taskEnv.RESULT_PATH}/html`);
    log_1.default.initLogger(logPath, config.appid);
    let browserArgs = [];
    if (isProd) {
        browserArgs = [
            '--proxy-server=http://mmbizwxaauditnatproxy.wx.com:11177',
            '--proxy-bypass-list=10.206.30.80:12361;9.2.87.222:12361;*:18569'
        ];
        // '--proxy-bypass-list=10.206.30.80:12361;9.2.87.222:12361'];
    }
    else {
        browserArgs = [
        // '--proxy-server=http://127.0.0.1:12639'
        ];
    }
    const isHeadless = process.env.chromeMode === 'headless';
    const puppeteerConfig = {
        headless: isHeadless,
        devtools: !isProd,
        ignoreHTTPSErrors: true,
        args: ['--no-sandbox', '--disable-web-security', ...browserArgs],
    };
    log_1.default.info('puppeteerConfig', puppeteerConfig);
    const browser = await puppeteer.launch(puppeteerConfig);
    process.on('uncaughtException', async (error) => {
        log_1.default.error(`catch process error ${error.message}\n ${error.stack}`);
        reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.PROCESS_CRASH);
        await browser.close();
        process.exit();
    });
    process.on('warning', (error) => {
        log_1.default.warn('process on warning');
        log_1.default.warn(error.message);
        log_1.default.warn(error.stack);
    });
    const page = await browser.newPage();
    const auditsAuto = new AuditsAuto_1.default(page, config);
    log_1.default.info('new AuditsAuto Crawler succ');
    auditsAuto.on('pageError', async (error) => {
        log_1.default.error(`catch page crash ${error.message}\n ${error.stack}`);
        await browser.close();
        process.exit();
    });
    try {
        const taskResult = await auditsAuto.start();
        log_1.default.info(`Time cost ${Math.round((Date.now() - taskStartTime) / 1000)} s`);
        log_1.default.info('Audits result: ', JSON.stringify(taskResult));
        if (taskResult) {
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.TASK_SUCC);
        }
        else {
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.TASK_NO_RESULT);
        }
        await browser.close();
        process.exit();
    }
    catch (e) {
        log_1.default.error(`catch main error ${e.message}\n ${e.stack}`);
        reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.CRAWLER_ERROR);
        await browser.close();
        process.exit();
    }
})();


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(5);
const path = __webpack_require__(4);
const await_to_js_1 = __webpack_require__(6);
const NetworkListener_1 = __webpack_require__(14);
const Hijack_1 = __webpack_require__(16);
const PageBase_1 = __webpack_require__(19);
const utils = __webpack_require__(3);
const devices = __webpack_require__(9);
const reportIdKey_1 = __webpack_require__(2);
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const TIME_LIMIT = 18 * 60 * 1000;
const iPhoneX = devices['iPhone X'];
iPhoneX.viewport.deviceScaleFactor = 1;
class AuditsAuto extends PageBase_1.default {
    constructor(page, options) {
        super(page);
        this.clickCnt = 0;
        this.wxConfig = {};
        this.urlPathMap = {};
        this.elementClickCountMap = new Map();
        this.elementTextMap = new Map();
        this.driverStartTime = 0;
        this.taskFinishedTime = 0;
        this.jsCoverage = '';
        this.isTimeout = false;
        this.appid = options.appid || '';
        this.appuin = options.appuin;
        this.taskid = options.taskid;
        this.page = page;
        this.indexPageUrl = options.url || '';
        this.resultPath = options.resultPath;
        this.taskStartTime = options.taskStartTime;
        this.longitude = options.longitude || 113.2645;
        this.latitude = options.latitude || 23.1288;
        this.hijack = new Hijack_1.default(page);
        this.networkListener = new NetworkListener_1.default(this.page);
        this.taskResult = { pages: [], mmdata: [] };
        this.init();
    }
    init() {
        this.initPageEvent();
        this.initNetworkEvent();
        this.timeoutPromise = new Promise((resolve, reject) => {
            this.log.info('start count down');
            setTimeout(() => {
                reject(new Error('timeout'));
            }, TIME_LIMIT);
        });
    }
    initNetworkEvent() {
        this.networkListener.on('ON_REQUEST_EVENT', (message) => {
            this.sendNetworkEvent2Frame({
                command: 'ON_REQUEST_EVENT',
                data: message
            });
        });
    }
    async sendNetworkEvent2Frame(message) {
        const [sendMessageError] = await await_to_js_1.default(this.page.evaluate((auditsFrame, message) => {
            if (auditsFrame) {
                const msg = JSON.parse(message);
                msg.protocol = 'AUDITS_FRAME';
                auditsFrame.contentWindow.postMessage(msg);
            }
        }, await this.page.$('#auditsFrame'), JSON.stringify(message)));
        if (sendMessageError) {
            this.log.error('send network event error', sendMessageError);
        }
    }
    async start(retryCnt = 0) {
        if (retryCnt > 2) {
            this.log.error('start crawl failed, retry 3 times');
            return;
        }
        if (!retryCnt) {
            await this.initPage();
        }
        this.log.info(`indexPageUrl: ${this.indexPageUrl}`);
        const [gotoError, pageResponse] = await await_to_js_1.default(this.page.goto(this.indexPageUrl));
        if (gotoError) {
            this.log.error(`gotoError ${gotoError.message}\n${gotoError.stack}, retry`);
            return this.start(retryCnt + 1);
        }
        if (pageResponse) {
            const chain = pageResponse.request().redirectChain();
            this.log.info(`pageResponse is ok[${pageResponse.ok()}] chain length [${chain.length}] ${chain.map((req) => req.url())}`);
            if (!pageResponse.ok()) {
                this.log.error(`page response error, statusCode[${pageResponse.status()}], failure[${pageResponse.request().failure()}]`);
                return this.start(retryCnt + 1);
            }
        }
        const [waitForAppserviceError] = await await_to_js_1.default(this.page.waitFor(() => !!document.getElementById('appservice')));
        if (waitForAppserviceError) {
            this.log.error(`waitFor appservice error ${waitForAppserviceError.message}\n${waitForAppserviceError.stack}, retry`);
            return this.start(retryCnt + 1);
        }
        this.log.debug('appservice ready');
        await this.hijack.hijackDefault({
            longitude: this.longitude,
            latitude: this.latitude
        });
        await this.hijack.hijackPageEvent();
        // 貌似不一定监听得到，超时也允许继续跑
        const [domReadyTimeout] = await await_to_js_1.default(this.hijack.waitForPageEvent("__DOMReady", { timeout: 12000 }));
        if (domReadyTimeout) {
            this.log.error(`page event [__DOMReady] timeout. Try to ontinue.`);
        }
        const [webviewManagerTimeout] = await await_to_js_1.default(this.page.waitFor(() => window.native && window.native.webviewManager && window.native.webviewManager.getCurrent() != null));
        if (webviewManagerTimeout) {
            this.log.error('wait for webviewManager ready timeout');
            return this.start(retryCnt + 1);
        }
        this.wxConfig = await this.page.evaluate(() => window.__wxConfig);
        this.log.info('wxConfig ready');
        this.log.info('checking is redirect');
        const isPageRedirected = await this.isPageRedirected(this.indexPageUrl);
        if (isPageRedirected) {
            // redirect means package is not exist
            this.log.error('page redirected, package is not exist');
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.FIRST_PAGE_REDIRECT);
            return this.genTaskResult({});
        }
        // 这里先sleep 1s，waitForCurrentFrameIdle检查的时候
        // 可能页面的请求都没开始发起，造成idle的假象
        await sleep(1000);
        this.log.debug('waiting for frame idle');
        const waitFrameInfo = await this.waitForCurrentFrameIdle();
        if (waitFrameInfo.hasWebview) {
            // has webview means no other components shown
            this.log.error('has webview at the beginning, nothing to do');
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.FIRST_PAGE_WEBVIEW);
            return this.genTaskResult({});
        }
        this.log.debug('frame idle time', this.getTime());
        return Promise.all([
            this.timeoutPromise,
            new Promise(async (resolve, reject) => {
                await this.startOperate();
                // await sleep(6000000)
                reject(new Error('finished'));
            })
        ]).then(() => {
            return Promise.reject(new Error('finished'));
        }).catch(async (error) => {
            if (error.message == 'finished') {
                this.log.info('crawl finished in time');
            }
            else {
                this.isTimeout = true;
                this.log.info('crawl timeout, stop audits to get result');
            }
            const jsCoverage = await this.page.coverage.stopJSCoverage();
            const serviceCoverage = jsCoverage.filter((item) => /app\-service\.js/.test(item.url))[0];
            if (serviceCoverage && serviceCoverage.ranges) {
                this.jsCoverage = (100 * serviceCoverage.ranges.reduce((total, item) => total + item.end - item.start, 0) / serviceCoverage.text.length).toFixed(2) + '%';
            }
            else {
                this.jsCoverage = '0%';
            }
            this.taskFinishedTime = Date.now();
            this.log.info(`time used ${this.taskFinishedTime - this.taskStartTime}ms`);
            const auditsFrame = this.page.frames().find((frame) => frame.name() == 'auditsFrame');
            this.log.info('audited pages', Object.keys(this.urlPathMap));
            this.log.info(`page coverage: ${Object.keys(this.urlPathMap).length}/${this.wxConfig.pages.length}`);
            this.log.info(`js coverage: ${this.jsCoverage}`);
            if (auditsFrame) {
                this.log.info('has auditsFrame');
                await sleep(2000);
                const [stopAuditError] = await await_to_js_1.default(auditsFrame.evaluate(() => {
                    window.onStopClicked();
                }));
                if (stopAuditError) {
                    this.log.error('stop audit error', stopAuditError);
                }
                const [waitForError] = await await_to_js_1.default(this.page.waitForFunction(() => !!window.auditsResult, { timeout: 10000 }));
                if (waitForError) {
                    reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.GEN_RESULT_OUT_OF_TIME);
                    this.log.error('waiting audits result error: ', waitForError);
                    return this.genTaskResult({});
                }
                const [auditsError, auditsResult] = await await_to_js_1.default(this.page.evaluate(() => window.auditsResult));
                if (auditsError) {
                    reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.GEN_RESULT_ERROR);
                    this.log.error('getting audits result error: ', auditsError);
                    return this.genTaskResult({});
                }
                return await this.genTaskResult(auditsResult);
            }
            else {
                this.log.error('auditsFrame detached, no audits result');
                reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.AUDITS_FRAME_DETACHED);
                return this.genTaskResult({});
            }
        });
    }
    async initPage() {
        this.driverStartTime = Date.now();
        await this.page.setCookie(utils.getCookieInfo(this.appuin, this.indexPageUrl)); // 跳转前种入wxuin cookie，确保所有请求都到一台机器
        await this.page.emulate(iPhoneX);
        await this.page.coverage.startJSCoverage();
    }
    async startOperate() {
        if (this.wxConfig.tabBar) {
            const list = this.wxConfig.tabBar.list;
            this.log.info('tabbar list', list.map((item) => `[title] ${item.text} [path] ${item.pagePath}`).join('\n'));
            for (let i = 0, len = list.length; i < len; i++) {
                this.log.info(`crawling page ${list[i].pagePath}`);
                const [switchTabError] = await await_to_js_1.default(this.page.evaluate((url) => {
                    window.native.navigator.switchTab(url);
                }, list[i].pagePath));
                if (!switchTabError) {
                    await this.crawlCurrentWebview();
                }
                else {
                    this.log.error(`switch tab error: ${switchTabError.message}\n${switchTabError.stack}`);
                }
            }
        }
        else {
            await this.crawlCurrentWebview();
        }
    }
    async crawlCurrentWebview() {
        const page = this.page;
        const webviewNativeHandle = await this.page.evaluateHandle(() => window.native.webviewManager.getCurrent());
        const url = await page.evaluate(webview => webview.url, webviewNativeHandle);
        const urlPath = url.split('?')[0];
        this.urlPathMap[urlPath] = this.urlPathMap[urlPath] || {
            isWebview: false,
            cnt: 0
        };
        if (this.urlPathMap[urlPath].cnt > 2) {
            this.log.info(`${urlPath} has crawled 3 times`);
            return;
        }
        this.urlPathMap[urlPath].cnt++;
        const { hasWebview, frame } = await this.isCurrentFrameReady4Crawl();
        if (!frame) {
            this.log.error('current frame can not be crawling');
            return;
        }
        const [getTitleError, title] = await await_to_js_1.default(frame.evaluate(() => document.title));
        if (getTitleError) {
            this.log.error(`getTitleError`, getTitleError);
            if (frame.isDetached()) {
                return;
            }
        }
        this.log.info('page title: ', title);
        let filename = utils.getFileNameByUrl(url);
        this.log.info('page save filename: ', url);
        const [getPageStackError, pageStack] = await await_to_js_1.default(this.page.evaluate(() => window.native.webviewManager.getPageStack().map((webview) => webview.path)));
        if (getPageStackError) {
            this.log.error(`getPageStackError`, getPageStackError);
        }
        this.log.info('pageStack', pageStack);
        const [saveError] = await await_to_js_1.default(Promise.all([
            this.saveScreenShot(filename),
            this.saveFrameHtml(frame, filename)
        ]));
        if (saveError) {
            this.log.error(`save error ${saveError.message}\n${saveError.stack}`);
            filename = undefined;
        }
        if (!hasWebview) {
            await this.clickElements(frame, webviewNativeHandle, urlPath);
        }
        else {
            this.urlPathMap[urlPath].isWebview = true;
            this.log.error('hasWebview!!!!!!!!!');
        }
        this.taskResult.pages.push({
            task_url: this.indexPageUrl.split('#!')[1] || '',
            path: urlPath,
            full_path: url,
            pagestack: pageStack,
            pic: filename ? `${filename}.jpg` : '',
            html: filename ? `${filename}.html` : '',
            title: title !== undefined ? title : 'undefined',
            level: pageStack.length - 1,
            reachType: 0,
            is_webview: hasWebview ? 1 : 0
        });
        this.log.info(`crawl url ${url} done`);
    }
    async isCurrentFrameReady4Crawl() {
        const { hasWebview, frame, id } = await this.waitForCurrentFrameIdle();
        if (!frame) {
            return { hasWebview };
        }
        if (hasWebview) {
            return { hasWebview, frame };
        }
        // 这里先sleep 1s，waitForCurrentFrameIdle检查的时候
        // 可能页面的很多请求都没开始发起，造成idle的假象
        await sleep(1000);
        this.log.info(`waiting for frame[${frame.name()}] webview ready`);
        const startToWait = Date.now();
        await await_to_js_1.default(frame.waitForFunction(() => !!window.webview, {
            timeout: 10000
        }, id));
        this.log.info('webview object ready');
        if (frame.isDetached()) {
            this.log.info(`oh frame[${frame.name()}] detached`);
            return {};
        }
        this.log.info(`frame[${frame.name()}] webview ready, time: ${Date.now() - startToWait}ms`);
        return { hasWebview, frame };
    }
    async clickElements(frame, webviewNativeHandle, pagePath) {
        const matchResult = /webview-(\d+)/.exec(frame.name());
        if (!matchResult) {
            this.log.error(`frame[${frame.name()}] is not webveiw`);
            return;
        }
        const id = +matchResult[1];
        const [getWebviewError, webviewBrowserHandle] = await await_to_js_1.default(frame.evaluateHandle(() => window.webview));
        if (getWebviewError || !webviewBrowserHandle) {
            this.log.error('getWebviewError', getWebviewError);
            return;
        }
        let [getClickableElementsError, elementsHandle] = await await_to_js_1.default(this.getClickableElements(frame, webviewBrowserHandle));
        if (getClickableElementsError) {
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.GET_CLICKABLE_ELEMENT_ERROR);
            this.log.error('getClickableElementsError', getClickableElementsError);
            return;
        }
        if (!elementsHandle || elementsHandle.length == 0) {
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.FOUND_NO_CLICKABLE_ELEMENTS);
            this.log.error(`frame[${frame.name()}] no elementsHandle found`);
            return;
        }
        for (let i = 0, len = elementsHandle.length; i < len; i++) {
            const { handle, key } = elementsHandle[i];
            try {
                // 过滤重复点击
                if (this.elementTextMap.get(key.textKey)) {
                    this.log.info(`textKey[${key.textKey}] has been click`);
                    continue;
                }
                // 过滤列表项太多时的点击
                let keyClickCnt = this.elementClickCountMap.get(key.tagClassKey) || 0;
                if (keyClickCnt > 3) {
                    this.log.info(`click key[${key.tagClassKey}][${keyClickCnt} times] out of click limit`);
                    continue;
                }
                const isClickable = await this.elementClickable(frame, handle);
                this.log.info(`is element[${key.tagClassKey}] clickable ${isClickable}`);
                if (!isClickable)
                    continue;
                keyClickCnt++;
                this.elementTextMap.set(key.textKey, true);
                this.elementClickCountMap.set(key.tagClassKey, keyClickCnt);
                this.clickCnt++;
                // const fucosBorderHandle = await this.addRedBorder4Handle(frame, handle)
                // await this.saveScreenShot()
                // await frame.evaluate((redBorderHandle) => {
                //   redBorderHandle.remove()
                // }, fucosBorderHandle)
                // await this.screenshotBeforeClick(frame, handle)
                await handle.tap();
                await sleep(1000);
                this.log.info(`clicked key[${key.tagClassKey}][${keyClickCnt} times][${key.textKey.substr(0, 30)}] ${key.tagClassKey} at page ${pagePath}`);
            }
            catch (e) {
                reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.CLICK_ELEMENT_ERROR);
                this.log.error(pagePath, '|', e.message);
                continue;
            }
            await await_to_js_1.default(this.waitForFrameChange(id, { timeout: 1000 }));
            let isFrameDetached = frame.isDetached();
            let isWebviewChanged = false;
            let detectChangeError;
            if (isFrameDetached) {
                this.log.info(`frame[${frame.name()}] is detached`);
                isWebviewChanged = true;
            }
            else {
                [detectChangeError, isWebviewChanged] = await await_to_js_1.default(this.isCurrentWebviewChanged(webviewNativeHandle));
                if (detectChangeError) {
                    isWebviewChanged = true;
                }
            }
            if (isWebviewChanged) {
                this.log.info(`frame[${frame.name()}] webview changed`);
                if (isFrameDetached || detectChangeError) {
                    this.log.info(`frame[${frame.name()}] is detached[${isFrameDetached}] or destroy[${detectChangeError}]`);
                    await this.crawlCurrentWebview();
                    break;
                }
                await this.crawlCurrentWebview();
                this.log.info('navigating back');
                await this.page.evaluate(() => {
                    window.native.navigator.navigateBack();
                });
                this.log.info('navigating back succ');
            }
            else {
                this.log.info(`frame[${frame.name()}] not change`);
            }
            await sleep(1000);
            if (frame.isDetached()) {
                this.log.info(`frame[${frame.name()}] is detachedddd`);
                await this.crawlCurrentWebview();
                break;
            }
            this.log.info(`waiting for frame[${frame.name()}] idle`);
            await this.waitForCurrentFrameIdle();
            this.log.info(`frame[${frame.name()}] is idle`);
            const newElementsHandle = await this.getClickableElements(frame, webviewBrowserHandle);
            this.log.info(pagePath, 'get new elements', elementsHandle.length);
            elementsHandle = newElementsHandle;
            len = elementsHandle.length;
            i = 0;
        }
    }
    async getClickableElements(frame, webviewBrowserHandle) {
        this.log.debug('finding clickable elements');
        const [evaluateError, clickableCount] = await await_to_js_1.default(frame.evaluate(webview => {
            const elements = webview.getElements({ clickable: true });
            const navigators = document.querySelectorAll('wx-navigator');
            elements.forEach(element => {
                // 过滤广告
                if (!element.closest('wx-ad')) {
                    element.setAttribute('crawler-click-el', 'true');
                }
            });
            Array.prototype.forEach.call(navigators, (element) => {
                element.setAttribute('crawler-click-el', 'true');
            });
            return document.querySelectorAll('[crawler-click-el]').length;
        }, webviewBrowserHandle));
        if (evaluateError) {
            this.log.error('getClickableElements error', evaluateError);
            return [];
        }
        this.log.debug('get clickable elements, length', clickableCount);
        const elementsHandle = (await frame.$$('[crawler-click-el="true"]')).slice(0, 200);
        let elements = [];
        for (let i = 0, len = elementsHandle.length; i < len; i++) {
            const elementHandle = elementsHandle[i];
            const boundingBox = (await elementHandle.boundingBox()) || {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
            };
            elements[i] = {
                handle: elementHandle,
                key: await this.getElementKey(elementHandle, frame),
                left: boundingBox.x,
                top: boundingBox.y,
                width: boundingBox.width,
                height: boundingBox.height,
            };
        }
        elements = elements.filter((item) => item.width * item.height).slice(0, 100);
        elements.sort((a, b) => {
            if (a.top != b.top)
                return a.top - b.top;
            if (a.left != b.left)
                return a.left - b.left;
            if (a.width * a.height != b.width * b.height)
                return b.width * b.height - a.width * a.height;
            if (a.key.textKey > b.key.textKey)
                return -1;
            if (a.key.textKey < b.key.textKey)
                return 1;
            return 0;
        });
        this.log.debug('get clickable elements sort finished');
        if (elements.length == 0) {
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.FOUND_NO_CLICKABLE_ELEMENTS);
        }
        return elements;
    }
    async elementClickable(frame, elementHandler) {
        const [checkElementClickAbleError, isClickable] = await await_to_js_1.default(frame.evaluate((el) => {
            const { top, height } = el.getBoundingClientRect();
            const deltaY = top - (window.innerHeight >> 1) + (height >> 1);
            window.scrollTo(0, window.scrollY + deltaY);
            const newRect = el.getBoundingClientRect();
            const [x, y] = [newRect.left + (newRect.width >> 1), newRect.top + (newRect.height >> 1)];
            const elementAtPoint = document.elementFromPoint(x, y);
            const isParent = function (a, b) {
                while (a != document.body) {
                    if (a == b) {
                        return true;
                    }
                    else if (a && a.parentElement) {
                        a = a.parentElement;
                    }
                    else {
                        break;
                    }
                }
                return false;
            };
            return isParent(elementAtPoint, el) || isParent(el, elementAtPoint);
        }, elementHandler));
        if (checkElementClickAbleError) {
            this.log.error(`checkElementClickAbleError`, checkElementClickAbleError);
            return false;
        }
        return !!isClickable;
    }
    async isCurrentWebviewChanged(webviewNativeHandle) {
        const page = this.page;
        const [checkWebviewChangedError, isWebviewChange] = await await_to_js_1.default(page.evaluate(webview => {
            return webview !== window.native.webviewManager.getCurrent();
        }, webviewNativeHandle));
        if (checkWebviewChangedError) {
            this.log.error(`checkWebviewChangedError`, checkWebviewChangedError);
        }
        return isWebviewChange;
    }
    async getElementKey(element, frame) {
        const [getElementKeyError, elementKey] = await await_to_js_1.default(frame.evaluate(el => {
            const clientRect = el.getBoundingClientRect();
            return {
                textKey: `${Math.round(clientRect.width)}-${Math.round(clientRect.height)}-${el.textContent}`.replace(/\n/g, '\\n').replace(/\s+/g, ' ').substr(0, 100),
                tagClassKey: [el.tagName, el.className.split(/\s+/).join('_')].join('__')
            };
        }, element));
        if (getElementKeyError) {
            this.log.error(`getElementKeyError`, getElementKeyError);
        }
        return elementKey;
    }
    async saveScreenShot(filename) {
        const screenShotPath = path.resolve(this.resultPath, `./screenshot/${filename}.jpg`);
        await this.page.screenshot({ path: screenShotPath, type: 'jpeg', quality: 90 });
    }
    async saveFrameHtml(frame, filename) {
        const pageHtml = await frame.content();
        const htmlPath = path.resolve(this.resultPath, `./html/${filename}.html`);
        await fs.writeFile(htmlPath, pageHtml);
    }
    async addRedBorder4Handle(frame, handle, color = 'red') {
        return await frame.evaluateHandle((el) => {
            const focusBorder = document.createElement('div');
            const rect = el.getBoundingClientRect();
            focusBorder.style.position = 'absolute';
            focusBorder.style.zIndex = '10000';
            focusBorder.style.boxSizing = 'border-box';
            focusBorder.style.left = rect.left - 5 + 'px';
            focusBorder.style.top = rect.top + window.scrollY - 5 + 'px';
            focusBorder.style.width = rect.width + 10 + 'px';
            focusBorder.style.height = rect.height + 10 + 'px';
            focusBorder.style.border = '5px solid ' + color;
            document.body.appendChild(focusBorder);
            return focusBorder;
        }, handle);
    }
    // private async screenshotBeforeClick(frame: puppeteer.Frame, handle: puppeteer.ElementHandle) {
    //   const fucosBorderHandle = await this.addRedBorder4Handle(frame, handle)
    //   await this.saveScreenShot()
    //   await frame.evaluate((redBorderHandle) => {
    //     redBorderHandle.remove()
    //   }, fucosBorderHandle)
    // }
    async genTaskResult(auditsResult) {
        const deviceInfo = iPhoneX;
        const resultDeviceInfo = {
            os: "ios",
            screenWidth: deviceInfo.viewport.width,
            screenHeight: deviceInfo.viewport.height,
            model: deviceInfo.name,
            dpr: deviceInfo.viewport.deviceScaleFactor,
        };
        const nonWebviewPage = Object.keys(this.urlPathMap).filter((key) => !this.urlPathMap[key].isWebview).length;
        const crawlPageTotal = Object.keys(this.urlPathMap).length;
        Object.assign(this.taskResult, {
            action_history: [],
            // cover_path_ratio: Object.keys(this.urlPathMap).length / this.wxConfig.pages.length,
            device_info: resultDeviceInfo,
            // driverTimeCost: this.taskFinishedTime - this.taskStartTime,
            // ideStartTime: this.driverStartTime,
            normalSearchPageCount: nonWebviewPage,
            recoverSuccess: nonWebviewPage,
            recoverTotal: crawlPageTotal,
            // redirectToPageCount:
            // sessionCreateTime:
            // result_status: ,
            tabbars: this.wxConfig.tabBar ? this.wxConfig.tabBar.list.map((item) => item.pagePath) : [],
            timeCost: this.taskFinishedTime - this.driverStartTime,
            totalPageCount: this.wxConfig.pages.length,
        });
        if (auditsResult.score_num !== undefined) {
            this.taskResult.ide_ext_info = JSON.stringify({
                audits: {
                    totalClickCount: this.clickCnt,
                    isTimeout: this.isTimeout,
                    jsCoverage: this.jsCoverage,
                    result: JSON.stringify(auditsResult),
                    score_num: auditsResult.score_num
                }
            });
        }
        await fs.writeFile(path.join(this.resultPath, `${this.appid}.json`), JSON.stringify(this.taskResult));
        return this.taskResult;
    }
}
exports.default = AuditsAuto;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(15);
const url_1 = __webpack_require__(7);
const events_1 = __webpack_require__(1);
class NetworkListener extends events_1.EventEmitter {
    constructor(page) {
        super();
        this.requestCount = 0;
        this.handler = {};
        this.requestIdMap = new WeakMap();
        this.requestEventMap = {
            request: new WeakMap(),
            requestfailed: new WeakMap(),
            requestfinished: new WeakMap(),
            response: new WeakMap()
        };
        this.requestIdInfo = {};
        this.page = page;
        this.initHandlerSet();
        this.initNetworkListening(page);
    }
    initHandlerSet() {
        this.handler['request'] = new Set();
        this.handler['requestfailed'] = new Set();
        this.handler['requestfinished'] = new Set();
        this.handler['response'] = new Set();
    }
    mapRequest2Detail(request, response) {
        const url = this.getRealUrl(request.url());
        const isProxy = url != request.url();
        const requestId = this.requestIdMap.get(request) || ++this.requestCount;
        const currentTime = Date.now();
        const fromCache = response ? response.fromCache() : undefined;
        const failure = request.failure();
        const error = failure ? failure.errorText : '';
        const statusCode = response ? response.status().toString() : undefined;
        let headers = [];
        let requestInfo = this.requestIdInfo[requestId];
        if (!requestInfo) {
            this.requestIdMap.set(request, requestId);
            requestInfo = this.requestIdInfo[requestId] = { request, timeStamp: currentTime };
        }
        if (response) {
            const headerObject = response.headers();
            headers = Object.keys(headerObject).map((headerKey) => {
                return {
                    name: headerKey,
                    value: headerObject[headerKey]
                };
            });
        }
        return {
            requestId,
            type: request.resourceType(),
            url,
            timeStamp: currentTime,
            responseHeaders: headers,
            fromCache,
            statusCode,
            costTime: currentTime - requestInfo.timeStamp,
            isProxy,
            error
        };
    }
    getRealUrl(url) {
        if (url.indexOf('wxacrawlerrequest/proxy') > -1) {
            let tmpUrlObj = url_1.parse(url, true);
            url = typeof tmpUrlObj.query.url == 'string' ? tmpUrlObj.query.url : tmpUrlObj.query.url[0];
        }
        return url;
    }
    getNetworkEventSource(request, details) {
        var frame = request.frame();
        if (!frame)
            return 'unknow';
        // 由于appservice的请求可能会被native层加代理，所以请求来源的frame可能是native而不是appservice
        if (frame.name() === 'appservice' || details.isProxy) {
            // this.log.debug('networkListener request from service', details.requestId)
            return 'appservice';
        }
        else if (/^webview\-/.test(frame.name())) {
            // this.log.debug('networkListener request from webview', frameId, details.requestId)
            return 'webview';
        }
        return 'unknow';
    }
    initNetworkListening(page) {
        page.on('request', async (request) => {
            let url = this.getRealUrl(request.url());
            if (!utils.isRequestNotForAudit(url)) {
                // this.log.debug('request url:',  url)
                if (this.requestEventMap.request.get(request))
                    return;
                this.requestEventMap.request.set(request, true);
                const frame = request.frame();
                if (frame) {
                    const details = this.mapRequest2Detail(request);
                    const eventInfo = {
                        eventName: 'onBeforeRequest',
                        type: this.getNetworkEventSource(request, details),
                        details
                    };
                    const message = {
                        command: 'ON_REQUEST_EVENT',
                        data: eventInfo
                    };
                    this.emit('ON_REQUEST_EVENT', eventInfo);
                }
            }
        });
        page.on('requestfailed', (request) => {
            let url = this.getRealUrl(request.url());
            if (!utils.isRequestNotForAudit(url)) {
                const requestId = this.requestEventMap.request.get(request);
                const frame = request.frame();
                if (requestId && frame) {
                    const details = this.mapRequest2Detail(request);
                    const eventInfo = {
                        eventName: 'onErrorOccurred',
                        type: 'unknow',
                        details
                    };
                    this.emit('ON_REQUEST_EVENT', eventInfo);
                }
            }
        });
        page.on('requestfinished', (request) => {
            let url = this.getRealUrl(request.url());
            if (!utils.isRequestNotForAudit(url)) {
                const requestId = this.requestEventMap.request.get(request);
                const frame = request.frame();
                if (requestId && frame) {
                    const details = this.mapRequest2Detail(request);
                    const eventInfo = {
                        eventName: 'onCompleted',
                        type: 'unknow',
                        details
                    };
                    this.emit('ON_REQUEST_EVENT', eventInfo);
                }
            }
        });
        page.on('response', async (response) => {
            const request = response.request();
            let url = this.getRealUrl(request.url());
            if (!utils.isRequestNotForAudit(url)) {
                // this.log.debug(`response url: ${url} isRequestNotForAudits ${utils.isRequestNotForAudit(url)}`)
                const requestId = this.requestEventMap.request.get(request);
                const frame = request.frame();
                if (requestId && frame) {
                    const details = this.mapRequest2Detail(request, response);
                    const eventInfo = {
                        eventName: 'onHeadersReceived',
                        type: 'unknow',
                        details
                    };
                    const message = {
                        command: 'ON_REQUEST_EVENT',
                        data: eventInfo
                    };
                    details.timeStamp = Date.now();
                    this.emit('ON_REQUEST_EVENT', eventInfo);
                    eventInfo.eventName = 'onResponseStarted';
                    this.emit('ON_REQUEST_EVENT', eventInfo);
                }
            }
        });
    }
}
exports.default = NetworkListener;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

module.exports.$ = function (selector, el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  return (el || document).querySelector(selector);
};

module.exports.$$ = function (selector) {
  return document.querySelectorAll(selector);
};

module.exports.show = function (el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  el.style.display = '';
};

module.exports.hide = function (el) {
  if (typeof el === 'string') {
    el = document.querySelector(el);
  }

  el.style.display = 'none';
};

module.exports.sprintf = function (str, args) {
  for (let i = 0; i < args.length; i++) {
    str = str.replace(/%s/, args[i]);
  }
  return str;
};

module.exports.reportBehavior = function (data) {
  // data: score_num, score_level, failed_detail, ignored_detail, use_time
  this.log('reportBehavior', data);
  pluginMessager.invoke('REPORT', JSON.stringify(data));
};

module.exports.log = function () {
  if (false) {}
};

module.exports.formatSize = function (size) {
  const units = ['B', 'K', 'M', 'G'];
  let unit;
  while ((unit = units.shift()) && size > 1024) {
    size /= 1024;
  }
  return (unit === 'B' ? size : size.toFixed(2)) + unit;
};

module.exports.hash = function (text) {
  let hash = 5381;
  let index = text.length;

  while (index) {
    hash = hash * 33 ^ text.charCodeAt(--index);
  }

  return hash >>> 0;
};

//  计算字符串字符数
module.exports.byteCount = function (s) {
  return encodeURI(s).split(/%..|./).length - 1;
};

//  数组去重
module.exports.unique = function (arr) {
  // return Array.from(new Set(array));
  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
};

module.exports.getType = function (val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
};

module.exports.compareVersion = function (v1, v2) {
  v1 = v1.split('.');
  v2 = v2.split('.');
  const len = Math.max(v1.length, v2.length);

  while (v1.length < len) {
    v1.push('0');
  }
  while (v2.length < len) {
    v2.push('0');
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i]);
    const num2 = parseInt(v2[i]);

    if (num1 > num2) {
      return 1;
    } else if (num1 < num2) {
      return -1;
    }
  }

  return 0;
};

module.exports.isRequestNotForAudit = function (url) {
  const invalidDomainReg = [/^data\:/,
  // 云函数长轮询请求
  /^https:\/\/servicewechat.com\/wxa-qbase\/qbasecheckresult/, /^https?:\/\/[^/]*\.tcb\.qcloud\.la\//,
  // 广告组件的资源
  /^https?:\/\/wxsnsdythumb\.wxs\.qq\.com\//, /^https?:\/\/mmbiz\.qpic\.cn\//, /^https?:\/\/wx\.qlogo\.cn\//,
  // 地图组件的资源
  /^https?:\/\/[^/]*\.qq\.com\//, /^https?:\/\/[^/]*\.gtimg\.com\//, /^https?:\/\/[^/]*\.myapp\.com\//,
  // 工具内部请求
  /^http:\/\/127.0.0.1:/,
  // 扩展
  /^chrome-extension:\/\//,
  // runtime环境
  /^https?:\/\/servicewechat\.com\//, /\/audits\/assert\//, /\/wxacrawler\//, /^https?:\/\/[^/]*\.weixinbridge\.com\//];

  for (let i = 0; i < invalidDomainReg.length; i++) {
    if (url.match(invalidDomainReg[i])) {
      return true;
    }
  }

  return false;
};

const filterLibStack = function (stacks) {
  return stacks.filter(stack => {
    return !/^(__dev__|__asdebug__|__pageframe__|appservice\?)|audits\/assert\/inject|WAService.js|WAWebview.js|wxacrawler\/public/.test(stack.file);
  });
};

module.exports.parseStackStrings = function (stackStr, filterLib = true) {
  let stacks = stackStr.split('\n');
  let REG_EXP = /at\s+([\S]+)\s+\((\S+)\)/;
  let result = stacks.map(stack => {
    let result = stack.match(REG_EXP);
    if (result && result[1] && result[2]) {
      let fileString = result[2].replace(/^\s*/, '').replace(/http:\/\/127\.0\.0\.1:\d+\/(:?(:?appservice|wxacrawler\/\d+\/program\/\w+)?\/)?/, '');
      let [file, line, column] = fileString.split(':');
      if (fileString.split(':').length == 3) {
        return {
          func: result[1].replace(/^Audit_(setTimeout|setInterval)_?.*$/, '$1'),
          file,
          line: +line,
          column: +column
        };
      }
    }
    return null;
  }).filter(stack => !!stack);

  if (filterLib) {
    result = filterLibStack(result);
  }

  return result;
};

module.exports.getCallStack = function (filterLib = true) {
  let result = exports.parseStackStrings(new Error().stack);

  if (filterLib) {
    result = filterLibStack(result);
  }

  return result;
};

module.exports.onGenerateFuncReady = function (func) {
  if (window.__generateFunc__) {
    setTimeout(func);
  } else {
    document.addEventListener('generateFuncReady', func);
  }
};

module.exports.status = 'running';

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(1);
const qs = __webpack_require__(8);
const utils_1 = __webpack_require__(3);
class Hijack extends events_1.EventEmitter {
    frameEvaluate(frame, func, ...args) {
        if (!frame.isDetached()) {
            return frame.evaluate(func, ...args);
        }
        else {
            // reportIdKey(IdKey.FRAME_DETACHED);
            throw new Error(`frame detached! name:${frame.name}`);
        }
    }
    constructor(page) {
        super();
        this.page = page;
        this.initEvent();
    }
    initEvent() {
        this.page.on('console', (msg) => {
            if (msg.type() === 'info') {
                const source = msg.text();
                if (source.indexOf('://') === -1)
                    return;
                const match = source.split('://');
                const type = match[0];
                switch (type) {
                    case 'redirectTo':
                    case 'navigateTo':
                    case 'switchTab':
                    case 'reLaunch':
                    case 'navigateBack':
                        const url = match[1] || '';
                        this.emit('URL_CHANGE', { url, type });
                        break;
                    case 'publishPageEvent':
                        const [name, query] = match[1].split('?');
                        const params = qs.parse(query);
                        params.name = name;
                        this.emit('PAGE_EVENT', params);
                        // Logger.logInfo(`PAGE_EVENT:${name},webviewId:${params.webviewId}`);
                        break;
                    default:
                        return;
                }
            }
        });
    }
    hijackDefault({ longitude, latitude }) {
        return this.page.evaluate((isDebug, longitude, latitude) => {
            if (isDebug) {
                localStorage.setItem('RUNTIME_ENV', 'development');
            }
            try {
                Object.defineProperty(navigator, 'language', {
                    get() {
                        return 'zh-CN';
                    }
                });
            }
            catch (e) { }
            window.native.sdk.getLocation = async function () {
                return { errMsg: 'getLocation:ok', longitude: longitude, latitude: latitude };
            };
            window.shareData = null;
            window.native.sdk.shareAppMessageDirectly
                = window.native.sdk.shareAppMessage = async function (data) {
                    window.shareData = data.args;
                };
            window.native.setOption('autoPermission', true);
            window.native.setOption('autoAuthorization', true);
            // hack 一些弹窗操作
            window.native.sdk.chooseVideo
                = window.native.sdk.openLocation
                    = window.native.sdk.openAddress
                        = window.native.sdk.openWeRunSetting
                            = window.native.sdk.openSetting
                                = window.native.sdk.chooseImage
                                    = window.native.sdk.chooseInvoiceTitle
                                        = window.native.sdk.showModal
                                            = window.native.sdk.enterContack
                                                = window.native.sdk.previewImage = function (data = {}) {
                                                    return {
                                                        errMsg: `${data.api}:ok`,
                                                    };
                                                };
            window.alert = window.console.log; // 全局替换掉alert,禁掉同步执行
        }, !!process.env.DEBUG, longitude, latitude);
    }
    hijackPageEvent() {
        return this.page.evaluate(() => {
            // webviewPublishPageEvent
            window.__handleWebviewPublish = window.native.handleWebviewPublish;
            window.native.handleWebviewPublish = function (msg) {
                const name = msg.data.eventName;
                if (name === 'PAGE_EVENT') {
                    const pageEventName = msg.data.data.data.eventName;
                    const webviewId = msg.webviewId;
                    console.info(`publishPageEvent://${pageEventName}?webviewId=${webviewId}`);
                }
                window.__handleWebviewPublish.apply(window.native, [msg]);
            };
            window.__handleAppServicePublish = window.native.handleAppServicePublish;
            window.native.handleAppServicePublish = function (msg) {
                const name = msg.data.eventName;
                if (name === 'onAppRoute') {
                    const params = msg.data.data.data;
                    // const {openType, webviewId, path, query} = msg!.data!.data!.data;
                    const query = Object.keys(params).map((key) => {
                        return `${key}=${encodeURIComponent(params[key])}`;
                    }).join('&');
                    console.info(`publishPageEvent://onAppRoute?${query}`);
                }
                window.__handleAppServicePublish.apply(window.native, [msg]);
            };
        });
    }
    hijackNavigation() {
        return this.page.evaluate(() => {
            window.native.navigator.redirectTo = function (url) {
                console.info(`redirectTo://${url}`);
                return;
            };
            window.native.navigator.navigateTo = function (url) {
                console.info(`navigateTo://${url}`);
                return;
            };
            window.native.navigator.switchTab = function (url) {
                console.info(`switchTab://${url}`);
                return;
            };
            window.native.navigator.reLaunch = function (url) {
                console.info(`reLaunch://${url}`);
                return;
            };
            window.native.navigator.navigateBack = function (url) {
                console.info(`navigateBack://${url}`);
                return;
            };
            // 右上角的回到首页也需要劫持，主动发现进，某些情况会触发
            window.native.navigator.launch = function (url) {
                console.info(`launch://${url}`);
                return;
            };
            window.native.webviewManager.removeAll = function () {
                return;
            };
        });
    }
    waitFor(event, key, timeout = 1000) {
        return new Promise((resolve, reject) => {
            const cb = (args) => {
                resolve(args[key]);
            };
            this.once(event, cb);
            setTimeout(() => {
                reject('timeout');
                this.removeListener(event, cb);
            }, timeout);
        });
    }
    waitForUrl(timeout = 1000) {
        return this.waitFor('URL_CHANGE', 'url', timeout);
    }
    waitForPageEvent(eventName, opt = { timeout: 1000 }) {
        return new Promise((resolve, reject) => {
            const cb = ({ webviewId, name }) => {
                if (eventName === name) {
                    if (opt.webviewId === undefined || opt.webviewId === webviewId) {
                        resolve('ok');
                        this.removeListener('PAGE_EVENT', cb);
                    }
                }
            };
            this.on('PAGE_EVENT', cb);
            setTimeout(() => {
                reject('timeout');
                this.removeListener('PAGE_EVENT', cb);
            }, opt.timeout);
        });
    }
    /**
     * 点击前先劫持一些webview侧的弹窗操作
     * @param {Frame} frame
     */
    hijackWebivewAlert(frame) {
        return utils_1.frameEvaluate(frame, (...args) => {
            window.alert = window.console.log;
        });
    }
}
exports.default = Hijack;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("jimp");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("log4js");

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(1);
const log_1 = __webpack_require__(0);
const domUtils_1 = __webpack_require__(20);
const FrameData_1 = __webpack_require__(21);
const reportIdKey_1 = __webpack_require__(2);
class PageBase extends events_1.EventEmitter {
    constructor(page, opt = {}) {
        super();
        this.log = log_1.default;
        this.page = page;
        this.isMpcrawler = opt.isMpcrawler || false;
        this.frameMap = new Map();
        const mainFrame = page.mainFrame();
        this.mainFrameData = new FrameData_1.default(mainFrame, { isMainFrame: true, isMpcrawler: this.isMpcrawler });
        this.frameMap.set(mainFrame, this.mainFrameData);
        this.disableImg = opt.disableImg || false;
        this.disableMedia = opt.disableMedia || false;
        this.initTs = Date.now();
    }
    initPageEvent() {
        const page = this.page;
        page.on('frameattached', (frame) => {
            const frameData = new FrameData_1.default(frame, {
                disableImg: this.disableImg,
                disableMedia: this.disableMedia,
                isMpcrawler: this.isMpcrawler
            });
            this.frameMap.set(frame, frameData);
        });
        page.on('framedetached', (frame) => {
            log_1.default.debug('frame detach: ', frame.name());
            const frameData = this.frameMap.get(frame);
            if (frameData) {
                frameData.emit('detach', frame.name());
                this.frameMap.delete(frame);
            }
        });
        page.on('request', async (request) => {
            const frame = request.frame();
            if (!frame)
                return;
            const frameData = this.frameMap.get(frame);
            if (!frameData)
                return;
            frameData.onRequestStart(request);
        });
        page.on('requestfailed', async (request) => {
            const sourceType = request.resourceType();
            if (sourceType !== 'image' && sourceType !== 'media') {
                // debug(`failed request ${request.resourceType()}: ${request.url()}`);
            }
            const frame = await request.frame();
            if (!frame)
                return;
            const frameData = this.frameMap.get(frame);
            if (!frameData)
                return;
            frameData.onRequestEnd(request, 'failed');
        });
        page.on('requestfinished', async (request) => {
            const frame = await request.frame();
            if (!frame)
                return;
            const frameData = this.frameMap.get(frame);
            if (!frameData)
                return;
            const response = request.response();
            if (response && !/^(2|3)\d\d$/.test(response.status().toString())) {
                log_1.default.error(`failed request! status = ${response.status()}.`);
                frameData.onRequestEnd(request, 'failed');
            }
            else {
                frameData.onRequestEnd(request, 'finished');
            }
        });
        page.on('pageerror', (error) => {
            log_1.default.error(`pageerror occur! ${error.message} ${error.stack}`);
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.PAGE_EXCEPTION);
        });
        page.on('error', (err) => {
            log_1.default.error(`page error occur:`, err);
            try {
                log_1.default.debug('page error occur and going to crash:', page.url());
            }
            catch (err) {
            }
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.PAGE_CRASH);
            this.emit('pageError', err);
        });
    }
    async waitForCurrentFrameIdle(timeoutCnt = 0) {
        const { frame, id } = await domUtils_1.getCurrentFrame(this.page);
        const frameData = this.getFrameData(frame);
        if (!frame || !frameData) {
            // really not likely
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.PAGE_NO_FRAME);
            this.log.debug(`no frame or frameData !!!`);
            return { frame: undefined, hasWebview: false, frameData, timeout: 0, id };
        }
        this.log.debug(`get current frame[${frame.name()}] done`);
        const isWebview = await domUtils_1.hasWebview(frame);
        this.log.debug(`check has webview [${isWebview}] done`);
        if (isWebview) {
            // 包含webview，直接任务失败, 页面是否包含webview，在 page dom ready后就可以知道
            log_1.default.debug('task fail because page has webview');
            reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.PAGE_IS_WEBVIEW);
            return { hasWebview: true, frame, frameData, timeout: 0, id };
        }
        // if fail because of frame detach, try to return new frame
        // 需要mainFrame（waitCode1)和当前frame(waitCode2)的网络同时空闲
        const [waitCode1, waitCode2] = await Promise.all([this.mainFrameData.waitForNetworkIdle(), frameData.waitForNetworkIdle()]);
        const currentId = await domUtils_1.getCurrentId(this.page);
        if (waitCode2 === -2 || frame.isDetached() || id !== currentId) {
            // waitCode2 = 0 但其实frame已经detach的，发生在页面先networkidle再被detach的case, 所以这里要兼容一下
            // 在等当前frame网络时，页面跳转，当前frame已经变，需要重新获取
            // 还有一种case是，延时一会再有跳转，这种情况暂时无办法处理
            log_1.default.debug(`wait for current frame[${frame.name()}] idle fail: already detach, try again`);
            return this.waitForCurrentFrameIdle(timeoutCnt); // 等待时frame detach了，需要重新拿当前frame;
            // return {hasWebview: false, frame: undefined, frameData, timeout: 0, id}
        }
        else if (waitCode1 === -1 || waitCode2 === -1) {
            log_1.default.debug(`frame[${frame.name()}] idle timeout, code: `, waitCode1, waitCode2);
            timeoutCnt++;
        }
        log_1.default.debug(`current frame[${frame.name()}] network idle done`);
        return { hasWebview: false, frame, frameData, timeout: timeoutCnt, id };
    }
    // protected async waitForFrameIdle(frame: puppeteer.Frame, timeout: number) {
    //     const frameData = this.getFrameData(frame);
    //     if (!frameData) return Promise.resolve(-2);
    //     const [waitCode1, waitCode2] = await Promise.all([this.mainFrameData.waitForNetworkIdle(timeout), frameData.waitForNetworkIdle(timeout)]);
    //     debug('wait for frame idle', waitCode1, waitCode2);
    //     return Promise.resolve(waitCode2);
    // }
    getFrameData(frame) {
        return this.frameMap.get(frame);
    }
    async waitForFrameChange(webviewId, { timeout }) {
        return this.page.waitFor((id) => window.native.webviewManager.getCurrent().id !== id, { timeout }, webviewId);
    }
    isPageRedirected(url) {
        return this.page.evaluate((url) => {
            return url.indexOf(location.pathname) === -1;
        }, url);
    }
    getTime() {
        return Date.now() - this.initTs;
    }
}
exports.default = PageBase;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const await_to_js_1 = __webpack_require__(6);
// import {IdKey} from "../config";
const log_1 = __webpack_require__(0);
const utils_1 = __webpack_require__(3);
async function getCurrentFrame(page) {
    const id = await getCurrentId(page);
    // debug('get Current Frame Id:', id);
    const frame = await getCurrentFrameByWebviewId(page, id);
    return {
        frame,
        id
    };
}
exports.getCurrentFrame = getCurrentFrame;
function getCurrentId(page) {
    return page.evaluate(() => {
        const current = window.native.webviewManager.getCurrent();
        return current.id;
    });
}
exports.getCurrentId = getCurrentId;
async function getCurrentFrameData(page, frameMap) {
    const { frame } = await getCurrentFrame(page);
    if (!frame)
        return undefined;
    return frameMap.get(frame);
}
exports.getCurrentFrameData = getCurrentFrameData;
async function getCurrentFrameByWebviewId(page, webviewId) {
    const frameList = await page.frames();
    const pendingFrame = [];
    for (const frame of frameList) {
        if (frame.name() === '') {
            pendingFrame.push(frame);
            continue;
        }
        if (frame.name() === `webview-${webviewId}`) {
            // Logger.info(`found webview-${webviewId}!!!`);
            return frame;
        }
    }
    // in the pending frame wait for it and return
    // debug('get current frame by id in pending list');
    for (const frame of pendingFrame) {
        const [waitTimeout] = await await_to_js_1.default(frame.waitForNavigation({ timeout: 1000 }));
        if (frame.name() === `webview-${webviewId}`) {
            return frame;
        }
    }
}
exports.getCurrentFrameByWebviewId = getCurrentFrameByWebviewId;
async function getAppServiceFrame(page) {
    const frameList = await page.frames();
    for (const frame of frameList) {
        if (frame.name() === 'appservice') {
            return frame;
        }
    }
    return null;
}
exports.getAppServiceFrame = getAppServiceFrame;
function scrollToTop(frame) {
    return utils_1.frameEvaluate(frame, () => {
        // @todo 判定当前页面是否有scroll-view, 有scroll-view时，需要别的方式滚动
        window.scrollTo(0, 0);
    });
}
exports.scrollToTop = scrollToTop;
function scrollToBottom(frame) {
    return utils_1.frameEvaluate(frame, () => {
        // @todo 判定当前页面是否有scroll-view, 有scroll-view时，需要别的方式滚动
        const height = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        window.scrollTo(0, height - windowHeight);
        // window.wx.publishPageEvent('onReachBottom', {});
    });
}
exports.scrollToBottom = scrollToBottom;
function scrollDown(frame) {
    return utils_1.frameEvaluate(frame, () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        window.scrollTo(0, scrollTop + windowHeight - 64);
        return window.innerHeight;
    });
}
exports.scrollDown = scrollDown;
function elemInWindow(frame) {
}
exports.elemInWindow = elemInWindow;
function dumpScopeDataToDOMNode(frame) {
    return utils_1.frameEvaluate(frame, () => {
        try {
            window.__virtualDOM__.spreadScopeDataToDOMNode();
        }
        catch (e) {
            console.log(`scope data error ${e.message} ${e.stack}`);
        }
    });
}
exports.dumpScopeDataToDOMNode = dumpScopeDataToDOMNode;
function getFrameHtml(frame) {
    return utils_1.frameEvaluate(frame, () => {
        try {
            window.__virtualDOM__.spreadScopeDataToDOMNode();
        }
        catch (e) {
            console.log(`scope data error ${e.message} ${e.stack}`);
        }
        const styleSheets = document.styleSheets;
        let css = '';
        const elements = document.querySelectorAll('*');
        for (let i = 0, len = elements.length; i < len; i++) {
            const el = elements[i];
            for (let i = 0, len = styleSheets.length; i < len; i++) {
                const cssRules = styleSheets[i].cssRules;
                for (let i = 0, len = cssRules.length; i < len; i++) {
                    const rule = cssRules[i];
                    if (rule.added) {
                        continue;
                    }
                    if (el.webkitMatchesSelector(rule.selectorText)) {
                        rule.added = true;
                        css += rule.cssText;
                    }
                }
            }
        }
        return `<html><meta charset="UTF-8"><meta name="viewport" content="width=device-width,
                user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><style>${css}</style>
                ${document.body.outerHTML}`;
    });
}
exports.getFrameHtml = getFrameHtml;
async function getElemCrw(elem, frame) {
    const [err, crw] = await await_to_js_1.default(utils_1.frameEvaluate(frame, (elem) => {
        const rect = elem.getBoundingClientRect();
        const comStyle = window.getComputedStyle(elem);
        return `${rect.left},${rect.top},${rect.right},${rect.bottom},${comStyle.fontSize},${comStyle.borderWidth},${comStyle.backgroundColor},${comStyle.borderColor},${comStyle.color},${comStyle.padding},${comStyle.margin}`;
    }, elem));
    if (err) {
        log_1.default.error('fail get elem crw', err);
        return '';
    }
    return crw;
}
exports.getElemCrw = getElemCrw;
async function insertCrwInfo(frame) {
    const msg = await utils_1.frameEvaluate(frame, () => {
        // @ts-ignore
        function traverseElement(el) {
            const childElCnt = el.childElementCount;
            for (let i = 0; i < childElCnt; ++i) {
                const rect = el.children[i].getClientRects();
                const comStyle = window.getComputedStyle(el.children[i]);
                let crwAttr = '';
                if (rect.length) {
                    crwAttr = `${rect[0].left},${rect[0].top},${rect[0].right},`
                        + `${rect[0].bottom},${comStyle.fontSize},${comStyle.borderWidth},`
                        + `${comStyle.backgroundColor},${comStyle.borderColor},${comStyle.color},`
                        + `${comStyle.padding},${comStyle.margin}`;
                    el.children[i].setAttribute('wx-crw', crwAttr);
                }
                traverseElement(el.children[i]);
            }
        }
        try {
            window.scrollTo(0, 0);
            traverseElement(document.body);
        }
        catch (e) {
            console.log(`traverseElement error ${e.message} ${e.stack}`);
            return e.message;
        }
        return 'ok';
    });
    if (msg !== 'ok') {
        log_1.default.error(`insertCrwInfo error! ${msg}`);
        // reportIdKey(IdKey.INSERT_CRW_ERR);
    }
    return msg;
}
exports.insertCrwInfo = insertCrwInfo;
async function getAndInsertShareData(page, frame) {
    let shareData;
    try {
        await page.evaluate(() => {
            // 触发分享
            const webview = window.native.webviewManager.getCurrent();
            window.native.appServiceMessenger.send({
                command: 'APPSERVICE_ON_EVENT',
                data: {
                    eventName: 'onShareAppMessage',
                    data: {
                        path: webview.url,
                        mode: 'common',
                    },
                },
                webviewId: webview.id,
            });
        });
        await utils_1.sleep(200);
        shareData = await page.evaluate(() => {
            console.log(window.shareData);
            return window.shareData;
        });
    }
    catch (e) {
        log_1.default.error(`!!!!! getShareData evaluate failed ${e.message} ${e.stack}`);
    }
    log_1.default.info(`sharedata is ${JSON.stringify(shareData)}`);
    if (shareData && (shareData.hasOwnProperty("title") || shareData.hasOwnProperty("imageUrl"))) {
        const realShareData = {
            "title": shareData.title ? shareData.title : "",
            "imageUrl": ""
        };
        if (shareData.imageUrl && await utils_1.checkImageValid(shareData.imageUrl) === 0) {
            realShareData.imageUrl = shareData.imageUrl;
        }
        else {
            log_1.default.error(`image:${shareData.imageUrl} is invalid!`);
        }
        await utils_1.frameEvaluate(frame, (sData) => {
            document.body.setAttribute('wx-share-data', JSON.stringify(sData));
        }, realShareData);
    }
}
exports.getAndInsertShareData = getAndInsertShareData;
function getFrameInfo(frame) {
    return utils_1.frameEvaluate(frame, () => {
        return {
            pageHeight: document.body.offsetHeight,
            windowHeight: window.innerHeight,
        };
    });
}
exports.getFrameInfo = getFrameInfo;
async function getUserInfo(frame, page) {
    const frameList = await page.frames();
    for (const frame of frameList) {
        if (frame.name() === 'appservice') {
            const [err, userInfo] = await await_to_js_1.default(utils_1.frameEvaluate(frame, () => {
                return new Promise((resolve, reject) => {
                    // @ts-ignore
                    wx.getUserInfo({
                        // @ts-ignore
                        success(res) {
                            resolve(res.userInfo);
                        },
                        fail() {
                            reject('');
                        }
                    });
                });
            }));
            log_1.default.info(`userinfo is ${JSON.stringify(userInfo)}`);
            if (userInfo) {
                return userInfo;
            }
            else {
                // reportIdKey(IdKey.GET_USERINFO_EMPTY);
                return {};
            }
        }
    }
    return;
}
exports.getUserInfo = getUserInfo;
function getWebviewInfo(page) {
    return page.evaluate(() => {
        const currentWebview = window.native.webviewManager.getCurrent();
        return {
            url: currentWebview.url,
            id: currentWebview.id,
            path: currentWebview.path,
            pageTitle: currentWebview.pageConfig.window.navigationBarTitleText,
            stack: window.native.webviewManager.getPageStack().map((webview) => webview.path),
        };
    });
}
exports.getWebviewInfo = getWebviewInfo;
function hasWebview(frame) {
    return utils_1.frameEvaluate(frame, () => {
        return document.querySelector('wx-web-view') !== null;
    });
}
exports.hasWebview = hasWebview;
function insertTaskInfo(taskInfo, frame) {
    const d = new Date();
    taskInfo.time = d.toLocaleString();
    return utils_1.frameEvaluate(frame, (sData) => {
        document.body.setAttribute('wx-crawler-taskinfo', JSON.stringify(sData));
    }, taskInfo);
}
exports.insertTaskInfo = insertTaskInfo;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(1);
const log_1 = __webpack_require__(0);
const reportIdKey_1 = __webpack_require__(2);
const BlackList = {
    "https://log.mengtuiapp.com/report/v1": true,
    "https://log.aldwx.com/d.html": true,
    "log.aldwx.com": true
};
let reportNewProxyIp = false;
class FrameData extends events_1.EventEmitter {
    constructor(frame, opt = {}) {
        super();
        this.extra = {};
        this.requestMap = new Map();
        this.frame = frame;
        this.requestNum = 0;
        this.isNetworkIdle = false;
        this.networkIdleTimer = null;
        this.disableImg = opt.disableImg || false;
        this.disableMedia = opt.disableMedia || false;
        this.isMpcrawler = opt.isMpcrawler || false;
        this.timePerRequest = 0;
        this.isMainFrame = opt.isMainFrame || false;
        this.setMaxListeners(100);
    }
    isDetach() {
        return this.frame.isDetached();
    }
    setTaskExtra(extra) {
        this.extra = extra;
    }
    getPerformance(isReset = false) {
        const time = this.timePerRequest;
        if (isReset) {
            this.timePerRequest = 0;
        }
        return {
            averageTime: Math.round(time),
            timeout: this.requestNum,
        };
    }
    resetPerformance() {
        this.timePerRequest = 0;
    }
    async onRequestStart(request) {
        this.requestMap.set(request._requestId, Date.now());
        this.requestNum++;
        // Logger.debug(`frame[${this.frame.name()}] requestNum++ ${this.requestNum}`)
        this.isNetworkIdle = false;
        if (this.networkIdleTimer) {
            clearTimeout(this.networkIdleTimer);
        }
    }
    async onRequestEnd(request, endType) {
        // @ts-ignore
        const costTime = Date.now() - this.requestMap.get(request._requestId);
        const rUrl = request.url();
        if (rUrl.search('/wxacrawler/') !== -1) {
            // codesvr
            if (endType === 'failed' && request.resourceType() !== 'image') {
                log_1.default.error(`end ${endType} resType ${request.resourceType()} request:'${request.url()}' error: ${request._failureText} cost time : ${costTime}`);
            }
            endType === 'failed' ? reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.CODESVR_REQUEST_FAILED) : reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.CODESVR_REQUEST_SUCC);
        }
        else if (rUrl.search('wxacrawlerrequest/proxy') !== -1) {
            // requestproxy代理
            if (rUrl.search('servicewechat') !== -1) {
                if (endType === 'failed') {
                    log_1.default.error(`end ${endType} request:'${request.url()}' 
                    error: ${request._failureText} cost time : ${costTime}`);
                }
                endType === 'failed' ? reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.REQUEST_SW_FAILED) : reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.REQUEST_SW_SUCC);
            }
            endType === 'failed' ? reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.REQUEST_FAILED) : reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.REQUEST_SUCC);
            if (endType === 'failed') {
                const response = request.response();
                if (response) {
                    const headers = response ? response.headers() : {};
                    const newProxyIp = headers['x-requestproxy-ip'];
                    const oldProxyIp = headers['x-old-requestproxy-ip'];
                    log_1.default.error(`failed request!!! NewProxy:${newProxyIp}. OldProxy:${oldProxyIp}. url:${rUrl}. retcode:${response.status()}`);
                }
                else {
                    log_1.default.error(`failed request!!! ${rUrl}.`);
                }
            }
        }
        else {
            endType === 'failed' ? reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.SQUID_REQUEST_FAILED) : reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.SQUID_REQUEST_SUCC);
        }
        this.requestNum--;
        // Logger.debug(`frame[${this.frame.name()}] requestNum-- ${this.requestNum}`)
        if (this.requestNum <= 0) {
            if (this.networkIdleTimer) {
                clearTimeout(this.networkIdleTimer);
            }
            this.networkIdleTimer = setTimeout(() => {
                this.isNetworkIdle = true;
                // debug('network idle', this.frame.name());
                this.emit('networkIdle');
            }, 500);
            // 500ms 没有新请求就认为是networkIdle
        }
        // 更新frame的平均耗时
        if (this.timePerRequest === 0) {
            this.timePerRequest = costTime;
        }
        else {
            this.timePerRequest = (this.timePerRequest + costTime) / 2;
        }
        if (this.isMainFrame) {
            // wx.request
            const response = request.response();
            const headers = response ? response.headers() : {};
            const newProxyIp = headers['x-requestproxy-ip'];
            const oldProxyIp = headers['x-old-requestproxy-ip'];
            if (newProxyIp && !reportNewProxyIp) {
                // debug(`New Proxy Ip`, newProxyIp);
                reportNewProxyIp = true;
            }
            else if (oldProxyIp && !reportNewProxyIp) {
                // debug(`Old Proxy Ip`, oldProxyIp);
                reportNewProxyIp = true;
            }
        }
    }
    /**
     * 0: 正常
     * -1: 超时
     * -2: frame detached
     * @param {number} timeout
     * @returns {any}
     */
    waitForNetworkIdle(timeout = 5000) {
        if (this.isDetach())
            return Promise.resolve(-2);
        if (this.isNetworkIdle)
            return Promise.resolve(0);
        return new Promise((resolve, reject) => {
            const timeoutHandle = setTimeout(() => {
                log_1.default.error(`waitForNetworkIdle timeout:${timeout}`);
                reportIdKey_1.reportIdKey(reportIdKey_1.IdKey.NETWORK_IDLE_TIMEOUT);
                resolve(-1);
            }, timeout);
            this.once('networkIdle', () => {
                resolve(0);
                clearTimeout(timeoutHandle);
            });
            this.once('detach', (frameName) => {
                log_1.default.info(`waitForNetworkIdle fail: frame[${frameName}] detach`);
                resolve(-2);
                clearTimeout(timeoutHandle);
            });
        });
    }
}
exports.default = FrameData;


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL2xvZy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vdXRpbC9yZXBvcnRJZEtleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vdXRpbC91dGlscy50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiZnMtZXh0cmFcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhd2FpdC10by1qc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcInVybFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInFzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHVwcGV0ZWVyL0RldmljZURlc2NyaXB0b3JzXCIiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3V0aWwvY29uZmlnLnRzIiwid2VicGFjazovLy8uL3NyYy9hdXRvLXJ1bi9ydW50aW1lL2F1ZGl0c0F1dG9FbnRyeS50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwdXBwZXRlZXJcIiIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vcnVudGltZS9BdWRpdHNBdXRvLnRzIiwid2VicGFjazovLy8uL3NyYy9hdXRvLXJ1bi9ydW50aW1lL05ldHdvcmtMaXN0ZW5lci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3J1bnRpbWUvYmFzZS9IaWphY2sudHMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiamltcFwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImxvZzRqc1wiIiwid2VicGFjazovLy8uL3NyYy9hdXRvLXJ1bi9ydW50aW1lL2Jhc2UvUGFnZUJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3V0aWwvZG9tVXRpbHMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3J1bnRpbWUvYmFzZS9GcmFtZURhdGEudHMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0cyIsIiQiLCJzZWxlY3RvciIsImVsIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiJCQiLCJxdWVyeVNlbGVjdG9yQWxsIiwic2hvdyIsInN0eWxlIiwiZGlzcGxheSIsImhpZGUiLCJzcHJpbnRmIiwic3RyIiwiYXJncyIsImkiLCJsZW5ndGgiLCJyZXBsYWNlIiwicmVwb3J0QmVoYXZpb3IiLCJkYXRhIiwibG9nIiwicGx1Z2luTWVzc2FnZXIiLCJpbnZva2UiLCJKU09OIiwic3RyaW5naWZ5IiwicHJvY2VzcyIsImZvcm1hdFNpemUiLCJzaXplIiwidW5pdHMiLCJ1bml0Iiwic2hpZnQiLCJ0b0ZpeGVkIiwiaGFzaCIsInRleHQiLCJpbmRleCIsImNoYXJDb2RlQXQiLCJieXRlQ291bnQiLCJzIiwiZW5jb2RlVVJJIiwic3BsaXQiLCJ1bmlxdWUiLCJhcnIiLCJuZXdBcnIiLCJpbmRleE9mIiwicHVzaCIsImdldFR5cGUiLCJ2YWwiLCJPYmplY3QiLCJwcm90b3R5cGUiLCJ0b1N0cmluZyIsImNhbGwiLCJzbGljZSIsInRvTG93ZXJDYXNlIiwiY29tcGFyZVZlcnNpb24iLCJ2MSIsInYyIiwibGVuIiwiTWF0aCIsIm1heCIsIm51bTEiLCJwYXJzZUludCIsIm51bTIiLCJpc1JlcXVlc3ROb3RGb3JBdWRpdCIsInVybCIsImludmFsaWREb21haW5SZWciLCJtYXRjaCIsImZpbHRlckxpYlN0YWNrIiwic3RhY2tzIiwiZmlsdGVyIiwic3RhY2siLCJ0ZXN0IiwiZmlsZSIsInBhcnNlU3RhY2tTdHJpbmdzIiwic3RhY2tTdHIiLCJmaWx0ZXJMaWIiLCJSRUdfRVhQIiwicmVzdWx0IiwibWFwIiwiZmlsZVN0cmluZyIsImxpbmUiLCJjb2x1bW4iLCJmdW5jIiwiZ2V0Q2FsbFN0YWNrIiwiRXJyb3IiLCJvbkdlbmVyYXRlRnVuY1JlYWR5Iiwid2luZG93IiwiX19nZW5lcmF0ZUZ1bmNfXyIsInNldFRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGVBQWUsbUJBQU8sQ0FBQyxFQUFRO0FBQy9CO0FBQ0E7QUFDQSxlQUFlLFlBQW9CO0FBQ25DLGtFQUFrRSxNQUFzQyxHQUFHLFNBQU87QUFDbEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG9CQUFvQjtBQUMxRDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUNBQWlDLGFBQWEsR0FBRyxNQUFNO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msb0JBQW9CO0FBQzFEO0FBQ0Es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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDLFFBQVEsWUFBWSxjQUFjO0FBQ2pGLDZCQUE2QixxQkFBcUIsZUFBZSxTQUFTO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLFdBQVcsYUFBYSxXQUFXLFFBQVEsS0FBSyxZQUFZLGtCQUFrQjtBQUNwSjtBQUNBO0FBQ0EsNkRBQTZELEtBQUs7QUFDbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsa0JBQWtCLGlCQUFpQixnQkFBZ0I7QUFDcEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFLFFBQVE7QUFDMUU7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxxRUFBcUUsVUFBVTtBQUMvRTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0EiLCJmaWxlIjoiYXV0by1ydW4vYXVkaXRzQXV0b0VudHJ5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDExKTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgbG9nNGpzID0gcmVxdWlyZShcImxvZzRqc1wiKTtcbi8vIEB0b2RvIOi/kOiQpeinhOiMg+aXpeW/l+agvOW8j+S4uiAvaG9tZS9xc3BhY2UvbG9nL+W6lOeUqOWQjS9lcnJvci95eXl5TU1kZGhoLmxvZ1xuLy8gbG9nNGpz5LiN5pSv5oyB5Y+q5pyJcGF0dGVybueahOaWh+S7tuWQje+8jOi/memHjOaKleacuuWPluW3p+S4gOaKiu+8jOaWh+S7tuWQjeS4ujIwLCDlkI7liqDlubTku73lkI7kuKTkvY3vvIzlnKgyMTAw5YmN5rKh5pyJ6Zeu6aKY44CCQHF5YmRzaGVuXG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAncHJvZHVjdGlvbic7XG5jb25zdCBsb2dMZXZlbCA9IHByb2Nlc3MuZW52LkxPR19MRVZFTCA/IHByb2Nlc3MuZW52LkxPR19MRVZFTCA6IChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyA/ICdkZWJ1ZycgOiAnaW5mbycpO1xuY2xhc3MgTG9nZ2VyQ2xhc3Mge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmxvZ1BhdGggPSBwcm9jZXNzLmN3ZCgpICsgJy9sb2dzLyc7XG4gICAgICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcigncHJvZHVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2c0anMuZ2V0TG9nZ2VyKCdkZWJ1ZycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGluaXRMb2dnZXIobG9nUGF0aCwgYXBwaWQpIHtcbiAgICAgICAgdGhpcy5sb2dQYXRoID0gbG9nUGF0aDtcbiAgICAgICAgbG9nNGpzLmNvbmZpZ3VyZSh7XG4gICAgICAgICAgICBhcHBlbmRlcnM6IHtcbiAgICAgICAgICAgICAgICBjb25zb2xlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdjb25zb2xlJyxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF0dGVybicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBgWyVke3l5eXktTU0tZGQgaGg6bW06c3N9XSAlW1slY10gWyVwXSAlbSVdYCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmlsZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnZmlsZScsXG4gICAgICAgICAgICAgICAgICAgIGZpbGVuYW1lOiBgJHt0aGlzLmxvZ1BhdGh9LyR7YXBwaWR9LmxvZ2AsXG4gICAgICAgICAgICAgICAgICAgIG1heExvZ1NpemU6IDUyNDI4ODAwMCxcbiAgICAgICAgICAgICAgICAgICAgYWx3YXlzSW5jbHVkZVBhdHRlcm46IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIGJhY2t1cHM6IDIwLFxuICAgICAgICAgICAgICAgICAgICBsYXlvdXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdwYXR0ZXJuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdHRlcm46IGBbJWR7eXl5eS1NTS1kZCBoaDptbTpzc31dIFslY10gWyVwXSAlbSVgLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjYXRlZ29yaWVzOiB7XG4gICAgICAgICAgICAgICAgcHJvZHVjdGlvbjogeyBhcHBlbmRlcnM6IFsnY29uc29sZScsICdmaWxlJ10sIGxldmVsOiBsb2dMZXZlbCB9LFxuICAgICAgICAgICAgICAgIGRlYnVnOiB7IGFwcGVuZGVyczogWydjb25zb2xlJywgJ2ZpbGUnXSwgbGV2ZWw6IGxvZ0xldmVsIH0sXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogeyBhcHBlbmRlcnM6IFsnY29uc29sZSddLCBsZXZlbDogbG9nTGV2ZWwgfSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcigncHJvZHVjdGlvbicpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIgPSBsb2c0anMuZ2V0TG9nZ2VyKCdkZWJ1ZycpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRyYWNlKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLnRyYWNlKGZpcnN0QXJnLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgZGVidWcoZmlyc3RBcmcsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoZmlyc3RBcmcsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBpbmZvKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmluZm8oZmlyc3RBcmcsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICB3YXJuKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLndhcm4oZmlyc3RBcmcsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlcnJvcihmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihmaXJzdEFyZywgLi4uYXJncyk7XG4gICAgfVxuICAgIGZhdGFsKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmZhdGFsKGZpcnN0QXJnLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgbG9nKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmxvZyhmaXJzdEFyZywgLi4uYXJncyk7XG4gICAgfVxufVxuY29uc3QgTG9nZ2VyID0gbmV3IExvZ2dlckNsYXNzKCk7XG5leHBvcnRzLmRlZmF1bHQgPSBMb2dnZXI7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJldmVudHNcIik7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4uL2xvZ1wiKTtcbmNvbnN0IHJlcXVpcmVGdW5jID0gdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09IFwiZnVuY3Rpb25cIiA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZTtcbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5sZXQgbGliO1xuaWYgKGlzUHJvZCkge1xuICAgIGNvbnN0IGZmaSA9IHJlcXVpcmVGdW5jKCdmZmknKTtcbiAgICBsaWIgPSBmZmkuTGlicmFyeShjb25maWdfMS5JREtfTElCLCB7XG4gICAgICAgICdPc3NBdHRySW5jJzogWydpbnQnLCBbJ2ludCcsICdpbnQnLCAnaW50J11dLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVwb3J0KGlkLCBrZXksIHZhbCkge1xuICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxpYi5Pc3NBdHRySW5jKGlkLCBrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcigncmVwb3J0SWRLZXkgZmFpbCcsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoJ3JlcG9ydElkS2V5IHJlcG9ydCcsIGlkLCBrZXksIHZhbCk7XG4gICAgfVxufVxuLyoqXG4gKiDkuIrmiqXnm5HmjqfmlbDmja5cbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcbiAqL1xuZnVuY3Rpb24gcmVwb3J0SWRLZXkoa2V5LCB2YWwgPSAxKSB7XG4gICAgY29uc3QgdGVtcCA9IChrZXkgKyAnJykuc3BsaXQoJ18nKTtcbiAgICBpZiAodGVtcC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmVwb3J0KHBhcnNlSW50KHRlbXBbMF0sIDEwKSwgcGFyc2VJbnQodGVtcFsxXSwgMTApLCB2YWwpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWdfMS5NYWluSWRLZXkgJiYgdGVtcC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVwb3J0KGNvbmZpZ18xLk1haW5JZEtleSwga2V5LCB2YWwpO1xuICAgIH1cbn1cbmV4cG9ydHMucmVwb3J0SWRLZXkgPSByZXBvcnRJZEtleTtcbnZhciBjb25maWdfMiA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmV4cG9ydHMuSWRLZXkgPSBjb25maWdfMi5JZEtleTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSmltcCA9IHJlcXVpcmUoXCJqaW1wXCIpO1xuLy8gaW1wb3J0IHtFbGVtZW50SGFuZGxlfSBmcm9tIFwicHVwcGV0ZWVyXCI7XG5jb25zdCBxcyA9IHJlcXVpcmUoXCJxc1wiKTtcbmNvbnN0IHVybFV0aWwgPSByZXF1aXJlKFwidXJsXCIpO1xuLy8gaW1wb3J0IHtJZEtleX0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi4vbG9nXCIpO1xuLy8gaW1wb3J0IHtyZXBvcnRJZEtleX0gZnJvbSBcIi4uL3JlcG9ydElkS2V5XCI7XG5jb25zdCBkZXZpY2VzID0gcmVxdWlyZSgncHVwcGV0ZWVyL0RldmljZURlc2NyaXB0b3JzJyk7XG5mdW5jdGlvbiBzbGVlcCh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNsZWVwID0gc2xlZXA7XG5mdW5jdGlvbiBmcmFtZUV2YWx1YXRlKGZyYW1lLCBmdW5jLCAuLi5hcmdzKSB7XG4gICAgaWYgKCFmcmFtZS5pc0RldGFjaGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lLmV2YWx1YXRlKGZ1bmMsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuRlJBTUVfREVUQUNIRUQpO1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmcmFtZUV2YWx1YXRlIGZhaWxlZCBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGRldGFjaGVkIWApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyYW1lIGRldGFjaGVkISBuYW1lOiR7ZnJhbWUubmFtZSgpfWApO1xuICAgIH1cbn1cbmV4cG9ydHMuZnJhbWVFdmFsdWF0ZSA9IGZyYW1lRXZhbHVhdGU7XG5mdW5jdGlvbiBmcmFtZSQkKGZyYW1lLCBzZWxlY3Rvcikge1xuICAgIGlmICghZnJhbWUuaXNEZXRhY2hlZCgpKSB7XG4gICAgICAgIHJldHVybiBmcmFtZS4kJChzZWxlY3Rvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGZyYW1lLiQkIGZhaWxlZCBmcmFtZSBkZXRhY2hlZCFgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmFtZSBkZXRhY2hlZCEgbmFtZTogJHtmcmFtZS5uYW1lKCl9YCk7XG4gICAgfVxufVxuZXhwb3J0cy5mcmFtZSQkID0gZnJhbWUkJDtcbmZ1bmN0aW9uIGZyYW1lJCRldmFsKGZyYW1lLCBzZWxlY3RvciwgZnVuYywgLi4uYXJncykge1xuICAgIGlmICghZnJhbWUuaXNEZXRhY2hlZCgpKSB7XG4gICAgICAgIHJldHVybiBmcmFtZS4kJGV2YWwoc2VsZWN0b3IsIGZ1bmMsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuRlJBTUVfREVUQUNIRUQpO1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmcmFtZS4kJCBmYWlsZWQgZnJhbWUgZGV0YWNoZWQhYCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJhbWUgZGV0YWNoZWQhIG5hbWU6ICR7ZnJhbWUubmFtZSgpfWApO1xuICAgIH1cbn1cbmV4cG9ydHMuZnJhbWUkJGV2YWwgPSBmcmFtZSQkZXZhbDtcbmZ1bmN0aW9uIGZyYW1lJChmcmFtZSwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIWZyYW1lLmlzRGV0YWNoZWQoKSkge1xuICAgICAgICByZXR1cm4gZnJhbWUuJChzZWxlY3Rvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGZyYW1lLiQgZmFpbGVkIGZyYW1lIGRldGFjaGVkIWApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyYW1lIGRldGFjaGVkISBuYW1lOiAke2ZyYW1lLm5hbWUoKX1gKTtcbiAgICB9XG59XG5leHBvcnRzLmZyYW1lJCA9IGZyYW1lJDtcbmZ1bmN0aW9uIGdldERhdGFSZXBvcnREZWZhdWx0KHBhcmFtcykge1xuICAgIGNvbnN0IHsgVGFza1VybCwgUmVzdWx0U3RhdHVzLCBJc1dlYlZpZXcgPSAwLCBQYXJlbnRVcmwgPSAnJywgUGtnVW5leGlzdGVkID0gMCB9ID0gcGFyYW1zO1xuICAgIHJldHVybiB7XG4gICAgICAgIFRhc2tQYWdlOiBUYXNrVXJsLnNwbGl0KCc/JylbMF0sXG4gICAgICAgIFRhc2tVcmw6IFRhc2tVcmwuc3Vic3RyKDAsIDEwMDApLFxuICAgICAgICBSZXN1bHRQYWdlOiAnJyxcbiAgICAgICAgUmVzdWx0VXJsOiAnJyxcbiAgICAgICAgSGFzQXV0b0NsaWNrOiAwLFxuICAgICAgICBJc05ldHdvcmtJZGxlVGltZU91dDogMCxcbiAgICAgICAgSXNXZWJ2aWV3V2FpdFRpbWVPdXQ6IDAsXG4gICAgICAgIFRpbWVDb3N0OiAwLFxuICAgICAgICBJc1dlYlZpZXcsXG4gICAgICAgIFdhaXRGb3JXZWJ2aWV3RXJyb3I6IDAsXG4gICAgICAgIFJlc3VsdFN0YXR1czogUmVzdWx0U3RhdHVzIHx8IDAsXG4gICAgICAgIFVybENyYXdsQmVnaW5UaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICBQa2dVbmV4aXN0ZWQsXG4gICAgICAgIFBhcmVudFVybDogUGFyZW50VXJsLnN1YnN0cigwLCAxMDAwKVxuICAgIH07XG59XG5leHBvcnRzLmdldERhdGFSZXBvcnREZWZhdWx0ID0gZ2V0RGF0YVJlcG9ydERlZmF1bHQ7XG5mdW5jdGlvbiBnZXREZXZpY2VJbmZvKCkge1xuICAgIGNvbnN0IGlQaG9uZSA9IGRldmljZXNbJ2lQaG9uZSA2J107XG4gICAgaVBob25lLnZpZXdwb3J0LmRldmljZVNjYWxlRmFjdG9yID0gMTtcbiAgICByZXR1cm4gaVBob25lO1xufVxuZXhwb3J0cy5nZXREZXZpY2VJbmZvID0gZ2V0RGV2aWNlSW5mbztcbmZ1bmN0aW9uIGdldENvb2tpZUluZm8oYXBwdWluLCB1cmwpIHtcbiAgICBjb25zdCBkb21haW4gPSB1cmwubWF0Y2goL15odHRwcz86XFwvXFwvKFteOlxcL10rKVs6XFwvXS9pKTtcbiAgICBjb25zdCB3eHVpbiA9IGFwcHVpbiA/IGFwcHVpbiA6IERhdGUubm93KCkgKiAxMDAwICsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMDAgKyAnJywgMTApO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd3eHVpbicsXG4gICAgICAgIHZhbHVlOiB3eHVpbiArICcnLFxuICAgICAgICBleHBpcmVzOiBuZXcgRGF0ZSgnMjAzOC0wMS0xOVQwMzoxNDowNy4wMCcpLmdldFRpbWUoKSxcbiAgICAgICAgZG9tYWluOiBkb21haW4gPyBkb21haW5bMV0gOiAnd3hhY3Jhd2xlci5jb20nLFxuICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgIGh0dHBPbmx5OiBmYWxzZSxcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRDb29raWVJbmZvID0gZ2V0Q29va2llSW5mbztcbmZ1bmN0aW9uIGdldEZpbGVOYW1lQnlVcmwodXJsKSB7XG4gICAgbGV0IG5hbWUgPSB1cmwucmVwbGFjZSgvXFwufFxcL3xcXFxcfFxcKnxcXD98PXwmfCUvZywgJ18nKTtcbiAgICBpZiAobmFtZS5sZW5ndGggPiAxNjgpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDAsIDE2OCkgKyAnXycgKyBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5hbWUgKz0gJ18nICsgTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xufVxuZXhwb3J0cy5nZXRGaWxlTmFtZUJ5VXJsID0gZ2V0RmlsZU5hbWVCeVVybDtcbmZ1bmN0aW9uIGNoZWNrSW1hZ2VWYWxpZChpbWFnZVVybCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoMCk7XG4gICAgLypcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxMDApKTtcbiAgICBpZiAocmFuZCA+IDApIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGltYWdlVXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICAgICAgfSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgLzJcXGRcXGR8MzA0Ly50ZXN0KHJlc3BvbnNlLnN0YXR1c0NvZGUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudFR5cGU6IHN0cmluZyA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhgJHtjb250ZW50VHlwZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9pbWFnZS9pLnRlc3QoY29udGVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkS2V5KElkS2V5LklOVkFMSURfU0hBUkVfSU1BR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWRLZXkoSWRLZXkuQ0hFQ0tfU0hBUkVfSU1BR0VfRVJSKTtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBjaGVja1NoYXJlRGF0YUltYWdlVXJsICR7aW1hZ2VVcmx9IGZhaWxlZCEgJHtlcnJvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXBvcnRJZEtleShJZEtleS5DSEVDS19TSEFSRV9JTUFHRV9DQVRDSF9FUlIpO1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBjaGVja1NoYXJlRGF0YUltYWdlVXJsIHJlcXVlc3QgZXJyb3IgJHtpbWFnZVVybH0hICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgKi9cbn1cbmV4cG9ydHMuY2hlY2tJbWFnZVZhbGlkID0gY2hlY2tJbWFnZVZhbGlkO1xuY29uc3QgcHJlZml4ID0gU3RyaW5nKERhdGUubm93KCkpLnN1YnN0cigwLCA1KTtcbmNvbnN0IHRpbWVSZWcgPSBuZXcgUmVnRXhwKGA9JHtwcmVmaXh9XFxcXGR7OCx9KCR8JilgKTtcbmZ1bmN0aW9uIHJlcGxhY2VUaW1lU3RhbXAodXJsKSB7XG4gICAgaWYgKCF1cmwpXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgaWYgKCF0aW1lUmVnLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAvLyDpnIDopoHmm7/mjaJcbiAgICBjb25zdCBbcGF0aCwgcGFyYW1zXSA9IHVybC5zcGxpdCgnPycpO1xuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBxcy5wYXJzZShwYXJhbXMpO1xuICAgICAgICBjb25zdCBuZXdRdWVyeSA9IE9iamVjdC5rZXlzKHF1ZXJ5KS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoL15cXGR7MTMsfSQvLnRlc3QocXVlcnlba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW2tleV0gPSBxdWVyeVtrZXldO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBjb25zdCBuZXdVcmwgPSBgJHtwYXRofT8ke3FzLnN0cmluZ2lmeShuZXdRdWVyeSl9YDtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGByZXBsYWNlIHRpbWVzdGFtcDogJHt1cmx9ID0+ICR7bmV3VXJsfWApO1xuICAgICAgICByZXR1cm4gbmV3VXJsO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufVxuZXhwb3J0cy5yZXBsYWNlVGltZVN0YW1wID0gcmVwbGFjZVRpbWVTdGFtcDtcbmZ1bmN0aW9uIHJlbW92ZVVzZWxlc3NQYXJhbSh1cmwpIHtcbiAgICBpZiAoIXVybClcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICBjb25zdCB1cmxPYmogPSBuZXcgdXJsVXRpbC5VUkwodXJsLCAnaHR0cDovL21wY3Jhd2xlcicpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdwdHAnKTtcbiAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmRlbGV0ZSgncmVmX3BhZ2VfbmFtZScpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdyZWZfcGFnZV9pZCcpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdhY20nKTtcbiAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmRlbGV0ZSgnb3BlbmlkJyk7XG4gICAgdXJsT2JqLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2NvbWVmcm9tJyk7XG4gICAgY29uc3QgbmV3VXJsID0gdXJsT2JqLmhyZWYucmVwbGFjZSgnaHR0cDovL21wY3Jhd2xlci8nLCAnJyk7XG4gICAgbG9nXzEuZGVmYXVsdC5pbmZvKGBuZXdVcmwgaXMgJHtuZXdVcmx9YCk7XG4gICAgcmV0dXJuIG5ld1VybDtcbn1cbmV4cG9ydHMucmVtb3ZlVXNlbGVzc1BhcmFtID0gcmVtb3ZlVXNlbGVzc1BhcmFtO1xuZnVuY3Rpb24gaXNCbGFja1JlcXVlc3QodXJsLCBibGFja1VybExpc3QpIHtcbiAgICBpZiAoIXVybClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHVybE9iaiA9IG5ldyB1cmxVdGlsLlVSTCh1cmwsICdodHRwOi8vbXBjcmF3bGVyJyk7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IHVybE9iai5zZWFyY2hQYXJhbXMuZ2V0KCd1cmwnKTtcbiAgICBpZiAocmVxdWVzdFVybCkge1xuICAgICAgICBjb25zdCByZU1hdGNoID0gcmVxdWVzdFVybC5zcGxpdCgnPycpWzBdLm1hdGNoKC9odHRwczpcXC9cXC8oLis/KVxcLy9pKTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHJlTWF0Y2ggPyByZU1hdGNoWzFdLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpIDogXCJcIjtcbiAgICAgICAgLy8gTG9nZ2VyLmluZm8oYGJsYWNrIGhvc3QgaXMgJHtob3N0fWApXG4gICAgICAgIGlmIChibGFja1VybExpc3QuaW5kZXhPZihob3N0KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgYmxhY2sgdXJsIGlzICR7aG9zdH1gKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnN0IGhvc3QgPSByZXF1ZXN0VXJsID8gcmVxdWVzdFVybC5zcGxpdCgnPycpWzBdLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIikgOiBcIlwiO1xuICAgIC8vIExvZ2dlci5pbmZvKGB1cmxob3N0IGlzICR7aG9zdH0gYmxhY2sgdXJsIGlzICR7SlNPTi5zdHJpbmdpZnkoYmxhY2tVcmxMaXN0KX1gKTtcbiAgICAvLyBpZiAocmVxdWVzdFVybCAmJiByZXF1ZXN0VXJsLnNwbGl0KCc/JylbMF0gaW4gYmxhY2tVcmxMaXN0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5pc0JsYWNrUmVxdWVzdCA9IGlzQmxhY2tSZXF1ZXN0O1xuZnVuY3Rpb24gaXNCbGFua1BpY3R1cmUocGljKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gSmltcC5yZWFkKHBpYykudGhlbihpbWFnZSA9PiB7XG4gICAgICAgIGltYWdlID0gaW1hZ2UuZ3JleXNjYWxlKCk7IC8vIC53cml0ZSgnbGFqaWdvdS5qcGcnKTtcbiAgICAgICAgLy8gY29uc3QgdGhyZXNob2xkID0gODA7IC8vIOmYiOWAvFxuICAgICAgICBjb25zdCBwaXhlbENvbG9ySW5mbyA9IHt9OyAvLyA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIOWDj+e0oOajgOa1i1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmluZm8oYHdpZHRoPSR7aW1hZ2UuYml0bWFwLndpZHRofSBoZWlnaHQ9JHtpbWFnZS5iaXRtYXAuaGVpZ2h0fWApO1xuICAgICAgICBpbWFnZS5zY2FuKDAsIDY3LCBpbWFnZS5iaXRtYXAud2lkdGggLSAxLCBpbWFnZS5iaXRtYXAuaGVpZ2h0IC0gNjcsIGZ1bmN0aW9uICh4LCB5LCBpZHgpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBpbWFnZS5iaXRtYXAud2lkdGggLSAxICYmIHkgIT09IGltYWdlLmJpdG1hcC5oZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYml0ID0gdGhpcy5iaXRtYXAuZGF0YVtpZHggKyAwXTtcbiAgICAgICAgICAgICAgICBpZiAoIXBpeGVsQ29sb3JJbmZvW2JpdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxDb2xvckluZm9bYml0XSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBpeGVsQ29sb3JJbmZvW2JpdF0gKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGB1bmRlZmluZSBiaXQgeD0ke3h9IHk9JHt5fSBpZHg9JHtpZHh9IGJpdD0ke2JpdH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDpmY3luo9cbiAgICAgICAgY29uc3QgcGl4ZWxDb2xvckxpc3QgPSBPYmplY3Qua2V5cyhwaXhlbENvbG9ySW5mbykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBpeGVsQ29sb3JJbmZvW2FdIDwgcGl4ZWxDb2xvckluZm9bYl0gPyAxIDogLTE7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbWF4UGl4ZWxQZXJjZW50ID0gcGl4ZWxDb2xvckluZm9bcGl4ZWxDb2xvckxpc3RbMF1dIC8gKGltYWdlLmJpdG1hcC53aWR0aCAqIGltYWdlLmJpdG1hcC5oZWlnaHQpO1xuICAgICAgICBjb25zdCBzZWNvbmRQaXhlbFBlcmNlbnQgPSBwaXhlbENvbG9ySW5mb1twaXhlbENvbG9yTGlzdFsxXV0gLyAoaW1hZ2UuYml0bWFwLndpZHRoICogaW1hZ2UuYml0bWFwLmhlaWdodCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgbWF4UGl4ZWxQZXJjZW50ID0gJHttYXhQaXhlbFBlcmNlbnR9IHNlY29uZFBpeGVsUGVyY2VudCA9ICR7c2Vjb25kUGl4ZWxQZXJjZW50fWApO1xuICAgICAgICBpZiAobWF4UGl4ZWxQZXJjZW50ID4gMC41ICYmIHNlY29uZFBpeGVsUGVyY2VudCA+IDAuMikge1xuICAgICAgICAgICAgbWF4UGl4ZWxQZXJjZW50ICs9IDAuMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4UGl4ZWxQZXJjZW50ICogMTAwO1xuICAgICAgICAvLyBmb3IgKGNvbnN0IGtleSBvZiBwaXhlbENvbG9yTGlzdCkge1xuICAgICAgICAvLyAgICAgTG9nZ2VyLmluZm8oYCR7a2V5fSBjb3VudCBpcyAke3BpeGVsQ29sb3JJbmZvW2tleV19YCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKG1heFBpeGVsUGVyY2VudCoxMDAgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgaXNCbGFua1BpY3R1cmUgZmFpbGVkISAke2Vycn1gKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuaXNCbGFua1BpY3R1cmUgPSBpc0JsYW5rUGljdHVyZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZnMtZXh0cmFcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXdhaXQtdG8tanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwidXJsXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInFzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci9EZXZpY2VEZXNjcmlwdG9yc1wiKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuSURLX0xJQiA9ICcvaG9tZS9xc3BhY2UvbW1iaXp3eGFjcmF3bGVyd29ya2VyL2xpYjY0L2xpYm9zc2F0dHJhcGknO1xuZXhwb3J0cy5NYWluSWRLZXkgPSAxMTg3MjI7XG52YXIgSWRLZXk7XG4oZnVuY3Rpb24gKElkS2V5KSB7XG4gICAgSWRLZXlbSWRLZXlbXCJUQVNLX1NUQVJUXCJdID0gMV0gPSBcIlRBU0tfU1RBUlRcIjtcbiAgICBJZEtleVtJZEtleVtcIlBST0NFU1NfQ1JBU0hcIl0gPSAyXSA9IFwiUFJPQ0VTU19DUkFTSFwiO1xuICAgIElkS2V5W0lkS2V5W1wiUEFHRV9DUkFTSFwiXSA9IDNdID0gXCJQQUdFX0NSQVNIXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJUQVNLX1NVQ0NcIl0gPSA0XSA9IFwiVEFTS19TVUNDXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJDUkFXTEVSX0VSUk9SXCJdID0gNV0gPSBcIkNSQVdMRVJfRVJST1JcIjtcbiAgICBJZEtleVtJZEtleVtcIkZJUlNUX1BBR0VfUkVESVJFQ1RcIl0gPSA2XSA9IFwiRklSU1RfUEFHRV9SRURJUkVDVFwiO1xuICAgIElkS2V5W0lkS2V5W1wiRklSU1RfUEFHRV9XRUJWSUVXXCJdID0gN10gPSBcIkZJUlNUX1BBR0VfV0VCVklFV1wiO1xuICAgIElkS2V5W0lkS2V5W1wiQVVESVRTX0ZSQU1FX0RFVEFDSEVEXCJdID0gOF0gPSBcIkFVRElUU19GUkFNRV9ERVRBQ0hFRFwiO1xuICAgIElkS2V5W0lkS2V5W1wiR0VOX1JFU1VMVF9FUlJPUlwiXSA9IDldID0gXCJHRU5fUkVTVUxUX0VSUk9SXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJHRU5fUkVTVUxUX09VVF9PRl9USU1FXCJdID0gMTBdID0gXCJHRU5fUkVTVUxUX09VVF9PRl9USU1FXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJQQUdFX0lTX1dFQlZJRVdcIl0gPSAxMV0gPSBcIlBBR0VfSVNfV0VCVklFV1wiO1xuICAgIElkS2V5W0lkS2V5W1wiUEFHRV9OT19GUkFNRVwiXSA9IDEyXSA9IFwiUEFHRV9OT19GUkFNRVwiO1xuICAgIElkS2V5W0lkS2V5W1wiR0VUX0NMSUNLQUJMRV9FTEVNRU5UX0VSUk9SXCJdID0gMTNdID0gXCJHRVRfQ0xJQ0tBQkxFX0VMRU1FTlRfRVJST1JcIjtcbiAgICBJZEtleVtJZEtleVtcIkZPVU5EX05PX0NMSUNLQUJMRV9FTEVNRU5UU1wiXSA9IDE0XSA9IFwiRk9VTkRfTk9fQ0xJQ0tBQkxFX0VMRU1FTlRTXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJDTElDS19FTEVNRU5UX0VSUk9SXCJdID0gMTVdID0gXCJDTElDS19FTEVNRU5UX0VSUk9SXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJQQUdFX0VYQ0VQVElPTlwiXSA9IDE2XSA9IFwiUEFHRV9FWENFUFRJT05cIjtcbiAgICBJZEtleVtJZEtleVtcIkNPREVTVlJfUkVRVUVTVF9GQUlMRURcIl0gPSAxN10gPSBcIkNPREVTVlJfUkVRVUVTVF9GQUlMRURcIjtcbiAgICBJZEtleVtJZEtleVtcIkNPREVTVlJfUkVRVUVTVF9TVUNDXCJdID0gMThdID0gXCJDT0RFU1ZSX1JFUVVFU1RfU1VDQ1wiO1xuICAgIElkS2V5W0lkS2V5W1wiUkVRVUVTVF9TV19GQUlMRURcIl0gPSAxOV0gPSBcIlJFUVVFU1RfU1dfRkFJTEVEXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJSRVFVRVNUX1NXX1NVQ0NcIl0gPSAyMF0gPSBcIlJFUVVFU1RfU1dfU1VDQ1wiO1xuICAgIElkS2V5W0lkS2V5W1wiUkVRVUVTVF9GQUlMRURcIl0gPSAyMV0gPSBcIlJFUVVFU1RfRkFJTEVEXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJSRVFVRVNUX1NVQ0NcIl0gPSAyMl0gPSBcIlJFUVVFU1RfU1VDQ1wiO1xuICAgIElkS2V5W0lkS2V5W1wiU1FVSURfUkVRVUVTVF9GQUlMRURcIl0gPSAyM10gPSBcIlNRVUlEX1JFUVVFU1RfRkFJTEVEXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJTUVVJRF9SRVFVRVNUX1NVQ0NcIl0gPSAyNF0gPSBcIlNRVUlEX1JFUVVFU1RfU1VDQ1wiO1xuICAgIElkS2V5W0lkS2V5W1wiTkVUV09SS19JRExFX1RJTUVPVVRcIl0gPSAyNV0gPSBcIk5FVFdPUktfSURMRV9USU1FT1VUXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJUQVNLX05PX1JFU1VMVFwiXSA9IDI2XSA9IFwiVEFTS19OT19SRVNVTFRcIjtcbn0pKElkS2V5ID0gZXhwb3J0cy5JZEtleSB8fCAoZXhwb3J0cy5JZEtleSA9IHt9KSk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xuY29uc3QgcHVwcGV0ZWVyID0gcmVxdWlyZShcInB1cHBldGVlclwiKTtcbmNvbnN0IEF1ZGl0c0F1dG9fMSA9IHJlcXVpcmUoXCIuL0F1ZGl0c0F1dG9cIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCByZXBvcnRJZEtleV8xID0gcmVxdWlyZShcIi4uL3V0aWwvcmVwb3J0SWRLZXlcIik7XG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgZ2V0VGFza0VudiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcHBpZCA9IHByb2Nlc3MuZW52LmFwcGlkO1xuICAgIGNvbnN0IHRhc2tpZCA9IHByb2Nlc3MuZW52LnRhc2tpZDtcbiAgICBjb25zdCBhcHB1aW4gPSBwYXJzZUludChwcm9jZXNzLmVudi5hcHB1aW4sIDEwKSB8fCAwO1xuICAgIGNvbnN0IGluZGV4UGFnZVVybCA9IHByb2Nlc3MuZW52LmluZGV4UGFnZVVybDtcbiAgICBjb25zdCB0ZXN0VGlja2V0ID0gcHJvY2Vzcy5lbnYudGlja2V0O1xuICAgIGxldCBSRVNVTFRfUEFUSCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgLi90YXNrLyR7YXBwaWR9XyR7dGFza2lkfS9yZXN1bHRgKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYudGFza1BhdGgpIHtcbiAgICAgICAgUkVTVUxUX1BBVEggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYudGFza1BhdGgsIGAuLyR7YXBwaWR9XyR7dGFza2lkfS9yZXN1bHRgKTtcbiAgICB9XG4gICAgY29uc3QgYXVkaXRCdXNpbmVzcyA9IFsyLCA0LCA3LCAxMCwgMTMsIDE0LCAxNV07XG4gICAgY29uc3QgcmVNYXRjaCA9IGluZGV4UGFnZVVybC5tYXRjaCgvd3hhY3Jhd2xlclxcL1xcZHsxLDJ9XyhcXGR7MSwyfSlcXC8vaSk7XG4gICAgY29uc3QgYnVzaW5lc3NJZCA9IHJlTWF0Y2ggPyBwYXJzZUludChyZU1hdGNoWzFdLCAxMCkgOiAwO1xuICAgIGxldCBpc01wY3Jhd2xlciA9IGZhbHNlO1xuICAgIGlmIChhdWRpdEJ1c2luZXNzLmluZGV4T2YoYnVzaW5lc3NJZCkgPT09IC0xKSB7XG4gICAgICAgIGlzTXBjcmF3bGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHBhcmFtTGlzdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcmFtSnNvbiA9IEpTT04ucGFyc2UocHJvY2Vzcy5lbnYudGFza1BhcmFtKTtcbiAgICAgICAgaWYgKHBhcmFtSnNvbi5oYXNPd25Qcm9wZXJ0eSgncGFyYW1fbGlzdCcpKSB7XG4gICAgICAgICAgICBwYXJhbUxpc3QgPSBwYXJhbUpzb24ucGFyYW1fbGlzdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBqc29uIHBhcnNlIGVycm9yISAke3Byb2Nlc3MuZW52LnRhc2tQYXJhbX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXBwaWQsXG4gICAgICAgIHRhc2tpZCxcbiAgICAgICAgYXBwdWluLFxuICAgICAgICBpbmRleFBhZ2VVcmwsXG4gICAgICAgIHRlc3RUaWNrZXQsXG4gICAgICAgIFJFU1VMVF9QQVRILFxuICAgICAgICBpc01wY3Jhd2xlcixcbiAgICAgICAgYnVzaW5lc3NJZCxcbiAgICAgICAgcGFyYW1MaXN0XG4gICAgfTtcbn07XG4oYXN5bmMgKCkgPT4ge1xuICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5UQVNLX1NUQVJUKTtcbiAgICBjb25zdCB0YXNrU3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCB0YXNrRW52ID0gZ2V0VGFza0VudigpO1xuICAgIGNvbnN0IHsgcGFyYW1MaXN0IH0gPSB0YXNrRW52O1xuICAgIGlmIChwYXJhbUxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYHBhcmFtTGlzdCBlcnJvciEgJHtwcm9jZXNzLmVudi50YXNrUGFyYW19YCk7XG4gICAgICAgIHJldHVybiAtNDAwMDtcbiAgICB9XG4gICAgY29uc3QgY29uZmlnID0ge1xuICAgICAgICB1cmw6IHRhc2tFbnYuaW5kZXhQYWdlVXJsLFxuICAgICAgICBhcHBpZDogdGFza0Vudi5hcHBpZCxcbiAgICAgICAgdGFza2lkOiB0YXNrRW52LnRhc2tpZCxcbiAgICAgICAgYXBwdWluOiB0YXNrRW52LmFwcHVpbixcbiAgICAgICAgYnVzaW5lc3NJZDogdGFza0Vudi5idXNpbmVzc0lkLFxuICAgICAgICByZXN1bHRQYXRoOiB0YXNrRW52LlJFU1VMVF9QQVRILFxuICAgICAgICB0YXNrU3RhcnRUaW1lLFxuICAgICAgICBjcmF3bF90eXBlOiBwYXJhbUxpc3RbMF0uY3Jhd2xfdHlwZSxcbiAgICAgICAgbG9uZ2l0dWRlOiBwYXJhbUxpc3RbMF0ubG9uZ2l0dWRlLFxuICAgICAgICBsYXRpdHVkZTogcGFyYW1MaXN0WzBdLmxhdGl0dWRlLFxuICAgIH07XG4gICAgY29uc3QgbG9nUGF0aCA9IGAke3Rhc2tFbnYuUkVTVUxUX1BBVEh9YDtcbiAgICBmcy5lbnN1cmVEaXJTeW5jKGxvZ1BhdGgpO1xuICAgIGZzLmVuc3VyZURpclN5bmMoYCR7dGFza0Vudi5SRVNVTFRfUEFUSH0vc2NyZWVuc2hvdGApO1xuICAgIGZzLmVuc3VyZURpclN5bmMoYCR7dGFza0Vudi5SRVNVTFRfUEFUSH0vaHRtbGApO1xuICAgIGxvZ18xLmRlZmF1bHQuaW5pdExvZ2dlcihsb2dQYXRoLCBjb25maWcuYXBwaWQpO1xuICAgIGxldCBicm93c2VyQXJncyA9IFtdO1xuICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgYnJvd3NlckFyZ3MgPSBbXG4gICAgICAgICAgICAnLS1wcm94eS1zZXJ2ZXI9aHR0cDovL21tYml6d3hhYXVkaXRuYXRwcm94eS53eC5jb206MTExNzcnLFxuICAgICAgICAgICAgJy0tcHJveHktYnlwYXNzLWxpc3Q9MTAuMjA2LjMwLjgwOjEyMzYxOzkuMi44Ny4yMjI6MTIzNjE7KjoxODU2OSdcbiAgICAgICAgXTtcbiAgICAgICAgLy8gJy0tcHJveHktYnlwYXNzLWxpc3Q9MTAuMjA2LjMwLjgwOjEyMzYxOzkuMi44Ny4yMjI6MTIzNjEnXTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGJyb3dzZXJBcmdzID0gW1xuICAgICAgICAvLyAnLS1wcm94eS1zZXJ2ZXI9aHR0cDovLzEyNy4wLjAuMToxMjYzOSdcbiAgICAgICAgXTtcbiAgICB9XG4gICAgY29uc3QgaXNIZWFkbGVzcyA9IHByb2Nlc3MuZW52LmNocm9tZU1vZGUgPT09ICdoZWFkbGVzcyc7XG4gICAgY29uc3QgcHVwcGV0ZWVyQ29uZmlnID0ge1xuICAgICAgICBoZWFkbGVzczogaXNIZWFkbGVzcyxcbiAgICAgICAgZGV2dG9vbHM6ICFpc1Byb2QsXG4gICAgICAgIGlnbm9yZUhUVFBTRXJyb3JzOiB0cnVlLFxuICAgICAgICBhcmdzOiBbJy0tbm8tc2FuZGJveCcsICctLWRpc2FibGUtd2ViLXNlY3VyaXR5JywgLi4uYnJvd3NlckFyZ3NdLFxuICAgIH07XG4gICAgbG9nXzEuZGVmYXVsdC5pbmZvKCdwdXBwZXRlZXJDb25maWcnLCBwdXBwZXRlZXJDb25maWcpO1xuICAgIGNvbnN0IGJyb3dzZXIgPSBhd2FpdCBwdXBwZXRlZXIubGF1bmNoKHB1cHBldGVlckNvbmZpZyk7XG4gICAgcHJvY2Vzcy5vbigndW5jYXVnaHRFeGNlcHRpb24nLCBhc3luYyAoZXJyb3IpID0+IHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgY2F0Y2ggcHJvY2VzcyBlcnJvciAke2Vycm9yLm1lc3NhZ2V9XFxuICR7ZXJyb3Iuc3RhY2t9YCk7XG4gICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5QUk9DRVNTX0NSQVNIKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9KTtcbiAgICBwcm9jZXNzLm9uKCd3YXJuaW5nJywgKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQud2FybigncHJvY2VzcyBvbiB3YXJuaW5nJyk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQud2FybihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC53YXJuKGVycm9yLnN0YWNrKTtcbiAgICB9KTtcbiAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgY29uc3QgYXVkaXRzQXV0byA9IG5ldyBBdWRpdHNBdXRvXzEuZGVmYXVsdChwYWdlLCBjb25maWcpO1xuICAgIGxvZ18xLmRlZmF1bHQuaW5mbygnbmV3IEF1ZGl0c0F1dG8gQ3Jhd2xlciBzdWNjJyk7XG4gICAgYXVkaXRzQXV0by5vbigncGFnZUVycm9yJywgYXN5bmMgKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGNhdGNoIHBhZ2UgY3Jhc2ggJHtlcnJvci5tZXNzYWdlfVxcbiAke2Vycm9yLnN0YWNrfWApO1xuICAgICAgICBhd2FpdCBicm93c2VyLmNsb3NlKCk7XG4gICAgICAgIHByb2Nlc3MuZXhpdCgpO1xuICAgIH0pO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHRhc2tSZXN1bHQgPSBhd2FpdCBhdWRpdHNBdXRvLnN0YXJ0KCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgVGltZSBjb3N0ICR7TWF0aC5yb3VuZCgoRGF0ZS5ub3coKSAtIHRhc2tTdGFydFRpbWUpIC8gMTAwMCl9IHNgKTtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKCdBdWRpdHMgcmVzdWx0OiAnLCBKU09OLnN0cmluZ2lmeSh0YXNrUmVzdWx0KSk7XG4gICAgICAgIGlmICh0YXNrUmVzdWx0KSB7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuVEFTS19TVUNDKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5UQVNLX05PX1JFU1VMVCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgY2F0Y2ggbWFpbiBlcnJvciAke2UubWVzc2FnZX1cXG4gJHtlLnN0YWNrfWApO1xuICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuQ1JBV0xFUl9FUlJPUik7XG4gICAgICAgIGF3YWl0IGJyb3dzZXIuY2xvc2UoKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KCk7XG4gICAgfVxufSkoKTtcbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlclwiKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGZzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoXCJwYXRoXCIpO1xuY29uc3QgYXdhaXRfdG9fanNfMSA9IHJlcXVpcmUoXCJhd2FpdC10by1qc1wiKTtcbmNvbnN0IE5ldHdvcmtMaXN0ZW5lcl8xID0gcmVxdWlyZShcIi4vTmV0d29ya0xpc3RlbmVyXCIpO1xuY29uc3QgSGlqYWNrXzEgPSByZXF1aXJlKFwiLi9iYXNlL0hpamFja1wiKTtcbmNvbnN0IFBhZ2VCYXNlXzEgPSByZXF1aXJlKFwiLi9iYXNlL1BhZ2VCYXNlXCIpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKFwiLi4vdXRpbC91dGlsc1wiKTtcbmNvbnN0IGRldmljZXMgPSByZXF1aXJlKFwicHVwcGV0ZWVyL0RldmljZURlc2NyaXB0b3JzXCIpO1xuY29uc3QgcmVwb3J0SWRLZXlfMSA9IHJlcXVpcmUoXCIuLi91dGlsL3JlcG9ydElkS2V5XCIpO1xuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCB0aW1lKSk7XG59XG5jb25zdCBUSU1FX0xJTUlUID0gMTggKiA2MCAqIDEwMDA7XG5jb25zdCBpUGhvbmVYID0gZGV2aWNlc1snaVBob25lIFgnXTtcbmlQaG9uZVgudmlld3BvcnQuZGV2aWNlU2NhbGVGYWN0b3IgPSAxO1xuY2xhc3MgQXVkaXRzQXV0byBleHRlbmRzIFBhZ2VCYXNlXzEuZGVmYXVsdCB7XG4gICAgY29uc3RydWN0b3IocGFnZSwgb3B0aW9ucykge1xuICAgICAgICBzdXBlcihwYWdlKTtcbiAgICAgICAgdGhpcy5jbGlja0NudCA9IDA7XG4gICAgICAgIHRoaXMud3hDb25maWcgPSB7fTtcbiAgICAgICAgdGhpcy51cmxQYXRoTWFwID0ge307XG4gICAgICAgIHRoaXMuZWxlbWVudENsaWNrQ291bnRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudFRleHRNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuZHJpdmVyU3RhcnRUaW1lID0gMDtcbiAgICAgICAgdGhpcy50YXNrRmluaXNoZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5qc0NvdmVyYWdlID0gJyc7XG4gICAgICAgIHRoaXMuaXNUaW1lb3V0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuYXBwaWQgPSBvcHRpb25zLmFwcGlkIHx8ICcnO1xuICAgICAgICB0aGlzLmFwcHVpbiA9IG9wdGlvbnMuYXBwdWluO1xuICAgICAgICB0aGlzLnRhc2tpZCA9IG9wdGlvbnMudGFza2lkO1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmluZGV4UGFnZVVybCA9IG9wdGlvbnMudXJsIHx8ICcnO1xuICAgICAgICB0aGlzLnJlc3VsdFBhdGggPSBvcHRpb25zLnJlc3VsdFBhdGg7XG4gICAgICAgIHRoaXMudGFza1N0YXJ0VGltZSA9IG9wdGlvbnMudGFza1N0YXJ0VGltZTtcbiAgICAgICAgdGhpcy5sb25naXR1ZGUgPSBvcHRpb25zLmxvbmdpdHVkZSB8fCAxMTMuMjY0NTtcbiAgICAgICAgdGhpcy5sYXRpdHVkZSA9IG9wdGlvbnMubGF0aXR1ZGUgfHwgMjMuMTI4ODtcbiAgICAgICAgdGhpcy5oaWphY2sgPSBuZXcgSGlqYWNrXzEuZGVmYXVsdChwYWdlKTtcbiAgICAgICAgdGhpcy5uZXR3b3JrTGlzdGVuZXIgPSBuZXcgTmV0d29ya0xpc3RlbmVyXzEuZGVmYXVsdCh0aGlzLnBhZ2UpO1xuICAgICAgICB0aGlzLnRhc2tSZXN1bHQgPSB7IHBhZ2VzOiBbXSwgbW1kYXRhOiBbXSB9O1xuICAgICAgICB0aGlzLmluaXQoKTtcbiAgICB9XG4gICAgaW5pdCgpIHtcbiAgICAgICAgdGhpcy5pbml0UGFnZUV2ZW50KCk7XG4gICAgICAgIHRoaXMuaW5pdE5ldHdvcmtFdmVudCgpO1xuICAgICAgICB0aGlzLnRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbygnc3RhcnQgY291bnQgZG93bicpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcigndGltZW91dCcpKTtcbiAgICAgICAgICAgIH0sIFRJTUVfTElNSVQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaW5pdE5ldHdvcmtFdmVudCgpIHtcbiAgICAgICAgdGhpcy5uZXR3b3JrTGlzdGVuZXIub24oJ09OX1JFUVVFU1RfRVZFTlQnLCAobWVzc2FnZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZW5kTmV0d29ya0V2ZW50MkZyYW1lKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnT05fUkVRVUVTVF9FVkVOVCcsXG4gICAgICAgICAgICAgICAgZGF0YTogbWVzc2FnZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBzZW5kTmV0d29ya0V2ZW50MkZyYW1lKG1lc3NhZ2UpIHtcbiAgICAgICAgY29uc3QgW3NlbmRNZXNzYWdlRXJyb3JdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS5ldmFsdWF0ZSgoYXVkaXRzRnJhbWUsIG1lc3NhZ2UpID0+IHtcbiAgICAgICAgICAgIGlmIChhdWRpdHNGcmFtZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1zZyA9IEpTT04ucGFyc2UobWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgbXNnLnByb3RvY29sID0gJ0FVRElUU19GUkFNRSc7XG4gICAgICAgICAgICAgICAgYXVkaXRzRnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtc2cpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCBhd2FpdCB0aGlzLnBhZ2UuJCgnI2F1ZGl0c0ZyYW1lJyksIEpTT04uc3RyaW5naWZ5KG1lc3NhZ2UpKSk7XG4gICAgICAgIGlmIChzZW5kTWVzc2FnZUVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignc2VuZCBuZXR3b3JrIGV2ZW50IGVycm9yJywgc2VuZE1lc3NhZ2VFcnJvcik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgc3RhcnQocmV0cnlDbnQgPSAwKSB7XG4gICAgICAgIGlmIChyZXRyeUNudCA+IDIpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKCdzdGFydCBjcmF3bCBmYWlsZWQsIHJldHJ5IDMgdGltZXMnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXJldHJ5Q250KSB7XG4gICAgICAgICAgICBhd2FpdCB0aGlzLmluaXRQYWdlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgaW5kZXhQYWdlVXJsOiAke3RoaXMuaW5kZXhQYWdlVXJsfWApO1xuICAgICAgICBjb25zdCBbZ290b0Vycm9yLCBwYWdlUmVzcG9uc2VdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS5nb3RvKHRoaXMuaW5kZXhQYWdlVXJsKSk7XG4gICAgICAgIGlmIChnb3RvRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBnb3RvRXJyb3IgJHtnb3RvRXJyb3IubWVzc2FnZX1cXG4ke2dvdG9FcnJvci5zdGFja30sIHJldHJ5YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydChyZXRyeUNudCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYWdlUmVzcG9uc2UpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYWluID0gcGFnZVJlc3BvbnNlLnJlcXVlc3QoKS5yZWRpcmVjdENoYWluKCk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBwYWdlUmVzcG9uc2UgaXMgb2tbJHtwYWdlUmVzcG9uc2Uub2soKX1dIGNoYWluIGxlbmd0aCBbJHtjaGFpbi5sZW5ndGh9XSAke2NoYWluLm1hcCgocmVxKSA9PiByZXEudXJsKCkpfWApO1xuICAgICAgICAgICAgaWYgKCFwYWdlUmVzcG9uc2Uub2soKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBwYWdlIHJlc3BvbnNlIGVycm9yLCBzdGF0dXNDb2RlWyR7cGFnZVJlc3BvbnNlLnN0YXR1cygpfV0sIGZhaWx1cmVbJHtwYWdlUmVzcG9uc2UucmVxdWVzdCgpLmZhaWx1cmUoKX1dYCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQocmV0cnlDbnQgKyAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBjb25zdCBbd2FpdEZvckFwcHNlcnZpY2VFcnJvcl0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodGhpcy5wYWdlLndhaXRGb3IoKCkgPT4gISFkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwc2VydmljZScpKSk7XG4gICAgICAgIGlmICh3YWl0Rm9yQXBwc2VydmljZUVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgd2FpdEZvciBhcHBzZXJ2aWNlIGVycm9yICR7d2FpdEZvckFwcHNlcnZpY2VFcnJvci5tZXNzYWdlfVxcbiR7d2FpdEZvckFwcHNlcnZpY2VFcnJvci5zdGFja30sIHJldHJ5YCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydChyZXRyeUNudCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdhcHBzZXJ2aWNlIHJlYWR5Jyk7XG4gICAgICAgIGF3YWl0IHRoaXMuaGlqYWNrLmhpamFja0RlZmF1bHQoe1xuICAgICAgICAgICAgbG9uZ2l0dWRlOiB0aGlzLmxvbmdpdHVkZSxcbiAgICAgICAgICAgIGxhdGl0dWRlOiB0aGlzLmxhdGl0dWRlXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCB0aGlzLmhpamFjay5oaWphY2tQYWdlRXZlbnQoKTtcbiAgICAgICAgLy8g6LKM5Ly85LiN5LiA5a6a55uR5ZCs5b6X5Yiw77yM6LaF5pe25Lmf5YWB6K6457un57ut6LeRXG4gICAgICAgIGNvbnN0IFtkb21SZWFkeVRpbWVvdXRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMuaGlqYWNrLndhaXRGb3JQYWdlRXZlbnQoXCJfX0RPTVJlYWR5XCIsIHsgdGltZW91dDogMTIwMDAgfSkpO1xuICAgICAgICBpZiAoZG9tUmVhZHlUaW1lb3V0KSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgcGFnZSBldmVudCBbX19ET01SZWFkeV0gdGltZW91dC4gVHJ5IHRvIG9udGludWUuYCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW3dlYnZpZXdNYW5hZ2VyVGltZW91dF0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodGhpcy5wYWdlLndhaXRGb3IoKCkgPT4gd2luZG93Lm5hdGl2ZSAmJiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyICYmIHdpbmRvdy5uYXRpdmUud2Vidmlld01hbmFnZXIuZ2V0Q3VycmVudCgpICE9IG51bGwpKTtcbiAgICAgICAgaWYgKHdlYnZpZXdNYW5hZ2VyVGltZW91dCkge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ3dhaXQgZm9yIHdlYnZpZXdNYW5hZ2VyIHJlYWR5IHRpbWVvdXQnKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KHJldHJ5Q250ICsgMSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy53eENvbmZpZyA9IGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB3aW5kb3cuX193eENvbmZpZyk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ3d4Q29uZmlnIHJlYWR5Jyk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ2NoZWNraW5nIGlzIHJlZGlyZWN0Jyk7XG4gICAgICAgIGNvbnN0IGlzUGFnZVJlZGlyZWN0ZWQgPSBhd2FpdCB0aGlzLmlzUGFnZVJlZGlyZWN0ZWQodGhpcy5pbmRleFBhZ2VVcmwpO1xuICAgICAgICBpZiAoaXNQYWdlUmVkaXJlY3RlZCkge1xuICAgICAgICAgICAgLy8gcmVkaXJlY3QgbWVhbnMgcGFja2FnZSBpcyBub3QgZXhpc3RcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKCdwYWdlIHJlZGlyZWN0ZWQsIHBhY2thZ2UgaXMgbm90IGV4aXN0Jyk7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuRklSU1RfUEFHRV9SRURJUkVDVCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5UYXNrUmVzdWx0KHt9KTtcbiAgICAgICAgfVxuICAgICAgICAvLyDov5nph4zlhYhzbGVlcCAxc++8jHdhaXRGb3JDdXJyZW50RnJhbWVJZGxl5qOA5p+l55qE5pe25YCZXG4gICAgICAgIC8vIOWPr+iDvemhtemdoueahOivt+axgumDveayoeW8gOWni+WPkei1t++8jOmAoOaIkGlkbGXnmoTlgYfosaFcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCd3YWl0aW5nIGZvciBmcmFtZSBpZGxlJyk7XG4gICAgICAgIGNvbnN0IHdhaXRGcmFtZUluZm8gPSBhd2FpdCB0aGlzLndhaXRGb3JDdXJyZW50RnJhbWVJZGxlKCk7XG4gICAgICAgIGlmICh3YWl0RnJhbWVJbmZvLmhhc1dlYnZpZXcpIHtcbiAgICAgICAgICAgIC8vIGhhcyB3ZWJ2aWV3IG1lYW5zIG5vIG90aGVyIGNvbXBvbmVudHMgc2hvd25cbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKCdoYXMgd2VidmlldyBhdCB0aGUgYmVnaW5uaW5nLCBub3RoaW5nIHRvIGRvJyk7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuRklSU1RfUEFHRV9XRUJWSUVXKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlblRhc2tSZXN1bHQoe30pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdmcmFtZSBpZGxlIHRpbWUnLCB0aGlzLmdldFRpbWUoKSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRQcm9taXNlLFxuICAgICAgICAgICAgbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3RhcnRPcGVyYXRlKCk7XG4gICAgICAgICAgICAgICAgLy8gYXdhaXQgc2xlZXAoNjAwMDAwMClcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdmaW5pc2hlZCcpKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIF0pLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBFcnJvcignZmluaXNoZWQnKSk7XG4gICAgICAgIH0pLmNhdGNoKGFzeW5jIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYgKGVycm9yLm1lc3NhZ2UgPT0gJ2ZpbmlzaGVkJykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oJ2NyYXdsIGZpbmlzaGVkIGluIHRpbWUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuaXNUaW1lb3V0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdjcmF3bCB0aW1lb3V0LCBzdG9wIGF1ZGl0cyB0byBnZXQgcmVzdWx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBqc0NvdmVyYWdlID0gYXdhaXQgdGhpcy5wYWdlLmNvdmVyYWdlLnN0b3BKU0NvdmVyYWdlKCk7XG4gICAgICAgICAgICBjb25zdCBzZXJ2aWNlQ292ZXJhZ2UgPSBqc0NvdmVyYWdlLmZpbHRlcigoaXRlbSkgPT4gL2FwcFxcLXNlcnZpY2VcXC5qcy8udGVzdChpdGVtLnVybCkpWzBdO1xuICAgICAgICAgICAgaWYgKHNlcnZpY2VDb3ZlcmFnZSAmJiBzZXJ2aWNlQ292ZXJhZ2UucmFuZ2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qc0NvdmVyYWdlID0gKDEwMCAqIHNlcnZpY2VDb3ZlcmFnZS5yYW5nZXMucmVkdWNlKCh0b3RhbCwgaXRlbSkgPT4gdG90YWwgKyBpdGVtLmVuZCAtIGl0ZW0uc3RhcnQsIDApIC8gc2VydmljZUNvdmVyYWdlLnRleHQubGVuZ3RoKS50b0ZpeGVkKDIpICsgJyUnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5qc0NvdmVyYWdlID0gJzAlJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFza0ZpbmlzaGVkVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGB0aW1lIHVzZWQgJHt0aGlzLnRhc2tGaW5pc2hlZFRpbWUgLSB0aGlzLnRhc2tTdGFydFRpbWV9bXNgKTtcbiAgICAgICAgICAgIGNvbnN0IGF1ZGl0c0ZyYW1lID0gdGhpcy5wYWdlLmZyYW1lcygpLmZpbmQoKGZyYW1lKSA9PiBmcmFtZS5uYW1lKCkgPT0gJ2F1ZGl0c0ZyYW1lJyk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdhdWRpdGVkIHBhZ2VzJywgT2JqZWN0LmtleXModGhpcy51cmxQYXRoTWFwKSk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBwYWdlIGNvdmVyYWdlOiAke09iamVjdC5rZXlzKHRoaXMudXJsUGF0aE1hcCkubGVuZ3RofS8ke3RoaXMud3hDb25maWcucGFnZXMubGVuZ3RofWApO1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhganMgY292ZXJhZ2U6ICR7dGhpcy5qc0NvdmVyYWdlfWApO1xuICAgICAgICAgICAgaWYgKGF1ZGl0c0ZyYW1lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbygnaGFzIGF1ZGl0c0ZyYW1lJyk7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMjAwMCk7XG4gICAgICAgICAgICAgICAgY29uc3QgW3N0b3BBdWRpdEVycm9yXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChhdWRpdHNGcmFtZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5vblN0b3BDbGlja2VkKCk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgIGlmIChzdG9wQXVkaXRFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignc3RvcCBhdWRpdCBlcnJvcicsIHN0b3BBdWRpdEVycm9yKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgW3dhaXRGb3JFcnJvcl0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodGhpcy5wYWdlLndhaXRGb3JGdW5jdGlvbigoKSA9PiAhIXdpbmRvdy5hdWRpdHNSZXN1bHQsIHsgdGltZW91dDogMTAwMDAgfSkpO1xuICAgICAgICAgICAgICAgIGlmICh3YWl0Rm9yRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LkdFTl9SRVNVTFRfT1VUX09GX1RJTUUpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignd2FpdGluZyBhdWRpdHMgcmVzdWx0IGVycm9yOiAnLCB3YWl0Rm9yRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5UYXNrUmVzdWx0KHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29uc3QgW2F1ZGl0c0Vycm9yLCBhdWRpdHNSZXN1bHRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB3aW5kb3cuYXVkaXRzUmVzdWx0KSk7XG4gICAgICAgICAgICAgICAgaWYgKGF1ZGl0c0Vycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5HRU5fUkVTVUxUX0VSUk9SKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ2dldHRpbmcgYXVkaXRzIHJlc3VsdCBlcnJvcjogJywgYXVkaXRzRXJyb3IpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5nZW5UYXNrUmVzdWx0KHt9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2VuVGFza1Jlc3VsdChhdWRpdHNSZXN1bHQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ2F1ZGl0c0ZyYW1lIGRldGFjaGVkLCBubyBhdWRpdHMgcmVzdWx0Jyk7XG4gICAgICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LkFVRElUU19GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuVGFza1Jlc3VsdCh7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyBpbml0UGFnZSgpIHtcbiAgICAgICAgdGhpcy5kcml2ZXJTdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2Uuc2V0Q29va2llKHV0aWxzLmdldENvb2tpZUluZm8odGhpcy5hcHB1aW4sIHRoaXMuaW5kZXhQYWdlVXJsKSk7IC8vIOi3s+i9rOWJjeenjeWFpXd4dWluIGNvb2tpZe+8jOehruS/neaJgOacieivt+axgumDveWIsOS4gOWPsOacuuWZqFxuICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZW11bGF0ZShpUGhvbmVYKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLmNvdmVyYWdlLnN0YXJ0SlNDb3ZlcmFnZSgpO1xuICAgIH1cbiAgICBhc3luYyBzdGFydE9wZXJhdGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnd4Q29uZmlnLnRhYkJhcikge1xuICAgICAgICAgICAgY29uc3QgbGlzdCA9IHRoaXMud3hDb25maWcudGFiQmFyLmxpc3Q7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCd0YWJiYXIgbGlzdCcsIGxpc3QubWFwKChpdGVtKSA9PiBgW3RpdGxlXSAke2l0ZW0udGV4dH0gW3BhdGhdICR7aXRlbS5wYWdlUGF0aH1gKS5qb2luKCdcXG4nKSk7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYGNyYXdsaW5nIHBhZ2UgJHtsaXN0W2ldLnBhZ2VQYXRofWApO1xuICAgICAgICAgICAgICAgIGNvbnN0IFtzd2l0Y2hUYWJFcnJvcl0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodGhpcy5wYWdlLmV2YWx1YXRlKCh1cmwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5uYXZpZ2F0b3Iuc3dpdGNoVGFiKHVybCk7XG4gICAgICAgICAgICAgICAgfSwgbGlzdFtpXS5wYWdlUGF0aCkpO1xuICAgICAgICAgICAgICAgIGlmICghc3dpdGNoVGFiRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmF3bEN1cnJlbnRXZWJ2aWV3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgc3dpdGNoIHRhYiBlcnJvcjogJHtzd2l0Y2hUYWJFcnJvci5tZXNzYWdlfVxcbiR7c3dpdGNoVGFiRXJyb3Iuc3RhY2t9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmF3bEN1cnJlbnRXZWJ2aWV3KCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgY3Jhd2xDdXJyZW50V2VidmlldygpIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgY29uc3Qgd2Vidmlld05hdGl2ZUhhbmRsZSA9IGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZUhhbmRsZSgoKSA9PiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKSk7XG4gICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUod2VidmlldyA9PiB3ZWJ2aWV3LnVybCwgd2Vidmlld05hdGl2ZUhhbmRsZSk7XG4gICAgICAgIGNvbnN0IHVybFBhdGggPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgICAgICAgdGhpcy51cmxQYXRoTWFwW3VybFBhdGhdID0gdGhpcy51cmxQYXRoTWFwW3VybFBhdGhdIHx8IHtcbiAgICAgICAgICAgIGlzV2VidmlldzogZmFsc2UsXG4gICAgICAgICAgICBjbnQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudXJsUGF0aE1hcFt1cmxQYXRoXS5jbnQgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGAke3VybFBhdGh9IGhhcyBjcmF3bGVkIDMgdGltZXNgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybFBhdGhNYXBbdXJsUGF0aF0uY250Kys7XG4gICAgICAgIGNvbnN0IHsgaGFzV2VidmlldywgZnJhbWUgfSA9IGF3YWl0IHRoaXMuaXNDdXJyZW50RnJhbWVSZWFkeTRDcmF3bCgpO1xuICAgICAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignY3VycmVudCBmcmFtZSBjYW4gbm90IGJlIGNyYXdsaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW2dldFRpdGxlRXJyb3IsIHRpdGxlXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChmcmFtZS5ldmFsdWF0ZSgoKSA9PiBkb2N1bWVudC50aXRsZSkpO1xuICAgICAgICBpZiAoZ2V0VGl0bGVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGdldFRpdGxlRXJyb3JgLCBnZXRUaXRsZUVycm9yKTtcbiAgICAgICAgICAgIGlmIChmcmFtZS5pc0RldGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2cuaW5mbygncGFnZSB0aXRsZTogJywgdGl0bGUpO1xuICAgICAgICBsZXQgZmlsZW5hbWUgPSB1dGlscy5nZXRGaWxlTmFtZUJ5VXJsKHVybCk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ3BhZ2Ugc2F2ZSBmaWxlbmFtZTogJywgdXJsKTtcbiAgICAgICAgY29uc3QgW2dldFBhZ2VTdGFja0Vycm9yLCBwYWdlU3RhY2tdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldFBhZ2VTdGFjaygpLm1hcCgod2VidmlldykgPT4gd2Vidmlldy5wYXRoKSkpO1xuICAgICAgICBpZiAoZ2V0UGFnZVN0YWNrRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBnZXRQYWdlU3RhY2tFcnJvcmAsIGdldFBhZ2VTdGFja0Vycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZy5pbmZvKCdwYWdlU3RhY2snLCBwYWdlU3RhY2spO1xuICAgICAgICBjb25zdCBbc2F2ZUVycm9yXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLnNhdmVTY3JlZW5TaG90KGZpbGVuYW1lKSxcbiAgICAgICAgICAgIHRoaXMuc2F2ZUZyYW1lSHRtbChmcmFtZSwgZmlsZW5hbWUpXG4gICAgICAgIF0pKTtcbiAgICAgICAgaWYgKHNhdmVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYHNhdmUgZXJyb3IgJHtzYXZlRXJyb3IubWVzc2FnZX1cXG4ke3NhdmVFcnJvci5zdGFja31gKTtcbiAgICAgICAgICAgIGZpbGVuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFzV2Vidmlldykge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jbGlja0VsZW1lbnRzKGZyYW1lLCB3ZWJ2aWV3TmF0aXZlSGFuZGxlLCB1cmxQYXRoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudXJsUGF0aE1hcFt1cmxQYXRoXS5pc1dlYnZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ2hhc1dlYnZpZXchISEhISEhISEnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnRhc2tSZXN1bHQucGFnZXMucHVzaCh7XG4gICAgICAgICAgICB0YXNrX3VybDogdGhpcy5pbmRleFBhZ2VVcmwuc3BsaXQoJyMhJylbMV0gfHwgJycsXG4gICAgICAgICAgICBwYXRoOiB1cmxQYXRoLFxuICAgICAgICAgICAgZnVsbF9wYXRoOiB1cmwsXG4gICAgICAgICAgICBwYWdlc3RhY2s6IHBhZ2VTdGFjayxcbiAgICAgICAgICAgIHBpYzogZmlsZW5hbWUgPyBgJHtmaWxlbmFtZX0uanBnYCA6ICcnLFxuICAgICAgICAgICAgaHRtbDogZmlsZW5hbWUgPyBgJHtmaWxlbmFtZX0uaHRtbGAgOiAnJyxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSAhPT0gdW5kZWZpbmVkID8gdGl0bGUgOiAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgIGxldmVsOiBwYWdlU3RhY2subGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIHJlYWNoVHlwZTogMCxcbiAgICAgICAgICAgIGlzX3dlYnZpZXc6IGhhc1dlYnZpZXcgPyAxIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgY3Jhd2wgdXJsICR7dXJsfSBkb25lYCk7XG4gICAgfVxuICAgIGFzeW5jIGlzQ3VycmVudEZyYW1lUmVhZHk0Q3Jhd2woKSB7XG4gICAgICAgIGNvbnN0IHsgaGFzV2VidmlldywgZnJhbWUsIGlkIH0gPSBhd2FpdCB0aGlzLndhaXRGb3JDdXJyZW50RnJhbWVJZGxlKCk7XG4gICAgICAgIGlmICghZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1dlYnZpZXcgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzV2Vidmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldywgZnJhbWUgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDov5nph4zlhYhzbGVlcCAxc++8jHdhaXRGb3JDdXJyZW50RnJhbWVJZGxl5qOA5p+l55qE5pe25YCZXG4gICAgICAgIC8vIOWPr+iDvemhtemdoueahOW+iOWkmuivt+axgumDveayoeW8gOWni+WPkei1t++8jOmAoOaIkGlkbGXnmoTlgYfosaFcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYHdhaXRpbmcgZm9yIGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gd2VidmlldyByZWFkeWApO1xuICAgICAgICBjb25zdCBzdGFydFRvV2FpdCA9IERhdGUubm93KCk7XG4gICAgICAgIGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChmcmFtZS53YWl0Rm9yRnVuY3Rpb24oKCkgPT4gISF3aW5kb3cud2Vidmlldywge1xuICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgfSwgaWQpKTtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnd2VidmlldyBvYmplY3QgcmVhZHknKTtcbiAgICAgICAgaWYgKGZyYW1lLmlzRGV0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgb2ggZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBkZXRhY2hlZGApO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmluZm8oYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gd2VidmlldyByZWFkeSwgdGltZTogJHtEYXRlLm5vdygpIC0gc3RhcnRUb1dhaXR9bXNgKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldywgZnJhbWUgfTtcbiAgICB9XG4gICAgYXN5bmMgY2xpY2tFbGVtZW50cyhmcmFtZSwgd2Vidmlld05hdGl2ZUhhbmRsZSwgcGFnZVBhdGgpIHtcbiAgICAgICAgY29uc3QgbWF0Y2hSZXN1bHQgPSAvd2Vidmlldy0oXFxkKykvLmV4ZWMoZnJhbWUubmFtZSgpKTtcbiAgICAgICAgaWYgKCFtYXRjaFJlc3VsdCkge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gaXMgbm90IHdlYnZlaXdgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBpZCA9ICttYXRjaFJlc3VsdFsxXTtcbiAgICAgICAgY29uc3QgW2dldFdlYnZpZXdFcnJvciwgd2Vidmlld0Jyb3dzZXJIYW5kbGVdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLmV2YWx1YXRlSGFuZGxlKCgpID0+IHdpbmRvdy53ZWJ2aWV3KSk7XG4gICAgICAgIGlmIChnZXRXZWJ2aWV3RXJyb3IgfHwgIXdlYnZpZXdCcm93c2VySGFuZGxlKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignZ2V0V2Vidmlld0Vycm9yJywgZ2V0V2Vidmlld0Vycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgW2dldENsaWNrYWJsZUVsZW1lbnRzRXJyb3IsIGVsZW1lbnRzSGFuZGxlXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdCh0aGlzLmdldENsaWNrYWJsZUVsZW1lbnRzKGZyYW1lLCB3ZWJ2aWV3QnJvd3NlckhhbmRsZSkpO1xuICAgICAgICBpZiAoZ2V0Q2xpY2thYmxlRWxlbWVudHNFcnJvcikge1xuICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LkdFVF9DTElDS0FCTEVfRUxFTUVOVF9FUlJPUik7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignZ2V0Q2xpY2thYmxlRWxlbWVudHNFcnJvcicsIGdldENsaWNrYWJsZUVsZW1lbnRzRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZWxlbWVudHNIYW5kbGUgfHwgZWxlbWVudHNIYW5kbGUubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5GT1VORF9OT19DTElDS0FCTEVfRUxFTUVOVFMpO1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gbm8gZWxlbWVudHNIYW5kbGUgZm91bmRgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZWxlbWVudHNIYW5kbGUubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHsgaGFuZGxlLCBrZXkgfSA9IGVsZW1lbnRzSGFuZGxlW2ldO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAvLyDov4fmu6Tph43lpI3ngrnlh7tcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbGVtZW50VGV4dE1hcC5nZXQoa2V5LnRleHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYHRleHRLZXlbJHtrZXkudGV4dEtleX1dIGhhcyBiZWVuIGNsaWNrYCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyDov4fmu6TliJfooajpobnlpKrlpJrml7bnmoTngrnlh7tcbiAgICAgICAgICAgICAgICBsZXQga2V5Q2xpY2tDbnQgPSB0aGlzLmVsZW1lbnRDbGlja0NvdW50TWFwLmdldChrZXkudGFnQ2xhc3NLZXkpIHx8IDA7XG4gICAgICAgICAgICAgICAgaWYgKGtleUNsaWNrQ250ID4gMykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBjbGljayBrZXlbJHtrZXkudGFnQ2xhc3NLZXl9XVske2tleUNsaWNrQ250fSB0aW1lc10gb3V0IG9mIGNsaWNrIGxpbWl0YCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBpc0NsaWNrYWJsZSA9IGF3YWl0IHRoaXMuZWxlbWVudENsaWNrYWJsZShmcmFtZSwgaGFuZGxlKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBpcyBlbGVtZW50WyR7a2V5LnRhZ0NsYXNzS2V5fV0gY2xpY2thYmxlICR7aXNDbGlja2FibGV9YCk7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0NsaWNrYWJsZSlcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAga2V5Q2xpY2tDbnQrKztcbiAgICAgICAgICAgICAgICB0aGlzLmVsZW1lbnRUZXh0TWFwLnNldChrZXkudGV4dEtleSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Q2xpY2tDb3VudE1hcC5zZXQoa2V5LnRhZ0NsYXNzS2V5LCBrZXlDbGlja0NudCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGlja0NudCsrO1xuICAgICAgICAgICAgICAgIC8vIGNvbnN0IGZ1Y29zQm9yZGVySGFuZGxlID0gYXdhaXQgdGhpcy5hZGRSZWRCb3JkZXI0SGFuZGxlKGZyYW1lLCBoYW5kbGUpXG4gICAgICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5zYXZlU2NyZWVuU2hvdCgpXG4gICAgICAgICAgICAgICAgLy8gYXdhaXQgZnJhbWUuZXZhbHVhdGUoKHJlZEJvcmRlckhhbmRsZSkgPT4ge1xuICAgICAgICAgICAgICAgIC8vICAgcmVkQm9yZGVySGFuZGxlLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgLy8gfSwgZnVjb3NCb3JkZXJIYW5kbGUpXG4gICAgICAgICAgICAgICAgLy8gYXdhaXQgdGhpcy5zY3JlZW5zaG90QmVmb3JlQ2xpY2soZnJhbWUsIGhhbmRsZSlcbiAgICAgICAgICAgICAgICBhd2FpdCBoYW5kbGUudGFwKCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgY2xpY2tlZCBrZXlbJHtrZXkudGFnQ2xhc3NLZXl9XVske2tleUNsaWNrQ250fSB0aW1lc11bJHtrZXkudGV4dEtleS5zdWJzdHIoMCwgMzApfV0gJHtrZXkudGFnQ2xhc3NLZXl9IGF0IHBhZ2UgJHtwYWdlUGF0aH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LkNMSUNLX0VMRU1FTlRfRVJST1IpO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKHBhZ2VQYXRoLCAnfCcsIGUubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodGhpcy53YWl0Rm9yRnJhbWVDaGFuZ2UoaWQsIHsgdGltZW91dDogMTAwMCB9KSk7XG4gICAgICAgICAgICBsZXQgaXNGcmFtZURldGFjaGVkID0gZnJhbWUuaXNEZXRhY2hlZCgpO1xuICAgICAgICAgICAgbGV0IGlzV2Vidmlld0NoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGxldCBkZXRlY3RDaGFuZ2VFcnJvcjtcbiAgICAgICAgICAgIGlmIChpc0ZyYW1lRGV0YWNoZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGlzIGRldGFjaGVkYCk7XG4gICAgICAgICAgICAgICAgaXNXZWJ2aWV3Q2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBbZGV0ZWN0Q2hhbmdlRXJyb3IsIGlzV2Vidmlld0NoYW5nZWRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMuaXNDdXJyZW50V2Vidmlld0NoYW5nZWQod2Vidmlld05hdGl2ZUhhbmRsZSkpO1xuICAgICAgICAgICAgICAgIGlmIChkZXRlY3RDaGFuZ2VFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICBpc1dlYnZpZXdDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNXZWJ2aWV3Q2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gd2VidmlldyBjaGFuZ2VkYCk7XG4gICAgICAgICAgICAgICAgaWYgKGlzRnJhbWVEZXRhY2hlZCB8fCBkZXRlY3RDaGFuZ2VFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGlzIGRldGFjaGVkWyR7aXNGcmFtZURldGFjaGVkfV0gb3IgZGVzdHJveVske2RldGVjdENoYW5nZUVycm9yfV1gKTtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmF3bEN1cnJlbnRXZWJ2aWV3KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNyYXdsQ3VycmVudFdlYnZpZXcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCduYXZpZ2F0aW5nIGJhY2snKTtcbiAgICAgICAgICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5uYXZpZ2F0ZUJhY2soKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCduYXZpZ2F0aW5nIGJhY2sgc3VjYycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBub3QgY2hhbmdlYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICAgICAgICAgIGlmIChmcmFtZS5pc0RldGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGlzIGRldGFjaGVkZGRkYCk7XG4gICAgICAgICAgICAgICAgYXdhaXQgdGhpcy5jcmF3bEN1cnJlbnRXZWJ2aWV3KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGB3YWl0aW5nIGZvciBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGlkbGVgKTtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMud2FpdEZvckN1cnJlbnRGcmFtZUlkbGUoKTtcbiAgICAgICAgICAgIHRoaXMubG9nLmluZm8oYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gaXMgaWRsZWApO1xuICAgICAgICAgICAgY29uc3QgbmV3RWxlbWVudHNIYW5kbGUgPSBhd2FpdCB0aGlzLmdldENsaWNrYWJsZUVsZW1lbnRzKGZyYW1lLCB3ZWJ2aWV3QnJvd3NlckhhbmRsZSk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKHBhZ2VQYXRoLCAnZ2V0IG5ldyBlbGVtZW50cycsIGVsZW1lbnRzSGFuZGxlLmxlbmd0aCk7XG4gICAgICAgICAgICBlbGVtZW50c0hhbmRsZSA9IG5ld0VsZW1lbnRzSGFuZGxlO1xuICAgICAgICAgICAgbGVuID0gZWxlbWVudHNIYW5kbGUubGVuZ3RoO1xuICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgYXN5bmMgZ2V0Q2xpY2thYmxlRWxlbWVudHMoZnJhbWUsIHdlYnZpZXdCcm93c2VySGFuZGxlKSB7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdmaW5kaW5nIGNsaWNrYWJsZSBlbGVtZW50cycpO1xuICAgICAgICBjb25zdCBbZXZhbHVhdGVFcnJvciwgY2xpY2thYmxlQ291bnRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLmV2YWx1YXRlKHdlYnZpZXcgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudHMgPSB3ZWJ2aWV3LmdldEVsZW1lbnRzKHsgY2xpY2thYmxlOiB0cnVlIH0pO1xuICAgICAgICAgICAgY29uc3QgbmF2aWdhdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3d4LW5hdmlnYXRvcicpO1xuICAgICAgICAgICAgZWxlbWVudHMuZm9yRWFjaChlbGVtZW50ID0+IHtcbiAgICAgICAgICAgICAgICAvLyDov4fmu6Tlub/lkYpcbiAgICAgICAgICAgICAgICBpZiAoIWVsZW1lbnQuY2xvc2VzdCgnd3gtYWQnKSkge1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY3Jhd2xlci1jbGljay1lbCcsICd0cnVlJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKG5hdmlnYXRvcnMsIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2NyYXdsZXItY2xpY2stZWwnLCAndHJ1ZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2NyYXdsZXItY2xpY2stZWxdJykubGVuZ3RoO1xuICAgICAgICB9LCB3ZWJ2aWV3QnJvd3NlckhhbmRsZSkpO1xuICAgICAgICBpZiAoZXZhbHVhdGVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ2dldENsaWNrYWJsZUVsZW1lbnRzIGVycm9yJywgZXZhbHVhdGVFcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gW107XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2cuZGVidWcoJ2dldCBjbGlja2FibGUgZWxlbWVudHMsIGxlbmd0aCcsIGNsaWNrYWJsZUNvdW50KTtcbiAgICAgICAgY29uc3QgZWxlbWVudHNIYW5kbGUgPSAoYXdhaXQgZnJhbWUuJCQoJ1tjcmF3bGVyLWNsaWNrLWVsPVwidHJ1ZVwiXScpKS5zbGljZSgwLCAyMDApO1xuICAgICAgICBsZXQgZWxlbWVudHMgPSBbXTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsZW1lbnRzSGFuZGxlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50SGFuZGxlID0gZWxlbWVudHNIYW5kbGVbaV07XG4gICAgICAgICAgICBjb25zdCBib3VuZGluZ0JveCA9IChhd2FpdCBlbGVtZW50SGFuZGxlLmJvdW5kaW5nQm94KCkpIHx8IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAwLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVsZW1lbnRzW2ldID0ge1xuICAgICAgICAgICAgICAgIGhhbmRsZTogZWxlbWVudEhhbmRsZSxcbiAgICAgICAgICAgICAgICBrZXk6IGF3YWl0IHRoaXMuZ2V0RWxlbWVudEtleShlbGVtZW50SGFuZGxlLCBmcmFtZSksXG4gICAgICAgICAgICAgICAgbGVmdDogYm91bmRpbmdCb3gueCxcbiAgICAgICAgICAgICAgICB0b3A6IGJvdW5kaW5nQm94LnksXG4gICAgICAgICAgICAgICAgd2lkdGg6IGJvdW5kaW5nQm94LndpZHRoLFxuICAgICAgICAgICAgICAgIGhlaWdodDogYm91bmRpbmdCb3guaGVpZ2h0LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICBlbGVtZW50cyA9IGVsZW1lbnRzLmZpbHRlcigoaXRlbSkgPT4gaXRlbS53aWR0aCAqIGl0ZW0uaGVpZ2h0KS5zbGljZSgwLCAxMDApO1xuICAgICAgICBlbGVtZW50cy5zb3J0KChhLCBiKSA9PiB7XG4gICAgICAgICAgICBpZiAoYS50b3AgIT0gYi50b3ApXG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudG9wIC0gYi50b3A7XG4gICAgICAgICAgICBpZiAoYS5sZWZ0ICE9IGIubGVmdClcbiAgICAgICAgICAgICAgICByZXR1cm4gYS5sZWZ0IC0gYi5sZWZ0O1xuICAgICAgICAgICAgaWYgKGEud2lkdGggKiBhLmhlaWdodCAhPSBiLndpZHRoICogYi5oZWlnaHQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIud2lkdGggKiBiLmhlaWdodCAtIGEud2lkdGggKiBhLmhlaWdodDtcbiAgICAgICAgICAgIGlmIChhLmtleS50ZXh0S2V5ID4gYi5rZXkudGV4dEtleSlcbiAgICAgICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgICAgICBpZiAoYS5rZXkudGV4dEtleSA8IGIua2V5LnRleHRLZXkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIDE7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdnZXQgY2xpY2thYmxlIGVsZW1lbnRzIHNvcnQgZmluaXNoZWQnKTtcbiAgICAgICAgaWYgKGVsZW1lbnRzLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuRk9VTkRfTk9fQ0xJQ0tBQkxFX0VMRU1FTlRTKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWxlbWVudHM7XG4gICAgfVxuICAgIGFzeW5jIGVsZW1lbnRDbGlja2FibGUoZnJhbWUsIGVsZW1lbnRIYW5kbGVyKSB7XG4gICAgICAgIGNvbnN0IFtjaGVja0VsZW1lbnRDbGlja0FibGVFcnJvciwgaXNDbGlja2FibGVdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLmV2YWx1YXRlKChlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyB0b3AsIGhlaWdodCB9ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBkZWx0YVkgPSB0b3AgLSAod2luZG93LmlubmVySGVpZ2h0ID4+IDEpICsgKGhlaWdodCA+PiAxKTtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCB3aW5kb3cuc2Nyb2xsWSArIGRlbHRhWSk7XG4gICAgICAgICAgICBjb25zdCBuZXdSZWN0ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBjb25zdCBbeCwgeV0gPSBbbmV3UmVjdC5sZWZ0ICsgKG5ld1JlY3Qud2lkdGggPj4gMSksIG5ld1JlY3QudG9wICsgKG5ld1JlY3QuaGVpZ2h0ID4+IDEpXTtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRBdFBvaW50ID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludCh4LCB5KTtcbiAgICAgICAgICAgIGNvbnN0IGlzUGFyZW50ID0gZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgICAgICB3aGlsZSAoYSAhPSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhID09IGIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKGEgJiYgYS5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhID0gYS5wYXJlbnRFbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBpc1BhcmVudChlbGVtZW50QXRQb2ludCwgZWwpIHx8IGlzUGFyZW50KGVsLCBlbGVtZW50QXRQb2ludCk7XG4gICAgICAgIH0sIGVsZW1lbnRIYW5kbGVyKSk7XG4gICAgICAgIGlmIChjaGVja0VsZW1lbnRDbGlja0FibGVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGNoZWNrRWxlbWVudENsaWNrQWJsZUVycm9yYCwgY2hlY2tFbGVtZW50Q2xpY2tBYmxlRXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhIWlzQ2xpY2thYmxlO1xuICAgIH1cbiAgICBhc3luYyBpc0N1cnJlbnRXZWJ2aWV3Q2hhbmdlZCh3ZWJ2aWV3TmF0aXZlSGFuZGxlKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIGNvbnN0IFtjaGVja1dlYnZpZXdDaGFuZ2VkRXJyb3IsIGlzV2Vidmlld0NoYW5nZV0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQocGFnZS5ldmFsdWF0ZSh3ZWJ2aWV3ID0+IHtcbiAgICAgICAgICAgIHJldHVybiB3ZWJ2aWV3ICE9PSB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKTtcbiAgICAgICAgfSwgd2Vidmlld05hdGl2ZUhhbmRsZSkpO1xuICAgICAgICBpZiAoY2hlY2tXZWJ2aWV3Q2hhbmdlZEVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgY2hlY2tXZWJ2aWV3Q2hhbmdlZEVycm9yYCwgY2hlY2tXZWJ2aWV3Q2hhbmdlZEVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaXNXZWJ2aWV3Q2hhbmdlO1xuICAgIH1cbiAgICBhc3luYyBnZXRFbGVtZW50S2V5KGVsZW1lbnQsIGZyYW1lKSB7XG4gICAgICAgIGNvbnN0IFtnZXRFbGVtZW50S2V5RXJyb3IsIGVsZW1lbnRLZXldID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLmV2YWx1YXRlKGVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dEtleTogYCR7TWF0aC5yb3VuZChjbGllbnRSZWN0LndpZHRoKX0tJHtNYXRoLnJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0KX0tJHtlbC50ZXh0Q29udGVudH1gLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKS5yZXBsYWNlKC9cXHMrL2csICcgJykuc3Vic3RyKDAsIDEwMCksXG4gICAgICAgICAgICAgICAgdGFnQ2xhc3NLZXk6IFtlbC50YWdOYW1lLCBlbC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5qb2luKCdfJyldLmpvaW4oJ19fJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIGVsZW1lbnQpKTtcbiAgICAgICAgaWYgKGdldEVsZW1lbnRLZXlFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGdldEVsZW1lbnRLZXlFcnJvcmAsIGdldEVsZW1lbnRLZXlFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRLZXk7XG4gICAgfVxuICAgIGFzeW5jIHNhdmVTY3JlZW5TaG90KGZpbGVuYW1lKSB7XG4gICAgICAgIGNvbnN0IHNjcmVlblNob3RQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMucmVzdWx0UGF0aCwgYC4vc2NyZWVuc2hvdC8ke2ZpbGVuYW1lfS5qcGdgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiBzY3JlZW5TaG90UGF0aCwgdHlwZTogJ2pwZWcnLCBxdWFsaXR5OiA5MCB9KTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZUZyYW1lSHRtbChmcmFtZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgY29uc3QgcGFnZUh0bWwgPSBhd2FpdCBmcmFtZS5jb250ZW50KCk7XG4gICAgICAgIGNvbnN0IGh0bWxQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMucmVzdWx0UGF0aCwgYC4vaHRtbC8ke2ZpbGVuYW1lfS5odG1sYCk7XG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShodG1sUGF0aCwgcGFnZUh0bWwpO1xuICAgIH1cbiAgICBhc3luYyBhZGRSZWRCb3JkZXI0SGFuZGxlKGZyYW1lLCBoYW5kbGUsIGNvbG9yID0gJ3JlZCcpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IGZyYW1lLmV2YWx1YXRlSGFuZGxlKChlbCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZm9jdXNCb3JkZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIGZvY3VzQm9yZGVyLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgICAgIGZvY3VzQm9yZGVyLnN0eWxlLnpJbmRleCA9ICcxMDAwMCc7XG4gICAgICAgICAgICBmb2N1c0JvcmRlci5zdHlsZS5ib3hTaXppbmcgPSAnYm9yZGVyLWJveCc7XG4gICAgICAgICAgICBmb2N1c0JvcmRlci5zdHlsZS5sZWZ0ID0gcmVjdC5sZWZ0IC0gNSArICdweCc7XG4gICAgICAgICAgICBmb2N1c0JvcmRlci5zdHlsZS50b3AgPSByZWN0LnRvcCArIHdpbmRvdy5zY3JvbGxZIC0gNSArICdweCc7XG4gICAgICAgICAgICBmb2N1c0JvcmRlci5zdHlsZS53aWR0aCA9IHJlY3Qud2lkdGggKyAxMCArICdweCc7XG4gICAgICAgICAgICBmb2N1c0JvcmRlci5zdHlsZS5oZWlnaHQgPSByZWN0LmhlaWdodCArIDEwICsgJ3B4JztcbiAgICAgICAgICAgIGZvY3VzQm9yZGVyLnN0eWxlLmJvcmRlciA9ICc1cHggc29saWQgJyArIGNvbG9yO1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChmb2N1c0JvcmRlcik7XG4gICAgICAgICAgICByZXR1cm4gZm9jdXNCb3JkZXI7XG4gICAgICAgIH0sIGhhbmRsZSk7XG4gICAgfVxuICAgIC8vIHByaXZhdGUgYXN5bmMgc2NyZWVuc2hvdEJlZm9yZUNsaWNrKGZyYW1lOiBwdXBwZXRlZXIuRnJhbWUsIGhhbmRsZTogcHVwcGV0ZWVyLkVsZW1lbnRIYW5kbGUpIHtcbiAgICAvLyAgIGNvbnN0IGZ1Y29zQm9yZGVySGFuZGxlID0gYXdhaXQgdGhpcy5hZGRSZWRCb3JkZXI0SGFuZGxlKGZyYW1lLCBoYW5kbGUpXG4gICAgLy8gICBhd2FpdCB0aGlzLnNhdmVTY3JlZW5TaG90KClcbiAgICAvLyAgIGF3YWl0IGZyYW1lLmV2YWx1YXRlKChyZWRCb3JkZXJIYW5kbGUpID0+IHtcbiAgICAvLyAgICAgcmVkQm9yZGVySGFuZGxlLnJlbW92ZSgpXG4gICAgLy8gICB9LCBmdWNvc0JvcmRlckhhbmRsZSlcbiAgICAvLyB9XG4gICAgYXN5bmMgZ2VuVGFza1Jlc3VsdChhdWRpdHNSZXN1bHQpIHtcbiAgICAgICAgY29uc3QgZGV2aWNlSW5mbyA9IGlQaG9uZVg7XG4gICAgICAgIGNvbnN0IHJlc3VsdERldmljZUluZm8gPSB7XG4gICAgICAgICAgICBvczogXCJpb3NcIixcbiAgICAgICAgICAgIHNjcmVlbldpZHRoOiBkZXZpY2VJbmZvLnZpZXdwb3J0LndpZHRoLFxuICAgICAgICAgICAgc2NyZWVuSGVpZ2h0OiBkZXZpY2VJbmZvLnZpZXdwb3J0LmhlaWdodCxcbiAgICAgICAgICAgIG1vZGVsOiBkZXZpY2VJbmZvLm5hbWUsXG4gICAgICAgICAgICBkcHI6IGRldmljZUluZm8udmlld3BvcnQuZGV2aWNlU2NhbGVGYWN0b3IsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IG5vbldlYnZpZXdQYWdlID0gT2JqZWN0LmtleXModGhpcy51cmxQYXRoTWFwKS5maWx0ZXIoKGtleSkgPT4gIXRoaXMudXJsUGF0aE1hcFtrZXldLmlzV2VidmlldykubGVuZ3RoO1xuICAgICAgICBjb25zdCBjcmF3bFBhZ2VUb3RhbCA9IE9iamVjdC5rZXlzKHRoaXMudXJsUGF0aE1hcCkubGVuZ3RoO1xuICAgICAgICBPYmplY3QuYXNzaWduKHRoaXMudGFza1Jlc3VsdCwge1xuICAgICAgICAgICAgYWN0aW9uX2hpc3Rvcnk6IFtdLFxuICAgICAgICAgICAgLy8gY292ZXJfcGF0aF9yYXRpbzogT2JqZWN0LmtleXModGhpcy51cmxQYXRoTWFwKS5sZW5ndGggLyB0aGlzLnd4Q29uZmlnLnBhZ2VzLmxlbmd0aCxcbiAgICAgICAgICAgIGRldmljZV9pbmZvOiByZXN1bHREZXZpY2VJbmZvLFxuICAgICAgICAgICAgLy8gZHJpdmVyVGltZUNvc3Q6IHRoaXMudGFza0ZpbmlzaGVkVGltZSAtIHRoaXMudGFza1N0YXJ0VGltZSxcbiAgICAgICAgICAgIC8vIGlkZVN0YXJ0VGltZTogdGhpcy5kcml2ZXJTdGFydFRpbWUsXG4gICAgICAgICAgICBub3JtYWxTZWFyY2hQYWdlQ291bnQ6IG5vbldlYnZpZXdQYWdlLFxuICAgICAgICAgICAgcmVjb3ZlclN1Y2Nlc3M6IG5vbldlYnZpZXdQYWdlLFxuICAgICAgICAgICAgcmVjb3ZlclRvdGFsOiBjcmF3bFBhZ2VUb3RhbCxcbiAgICAgICAgICAgIC8vIHJlZGlyZWN0VG9QYWdlQ291bnQ6XG4gICAgICAgICAgICAvLyBzZXNzaW9uQ3JlYXRlVGltZTpcbiAgICAgICAgICAgIC8vIHJlc3VsdF9zdGF0dXM6ICxcbiAgICAgICAgICAgIHRhYmJhcnM6IHRoaXMud3hDb25maWcudGFiQmFyID8gdGhpcy53eENvbmZpZy50YWJCYXIubGlzdC5tYXAoKGl0ZW0pID0+IGl0ZW0ucGFnZVBhdGgpIDogW10sXG4gICAgICAgICAgICB0aW1lQ29zdDogdGhpcy50YXNrRmluaXNoZWRUaW1lIC0gdGhpcy5kcml2ZXJTdGFydFRpbWUsXG4gICAgICAgICAgICB0b3RhbFBhZ2VDb3VudDogdGhpcy53eENvbmZpZy5wYWdlcy5sZW5ndGgsXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYXVkaXRzUmVzdWx0LnNjb3JlX251bSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICB0aGlzLnRhc2tSZXN1bHQuaWRlX2V4dF9pbmZvID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICAgIGF1ZGl0czoge1xuICAgICAgICAgICAgICAgICAgICB0b3RhbENsaWNrQ291bnQ6IHRoaXMuY2xpY2tDbnQsXG4gICAgICAgICAgICAgICAgICAgIGlzVGltZW91dDogdGhpcy5pc1RpbWVvdXQsXG4gICAgICAgICAgICAgICAgICAgIGpzQ292ZXJhZ2U6IHRoaXMuanNDb3ZlcmFnZSxcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBKU09OLnN0cmluZ2lmeShhdWRpdHNSZXN1bHQpLFxuICAgICAgICAgICAgICAgICAgICBzY29yZV9udW06IGF1ZGl0c1Jlc3VsdC5zY29yZV9udW1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCBmcy53cml0ZUZpbGUocGF0aC5qb2luKHRoaXMucmVzdWx0UGF0aCwgYCR7dGhpcy5hcHBpZH0uanNvbmApLCBKU09OLnN0cmluZ2lmeSh0aGlzLnRhc2tSZXN1bHQpKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFza1Jlc3VsdDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBBdWRpdHNBdXRvO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uLy4uL2pzL3V0aWxzLmpzJyk7XG5jb25zdCB1cmxfMSA9IHJlcXVpcmUoXCJ1cmxcIik7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jbGFzcyBOZXR3b3JrTGlzdGVuZXIgZXh0ZW5kcyBldmVudHNfMS5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhZ2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q291bnQgPSAwO1xuICAgICAgICB0aGlzLmhhbmRsZXIgPSB7fTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWRNYXAgPSBuZXcgV2Vha01hcCgpO1xuICAgICAgICB0aGlzLnJlcXVlc3RFdmVudE1hcCA9IHtcbiAgICAgICAgICAgIHJlcXVlc3Q6IG5ldyBXZWFrTWFwKCksXG4gICAgICAgICAgICByZXF1ZXN0ZmFpbGVkOiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAgcmVxdWVzdGZpbmlzaGVkOiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAgcmVzcG9uc2U6IG5ldyBXZWFrTWFwKClcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0SWRJbmZvID0ge307XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMuaW5pdEhhbmRsZXJTZXQoKTtcbiAgICAgICAgdGhpcy5pbml0TmV0d29ya0xpc3RlbmluZyhwYWdlKTtcbiAgICB9XG4gICAgaW5pdEhhbmRsZXJTZXQoKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlclsncmVxdWVzdCddID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmhhbmRsZXJbJ3JlcXVlc3RmYWlsZWQnXSA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyWydyZXF1ZXN0ZmluaXNoZWQnXSA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyWydyZXNwb25zZSddID0gbmV3IFNldCgpO1xuICAgIH1cbiAgICBtYXBSZXF1ZXN0MkRldGFpbChyZXF1ZXN0LCByZXNwb25zZSkge1xuICAgICAgICBjb25zdCB1cmwgPSB0aGlzLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgIGNvbnN0IGlzUHJveHkgPSB1cmwgIT0gcmVxdWVzdC51cmwoKTtcbiAgICAgICAgY29uc3QgcmVxdWVzdElkID0gdGhpcy5yZXF1ZXN0SWRNYXAuZ2V0KHJlcXVlc3QpIHx8ICsrdGhpcy5yZXF1ZXN0Q291bnQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgZnJvbUNhY2hlID0gcmVzcG9uc2UgPyByZXNwb25zZS5mcm9tQ2FjaGUoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgY29uc3QgZmFpbHVyZSA9IHJlcXVlc3QuZmFpbHVyZSgpO1xuICAgICAgICBjb25zdCBlcnJvciA9IGZhaWx1cmUgPyBmYWlsdXJlLmVycm9yVGV4dCA6ICcnO1xuICAgICAgICBjb25zdCBzdGF0dXNDb2RlID0gcmVzcG9uc2UgPyByZXNwb25zZS5zdGF0dXMoKS50b1N0cmluZygpIDogdW5kZWZpbmVkO1xuICAgICAgICBsZXQgaGVhZGVycyA9IFtdO1xuICAgICAgICBsZXQgcmVxdWVzdEluZm8gPSB0aGlzLnJlcXVlc3RJZEluZm9bcmVxdWVzdElkXTtcbiAgICAgICAgaWYgKCFyZXF1ZXN0SW5mbykge1xuICAgICAgICAgICAgdGhpcy5yZXF1ZXN0SWRNYXAuc2V0KHJlcXVlc3QsIHJlcXVlc3RJZCk7XG4gICAgICAgICAgICByZXF1ZXN0SW5mbyA9IHRoaXMucmVxdWVzdElkSW5mb1tyZXF1ZXN0SWRdID0geyByZXF1ZXN0LCB0aW1lU3RhbXA6IGN1cnJlbnRUaW1lIH07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBoZWFkZXJPYmplY3QgPSByZXNwb25zZS5oZWFkZXJzKCk7XG4gICAgICAgICAgICBoZWFkZXJzID0gT2JqZWN0LmtleXMoaGVhZGVyT2JqZWN0KS5tYXAoKGhlYWRlcktleSkgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IGhlYWRlcktleSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGhlYWRlck9iamVjdFtoZWFkZXJLZXldXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgICAgICB0eXBlOiByZXF1ZXN0LnJlc291cmNlVHlwZSgpLFxuICAgICAgICAgICAgdXJsLFxuICAgICAgICAgICAgdGltZVN0YW1wOiBjdXJyZW50VGltZSxcbiAgICAgICAgICAgIHJlc3BvbnNlSGVhZGVyczogaGVhZGVycyxcbiAgICAgICAgICAgIGZyb21DYWNoZSxcbiAgICAgICAgICAgIHN0YXR1c0NvZGUsXG4gICAgICAgICAgICBjb3N0VGltZTogY3VycmVudFRpbWUgLSByZXF1ZXN0SW5mby50aW1lU3RhbXAsXG4gICAgICAgICAgICBpc1Byb3h5LFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgfTtcbiAgICB9XG4gICAgZ2V0UmVhbFVybCh1cmwpIHtcbiAgICAgICAgaWYgKHVybC5pbmRleE9mKCd3eGFjcmF3bGVycmVxdWVzdC9wcm94eScpID4gLTEpIHtcbiAgICAgICAgICAgIGxldCB0bXBVcmxPYmogPSB1cmxfMS5wYXJzZSh1cmwsIHRydWUpO1xuICAgICAgICAgICAgdXJsID0gdHlwZW9mIHRtcFVybE9iai5xdWVyeS51cmwgPT0gJ3N0cmluZycgPyB0bXBVcmxPYmoucXVlcnkudXJsIDogdG1wVXJsT2JqLnF1ZXJ5LnVybFswXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXJsO1xuICAgIH1cbiAgICBnZXROZXR3b3JrRXZlbnRTb3VyY2UocmVxdWVzdCwgZGV0YWlscykge1xuICAgICAgICB2YXIgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgIGlmICghZnJhbWUpXG4gICAgICAgICAgICByZXR1cm4gJ3Vua25vdyc7XG4gICAgICAgIC8vIOeUseS6jmFwcHNlcnZpY2XnmoTor7fmsYLlj6/og73kvJrooqtuYXRpdmXlsYLliqDku6PnkIbvvIzmiYDku6Xor7fmsYLmnaXmupDnmoRmcmFtZeWPr+iDveaYr25hdGl2ZeiAjOS4jeaYr2FwcHNlcnZpY2VcbiAgICAgICAgaWYgKGZyYW1lLm5hbWUoKSA9PT0gJ2FwcHNlcnZpY2UnIHx8IGRldGFpbHMuaXNQcm94eSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2cuZGVidWcoJ25ldHdvcmtMaXN0ZW5lciByZXF1ZXN0IGZyb20gc2VydmljZScsIGRldGFpbHMucmVxdWVzdElkKVxuICAgICAgICAgICAgcmV0dXJuICdhcHBzZXJ2aWNlJztcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICgvXndlYnZpZXdcXC0vLnRlc3QoZnJhbWUubmFtZSgpKSkge1xuICAgICAgICAgICAgLy8gdGhpcy5sb2cuZGVidWcoJ25ldHdvcmtMaXN0ZW5lciByZXF1ZXN0IGZyb20gd2VidmlldycsIGZyYW1lSWQsIGRldGFpbHMucmVxdWVzdElkKVxuICAgICAgICAgICAgcmV0dXJuICd3ZWJ2aWV3JztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ3Vua25vdyc7XG4gICAgfVxuICAgIGluaXROZXR3b3JrTGlzdGVuaW5nKHBhZ2UpIHtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdCcsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRSZWFsVXJsKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1JlcXVlc3ROb3RGb3JBdWRpdCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy5sb2cuZGVidWcoJ3JlcXVlc3QgdXJsOicsICB1cmwpXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucmVxdWVzdEV2ZW50TWFwLnJlcXVlc3QuZ2V0KHJlcXVlc3QpKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgdGhpcy5yZXF1ZXN0RXZlbnRNYXAucmVxdWVzdC5zZXQocmVxdWVzdCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICAgICAgaWYgKGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLm1hcFJlcXVlc3QyRGV0YWlsKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvbkJlZm9yZVJlcXVlc3QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogdGhpcy5nZXROZXR3b3JrRXZlbnRTb3VyY2UocmVxdWVzdCwgZGV0YWlscyksXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiAnT05fUkVRVUVTVF9FVkVOVCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBldmVudEluZm9cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdPTl9SRVFVRVNUX0VWRU5UJywgZXZlbnRJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYWdlLm9uKCdyZXF1ZXN0ZmFpbGVkJywgKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzUmVxdWVzdE5vdEZvckF1ZGl0KHVybCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB0aGlzLnJlcXVlc3RFdmVudE1hcC5yZXF1ZXN0LmdldChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkICYmIGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLm1hcFJlcXVlc3QyRGV0YWlsKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvbkVycm9yT2NjdXJyZWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3Vua25vdycsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnT05fUkVRVUVTVF9FVkVOVCcsIGV2ZW50SW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdGZpbmlzaGVkJywgKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzUmVxdWVzdE5vdEZvckF1ZGl0KHVybCkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB0aGlzLnJlcXVlc3RFdmVudE1hcC5yZXF1ZXN0LmdldChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkICYmIGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLm1hcFJlcXVlc3QyRGV0YWlsKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvbkNvbXBsZXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndW5rbm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdPTl9SRVFVRVNUX0VWRU5UJywgZXZlbnRJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYWdlLm9uKCdyZXNwb25zZScsIGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlc3BvbnNlLnJlcXVlc3QoKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzUmVxdWVzdE5vdEZvckF1ZGl0KHVybCkpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLmxvZy5kZWJ1ZyhgcmVzcG9uc2UgdXJsOiAke3VybH0gaXNSZXF1ZXN0Tm90Rm9yQXVkaXRzICR7dXRpbHMuaXNSZXF1ZXN0Tm90Rm9yQXVkaXQodXJsKX1gKVxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RJZCA9IHRoaXMucmVxdWVzdEV2ZW50TWFwLnJlcXVlc3QuZ2V0KHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gcmVxdWVzdC5mcmFtZSgpO1xuICAgICAgICAgICAgICAgIGlmIChyZXF1ZXN0SWQgJiYgZnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IHRoaXMubWFwUmVxdWVzdDJEZXRhaWwocmVxdWVzdCwgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvbkhlYWRlcnNSZWNlaXZlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndW5rbm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdPTl9SRVFVRVNUX0VWRU5UJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGV2ZW50SW5mb1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBkZXRhaWxzLnRpbWVTdGFtcCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnT05fUkVRVUVTVF9FVkVOVCcsIGV2ZW50SW5mbyk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50SW5mby5ldmVudE5hbWUgPSAnb25SZXNwb25zZVN0YXJ0ZWQnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ09OX1JFUVVFU1RfRVZFTlQnLCBldmVudEluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gTmV0d29ya0xpc3RlbmVyO1xuIiwibW9kdWxlLmV4cG9ydHMuJCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgZWwpIHtcbiAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gIH1cblxuICByZXR1cm4gKGVsIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxufVxuXG5tb2R1bGUuZXhwb3J0cy4kJCA9IGZ1bmN0aW9uIChzZWxlY3Rvcikge1xuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcilcbn1cblxubW9kdWxlLmV4cG9ydHMuc2hvdyA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgfVxuXG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnJ1xufVxuXG5tb2R1bGUuZXhwb3J0cy5oaWRlID0gZnVuY3Rpb24gKGVsKSB7XG4gIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICB9XG5cbiAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuXG5tb2R1bGUuZXhwb3J0cy5zcHJpbnRmID0gZnVuY3Rpb24gKHN0ciwgYXJncykge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICBzdHIgPSBzdHIucmVwbGFjZSgvJXMvLCBhcmdzW2ldKVxuICB9XG4gIHJldHVybiBzdHJcbn1cblxubW9kdWxlLmV4cG9ydHMucmVwb3J0QmVoYXZpb3IgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAvLyBkYXRhOiBzY29yZV9udW0sIHNjb3JlX2xldmVsLCBmYWlsZWRfZGV0YWlsLCBpZ25vcmVkX2RldGFpbCwgdXNlX3RpbWVcbiAgdGhpcy5sb2coJ3JlcG9ydEJlaGF2aW9yJywgZGF0YSlcbiAgcGx1Z2luTWVzc2FnZXIuaW52b2tlKCdSRVBPUlQnLCBKU09OLnN0cmluZ2lmeShkYXRhKSlcbn1cblxubW9kdWxlLmV4cG9ydHMubG9nID0gZnVuY3Rpb24gKCkge1xuICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcpIHtcbiAgICBjb25zdCBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKVxuICAgIGFyZ3MudW5zaGlmdCgnY29sb3I6ICNlYTZmNWE7JylcbiAgICBhcmdzLnVuc2hpZnQoJyVjW0F1ZGl0XScpXG4gICAgLy8gYXJnc1swXSA9ICdbQXVkaXRdICcgKyAoYXJnc1swXSB8fCAnJylcbiAgICBjb25zb2xlLmxvZyguLi5hcmdzKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzLmZvcm1hdFNpemUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICBjb25zdCB1bml0cyA9IFsnQicsICdLJywgJ00nLCAnRyddXG4gIGxldCB1bml0XG4gIHdoaWxlICgodW5pdCA9IHVuaXRzLnNoaWZ0KCkpICYmIHNpemUgPiAxMDI0KSB7XG4gICAgc2l6ZSAvPSAxMDI0XG4gIH1cbiAgcmV0dXJuICh1bml0ID09PSAnQicgPyBzaXplIDogc2l6ZS50b0ZpeGVkKDIpKSArIHVuaXRcbn1cblxubW9kdWxlLmV4cG9ydHMuaGFzaCA9IGZ1bmN0aW9uICh0ZXh0KSB7XG4gIGxldCBoYXNoID0gNTM4MVxuICBsZXQgaW5kZXggPSB0ZXh0Lmxlbmd0aFxuXG4gIHdoaWxlIChpbmRleCkge1xuICAgIGhhc2ggPSAoaGFzaCAqIDMzKSBeIHRleHQuY2hhckNvZGVBdCgtLWluZGV4KVxuICB9XG5cbiAgcmV0dXJuIGhhc2ggPj4+IDBcbn1cblxuLy8gIOiuoeeul+Wtl+espuS4suWtl+espuaVsFxubW9kdWxlLmV4cG9ydHMuYnl0ZUNvdW50ID0gZnVuY3Rpb24gKHMpIHtcbiAgcmV0dXJuIGVuY29kZVVSSShzKS5zcGxpdCgvJS4ufC4vKS5sZW5ndGggLSAxXG59XG5cbi8vICDmlbDnu4Tljrvph41cbm1vZHVsZS5leHBvcnRzLnVuaXF1ZSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgLy8gcmV0dXJuIEFycmF5LmZyb20obmV3IFNldChhcnJheSkpO1xuICBjb25zdCBuZXdBcnIgPSBbXVxuICBmb3IgKGxldCBpID0gMDsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgIGlmIChuZXdBcnIuaW5kZXhPZihhcnJbaV0pID09PSAtMSkge1xuICAgICAgbmV3QXJyLnB1c2goYXJyW2ldKVxuICAgIH1cbiAgfVxuICByZXR1cm4gbmV3QXJyXG59XG5cbm1vZHVsZS5leHBvcnRzLmdldFR5cGUgPSBmdW5jdGlvbiAodmFsKSB7XG4gIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxufVxuXG5tb2R1bGUuZXhwb3J0cy5jb21wYXJlVmVyc2lvbiA9IGZ1bmN0aW9uICh2MSwgdjIpIHtcbiAgdjEgPSB2MS5zcGxpdCgnLicpXG4gIHYyID0gdjIuc3BsaXQoJy4nKVxuICBjb25zdCBsZW4gPSBNYXRoLm1heCh2MS5sZW5ndGgsIHYyLmxlbmd0aClcblxuICB3aGlsZSAodjEubGVuZ3RoIDwgbGVuKSB7XG4gICAgdjEucHVzaCgnMCcpXG4gIH1cbiAgd2hpbGUgKHYyLmxlbmd0aCA8IGxlbikge1xuICAgIHYyLnB1c2goJzAnKVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgIGNvbnN0IG51bTEgPSBwYXJzZUludCh2MVtpXSlcbiAgICBjb25zdCBudW0yID0gcGFyc2VJbnQodjJbaV0pXG5cbiAgICBpZiAobnVtMSA+IG51bTIpIHtcbiAgICAgIHJldHVybiAxXG4gICAgfSBlbHNlIGlmIChudW0xIDwgbnVtMikge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDBcbn1cblxubW9kdWxlLmV4cG9ydHMuaXNSZXF1ZXN0Tm90Rm9yQXVkaXQgPSBmdW5jdGlvbiAodXJsKSB7XG4gIGNvbnN0IGludmFsaWREb21haW5SZWcgPSBbXG4gICAgL15kYXRhXFw6LyxcbiAgICAvLyDkupHlh73mlbDplb/ova7or6Lor7fmsYJcbiAgICAvXmh0dHBzOlxcL1xcL3NlcnZpY2V3ZWNoYXQuY29tXFwvd3hhLXFiYXNlXFwvcWJhc2VjaGVja3Jlc3VsdC8sXG4gICAgL15odHRwcz86XFwvXFwvW14vXSpcXC50Y2JcXC5xY2xvdWRcXC5sYVxcLy8sXG4gICAgLy8g5bm/5ZGK57uE5Lu255qE6LWE5rqQXG4gICAgL15odHRwcz86XFwvXFwvd3hzbnNkeXRodW1iXFwud3hzXFwucXFcXC5jb21cXC8vLFxuICAgIC9eaHR0cHM/OlxcL1xcL21tYml6XFwucXBpY1xcLmNuXFwvLyxcbiAgICAvXmh0dHBzPzpcXC9cXC93eFxcLnFsb2dvXFwuY25cXC8vLFxuICAgIC8vIOWcsOWbvue7hOS7tueahOi1hOa6kFxuICAgIC9eaHR0cHM/OlxcL1xcL1teL10qXFwucXFcXC5jb21cXC8vLFxuICAgIC9eaHR0cHM/OlxcL1xcL1teL10qXFwuZ3RpbWdcXC5jb21cXC8vLFxuICAgIC9eaHR0cHM/OlxcL1xcL1teL10qXFwubXlhcHBcXC5jb21cXC8vLFxuICAgIC8vIOW3peWFt+WGhemDqOivt+axglxuICAgIC9eaHR0cDpcXC9cXC8xMjcuMC4wLjE6LyxcbiAgICAvLyDmianlsZVcbiAgICAvXmNocm9tZS1leHRlbnNpb246XFwvXFwvLyxcbiAgICAvLyBydW50aW1l546v5aKDXG4gICAgL15odHRwcz86XFwvXFwvc2VydmljZXdlY2hhdFxcLmNvbVxcLy8sXG4gICAgL1xcL2F1ZGl0c1xcL2Fzc2VydFxcLy8sXG4gICAgL1xcL3d4YWNyYXdsZXJcXC8vLFxuXG4gICAgL15odHRwcz86XFwvXFwvW14vXSpcXC53ZWl4aW5icmlkZ2VcXC5jb21cXC8vLFxuXG4gICAgLy8g5qGG5p626LWE5rqQXG4gICAgLy8gL15odHRwOlxcL1xcLzEyNy4wLjAuMTpbXFxkXStcXC9mYXZpY29uLmljby8sXG4gIF1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGludmFsaWREb21haW5SZWcubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAodXJsLm1hdGNoKGludmFsaWREb21haW5SZWdbaV0pKSB7XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZVxufVxuXG5jb25zdCBmaWx0ZXJMaWJTdGFjayA9IGZ1bmN0aW9uIChzdGFja3MpIHtcbiAgcmV0dXJuIHN0YWNrcy5maWx0ZXIoKHN0YWNrKSA9PiB7XG4gICAgcmV0dXJuICEvXihfX2Rldl9ffF9fYXNkZWJ1Z19ffF9fcGFnZWZyYW1lX198YXBwc2VydmljZVxcPyl8YXVkaXRzXFwvYXNzZXJ0XFwvaW5qZWN0fFdBU2VydmljZS5qc3xXQVdlYnZpZXcuanN8d3hhY3Jhd2xlclxcL3B1YmxpYy8udGVzdChzdGFjay5maWxlKVxuICB9KVxufVxuXG5tb2R1bGUuZXhwb3J0cy5wYXJzZVN0YWNrU3RyaW5ncyA9IGZ1bmN0aW9uIChzdGFja1N0ciwgZmlsdGVyTGliID0gdHJ1ZSkge1xuICBsZXQgc3RhY2tzID0gc3RhY2tTdHIuc3BsaXQoJ1xcbicpXG4gIGxldCBSRUdfRVhQID0gL2F0XFxzKyhbXFxTXSspXFxzK1xcKChcXFMrKVxcKS9cbiAgbGV0IHJlc3VsdCA9IHN0YWNrcy5tYXAoKHN0YWNrKSA9PiB7XG4gICAgbGV0IHJlc3VsdCA9IHN0YWNrLm1hdGNoKFJFR19FWFApXG4gICAgaWYgKHJlc3VsdCAmJiByZXN1bHRbMV0gJiYgcmVzdWx0WzJdKSB7XG4gICAgICBsZXQgZmlsZVN0cmluZyA9IHJlc3VsdFsyXS5yZXBsYWNlKC9eXFxzKi8sICcnKS5yZXBsYWNlKC9odHRwOlxcL1xcLzEyN1xcLjBcXC4wXFwuMTpcXGQrXFwvKDo/KDo/YXBwc2VydmljZXx3eGFjcmF3bGVyXFwvXFxkK1xcL3Byb2dyYW1cXC9cXHcrKT9cXC8pPy8sICcnKVxuICAgICAgbGV0IFtmaWxlLCBsaW5lLCBjb2x1bW5dID0gZmlsZVN0cmluZy5zcGxpdCgnOicpXG4gICAgICBpZiAoZmlsZVN0cmluZy5zcGxpdCgnOicpLmxlbmd0aCA9PSAzKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZnVuYzogcmVzdWx0WzFdLnJlcGxhY2UoL15BdWRpdF8oc2V0VGltZW91dHxzZXRJbnRlcnZhbClfPy4qJC8sICckMScpLFxuICAgICAgICAgIGZpbGUsXG4gICAgICAgICAgbGluZTogK2xpbmUsXG4gICAgICAgICAgY29sdW1uOiArY29sdW1uXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSkuZmlsdGVyKHN0YWNrID0+ICEhc3RhY2spXG5cbiAgaWYgKGZpbHRlckxpYikge1xuICAgIHJlc3VsdCA9IGZpbHRlckxpYlN0YWNrKHJlc3VsdClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMuZ2V0Q2FsbFN0YWNrID0gZnVuY3Rpb24gKGZpbHRlckxpYiA9IHRydWUpIHtcbiAgbGV0IHJlc3VsdCA9IGV4cG9ydHMucGFyc2VTdGFja1N0cmluZ3MobmV3IEVycm9yKCkuc3RhY2spXG5cbiAgaWYgKGZpbHRlckxpYikge1xuICAgIHJlc3VsdCA9IGZpbHRlckxpYlN0YWNrKHJlc3VsdClcbiAgfVxuXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMub25HZW5lcmF0ZUZ1bmNSZWFkeSA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gIGlmICh3aW5kb3cuX19nZW5lcmF0ZUZ1bmNfXykge1xuICAgIHNldFRpbWVvdXQoZnVuYylcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdnZW5lcmF0ZUZ1bmNSZWFkeScsIGZ1bmMpXG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMuc3RhdHVzID0gJ3J1bm5pbmcnXG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IHFzID0gcmVxdWlyZShcInFzXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsL3V0aWxzXCIpO1xuY2xhc3MgSGlqYWNrIGV4dGVuZHMgZXZlbnRzXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBmcmFtZUV2YWx1YXRlKGZyYW1lLCBmdW5jLCAuLi5hcmdzKSB7XG4gICAgICAgIGlmICghZnJhbWUuaXNEZXRhY2hlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWUuZXZhbHVhdGUoZnVuYywgLi4uYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyYW1lIGRldGFjaGVkISBuYW1lOiR7ZnJhbWUubmFtZX1gKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb25zdHJ1Y3RvcihwYWdlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMuaW5pdEV2ZW50KCk7XG4gICAgfVxuICAgIGluaXRFdmVudCgpIHtcbiAgICAgICAgdGhpcy5wYWdlLm9uKCdjb25zb2xlJywgKG1zZykgPT4ge1xuICAgICAgICAgICAgaWYgKG1zZy50eXBlKCkgPT09ICdpbmZvJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IG1zZy50ZXh0KCk7XG4gICAgICAgICAgICAgICAgaWYgKHNvdXJjZS5pbmRleE9mKCc6Ly8nKSA9PT0gLTEpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IHNvdXJjZS5zcGxpdCgnOi8vJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZWRpcmVjdFRvJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbmF2aWdhdGVUbyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3N3aXRjaFRhYic6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3JlTGF1bmNoJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbmF2aWdhdGVCYWNrJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVybCA9IG1hdGNoWzFdIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdVUkxfQ0hBTkdFJywgeyB1cmwsIHR5cGUgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncHVibGlzaFBhZ2VFdmVudCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbbmFtZSwgcXVlcnldID0gbWF0Y2hbMV0uc3BsaXQoJz8nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IHFzLnBhcnNlKHF1ZXJ5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5uYW1lID0gbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnUEFHRV9FVkVOVCcsIHBhcmFtcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBMb2dnZXIubG9nSW5mbyhgUEFHRV9FVkVOVDoke25hbWV9LHdlYnZpZXdJZDoke3BhcmFtcy53ZWJ2aWV3SWR9YCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoaWphY2tEZWZhdWx0KHsgbG9uZ2l0dWRlLCBsYXRpdHVkZSB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2UuZXZhbHVhdGUoKGlzRGVidWcsIGxvbmdpdHVkZSwgbGF0aXR1ZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChpc0RlYnVnKSB7XG4gICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ1JVTlRJTUVfRU5WJywgJ2RldmVsb3BtZW50Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShuYXZpZ2F0b3IsICdsYW5ndWFnZScsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0KCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICd6aC1DTic7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhdGNoIChlKSB7IH1cbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuc2RrLmdldExvY2F0aW9uID0gYXN5bmMgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7IGVyck1zZzogJ2dldExvY2F0aW9uOm9rJywgbG9uZ2l0dWRlOiBsb25naXR1ZGUsIGxhdGl0dWRlOiBsYXRpdHVkZSB9O1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5zaGFyZURhdGEgPSBudWxsO1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5zZGsuc2hhcmVBcHBNZXNzYWdlRGlyZWN0bHlcbiAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLnNoYXJlQXBwTWVzc2FnZSA9IGFzeW5jIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zaGFyZURhdGEgPSBkYXRhLmFyZ3M7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuc2V0T3B0aW9uKCdhdXRvUGVybWlzc2lvbicsIHRydWUpO1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5zZXRPcHRpb24oJ2F1dG9BdXRob3JpemF0aW9uJywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyBoYWNrIOS4gOS6m+W8ueeql+aTjeS9nFxuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5zZGsuY2hvb3NlVmlkZW9cbiAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLm9wZW5Mb2NhdGlvblxuICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLm9wZW5BZGRyZXNzXG4gICAgICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLm9wZW5XZVJ1blNldHRpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLm9wZW5TZXR0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gd2luZG93Lm5hdGl2ZS5zZGsuY2hvb3NlSW1hZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gd2luZG93Lm5hdGl2ZS5zZGsuY2hvb3NlSW52b2ljZVRpdGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5zaG93TW9kYWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5lbnRlckNvbnRhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gd2luZG93Lm5hdGl2ZS5zZGsucHJldmlld0ltYWdlID0gZnVuY3Rpb24gKGRhdGEgPSB7fSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVyck1zZzogYCR7ZGF0YS5hcGl9Om9rYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydCA9IHdpbmRvdy5jb25zb2xlLmxvZzsgLy8g5YWo5bGA5pu/5o2i5o6JYWxlcnQs56aB5o6J5ZCM5q2l5omn6KGMXG4gICAgICAgIH0sICEhcHJvY2Vzcy5lbnYuREVCVUcsIGxvbmdpdHVkZSwgbGF0aXR1ZGUpO1xuICAgIH1cbiAgICBoaWphY2tQYWdlRXZlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgICAgICAgLy8gd2Vidmlld1B1Ymxpc2hQYWdlRXZlbnRcbiAgICAgICAgICAgIHdpbmRvdy5fX2hhbmRsZVdlYnZpZXdQdWJsaXNoID0gd2luZG93Lm5hdGl2ZS5oYW5kbGVXZWJ2aWV3UHVibGlzaDtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuaGFuZGxlV2Vidmlld1B1Ymxpc2ggPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IG1zZy5kYXRhLmV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ1BBR0VfRVZFTlQnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2VFdmVudE5hbWUgPSBtc2cuZGF0YS5kYXRhLmRhdGEuZXZlbnROYW1lO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB3ZWJ2aWV3SWQgPSBtc2cud2Vidmlld0lkO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYHB1Ymxpc2hQYWdlRXZlbnQ6Ly8ke3BhZ2VFdmVudE5hbWV9P3dlYnZpZXdJZD0ke3dlYnZpZXdJZH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd2luZG93Ll9faGFuZGxlV2Vidmlld1B1Ymxpc2guYXBwbHkod2luZG93Lm5hdGl2ZSwgW21zZ10pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5fX2hhbmRsZUFwcFNlcnZpY2VQdWJsaXNoID0gd2luZG93Lm5hdGl2ZS5oYW5kbGVBcHBTZXJ2aWNlUHVibGlzaDtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuaGFuZGxlQXBwU2VydmljZVB1Ymxpc2ggPSBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IG1zZy5kYXRhLmV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICBpZiAobmFtZSA9PT0gJ29uQXBwUm91dGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcmFtcyA9IG1zZy5kYXRhLmRhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3Qge29wZW5UeXBlLCB3ZWJ2aWV3SWQsIHBhdGgsIHF1ZXJ5fSA9IG1zZyEuZGF0YSEuZGF0YSEuZGF0YTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBPYmplY3Qua2V5cyhwYXJhbXMpLm1hcCgoa2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYCR7a2V5fT0ke2VuY29kZVVSSUNvbXBvbmVudChwYXJhbXNba2V5XSl9YDtcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJicpO1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYHB1Ymxpc2hQYWdlRXZlbnQ6Ly9vbkFwcFJvdXRlPyR7cXVlcnl9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX2hhbmRsZUFwcFNlcnZpY2VQdWJsaXNoLmFwcGx5KHdpbmRvdy5uYXRpdmUsIFttc2ddKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBoaWphY2tOYXZpZ2F0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUubmF2aWdhdG9yLnJlZGlyZWN0VG8gPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGByZWRpcmVjdFRvOi8vJHt1cmx9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUubmF2aWdhdG9yLm5hdmlnYXRlVG8gPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBuYXZpZ2F0ZVRvOi8vJHt1cmx9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUubmF2aWdhdG9yLnN3aXRjaFRhYiA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYHN3aXRjaFRhYjovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5yZUxhdW5jaCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYHJlTGF1bmNoOi8vJHt1cmx9YCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUubmF2aWdhdG9yLm5hdmlnYXRlQmFjayA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYG5hdmlnYXRlQmFjazovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAvLyDlj7PkuIrop5LnmoTlm57liLDpppbpobXkuZ/pnIDopoHliqvmjIHvvIzkuLvliqjlj5HnjrDov5vvvIzmn5Dkupvmg4XlhrXkvJrop6blj5FcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUubmF2aWdhdG9yLmxhdW5jaCA9IGZ1bmN0aW9uICh1cmwpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmluZm8oYGxhdW5jaDovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLnJlbW92ZUFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvcihldmVudCwga2V5LCB0aW1lb3V0ID0gMTAwMCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2IgPSAoYXJncykgPT4ge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoYXJnc1trZXldKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm9uY2UoZXZlbnQsIGNiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgndGltZW91dCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGNiKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgd2FpdEZvclVybCh0aW1lb3V0ID0gMTAwMCkge1xuICAgICAgICByZXR1cm4gdGhpcy53YWl0Rm9yKCdVUkxfQ0hBTkdFJywgJ3VybCcsIHRpbWVvdXQpO1xuICAgIH1cbiAgICB3YWl0Rm9yUGFnZUV2ZW50KGV2ZW50TmFtZSwgb3B0ID0geyB0aW1lb3V0OiAxMDAwIH0pIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNiID0gKHsgd2Vidmlld0lkLCBuYW1lIH0pID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnROYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcHQud2Vidmlld0lkID09PSB1bmRlZmluZWQgfHwgb3B0LndlYnZpZXdJZCA9PT0gd2Vidmlld0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCdvaycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignUEFHRV9FVkVOVCcsIGNiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLm9uKCdQQUdFX0VWRU5UJywgY2IpO1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KCd0aW1lb3V0Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcignUEFHRV9FVkVOVCcsIGNiKTtcbiAgICAgICAgICAgIH0sIG9wdC50aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIOeCueWHu+WJjeWFiOWKq+aMgeS4gOS6m3dlYnZpZXfkvqfnmoTlvLnnqpfmk43kvZxcbiAgICAgKiBAcGFyYW0ge0ZyYW1lfSBmcmFtZVxuICAgICAqL1xuICAgIGhpamFja1dlYml2ZXdBbGVydChmcmFtZSkge1xuICAgICAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoLi4uYXJncykgPT4ge1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0ID0gd2luZG93LmNvbnNvbGUubG9nO1xuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBIaWphY2s7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqaW1wXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImxvZzRqc1wiKTsiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4uLy4uL2xvZ1wiKTtcbmNvbnN0IGRvbVV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9kb21VdGlsc1wiKTtcbmNvbnN0IEZyYW1lRGF0YV8xID0gcmVxdWlyZShcIi4vRnJhbWVEYXRhXCIpO1xuY29uc3QgcmVwb3J0SWRLZXlfMSA9IHJlcXVpcmUoXCIuLi8uLi91dGlsL3JlcG9ydElkS2V5XCIpO1xuY2xhc3MgUGFnZUJhc2UgZXh0ZW5kcyBldmVudHNfMS5FdmVudEVtaXR0ZXIge1xuICAgIGNvbnN0cnVjdG9yKHBhZ2UsIG9wdCA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMubG9nID0gbG9nXzEuZGVmYXVsdDtcbiAgICAgICAgdGhpcy5wYWdlID0gcGFnZTtcbiAgICAgICAgdGhpcy5pc01wY3Jhd2xlciA9IG9wdC5pc01wY3Jhd2xlciB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5mcmFtZU1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgY29uc3QgbWFpbkZyYW1lID0gcGFnZS5tYWluRnJhbWUoKTtcbiAgICAgICAgdGhpcy5tYWluRnJhbWVEYXRhID0gbmV3IEZyYW1lRGF0YV8xLmRlZmF1bHQobWFpbkZyYW1lLCB7IGlzTWFpbkZyYW1lOiB0cnVlLCBpc01wY3Jhd2xlcjogdGhpcy5pc01wY3Jhd2xlciB9KTtcbiAgICAgICAgdGhpcy5mcmFtZU1hcC5zZXQobWFpbkZyYW1lLCB0aGlzLm1haW5GcmFtZURhdGEpO1xuICAgICAgICB0aGlzLmRpc2FibGVJbWcgPSBvcHQuZGlzYWJsZUltZyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlTWVkaWEgPSBvcHQuZGlzYWJsZU1lZGlhIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmluaXRUcyA9IERhdGUubm93KCk7XG4gICAgfVxuICAgIGluaXRQYWdlRXZlbnQoKSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLnBhZ2U7XG4gICAgICAgIHBhZ2Uub24oJ2ZyYW1lYXR0YWNoZWQnLCAoZnJhbWUpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lRGF0YSA9IG5ldyBGcmFtZURhdGFfMS5kZWZhdWx0KGZyYW1lLCB7XG4gICAgICAgICAgICAgICAgZGlzYWJsZUltZzogdGhpcy5kaXNhYmxlSW1nLFxuICAgICAgICAgICAgICAgIGRpc2FibGVNZWRpYTogdGhpcy5kaXNhYmxlTWVkaWEsXG4gICAgICAgICAgICAgICAgaXNNcGNyYXdsZXI6IHRoaXMuaXNNcGNyYXdsZXJcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5mcmFtZU1hcC5zZXQoZnJhbWUsIGZyYW1lRGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgICBwYWdlLm9uKCdmcmFtZWRldGFjaGVkJywgKGZyYW1lKSA9PiB7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmRlYnVnKCdmcmFtZSBkZXRhY2g6ICcsIGZyYW1lLm5hbWUoKSk7XG4gICAgICAgICAgICBjb25zdCBmcmFtZURhdGEgPSB0aGlzLmZyYW1lTWFwLmdldChmcmFtZSk7XG4gICAgICAgICAgICBpZiAoZnJhbWVEYXRhKSB7XG4gICAgICAgICAgICAgICAgZnJhbWVEYXRhLmVtaXQoJ2RldGFjaCcsIGZyYW1lLm5hbWUoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5mcmFtZU1hcC5kZWxldGUoZnJhbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdCcsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgIGlmICghZnJhbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVEYXRhID0gdGhpcy5mcmFtZU1hcC5nZXQoZnJhbWUpO1xuICAgICAgICAgICAgaWYgKCFmcmFtZURhdGEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgZnJhbWVEYXRhLm9uUmVxdWVzdFN0YXJ0KHJlcXVlc3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdGZhaWxlZCcsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2VUeXBlID0gcmVxdWVzdC5yZXNvdXJjZVR5cGUoKTtcbiAgICAgICAgICAgIGlmIChzb3VyY2VUeXBlICE9PSAnaW1hZ2UnICYmIHNvdXJjZVR5cGUgIT09ICdtZWRpYScpIHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1ZyhgZmFpbGVkIHJlcXVlc3QgJHtyZXF1ZXN0LnJlc291cmNlVHlwZSgpfTogJHtyZXF1ZXN0LnVybCgpfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgZnJhbWUgPSBhd2FpdCByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICBpZiAoIWZyYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lRGF0YSA9IHRoaXMuZnJhbWVNYXAuZ2V0KGZyYW1lKTtcbiAgICAgICAgICAgIGlmICghZnJhbWVEYXRhKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGZyYW1lRGF0YS5vblJlcXVlc3RFbmQocmVxdWVzdCwgJ2ZhaWxlZCcpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdGZpbmlzaGVkJywgYXN5bmMgKHJlcXVlc3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gYXdhaXQgcmVxdWVzdC5mcmFtZSgpO1xuICAgICAgICAgICAgaWYgKCFmcmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBmcmFtZURhdGEgPSB0aGlzLmZyYW1lTWFwLmdldChmcmFtZSk7XG4gICAgICAgICAgICBpZiAoIWZyYW1lRGF0YSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2UoKTtcbiAgICAgICAgICAgIGlmIChyZXNwb25zZSAmJiAhL14oMnwzKVxcZFxcZCQvLnRlc3QocmVzcG9uc2Uuc3RhdHVzKCkudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmYWlsZWQgcmVxdWVzdCEgc3RhdHVzID0gJHtyZXNwb25zZS5zdGF0dXMoKX0uYCk7XG4gICAgICAgICAgICAgICAgZnJhbWVEYXRhLm9uUmVxdWVzdEVuZChyZXF1ZXN0LCAnZmFpbGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFtZURhdGEub25SZXF1ZXN0RW5kKHJlcXVlc3QsICdmaW5pc2hlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncGFnZWVycm9yJywgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBwYWdlZXJyb3Igb2NjdXIhICR7ZXJyb3IubWVzc2FnZX0gJHtlcnJvci5zdGFja31gKTtcbiAgICAgICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5QQUdFX0VYQ0VQVElPTik7XG4gICAgICAgIH0pO1xuICAgICAgICBwYWdlLm9uKCdlcnJvcicsIChlcnIpID0+IHtcbiAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYHBhZ2UgZXJyb3Igb2NjdXI6YCwgZXJyKTtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5kZWJ1ZygncGFnZSBlcnJvciBvY2N1ciBhbmQgZ29pbmcgdG8gY3Jhc2g6JywgcGFnZS51cmwoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZXJyKSB7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUEFHRV9DUkFTSCk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ3BhZ2VFcnJvcicsIGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhc3luYyB3YWl0Rm9yQ3VycmVudEZyYW1lSWRsZSh0aW1lb3V0Q250ID0gMCkge1xuICAgICAgICBjb25zdCB7IGZyYW1lLCBpZCB9ID0gYXdhaXQgZG9tVXRpbHNfMS5nZXRDdXJyZW50RnJhbWUodGhpcy5wYWdlKTtcbiAgICAgICAgY29uc3QgZnJhbWVEYXRhID0gdGhpcy5nZXRGcmFtZURhdGEoZnJhbWUpO1xuICAgICAgICBpZiAoIWZyYW1lIHx8ICFmcmFtZURhdGEpIHtcbiAgICAgICAgICAgIC8vIHJlYWxseSBub3QgbGlrZWx5XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUEFHRV9OT19GUkFNRSk7XG4gICAgICAgICAgICB0aGlzLmxvZy5kZWJ1Zyhgbm8gZnJhbWUgb3IgZnJhbWVEYXRhICEhIWApO1xuICAgICAgICAgICAgcmV0dXJuIHsgZnJhbWU6IHVuZGVmaW5lZCwgaGFzV2VidmlldzogZmFsc2UsIGZyYW1lRGF0YSwgdGltZW91dDogMCwgaWQgfTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhgZ2V0IGN1cnJlbnQgZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBkb25lYCk7XG4gICAgICAgIGNvbnN0IGlzV2VidmlldyA9IGF3YWl0IGRvbVV0aWxzXzEuaGFzV2VidmlldyhmcmFtZSk7XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKGBjaGVjayBoYXMgd2VidmlldyBbJHtpc1dlYnZpZXd9XSBkb25lYCk7XG4gICAgICAgIGlmIChpc1dlYnZpZXcpIHtcbiAgICAgICAgICAgIC8vIOWMheWQq3dlYnZpZXfvvIznm7TmjqXku7vliqHlpLHotKUsIOmhtemdouaYr+WQpuWMheWQq3dlYnZpZXfvvIzlnKggcGFnZSBkb20gcmVhZHnlkI7lsLHlj6/ku6Xnn6XpgZNcbiAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoJ3Rhc2sgZmFpbCBiZWNhdXNlIHBhZ2UgaGFzIHdlYnZpZXcnKTtcbiAgICAgICAgICAgIHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5QQUdFX0lTX1dFQlZJRVcpO1xuICAgICAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldzogdHJ1ZSwgZnJhbWUsIGZyYW1lRGF0YSwgdGltZW91dDogMCwgaWQgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyBpZiBmYWlsIGJlY2F1c2Ugb2YgZnJhbWUgZGV0YWNoLCB0cnkgdG8gcmV0dXJuIG5ldyBmcmFtZVxuICAgICAgICAvLyDpnIDopoFtYWluRnJhbWXvvIh3YWl0Q29kZTEp5ZKM5b2T5YmNZnJhbWUod2FpdENvZGUyKeeahOe9kee7nOWQjOaXtuepuumXslxuICAgICAgICBjb25zdCBbd2FpdENvZGUxLCB3YWl0Q29kZTJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMubWFpbkZyYW1lRGF0YS53YWl0Rm9yTmV0d29ya0lkbGUoKSwgZnJhbWVEYXRhLndhaXRGb3JOZXR3b3JrSWRsZSgpXSk7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRJZCA9IGF3YWl0IGRvbVV0aWxzXzEuZ2V0Q3VycmVudElkKHRoaXMucGFnZSk7XG4gICAgICAgIGlmICh3YWl0Q29kZTIgPT09IC0yIHx8IGZyYW1lLmlzRGV0YWNoZWQoKSB8fCBpZCAhPT0gY3VycmVudElkKSB7XG4gICAgICAgICAgICAvLyB3YWl0Q29kZTIgPSAwIOS9huWFtuWunmZyYW1l5bey57uPZGV0YWNo55qE77yM5Y+R55Sf5Zyo6aG16Z2i5YWIbmV0d29ya2lkbGXlho3ooqtkZXRhY2jnmoRjYXNlLCDmiYDku6Xov5nph4zopoHlhbzlrrnkuIDkuItcbiAgICAgICAgICAgIC8vIOWcqOetieW9k+WJjWZyYW1l572R57uc5pe277yM6aG16Z2i6Lez6L2s77yM5b2T5YmNZnJhbWXlt7Lnu4/lj5jvvIzpnIDopoHph43mlrDojrflj5ZcbiAgICAgICAgICAgIC8vIOi/mOacieS4gOenjWNhc2XmmK/vvIzlu7bml7bkuIDkvJrlho3mnInot7PovazvvIzov5nnp43mg4XlhrXmmoLml7bml6Dlip7ms5XlpITnkIZcbiAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoYHdhaXQgZm9yIGN1cnJlbnQgZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBpZGxlIGZhaWw6IGFscmVhZHkgZGV0YWNoLCB0cnkgYWdhaW5gKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndhaXRGb3JDdXJyZW50RnJhbWVJZGxlKHRpbWVvdXRDbnQpOyAvLyDnrYnlvoXml7ZmcmFtZSBkZXRhY2jkuobvvIzpnIDopoHph43mlrDmi7/lvZPliY1mcmFtZTtcbiAgICAgICAgICAgIC8vIHJldHVybiB7aGFzV2VidmlldzogZmFsc2UsIGZyYW1lOiB1bmRlZmluZWQsIGZyYW1lRGF0YSwgdGltZW91dDogMCwgaWR9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAod2FpdENvZGUxID09PSAtMSB8fCB3YWl0Q29kZTIgPT09IC0xKSB7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmRlYnVnKGBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGlkbGUgdGltZW91dCwgY29kZTogYCwgd2FpdENvZGUxLCB3YWl0Q29kZTIpO1xuICAgICAgICAgICAgdGltZW91dENudCsrO1xuICAgICAgICB9XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoYGN1cnJlbnQgZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBuZXR3b3JrIGlkbGUgZG9uZWApO1xuICAgICAgICByZXR1cm4geyBoYXNXZWJ2aWV3OiBmYWxzZSwgZnJhbWUsIGZyYW1lRGF0YSwgdGltZW91dDogdGltZW91dENudCwgaWQgfTtcbiAgICB9XG4gICAgLy8gcHJvdGVjdGVkIGFzeW5jIHdhaXRGb3JGcmFtZUlkbGUoZnJhbWU6IHB1cHBldGVlci5GcmFtZSwgdGltZW91dDogbnVtYmVyKSB7XG4gICAgLy8gICAgIGNvbnN0IGZyYW1lRGF0YSA9IHRoaXMuZ2V0RnJhbWVEYXRhKGZyYW1lKTtcbiAgICAvLyAgICAgaWYgKCFmcmFtZURhdGEpIHJldHVybiBQcm9taXNlLnJlc29sdmUoLTIpO1xuICAgIC8vICAgICBjb25zdCBbd2FpdENvZGUxLCB3YWl0Q29kZTJdID0gYXdhaXQgUHJvbWlzZS5hbGwoW3RoaXMubWFpbkZyYW1lRGF0YS53YWl0Rm9yTmV0d29ya0lkbGUodGltZW91dCksIGZyYW1lRGF0YS53YWl0Rm9yTmV0d29ya0lkbGUodGltZW91dCldKTtcbiAgICAvLyAgICAgZGVidWcoJ3dhaXQgZm9yIGZyYW1lIGlkbGUnLCB3YWl0Q29kZTEsIHdhaXRDb2RlMik7XG4gICAgLy8gICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUod2FpdENvZGUyKTtcbiAgICAvLyB9XG4gICAgZ2V0RnJhbWVEYXRhKGZyYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lTWFwLmdldChmcmFtZSk7XG4gICAgfVxuICAgIGFzeW5jIHdhaXRGb3JGcmFtZUNoYW5nZSh3ZWJ2aWV3SWQsIHsgdGltZW91dCB9KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2Uud2FpdEZvcigoaWQpID0+IHdpbmRvdy5uYXRpdmUud2Vidmlld01hbmFnZXIuZ2V0Q3VycmVudCgpLmlkICE9PSBpZCwgeyB0aW1lb3V0IH0sIHdlYnZpZXdJZCk7XG4gICAgfVxuICAgIGlzUGFnZVJlZGlyZWN0ZWQodXJsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2UuZXZhbHVhdGUoKHVybCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHVybC5pbmRleE9mKGxvY2F0aW9uLnBhdGhuYW1lKSA9PT0gLTE7XG4gICAgICAgIH0sIHVybCk7XG4gICAgfVxuICAgIGdldFRpbWUoKSB7XG4gICAgICAgIHJldHVybiBEYXRlLm5vdygpIC0gdGhpcy5pbml0VHM7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gUGFnZUJhc2U7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGF3YWl0X3RvX2pzXzEgPSByZXF1aXJlKFwiYXdhaXQtdG8tanNcIik7XG4vLyBpbXBvcnQge0lkS2V5fSBmcm9tIFwiLi4vY29uZmlnXCI7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCB1dGlsc18xID0gcmVxdWlyZShcIi4vdXRpbHNcIik7XG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50RnJhbWUocGFnZSkge1xuICAgIGNvbnN0IGlkID0gYXdhaXQgZ2V0Q3VycmVudElkKHBhZ2UpO1xuICAgIC8vIGRlYnVnKCdnZXQgQ3VycmVudCBGcmFtZSBJZDonLCBpZCk7XG4gICAgY29uc3QgZnJhbWUgPSBhd2FpdCBnZXRDdXJyZW50RnJhbWVCeVdlYnZpZXdJZChwYWdlLCBpZCk7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZnJhbWUsXG4gICAgICAgIGlkXG4gICAgfTtcbn1cbmV4cG9ydHMuZ2V0Q3VycmVudEZyYW1lID0gZ2V0Q3VycmVudEZyYW1lO1xuZnVuY3Rpb24gZ2V0Q3VycmVudElkKHBhZ2UpIHtcbiAgICByZXR1cm4gcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnQgPSB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKTtcbiAgICAgICAgcmV0dXJuIGN1cnJlbnQuaWQ7XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEN1cnJlbnRJZCA9IGdldEN1cnJlbnRJZDtcbmFzeW5jIGZ1bmN0aW9uIGdldEN1cnJlbnRGcmFtZURhdGEocGFnZSwgZnJhbWVNYXApIHtcbiAgICBjb25zdCB7IGZyYW1lIH0gPSBhd2FpdCBnZXRDdXJyZW50RnJhbWUocGFnZSk7XG4gICAgaWYgKCFmcmFtZSlcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICByZXR1cm4gZnJhbWVNYXAuZ2V0KGZyYW1lKTtcbn1cbmV4cG9ydHMuZ2V0Q3VycmVudEZyYW1lRGF0YSA9IGdldEN1cnJlbnRGcmFtZURhdGE7XG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50RnJhbWVCeVdlYnZpZXdJZChwYWdlLCB3ZWJ2aWV3SWQpIHtcbiAgICBjb25zdCBmcmFtZUxpc3QgPSBhd2FpdCBwYWdlLmZyYW1lcygpO1xuICAgIGNvbnN0IHBlbmRpbmdGcmFtZSA9IFtdO1xuICAgIGZvciAoY29uc3QgZnJhbWUgb2YgZnJhbWVMaXN0KSB7XG4gICAgICAgIGlmIChmcmFtZS5uYW1lKCkgPT09ICcnKSB7XG4gICAgICAgICAgICBwZW5kaW5nRnJhbWUucHVzaChmcmFtZSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZnJhbWUubmFtZSgpID09PSBgd2Vidmlldy0ke3dlYnZpZXdJZH1gKSB7XG4gICAgICAgICAgICAvLyBMb2dnZXIuaW5mbyhgZm91bmQgd2Vidmlldy0ke3dlYnZpZXdJZH0hISFgKTtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBpbiB0aGUgcGVuZGluZyBmcmFtZSB3YWl0IGZvciBpdCBhbmQgcmV0dXJuXG4gICAgLy8gZGVidWcoJ2dldCBjdXJyZW50IGZyYW1lIGJ5IGlkIGluIHBlbmRpbmcgbGlzdCcpO1xuICAgIGZvciAoY29uc3QgZnJhbWUgb2YgcGVuZGluZ0ZyYW1lKSB7XG4gICAgICAgIGNvbnN0IFt3YWl0VGltZW91dF0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQoZnJhbWUud2FpdEZvck5hdmlnYXRpb24oeyB0aW1lb3V0OiAxMDAwIH0pKTtcbiAgICAgICAgaWYgKGZyYW1lLm5hbWUoKSA9PT0gYHdlYnZpZXctJHt3ZWJ2aWV3SWR9YCkge1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0cy5nZXRDdXJyZW50RnJhbWVCeVdlYnZpZXdJZCA9IGdldEN1cnJlbnRGcmFtZUJ5V2Vidmlld0lkO1xuYXN5bmMgZnVuY3Rpb24gZ2V0QXBwU2VydmljZUZyYW1lKHBhZ2UpIHtcbiAgICBjb25zdCBmcmFtZUxpc3QgPSBhd2FpdCBwYWdlLmZyYW1lcygpO1xuICAgIGZvciAoY29uc3QgZnJhbWUgb2YgZnJhbWVMaXN0KSB7XG4gICAgICAgIGlmIChmcmFtZS5uYW1lKCkgPT09ICdhcHBzZXJ2aWNlJykge1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xufVxuZXhwb3J0cy5nZXRBcHBTZXJ2aWNlRnJhbWUgPSBnZXRBcHBTZXJ2aWNlRnJhbWU7XG5mdW5jdGlvbiBzY3JvbGxUb1RvcChmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgLy8gQHRvZG8g5Yik5a6a5b2T5YmN6aG16Z2i5piv5ZCm5pyJc2Nyb2xsLXZpZXcsIOaciXNjcm9sbC12aWV35pe277yM6ZyA6KaB5Yir55qE5pa55byP5rua5YqoXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2Nyb2xsVG9Ub3AgPSBzY3JvbGxUb1RvcDtcbmZ1bmN0aW9uIHNjcm9sbFRvQm90dG9tKGZyYW1lKSB7XG4gICAgcmV0dXJuIHV0aWxzXzEuZnJhbWVFdmFsdWF0ZShmcmFtZSwgKCkgPT4ge1xuICAgICAgICAvLyBAdG9kbyDliKTlrprlvZPliY3pobXpnaLmmK/lkKbmnIlzY3JvbGwtdmlldywg5pyJc2Nyb2xsLXZpZXfml7bvvIzpnIDopoHliKvnmoTmlrnlvI/mu5rliqhcbiAgICAgICAgY29uc3QgaGVpZ2h0ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIGhlaWdodCAtIHdpbmRvd0hlaWdodCk7XG4gICAgICAgIC8vIHdpbmRvdy53eC5wdWJsaXNoUGFnZUV2ZW50KCdvblJlYWNoQm90dG9tJywge30pO1xuICAgIH0pO1xufVxuZXhwb3J0cy5zY3JvbGxUb0JvdHRvbSA9IHNjcm9sbFRvQm90dG9tO1xuZnVuY3Rpb24gc2Nyb2xsRG93bihmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnNjcm9sbFk7XG4gICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKDAsIHNjcm9sbFRvcCArIHdpbmRvd0hlaWdodCAtIDY0KTtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2Nyb2xsRG93biA9IHNjcm9sbERvd247XG5mdW5jdGlvbiBlbGVtSW5XaW5kb3coZnJhbWUpIHtcbn1cbmV4cG9ydHMuZWxlbUluV2luZG93ID0gZWxlbUluV2luZG93O1xuZnVuY3Rpb24gZHVtcFNjb3BlRGF0YVRvRE9NTm9kZShmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5fX3ZpcnR1YWxET01fXy5zcHJlYWRTY29wZURhdGFUb0RPTU5vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNjb3BlIGRhdGEgZXJyb3IgJHtlLm1lc3NhZ2V9ICR7ZS5zdGFja31gKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuZXhwb3J0cy5kdW1wU2NvcGVEYXRhVG9ET01Ob2RlID0gZHVtcFNjb3BlRGF0YVRvRE9NTm9kZTtcbmZ1bmN0aW9uIGdldEZyYW1lSHRtbChmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5fX3ZpcnR1YWxET01fXy5zcHJlYWRTY29wZURhdGFUb0RPTU5vZGUoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHNjb3BlIGRhdGEgZXJyb3IgJHtlLm1lc3NhZ2V9ICR7ZS5zdGFja31gKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzdHlsZVNoZWV0cyA9IGRvY3VtZW50LnN0eWxlU2hlZXRzO1xuICAgICAgICBsZXQgY3NzID0gJyc7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnKicpO1xuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gZWxlbWVudHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IGVsID0gZWxlbWVudHNbaV07XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gc3R5bGVTaGVldHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjc3NSdWxlcyA9IHN0eWxlU2hlZXRzW2ldLmNzc1J1bGVzO1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjc3NSdWxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBydWxlID0gY3NzUnVsZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChydWxlLmFkZGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwud2Via2l0TWF0Y2hlc1NlbGVjdG9yKHJ1bGUuc2VsZWN0b3JUZXh0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcnVsZS5hZGRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjc3MgKz0gcnVsZS5jc3NUZXh0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgPGh0bWw+PG1ldGEgY2hhcnNldD1cIlVURi04XCI+PG1ldGEgbmFtZT1cInZpZXdwb3J0XCIgY29udGVudD1cIndpZHRoPWRldmljZS13aWR0aCxcbiAgICAgICAgICAgICAgICB1c2VyLXNjYWxhYmxlPW5vLCBpbml0aWFsLXNjYWxlPTEuMCwgbWF4aW11bS1zY2FsZT0xLjAsIG1pbmltdW0tc2NhbGU9MS4wXCI+PHN0eWxlPiR7Y3NzfTwvc3R5bGU+XG4gICAgICAgICAgICAgICAgJHtkb2N1bWVudC5ib2R5Lm91dGVySFRNTH1gO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRGcmFtZUh0bWwgPSBnZXRGcmFtZUh0bWw7XG5hc3luYyBmdW5jdGlvbiBnZXRFbGVtQ3J3KGVsZW0sIGZyYW1lKSB7XG4gICAgY29uc3QgW2VyciwgY3J3XSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdCh1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsIChlbGVtKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlY3QgPSBlbGVtLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBjb21TdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsZW0pO1xuICAgICAgICByZXR1cm4gYCR7cmVjdC5sZWZ0fSwke3JlY3QudG9wfSwke3JlY3QucmlnaHR9LCR7cmVjdC5ib3R0b219LCR7Y29tU3R5bGUuZm9udFNpemV9LCR7Y29tU3R5bGUuYm9yZGVyV2lkdGh9LCR7Y29tU3R5bGUuYmFja2dyb3VuZENvbG9yfSwke2NvbVN0eWxlLmJvcmRlckNvbG9yfSwke2NvbVN0eWxlLmNvbG9yfSwke2NvbVN0eWxlLnBhZGRpbmd9LCR7Y29tU3R5bGUubWFyZ2lufWA7XG4gICAgfSwgZWxlbSkpO1xuICAgIGlmIChlcnIpIHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcignZmFpbCBnZXQgZWxlbSBjcncnLCBlcnIpO1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBjcnc7XG59XG5leHBvcnRzLmdldEVsZW1DcncgPSBnZXRFbGVtQ3J3O1xuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0Q3J3SW5mbyhmcmFtZSkge1xuICAgIGNvbnN0IG1zZyA9IGF3YWl0IHV0aWxzXzEuZnJhbWVFdmFsdWF0ZShmcmFtZSwgKCkgPT4ge1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGZ1bmN0aW9uIHRyYXZlcnNlRWxlbWVudChlbCkge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRFbENudCA9IGVsLmNoaWxkRWxlbWVudENvdW50O1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjaGlsZEVsQ250OyArK2kpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByZWN0ID0gZWwuY2hpbGRyZW5baV0uZ2V0Q2xpZW50UmVjdHMoKTtcbiAgICAgICAgICAgICAgICBjb25zdCBjb21TdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLmNoaWxkcmVuW2ldKTtcbiAgICAgICAgICAgICAgICBsZXQgY3J3QXR0ciA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChyZWN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjcndBdHRyID0gYCR7cmVjdFswXS5sZWZ0fSwke3JlY3RbMF0udG9wfSwke3JlY3RbMF0ucmlnaHR9LGBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYCR7cmVjdFswXS5ib3R0b219LCR7Y29tU3R5bGUuZm9udFNpemV9LCR7Y29tU3R5bGUuYm9yZGVyV2lkdGh9LGBcbiAgICAgICAgICAgICAgICAgICAgICAgICsgYCR7Y29tU3R5bGUuYmFja2dyb3VuZENvbG9yfSwke2NvbVN0eWxlLmJvcmRlckNvbG9yfSwke2NvbVN0eWxlLmNvbG9yfSxgXG4gICAgICAgICAgICAgICAgICAgICAgICArIGAke2NvbVN0eWxlLnBhZGRpbmd9LCR7Y29tU3R5bGUubWFyZ2lufWA7XG4gICAgICAgICAgICAgICAgICAgIGVsLmNoaWxkcmVuW2ldLnNldEF0dHJpYnV0ZSgnd3gtY3J3JywgY3J3QXR0cik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyYXZlcnNlRWxlbWVudChlbC5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCAwKTtcbiAgICAgICAgICAgIHRyYXZlcnNlRWxlbWVudChkb2N1bWVudC5ib2R5KTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coYHRyYXZlcnNlRWxlbWVudCBlcnJvciAke2UubWVzc2FnZX0gJHtlLnN0YWNrfWApO1xuICAgICAgICAgICAgcmV0dXJuIGUubWVzc2FnZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJ29rJztcbiAgICB9KTtcbiAgICBpZiAobXNnICE9PSAnb2snKSB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGluc2VydENyd0luZm8gZXJyb3IhICR7bXNnfWApO1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5JTlNFUlRfQ1JXX0VSUik7XG4gICAgfVxuICAgIHJldHVybiBtc2c7XG59XG5leHBvcnRzLmluc2VydENyd0luZm8gPSBpbnNlcnRDcndJbmZvO1xuYXN5bmMgZnVuY3Rpb24gZ2V0QW5kSW5zZXJ0U2hhcmVEYXRhKHBhZ2UsIGZyYW1lKSB7XG4gICAgbGV0IHNoYXJlRGF0YTtcbiAgICB0cnkge1xuICAgICAgICBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIOinpuWPkeWIhuS6q1xuICAgICAgICAgICAgY29uc3Qgd2VidmlldyA9IHdpbmRvdy5uYXRpdmUud2Vidmlld01hbmFnZXIuZ2V0Q3VycmVudCgpO1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5hcHBTZXJ2aWNlTWVzc2VuZ2VyLnNlbmQoe1xuICAgICAgICAgICAgICAgIGNvbW1hbmQ6ICdBUFBTRVJWSUNFX09OX0VWRU5UJyxcbiAgICAgICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ29uU2hhcmVBcHBNZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0aDogd2Vidmlldy51cmwsXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2RlOiAnY29tbW9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHdlYnZpZXdJZDogd2Vidmlldy5pZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdXRpbHNfMS5zbGVlcCgyMDApO1xuICAgICAgICBzaGFyZURhdGEgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHdpbmRvdy5zaGFyZURhdGEpO1xuICAgICAgICAgICAgcmV0dXJuIHdpbmRvdy5zaGFyZURhdGE7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGAhISEhISBnZXRTaGFyZURhdGEgZXZhbHVhdGUgZmFpbGVkICR7ZS5tZXNzYWdlfSAke2Uuc3RhY2t9YCk7XG4gICAgfVxuICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgc2hhcmVkYXRhIGlzICR7SlNPTi5zdHJpbmdpZnkoc2hhcmVEYXRhKX1gKTtcbiAgICBpZiAoc2hhcmVEYXRhICYmIChzaGFyZURhdGEuaGFzT3duUHJvcGVydHkoXCJ0aXRsZVwiKSB8fCBzaGFyZURhdGEuaGFzT3duUHJvcGVydHkoXCJpbWFnZVVybFwiKSkpIHtcbiAgICAgICAgY29uc3QgcmVhbFNoYXJlRGF0YSA9IHtcbiAgICAgICAgICAgIFwidGl0bGVcIjogc2hhcmVEYXRhLnRpdGxlID8gc2hhcmVEYXRhLnRpdGxlIDogXCJcIixcbiAgICAgICAgICAgIFwiaW1hZ2VVcmxcIjogXCJcIlxuICAgICAgICB9O1xuICAgICAgICBpZiAoc2hhcmVEYXRhLmltYWdlVXJsICYmIGF3YWl0IHV0aWxzXzEuY2hlY2tJbWFnZVZhbGlkKHNoYXJlRGF0YS5pbWFnZVVybCkgPT09IDApIHtcbiAgICAgICAgICAgIHJlYWxTaGFyZURhdGEuaW1hZ2VVcmwgPSBzaGFyZURhdGEuaW1hZ2VVcmw7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBpbWFnZToke3NoYXJlRGF0YS5pbWFnZVVybH0gaXMgaW52YWxpZCFgKTtcbiAgICAgICAgfVxuICAgICAgICBhd2FpdCB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsIChzRGF0YSkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zZXRBdHRyaWJ1dGUoJ3d4LXNoYXJlLWRhdGEnLCBKU09OLnN0cmluZ2lmeShzRGF0YSkpO1xuICAgICAgICB9LCByZWFsU2hhcmVEYXRhKTtcbiAgICB9XG59XG5leHBvcnRzLmdldEFuZEluc2VydFNoYXJlRGF0YSA9IGdldEFuZEluc2VydFNoYXJlRGF0YTtcbmZ1bmN0aW9uIGdldEZyYW1lSW5mbyhmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHBhZ2VIZWlnaHQ6IGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LFxuICAgICAgICAgICAgd2luZG93SGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmdldEZyYW1lSW5mbyA9IGdldEZyYW1lSW5mbztcbmFzeW5jIGZ1bmN0aW9uIGdldFVzZXJJbmZvKGZyYW1lLCBwYWdlKSB7XG4gICAgY29uc3QgZnJhbWVMaXN0ID0gYXdhaXQgcGFnZS5mcmFtZXMoKTtcbiAgICBmb3IgKGNvbnN0IGZyYW1lIG9mIGZyYW1lTGlzdCkge1xuICAgICAgICBpZiAoZnJhbWUubmFtZSgpID09PSAnYXBwc2VydmljZScpIHtcbiAgICAgICAgICAgIGNvbnN0IFtlcnIsIHVzZXJJbmZvXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdCh1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgIHd4LmdldFVzZXJJbmZvKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3MocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZXMudXNlckluZm8pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZhaWwoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVqZWN0KCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmluZm8oYHVzZXJpbmZvIGlzICR7SlNPTi5zdHJpbmdpZnkodXNlckluZm8pfWApO1xuICAgICAgICAgICAgaWYgKHVzZXJJbmZvKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVzZXJJbmZvO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuR0VUX1VTRVJJTkZPX0VNUFRZKTtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xufVxuZXhwb3J0cy5nZXRVc2VySW5mbyA9IGdldFVzZXJJbmZvO1xuZnVuY3Rpb24gZ2V0V2Vidmlld0luZm8ocGFnZSkge1xuICAgIHJldHVybiBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgY29uc3QgY3VycmVudFdlYnZpZXcgPSB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVybDogY3VycmVudFdlYnZpZXcudXJsLFxuICAgICAgICAgICAgaWQ6IGN1cnJlbnRXZWJ2aWV3LmlkLFxuICAgICAgICAgICAgcGF0aDogY3VycmVudFdlYnZpZXcucGF0aCxcbiAgICAgICAgICAgIHBhZ2VUaXRsZTogY3VycmVudFdlYnZpZXcucGFnZUNvbmZpZy53aW5kb3cubmF2aWdhdGlvbkJhclRpdGxlVGV4dCxcbiAgICAgICAgICAgIHN0YWNrOiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldFBhZ2VTdGFjaygpLm1hcCgod2VidmlldykgPT4gd2Vidmlldy5wYXRoKSxcbiAgICAgICAgfTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0V2Vidmlld0luZm8gPSBnZXRXZWJ2aWV3SW5mbztcbmZ1bmN0aW9uIGhhc1dlYnZpZXcoZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCd3eC13ZWItdmlldycpICE9PSBudWxsO1xuICAgIH0pO1xufVxuZXhwb3J0cy5oYXNXZWJ2aWV3ID0gaGFzV2VidmlldztcbmZ1bmN0aW9uIGluc2VydFRhc2tJbmZvKHRhc2tJbmZvLCBmcmFtZSkge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZSgpO1xuICAgIHRhc2tJbmZvLnRpbWUgPSBkLnRvTG9jYWxlU3RyaW5nKCk7XG4gICAgcmV0dXJuIHV0aWxzXzEuZnJhbWVFdmFsdWF0ZShmcmFtZSwgKHNEYXRhKSA9PiB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCd3eC1jcmF3bGVyLXRhc2tpbmZvJywgSlNPTi5zdHJpbmdpZnkoc0RhdGEpKTtcbiAgICB9LCB0YXNrSW5mbyk7XG59XG5leHBvcnRzLmluc2VydFRhc2tJbmZvID0gaW5zZXJ0VGFza0luZm87XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4uLy4uL2xvZ1wiKTtcbmNvbnN0IHJlcG9ydElkS2V5XzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9yZXBvcnRJZEtleVwiKTtcbmNvbnN0IEJsYWNrTGlzdCA9IHtcbiAgICBcImh0dHBzOi8vbG9nLm1lbmd0dWlhcHAuY29tL3JlcG9ydC92MVwiOiB0cnVlLFxuICAgIFwiaHR0cHM6Ly9sb2cuYWxkd3guY29tL2QuaHRtbFwiOiB0cnVlLFxuICAgIFwibG9nLmFsZHd4LmNvbVwiOiB0cnVlXG59O1xubGV0IHJlcG9ydE5ld1Byb3h5SXAgPSBmYWxzZTtcbmNsYXNzIEZyYW1lRGF0YSBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZnJhbWUsIG9wdCA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXh0cmEgPSB7fTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XG4gICAgICAgIHRoaXMucmVxdWVzdE51bSA9IDA7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrSWRsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5ldHdvcmtJZGxlVGltZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc2FibGVJbWcgPSBvcHQuZGlzYWJsZUltZyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlTWVkaWEgPSBvcHQuZGlzYWJsZU1lZGlhIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTXBjcmF3bGVyID0gb3B0LmlzTXBjcmF3bGVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gMDtcbiAgICAgICAgdGhpcy5pc01haW5GcmFtZSA9IG9wdC5pc01haW5GcmFtZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMTAwKTtcbiAgICB9XG4gICAgaXNEZXRhY2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lLmlzRGV0YWNoZWQoKTtcbiAgICB9XG4gICAgc2V0VGFza0V4dHJhKGV4dHJhKSB7XG4gICAgICAgIHRoaXMuZXh0cmEgPSBleHRyYTtcbiAgICB9XG4gICAgZ2V0UGVyZm9ybWFuY2UoaXNSZXNldCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVQZXJSZXF1ZXN0O1xuICAgICAgICBpZiAoaXNSZXNldCkge1xuICAgICAgICAgICAgdGhpcy50aW1lUGVyUmVxdWVzdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF2ZXJhZ2VUaW1lOiBNYXRoLnJvdW5kKHRpbWUpLFxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5yZXF1ZXN0TnVtLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXNldFBlcmZvcm1hbmNlKCkge1xuICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gMDtcbiAgICB9XG4gICAgYXN5bmMgb25SZXF1ZXN0U3RhcnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3RNYXAuc2V0KHJlcXVlc3QuX3JlcXVlc3RJZCwgRGF0ZS5ub3coKSk7XG4gICAgICAgIHRoaXMucmVxdWVzdE51bSsrO1xuICAgICAgICAvLyBMb2dnZXIuZGVidWcoYGZyYW1lWyR7dGhpcy5mcmFtZS5uYW1lKCl9XSByZXF1ZXN0TnVtKysgJHt0aGlzLnJlcXVlc3ROdW19YClcbiAgICAgICAgdGhpcy5pc05ldHdvcmtJZGxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtJZGxlVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5ldHdvcmtJZGxlVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIG9uUmVxdWVzdEVuZChyZXF1ZXN0LCBlbmRUeXBlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgY29zdFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5yZXF1ZXN0TWFwLmdldChyZXF1ZXN0Ll9yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCByVXJsID0gcmVxdWVzdC51cmwoKTtcbiAgICAgICAgaWYgKHJVcmwuc2VhcmNoKCcvd3hhY3Jhd2xlci8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGNvZGVzdnJcbiAgICAgICAgICAgIGlmIChlbmRUeXBlID09PSAnZmFpbGVkJyAmJiByZXF1ZXN0LnJlc291cmNlVHlwZSgpICE9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZW5kICR7ZW5kVHlwZX0gcmVzVHlwZSAke3JlcXVlc3QucmVzb3VyY2VUeXBlKCl9IHJlcXVlc3Q6JyR7cmVxdWVzdC51cmwoKX0nIGVycm9yOiAke3JlcXVlc3QuX2ZhaWx1cmVUZXh0fSBjb3N0IHRpbWUgOiAke2Nvc3RUaW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kVHlwZSA9PT0gJ2ZhaWxlZCcgPyByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuQ09ERVNWUl9SRVFVRVNUX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuQ09ERVNWUl9SRVFVRVNUX1NVQ0MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJVcmwuc2VhcmNoKCd3eGFjcmF3bGVycmVxdWVzdC9wcm94eScpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdHByb3h55Luj55CGXG4gICAgICAgICAgICBpZiAoclVybC5zZWFyY2goJ3NlcnZpY2V3ZWNoYXQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW5kVHlwZSA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZW5kICR7ZW5kVHlwZX0gcmVxdWVzdDonJHtyZXF1ZXN0LnVybCgpfScgXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAke3JlcXVlc3QuX2ZhaWx1cmVUZXh0fSBjb3N0IHRpbWUgOiAke2Nvc3RUaW1lfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbmRUeXBlID09PSAnZmFpbGVkJyA/IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5SRVFVRVNUX1NXX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUkVRVUVTVF9TV19TVUNDKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFR5cGUgPT09ICdmYWlsZWQnID8gcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LlJFUVVFU1RfRkFJTEVEKSA6IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5SRVFVRVNUX1NVQ0MpO1xuICAgICAgICAgICAgaWYgKGVuZFR5cGUgPT09ICdmYWlsZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZSA/IHJlc3BvbnNlLmhlYWRlcnMoKSA6IHt9O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQcm94eUlwID0gaGVhZGVyc1sneC1yZXF1ZXN0cHJveHktaXAnXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkUHJveHlJcCA9IGhlYWRlcnNbJ3gtb2xkLXJlcXVlc3Rwcm94eS1pcCddO1xuICAgICAgICAgICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmYWlsZWQgcmVxdWVzdCEhISBOZXdQcm94eToke25ld1Byb3h5SXB9LiBPbGRQcm94eToke29sZFByb3h5SXB9LiB1cmw6JHtyVXJsfS4gcmV0Y29kZToke3Jlc3BvbnNlLnN0YXR1cygpfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZmFpbGVkIHJlcXVlc3QhISEgJHtyVXJsfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmRUeXBlID09PSAnZmFpbGVkJyA/IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5TUVVJRF9SRVFVRVNUX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuU1FVSURfUkVRVUVTVF9TVUNDKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3ROdW0tLTtcbiAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKGBmcmFtZVske3RoaXMuZnJhbWUubmFtZSgpfV0gcmVxdWVzdE51bS0tICR7dGhpcy5yZXF1ZXN0TnVtfWApXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3ROdW0gPD0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmV0d29ya0lkbGVUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5ldHdvcmtJZGxlVGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXR3b3JrSWRsZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc05ldHdvcmtJZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1ZygnbmV0d29yayBpZGxlJywgdGhpcy5mcmFtZS5uYW1lKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbmV0d29ya0lkbGUnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAvLyA1MDBtcyDmsqHmnInmlrDor7fmsYLlsLHorqTkuLrmmK9uZXR3b3JrSWRsZVxuICAgICAgICB9XG4gICAgICAgIC8vIOabtOaWsGZyYW1l55qE5bmz5Z2H6ICX5pe2XG4gICAgICAgIGlmICh0aGlzLnRpbWVQZXJSZXF1ZXN0ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gY29zdFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gKHRoaXMudGltZVBlclJlcXVlc3QgKyBjb3N0VGltZSkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTWFpbkZyYW1lKSB7XG4gICAgICAgICAgICAvLyB3eC5yZXF1ZXN0XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZSA/IHJlc3BvbnNlLmhlYWRlcnMoKSA6IHt9O1xuICAgICAgICAgICAgY29uc3QgbmV3UHJveHlJcCA9IGhlYWRlcnNbJ3gtcmVxdWVzdHByb3h5LWlwJ107XG4gICAgICAgICAgICBjb25zdCBvbGRQcm94eUlwID0gaGVhZGVyc1sneC1vbGQtcmVxdWVzdHByb3h5LWlwJ107XG4gICAgICAgICAgICBpZiAobmV3UHJveHlJcCAmJiAhcmVwb3J0TmV3UHJveHlJcCkge1xuICAgICAgICAgICAgICAgIC8vIGRlYnVnKGBOZXcgUHJveHkgSXBgLCBuZXdQcm94eUlwKTtcbiAgICAgICAgICAgICAgICByZXBvcnROZXdQcm94eUlwID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZFByb3h5SXAgJiYgIXJlcG9ydE5ld1Byb3h5SXApIHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1ZyhgT2xkIFByb3h5IElwYCwgb2xkUHJveHlJcCk7XG4gICAgICAgICAgICAgICAgcmVwb3J0TmV3UHJveHlJcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogMDog5q2j5bi4XG4gICAgICogLTE6IOi2heaXtlxuICAgICAqIC0yOiBmcmFtZSBkZXRhY2hlZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICB3YWl0Rm9yTmV0d29ya0lkbGUodGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXRhY2goKSlcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoLTIpO1xuICAgICAgICBpZiAodGhpcy5pc05ldHdvcmtJZGxlKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGB3YWl0Rm9yTmV0d29ya0lkbGUgdGltZW91dDoke3RpbWVvdXR9YCk7XG4gICAgICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5Lk5FVFdPUktfSURMRV9USU1FT1VUKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKC0xKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCduZXR3b3JrSWRsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKDApO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdkZXRhY2gnLCAoZnJhbWVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGB3YWl0Rm9yTmV0d29ya0lkbGUgZmFpbDogZnJhbWVbJHtmcmFtZU5hbWV9XSBkZXRhY2hgKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKC0yKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRnJhbWVEYXRhO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==