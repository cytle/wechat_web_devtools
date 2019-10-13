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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/auto-run/runtime/fatalDetectEntry.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/auto-run/log.ts":
/*!*****************************!*\
  !*** ./src/auto-run/log.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log4js = __webpack_require__(/*! log4js */ "log4js");
// @todo 运营规范日志格式为 /home/qspace/log/应用名/error/yyyyMMddhh.log
// log4js不支持只有pattern的文件名，这里投机取巧一把，文件名为20, 后加年份后两位，在2100前没有问题。@qybdshen
const isProd = "development" == 'production';
const logLevel = process.env.LOG_LEVEL ? process.env.LOG_LEVEL : ( true ? 'debug' : undefined);
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

/***/ "./src/auto-run/runtime/FatalDetect.ts":
/*!*********************************************!*\
  !*** ./src/auto-run/runtime/FatalDetect.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const fs = __webpack_require__(/*! fs-extra */ "fs-extra");
const path = __webpack_require__(/*! path */ "path");
const await_to_js_1 = __webpack_require__(/*! await-to-js */ "await-to-js");
const NetworkListener_1 = __webpack_require__(/*! ./NetworkListener */ "./src/auto-run/runtime/NetworkListener.ts");
const Hijack_1 = __webpack_require__(/*! ./base/Hijack */ "./src/auto-run/runtime/base/Hijack.ts");
const PageBase_1 = __webpack_require__(/*! ./base/PageBase */ "./src/auto-run/runtime/base/PageBase.ts");
const utils = __webpack_require__(/*! ../util/utils */ "./src/auto-run/util/utils.ts");
const devices = __webpack_require__(/*! puppeteer/DeviceDescriptors */ "puppeteer/DeviceDescriptors");
const url_1 = __webpack_require__(/*! url */ "url");
function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
const TIME_LIMIT = 60 * 1000;
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
        this.requestTotal = 0;
        this.requestFailedCnt = 0;
        this.requestDomainSet = new Set();
        this.httpsExpiredSet = new Set();
        this.blankPercent = 0;
        this.clickableElementCount = 0;
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
        this.networkListener.on('request', (request) => {
            const url = this.networkListener.getRealUrl(request.url());
            const frame = request.frame();
            if (frame && request.url() != url && frame.name() === 'appservice') {
                this.requestTotal++;
                const urlObj = url_1.parse(url);
                if (urlObj) {
                    this.requestDomainSet.add(urlObj.host);
                }
            }
        });
        this.networkListener.on('requestfailed', async (request) => {
            const response = request.response();
            const url = this.networkListener.getRealUrl(request.url());
            const frame = request.frame();
            if (request.url() != url && frame.name() === 'appservice') {
                this.requestFailedCnt++;
                if (response) {
                    const body = await response.buffer();
                    if (body && body.length && /CERT_HAS_EXPIRED/i.test(body.toString('utf8'))) {
                        const urlObj = url_1.parse(url);
                        this.httpsExpiredSet.add(urlObj.host);
                    }
                }
            }
        });
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
            //   reportIdKey(IdKey.FIRST_PAGE_REDIRECT)
            return this.genTaskResult();
        }
        // 这里先sleep 1s，waitForCurrentFrameIdle检查的时候
        // 可能页面的请求都没开始发起，造成idle的假象
        await sleep(1000);
        this.log.debug('waiting for frame idle');
        const waitFrameInfo = await this.waitForCurrentFrameIdle();
        if (waitFrameInfo.hasWebview) {
            // has webview means no other components shown
            this.log.error('has webview at the beginning, nothing to do');
            //   reportIdKey(IdKey.FIRST_PAGE_WEBVIEW)
            return this.genTaskResult();
        }
        this.log.debug('frame idle time', this.getTime());
        return Promise.all([
            this.timeoutPromise,
            new Promise(async (resolve, reject) => {
                await this.startDetect();
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
            this.taskFinishedTime = Date.now();
            this.log.info(`time used ${this.taskFinishedTime - this.taskStartTime}ms`);
            return this.genTaskResult();
        });
    }
    async initPage() {
        this.driverStartTime = Date.now();
        await this.page.setCookie(utils.getCookieInfo(this.appuin, this.indexPageUrl)); // 跳转前种入wxuin cookie，确保所有请求都到一台机器
        await this.page.emulate(iPhoneX);
        await this.page.coverage.startJSCoverage();
    }
    async startDetect() {
        await this.crawlCurrentWebview();
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
        await sleep(5000);
        this.clickableElementCount = await this.countElements(frame, webviewNativeHandle);
        // if (!hasWebview) {
        //   await this.clickElements(frame, webviewNativeHandle, urlPath)
        // } else {
        //   this.urlPathMap[urlPath].isWebview = true
        //   this.log.error('hasWebview!!!!!!!!!')
        // }
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
    async countElements(frame, webviewBrowserHandle) {
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
            return 0;
        }
        this.log.debug('get clickable elements, length', clickableCount);
        const elementsHandle = (await frame.$$('[crawler-click-el="true"]')).slice(0, 200);
        return clickableCount;
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
    async genTaskResult() {
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
            // normalSearchPageCount: nonWebviewPage,
            // recoverSuccess: nonWebviewPage,
            // recoverTotal: crawlPageTotal,
            // redirectToPageCount:
            // sessionCreateTime:
            // result_status: ,
            // tabbars: this.wxConfig.tabBar ? this.wxConfig.tabBar.list.map((item: any) => item.pagePath) : [],
            // timeCost: this.taskFinishedTime - this.driverStartTime,
            // totalPageCount: this.wxConfig.pages.length,
            // url_character: {},
            ide_ext_info: JSON.stringify({
                requestTotal: this.requestTotal,
                requestFailedCnt: this.requestFailedCnt,
                requestDomainSet: this.requestDomainSet,
                httpsExpiredSet: this.httpsExpiredSet,
                blankPercent: this.blankPercent,
                clickableElementCount: this.clickableElementCount,
            })
        });
        await fs.writeFile(path.join(this.resultPath, `${this.appid}.json`), JSON.stringify(this.taskResult));
        return this.taskResult;
    }
}
exports.default = AuditsAuto;


/***/ }),

/***/ "./src/auto-run/runtime/NetworkListener.ts":
/*!*************************************************!*\
  !*** ./src/auto-run/runtime/NetworkListener.ts ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils = __webpack_require__(/*! ../../js/utils.js */ "./src/js/utils.js");
const url_1 = __webpack_require__(/*! url */ "url");
const events_1 = __webpack_require__(/*! events */ "events");
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
                this.emit('request', request);
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
                this.emit('requestfailed', request);
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
                this.emit('requestfinished', request);
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
                this.emit('response', response);
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

/***/ "./src/auto-run/runtime/base/FrameData.ts":
/*!************************************************!*\
  !*** ./src/auto-run/runtime/base/FrameData.ts ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "events");
const log_1 = __webpack_require__(/*! ../../log */ "./src/auto-run/log.ts");
const reportIdKey_1 = __webpack_require__(/*! ../../util/reportIdKey */ "./src/auto-run/util/reportIdKey.ts");
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


/***/ }),

/***/ "./src/auto-run/runtime/base/Hijack.ts":
/*!*********************************************!*\
  !*** ./src/auto-run/runtime/base/Hijack.ts ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "events");
const qs = __webpack_require__(/*! qs */ "qs");
const utils_1 = __webpack_require__(/*! ../../util/utils */ "./src/auto-run/util/utils.ts");
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

/***/ "./src/auto-run/runtime/base/PageBase.ts":
/*!***********************************************!*\
  !*** ./src/auto-run/runtime/base/PageBase.ts ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__(/*! events */ "events");
const log_1 = __webpack_require__(/*! ../../log */ "./src/auto-run/log.ts");
const domUtils_1 = __webpack_require__(/*! ../../util/domUtils */ "./src/auto-run/util/domUtils.ts");
const FrameData_1 = __webpack_require__(/*! ./FrameData */ "./src/auto-run/runtime/base/FrameData.ts");
const reportIdKey_1 = __webpack_require__(/*! ../../util/reportIdKey */ "./src/auto-run/util/reportIdKey.ts");
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

/***/ "./src/auto-run/runtime/fatalDetectEntry.ts":
/*!**************************************************!*\
  !*** ./src/auto-run/runtime/fatalDetectEntry.ts ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const path = __webpack_require__(/*! path */ "path");
const fs = __webpack_require__(/*! fs-extra */ "fs-extra");
const puppeteer = __webpack_require__(/*! puppeteer */ "puppeteer");
const FatalDetect_1 = __webpack_require__(/*! ./FatalDetect */ "./src/auto-run/runtime/FatalDetect.ts");
const log_1 = __webpack_require__(/*! ../log */ "./src/auto-run/log.ts");
const isProd = "development" === 'production';
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
    // reportIdKey(IdKey.TASK_START)
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
        // reportIdKey(IdKey.PROCESS_CRASH);
        await browser.close();
        process.exit();
    });
    process.on('warning', (error) => {
        log_1.default.warn('process on warning');
        log_1.default.warn(error.message);
        log_1.default.warn(error.stack);
    });
    const page = await browser.newPage();
    const fatalDetect = new FatalDetect_1.default(page, config);
    log_1.default.info('new FatalDetect Crawler succ');
    fatalDetect.on('pageError', async (error) => {
        log_1.default.error(`catch page crash ${error.message}\n ${error.stack}`);
        await browser.close();
        process.exit();
    });
    try {
        const taskResult = await fatalDetect.start();
        log_1.default.info(`Time cost ${Math.round((Date.now() - taskStartTime) / 1000)} s`);
        log_1.default.info('Audits result: ', JSON.stringify(taskResult));
        if (taskResult) {
            // reportIdKey(IdKey.TASK_SUCC);
        }
        else {
            // reportIdKey(IdKey.TASK_NO_RESULT);
        }
        await browser.close();
        process.exit();
    }
    catch (e) {
        log_1.default.error(`catch main error ${e.message}\n ${e.stack}`);
        // reportIdKey(IdKey.CRAWLER_ERROR);
        await browser.close();
        process.exit();
    }
})();


/***/ }),

/***/ "./src/auto-run/util/config.ts":
/*!*************************************!*\
  !*** ./src/auto-run/util/config.ts ***!
  \*************************************/
/*! no static exports found */
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

/***/ "./src/auto-run/util/domUtils.ts":
/*!***************************************!*\
  !*** ./src/auto-run/util/domUtils.ts ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const await_to_js_1 = __webpack_require__(/*! await-to-js */ "await-to-js");
// import {IdKey} from "../config";
const log_1 = __webpack_require__(/*! ../log */ "./src/auto-run/log.ts");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/auto-run/util/utils.ts");
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

/***/ "./src/auto-run/util/reportIdKey.ts":
/*!******************************************!*\
  !*** ./src/auto-run/util/reportIdKey.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(/*! ./config */ "./src/auto-run/util/config.ts");
const log_1 = __webpack_require__(/*! ../log */ "./src/auto-run/log.ts");
const requireFunc =  true ? require : undefined;
const isProd = "development" === 'production';
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
var config_2 = __webpack_require__(/*! ./config */ "./src/auto-run/util/config.ts");
exports.IdKey = config_2.IdKey;


/***/ }),

/***/ "./src/auto-run/util/utils.ts":
/*!************************************!*\
  !*** ./src/auto-run/util/utils.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Jimp = __webpack_require__(/*! jimp */ "jimp");
// import {ElementHandle} from "puppeteer";
const qs = __webpack_require__(/*! qs */ "qs");
const urlUtil = __webpack_require__(/*! url */ "url");
// import {IdKey} from "../config";
const log_1 = __webpack_require__(/*! ../log */ "./src/auto-run/log.ts");
// import {reportIdKey} from "../reportIdKey";
const devices = __webpack_require__(/*! puppeteer/DeviceDescriptors */ "puppeteer/DeviceDescriptors");
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

/***/ "./src/js/utils.js":
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/*! no static exports found */
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
  if (true) {
    const args = Array.prototype.slice.call(arguments);
    args.unshift('color: #ea6f5a;');
    args.unshift('%c[Audit]');
    // args[0] = '[Audit] ' + (args[0] || '')
    console.log(...args);
  }
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
  /^https?:\/\/servicewechat\.com\//, /\/audits\/assert\//, /\/wxacrawler\//];

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

/***/ "await-to-js":
/*!******************************!*\
  !*** external "await-to-js" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("await-to-js");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("events");

/***/ }),

/***/ "fs-extra":
/*!***************************!*\
  !*** external "fs-extra" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs-extra");

/***/ }),

/***/ "jimp":
/*!***********************!*\
  !*** external "jimp" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jimp");

/***/ }),

/***/ "log4js":
/*!*************************!*\
  !*** external "log4js" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("log4js");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "puppeteer":
/*!****************************!*\
  !*** external "puppeteer" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer");

/***/ }),

/***/ "puppeteer/DeviceDescriptors":
/*!**********************************************!*\
  !*** external "puppeteer/DeviceDescriptors" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("puppeteer/DeviceDescriptors");

/***/ }),

/***/ "qs":
/*!*********************!*\
  !*** external "qs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("qs");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("url");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL2xvZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vcnVudGltZS9GYXRhbERldGVjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vcnVudGltZS9OZXR3b3JrTGlzdGVuZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3J1bnRpbWUvYmFzZS9GcmFtZURhdGEudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3J1bnRpbWUvYmFzZS9IaWphY2sudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2F1dG8tcnVuL3J1bnRpbWUvYmFzZS9QYWdlQmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vcnVudGltZS9mYXRhbERldGVjdEVudHJ5LnRzIiwid2VicGFjazovLy8uL3NyYy9hdXRvLXJ1bi91dGlsL2NvbmZpZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vdXRpbC9kb21VdGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vdXRpbC9yZXBvcnRJZEtleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYXV0by1ydW4vdXRpbC91dGlscy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdhaXQtdG8tanNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJldmVudHNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJmcy1leHRyYVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcImppbXBcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJsb2c0anNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJwYXRoXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHVwcGV0ZWVyXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicHVwcGV0ZWVyL0RldmljZURlc2NyaXB0b3JzXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwicXNcIiIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ1cmxcIiJdLCJuYW1lcyI6WyJtb2R1bGUiLCJleHBvcnRzIiwiJCIsInNlbGVjdG9yIiwiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCIkJCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzaG93Iiwic3R5bGUiLCJkaXNwbGF5IiwiaGlkZSIsInNwcmludGYiLCJzdHIiLCJhcmdzIiwiaSIsImxlbmd0aCIsInJlcGxhY2UiLCJyZXBvcnRCZWhhdmlvciIsImRhdGEiLCJsb2ciLCJwbHVnaW5NZXNzYWdlciIsImludm9rZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJwcm9jZXNzIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJzbGljZSIsImNhbGwiLCJhcmd1bWVudHMiLCJ1bnNoaWZ0IiwiY29uc29sZSIsImZvcm1hdFNpemUiLCJzaXplIiwidW5pdHMiLCJ1bml0Iiwic2hpZnQiLCJ0b0ZpeGVkIiwiaGFzaCIsInRleHQiLCJpbmRleCIsImNoYXJDb2RlQXQiLCJieXRlQ291bnQiLCJzIiwiZW5jb2RlVVJJIiwic3BsaXQiLCJ1bmlxdWUiLCJhcnIiLCJuZXdBcnIiLCJpbmRleE9mIiwicHVzaCIsImdldFR5cGUiLCJ2YWwiLCJPYmplY3QiLCJ0b1N0cmluZyIsInRvTG93ZXJDYXNlIiwiY29tcGFyZVZlcnNpb24iLCJ2MSIsInYyIiwibGVuIiwiTWF0aCIsIm1heCIsIm51bTEiLCJwYXJzZUludCIsIm51bTIiLCJpc1JlcXVlc3ROb3RGb3JBdWRpdCIsInVybCIsImludmFsaWREb21haW5SZWciLCJtYXRjaCIsImZpbHRlckxpYlN0YWNrIiwic3RhY2tzIiwiZmlsdGVyIiwic3RhY2siLCJ0ZXN0IiwiZmlsZSIsInBhcnNlU3RhY2tTdHJpbmdzIiwic3RhY2tTdHIiLCJmaWx0ZXJMaWIiLCJSRUdfRVhQIiwicmVzdWx0IiwibWFwIiwiZmlsZVN0cmluZyIsImxpbmUiLCJjb2x1bW4iLCJmdW5jIiwiZ2V0Q2FsbFN0YWNrIiwiRXJyb3IiLCJvbkdlbmVyYXRlRnVuY1JlYWR5Iiwid2luZG93IiwiX19nZW5lcmF0ZUZ1bmNfXyIsInNldFRpbWVvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhdHVzIl0sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQsZUFBZSxtQkFBTyxDQUFDLHNCQUFRO0FBQy9CO0FBQ0E7QUFDQSxlQUFlLGFBQW9CO0FBQ25DLGtFQUFrRSxLQUFzQyxhQUFhLFNBQU07QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLG9CQUFvQjtBQUMxRDtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUNBQWlDLGFBQWEsR0FBRyxNQUFNO0FBQ3ZEO0FB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Ozs7Ozs7OztBQ0FBLG1DOzs7Ozs7Ozs7OztBQ0FBLGlDOzs7Ozs7Ozs7OztBQ0FBLHNDOzs7Ozs7Ozs7OztBQ0FBLHdEOzs7Ozs7Ozs7OztBQ0FBLCtCOzs7Ozs7Ozs7OztBQ0FBLGdDIiwiZmlsZSI6ImF1dG8tcnVuL2ZhdGFsRGV0ZWN0RW50cnkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9hdXRvLXJ1bi9ydW50aW1lL2ZhdGFsRGV0ZWN0RW50cnkudHNcIik7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGxvZzRqcyA9IHJlcXVpcmUoXCJsb2c0anNcIik7XG4vLyBAdG9kbyDov5DokKXop4TojIPml6Xlv5fmoLzlvI/kuLogL2hvbWUvcXNwYWNlL2xvZy/lupTnlKjlkI0vZXJyb3IveXl5eU1NZGRoaC5sb2dcbi8vIGxvZzRqc+S4jeaUr+aMgeWPquaciXBhdHRlcm7nmoTmlofku7blkI3vvIzov5nph4zmipXmnLrlj5blt6fkuIDmiorvvIzmlofku7blkI3kuLoyMCwg5ZCO5Yqg5bm05Lu95ZCO5Lik5L2N77yM5ZyoMjEwMOWJjeayoeaciemXrumimOOAgkBxeWJkc2hlblxuY29uc3QgaXNQcm9kID0gcHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgbG9nTGV2ZWwgPSBwcm9jZXNzLmVudi5MT0dfTEVWRUwgPyBwcm9jZXNzLmVudi5MT0dfTEVWRUwgOiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgPT09ICdkZXZlbG9wbWVudCcgPyAnZGVidWcnIDogJ2luZm8nKTtcbmNsYXNzIExvZ2dlckNsYXNzIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy5sb2dQYXRoID0gcHJvY2Vzcy5jd2QoKSArICcvbG9ncy8nO1xuICAgICAgICBpZiAoaXNQcm9kKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIoJ3Byb2R1Y3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcignZGVidWcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpbml0TG9nZ2VyKGxvZ1BhdGgsIGFwcGlkKSB7XG4gICAgICAgIHRoaXMubG9nUGF0aCA9IGxvZ1BhdGg7XG4gICAgICAgIGxvZzRqcy5jb25maWd1cmUoe1xuICAgICAgICAgICAgYXBwZW5kZXJzOiB7XG4gICAgICAgICAgICAgICAgY29uc29sZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY29uc29sZScsXG4gICAgICAgICAgICAgICAgICAgIGxheW91dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3BhdHRlcm4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybjogYFslZHt5eXl5LU1NLWRkIGhoOm1tOnNzfV0gJVtbJWNdIFslcF0gJW0lXWAsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZpbGU6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2ZpbGUnLFxuICAgICAgICAgICAgICAgICAgICBmaWxlbmFtZTogYCR7dGhpcy5sb2dQYXRofS8ke2FwcGlkfS5sb2dgLFxuICAgICAgICAgICAgICAgICAgICBtYXhMb2dTaXplOiA1MjQyODgwMDAsXG4gICAgICAgICAgICAgICAgICAgIGFsd2F5c0luY2x1ZGVQYXR0ZXJuOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBiYWNrdXBzOiAyMCxcbiAgICAgICAgICAgICAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAncGF0dGVybicsXG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuOiBgWyVke3l5eXktTU0tZGQgaGg6bW06c3N9XSBbJWNdIFslcF0gJW0lYCxcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY2F0ZWdvcmllczoge1xuICAgICAgICAgICAgICAgIHByb2R1Y3Rpb246IHsgYXBwZW5kZXJzOiBbJ2NvbnNvbGUnLCAnZmlsZSddLCBsZXZlbDogbG9nTGV2ZWwgfSxcbiAgICAgICAgICAgICAgICBkZWJ1ZzogeyBhcHBlbmRlcnM6IFsnY29uc29sZScsICdmaWxlJ10sIGxldmVsOiBsb2dMZXZlbCB9LFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IHsgYXBwZW5kZXJzOiBbJ2NvbnNvbGUnXSwgbGV2ZWw6IGxvZ0xldmVsIH0sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaXNQcm9kKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlciA9IGxvZzRqcy5nZXRMb2dnZXIoJ3Byb2R1Y3Rpb24nKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyID0gbG9nNGpzLmdldExvZ2dlcignZGVidWcnKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0cmFjZShmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci50cmFjZShmaXJzdEFyZywgLi4uYXJncyk7XG4gICAgfVxuICAgIGRlYnVnKGZpcnN0QXJnLCAuLi5hcmdzKSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKGZpcnN0QXJnLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgaW5mbyhmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci5pbmZvKGZpcnN0QXJnLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgd2FybihmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci53YXJuKGZpcnN0QXJnLCAuLi5hcmdzKTtcbiAgICB9XG4gICAgZXJyb3IoZmlyc3RBcmcsIC4uLmFyZ3MpIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoZmlyc3RBcmcsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBmYXRhbChmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci5mYXRhbChmaXJzdEFyZywgLi4uYXJncyk7XG4gICAgfVxuICAgIGxvZyhmaXJzdEFyZywgLi4uYXJncykge1xuICAgICAgICB0aGlzLmxvZ2dlci5sb2coZmlyc3RBcmcsIC4uLmFyZ3MpO1xuICAgIH1cbn1cbmNvbnN0IExvZ2dlciA9IG5ldyBMb2dnZXJDbGFzcygpO1xuZXhwb3J0cy5kZWZhdWx0ID0gTG9nZ2VyO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcbmNvbnN0IHBhdGggPSByZXF1aXJlKFwicGF0aFwiKTtcbmNvbnN0IGF3YWl0X3RvX2pzXzEgPSByZXF1aXJlKFwiYXdhaXQtdG8tanNcIik7XG5jb25zdCBOZXR3b3JrTGlzdGVuZXJfMSA9IHJlcXVpcmUoXCIuL05ldHdvcmtMaXN0ZW5lclwiKTtcbmNvbnN0IEhpamFja18xID0gcmVxdWlyZShcIi4vYmFzZS9IaWphY2tcIik7XG5jb25zdCBQYWdlQmFzZV8xID0gcmVxdWlyZShcIi4vYmFzZS9QYWdlQmFzZVwiKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZShcIi4uL3V0aWwvdXRpbHNcIik7XG5jb25zdCBkZXZpY2VzID0gcmVxdWlyZShcInB1cHBldGVlci9EZXZpY2VEZXNjcmlwdG9yc1wiKTtcbmNvbnN0IHVybF8xID0gcmVxdWlyZShcInVybFwiKTtcbmZ1bmN0aW9uIHNsZWVwKHRpbWUpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSkpO1xufVxuY29uc3QgVElNRV9MSU1JVCA9IDYwICogMTAwMDtcbmNvbnN0IGlQaG9uZVggPSBkZXZpY2VzWydpUGhvbmUgWCddO1xuaVBob25lWC52aWV3cG9ydC5kZXZpY2VTY2FsZUZhY3RvciA9IDE7XG5jbGFzcyBBdWRpdHNBdXRvIGV4dGVuZHMgUGFnZUJhc2VfMS5kZWZhdWx0IHtcbiAgICBjb25zdHJ1Y3RvcihwYWdlLCBvcHRpb25zKSB7XG4gICAgICAgIHN1cGVyKHBhZ2UpO1xuICAgICAgICB0aGlzLmNsaWNrQ250ID0gMDtcbiAgICAgICAgdGhpcy53eENvbmZpZyA9IHt9O1xuICAgICAgICB0aGlzLnVybFBhdGhNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5lbGVtZW50Q2xpY2tDb3VudE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5lbGVtZW50VGV4dE1hcCA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5kcml2ZXJTdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLnRhc2tGaW5pc2hlZFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmpzQ292ZXJhZ2UgPSAnJztcbiAgICAgICAgdGhpcy5pc1RpbWVvdXQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0VG90YWwgPSAwO1xuICAgICAgICB0aGlzLnJlcXVlc3RGYWlsZWRDbnQgPSAwO1xuICAgICAgICB0aGlzLnJlcXVlc3REb21haW5TZXQgPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuaHR0cHNFeHBpcmVkU2V0ID0gbmV3IFNldCgpO1xuICAgICAgICB0aGlzLmJsYW5rUGVyY2VudCA9IDA7XG4gICAgICAgIHRoaXMuY2xpY2thYmxlRWxlbWVudENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5hcHBpZCA9IG9wdGlvbnMuYXBwaWQgfHwgJyc7XG4gICAgICAgIHRoaXMuYXBwdWluID0gb3B0aW9ucy5hcHB1aW47XG4gICAgICAgIHRoaXMudGFza2lkID0gb3B0aW9ucy50YXNraWQ7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMuaW5kZXhQYWdlVXJsID0gb3B0aW9ucy51cmwgfHwgJyc7XG4gICAgICAgIHRoaXMucmVzdWx0UGF0aCA9IG9wdGlvbnMucmVzdWx0UGF0aDtcbiAgICAgICAgdGhpcy50YXNrU3RhcnRUaW1lID0gb3B0aW9ucy50YXNrU3RhcnRUaW1lO1xuICAgICAgICB0aGlzLmxvbmdpdHVkZSA9IG9wdGlvbnMubG9uZ2l0dWRlIHx8IDExMy4yNjQ1O1xuICAgICAgICB0aGlzLmxhdGl0dWRlID0gb3B0aW9ucy5sYXRpdHVkZSB8fCAyMy4xMjg4O1xuICAgICAgICB0aGlzLmhpamFjayA9IG5ldyBIaWphY2tfMS5kZWZhdWx0KHBhZ2UpO1xuICAgICAgICB0aGlzLm5ldHdvcmtMaXN0ZW5lciA9IG5ldyBOZXR3b3JrTGlzdGVuZXJfMS5kZWZhdWx0KHRoaXMucGFnZSk7XG4gICAgICAgIHRoaXMudGFza1Jlc3VsdCA9IHsgcGFnZXM6IFtdLCBtbWRhdGE6IFtdIH07XG4gICAgICAgIHRoaXMuaW5pdCgpO1xuICAgIH1cbiAgICBpbml0KCkge1xuICAgICAgICB0aGlzLmluaXRQYWdlRXZlbnQoKTtcbiAgICAgICAgdGhpcy5pbml0TmV0d29ya0V2ZW50KCk7XG4gICAgICAgIHRoaXMudGltZW91dFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKCdzdGFydCBjb3VudCBkb3duJyk7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QobmV3IEVycm9yKCd0aW1lb3V0JykpO1xuICAgICAgICAgICAgfSwgVElNRV9MSU1JVCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBpbml0TmV0d29ya0V2ZW50KCkge1xuICAgICAgICB0aGlzLm5ldHdvcmtMaXN0ZW5lci5vbigncmVxdWVzdCcsIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSB0aGlzLm5ldHdvcmtMaXN0ZW5lci5nZXRSZWFsVXJsKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICAgICAgY29uc3QgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICBpZiAoZnJhbWUgJiYgcmVxdWVzdC51cmwoKSAhPSB1cmwgJiYgZnJhbWUubmFtZSgpID09PSAnYXBwc2VydmljZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3RUb3RhbCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IHVybE9iaiA9IHVybF8xLnBhcnNlKHVybCk7XG4gICAgICAgICAgICAgICAgaWYgKHVybE9iaikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlcXVlc3REb21haW5TZXQuYWRkKHVybE9iai5ob3N0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm5ldHdvcmtMaXN0ZW5lci5vbigncmVxdWVzdGZhaWxlZCcsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IHVybCA9IHRoaXMubmV0d29ya0xpc3RlbmVyLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0LnVybCgpICE9IHVybCAmJiBmcmFtZS5uYW1lKCkgPT09ICdhcHBzZXJ2aWNlJykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEZhaWxlZENudCsrO1xuICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBib2R5ID0gYXdhaXQgcmVzcG9uc2UuYnVmZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChib2R5ICYmIGJvZHkubGVuZ3RoICYmIC9DRVJUX0hBU19FWFBJUkVEL2kudGVzdChib2R5LnRvU3RyaW5nKCd1dGY4JykpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmxPYmogPSB1cmxfMS5wYXJzZSh1cmwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5odHRwc0V4cGlyZWRTZXQuYWRkKHVybE9iai5ob3N0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0KHJldHJ5Q250ID0gMCkge1xuICAgICAgICBpZiAocmV0cnlDbnQgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignc3RhcnQgY3Jhd2wgZmFpbGVkLCByZXRyeSAzIHRpbWVzJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFyZXRyeUNudCkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5pbml0UGFnZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmluZm8oYGluZGV4UGFnZVVybDogJHt0aGlzLmluZGV4UGFnZVVybH1gKTtcbiAgICAgICAgY29uc3QgW2dvdG9FcnJvciwgcGFnZVJlc3BvbnNlXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdCh0aGlzLnBhZ2UuZ290byh0aGlzLmluZGV4UGFnZVVybCkpO1xuICAgICAgICBpZiAoZ290b0Vycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgZ290b0Vycm9yICR7Z290b0Vycm9yLm1lc3NhZ2V9XFxuJHtnb3RvRXJyb3Iuc3RhY2t9LCByZXRyeWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQocmV0cnlDbnQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFnZVJlc3BvbnNlKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFpbiA9IHBhZ2VSZXNwb25zZS5yZXF1ZXN0KCkucmVkaXJlY3RDaGFpbigpO1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgcGFnZVJlc3BvbnNlIGlzIG9rWyR7cGFnZVJlc3BvbnNlLm9rKCl9XSBjaGFpbiBsZW5ndGggWyR7Y2hhaW4ubGVuZ3RofV0gJHtjaGFpbi5tYXAoKHJlcSkgPT4gcmVxLnVybCgpKX1gKTtcbiAgICAgICAgICAgIGlmICghcGFnZVJlc3BvbnNlLm9rKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmxvZy5lcnJvcihgcGFnZSByZXNwb25zZSBlcnJvciwgc3RhdHVzQ29kZVske3BhZ2VSZXNwb25zZS5zdGF0dXMoKX1dLCBmYWlsdXJlWyR7cGFnZVJlc3BvbnNlLnJlcXVlc3QoKS5mYWlsdXJlKCl9XWApO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnN0YXJ0KHJldHJ5Q250ICsgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW3dhaXRGb3JBcHBzZXJ2aWNlRXJyb3JdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS53YWl0Rm9yKCgpID0+ICEhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcHNlcnZpY2UnKSkpO1xuICAgICAgICBpZiAod2FpdEZvckFwcHNlcnZpY2VFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYHdhaXRGb3IgYXBwc2VydmljZSBlcnJvciAke3dhaXRGb3JBcHBzZXJ2aWNlRXJyb3IubWVzc2FnZX1cXG4ke3dhaXRGb3JBcHBzZXJ2aWNlRXJyb3Iuc3RhY2t9LCByZXRyeWApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RhcnQocmV0cnlDbnQgKyAxKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZy5kZWJ1ZygnYXBwc2VydmljZSByZWFkeScpO1xuICAgICAgICBhd2FpdCB0aGlzLmhpamFjay5oaWphY2tEZWZhdWx0KHtcbiAgICAgICAgICAgIGxvbmdpdHVkZTogdGhpcy5sb25naXR1ZGUsXG4gICAgICAgICAgICBsYXRpdHVkZTogdGhpcy5sYXRpdHVkZVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgdGhpcy5oaWphY2suaGlqYWNrUGFnZUV2ZW50KCk7XG4gICAgICAgIC8vIOiyjOS8vOS4jeS4gOWumuebkeWQrOW+l+WIsO+8jOi2heaXtuS5n+WFgeiuuOe7p+e7rei3kVxuICAgICAgICBjb25zdCBbZG9tUmVhZHlUaW1lb3V0XSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdCh0aGlzLmhpamFjay53YWl0Rm9yUGFnZUV2ZW50KFwiX19ET01SZWFkeVwiLCB7IHRpbWVvdXQ6IDEyMDAwIH0pKTtcbiAgICAgICAgaWYgKGRvbVJlYWR5VGltZW91dCkge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYHBhZ2UgZXZlbnQgW19fRE9NUmVhZHldIHRpbWVvdXQuIFRyeSB0byBvbnRpbnVlLmApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IFt3ZWJ2aWV3TWFuYWdlclRpbWVvdXRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS53YWl0Rm9yKCgpID0+IHdpbmRvdy5uYXRpdmUgJiYgd2luZG93Lm5hdGl2ZS53ZWJ2aWV3TWFuYWdlciAmJiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKSAhPSBudWxsKSk7XG4gICAgICAgIGlmICh3ZWJ2aWV3TWFuYWdlclRpbWVvdXQpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKCd3YWl0IGZvciB3ZWJ2aWV3TWFuYWdlciByZWFkeSB0aW1lb3V0Jyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5zdGFydChyZXRyeUNudCArIDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMud3hDb25maWcgPSBhd2FpdCB0aGlzLnBhZ2UuZXZhbHVhdGUoKCkgPT4gd2luZG93Ll9fd3hDb25maWcpO1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCd3eENvbmZpZyByZWFkeScpO1xuICAgICAgICB0aGlzLmxvZy5pbmZvKCdjaGVja2luZyBpcyByZWRpcmVjdCcpO1xuICAgICAgICBjb25zdCBpc1BhZ2VSZWRpcmVjdGVkID0gYXdhaXQgdGhpcy5pc1BhZ2VSZWRpcmVjdGVkKHRoaXMuaW5kZXhQYWdlVXJsKTtcbiAgICAgICAgaWYgKGlzUGFnZVJlZGlyZWN0ZWQpIHtcbiAgICAgICAgICAgIC8vIHJlZGlyZWN0IG1lYW5zIHBhY2thZ2UgaXMgbm90IGV4aXN0XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcigncGFnZSByZWRpcmVjdGVkLCBwYWNrYWdlIGlzIG5vdCBleGlzdCcpO1xuICAgICAgICAgICAgLy8gICByZXBvcnRJZEtleShJZEtleS5GSVJTVF9QQUdFX1JFRElSRUNUKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuVGFza1Jlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIC8vIOi/memHjOWFiHNsZWVwIDFz77yMd2FpdEZvckN1cnJlbnRGcmFtZUlkbGXmo4Dmn6XnmoTml7blgJlcbiAgICAgICAgLy8g5Y+v6IO96aG16Z2i55qE6K+35rGC6YO95rKh5byA5aeL5Y+R6LW377yM6YCg5oiQaWRsZeeahOWBh+ixoVxuICAgICAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoJ3dhaXRpbmcgZm9yIGZyYW1lIGlkbGUnKTtcbiAgICAgICAgY29uc3Qgd2FpdEZyYW1lSW5mbyA9IGF3YWl0IHRoaXMud2FpdEZvckN1cnJlbnRGcmFtZUlkbGUoKTtcbiAgICAgICAgaWYgKHdhaXRGcmFtZUluZm8uaGFzV2Vidmlldykge1xuICAgICAgICAgICAgLy8gaGFzIHdlYnZpZXcgbWVhbnMgbm8gb3RoZXIgY29tcG9uZW50cyBzaG93blxuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoJ2hhcyB3ZWJ2aWV3IGF0IHRoZSBiZWdpbm5pbmcsIG5vdGhpbmcgdG8gZG8nKTtcbiAgICAgICAgICAgIC8vICAgcmVwb3J0SWRLZXkoSWRLZXkuRklSU1RfUEFHRV9XRUJWSUVXKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2VuVGFza1Jlc3VsdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdmcmFtZSBpZGxlIHRpbWUnLCB0aGlzLmdldFRpbWUoKSk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLnRpbWVvdXRQcm9taXNlLFxuICAgICAgICAgICAgbmV3IFByb21pc2UoYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGF3YWl0IHRoaXMuc3RhcnREZXRlY3QoKTtcbiAgICAgICAgICAgICAgICAvLyBhd2FpdCBzbGVlcCg2MDAwMDAwKVxuICAgICAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ2ZpbmlzaGVkJykpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgXSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IEVycm9yKCdmaW5pc2hlZCcpKTtcbiAgICAgICAgfSkuY2F0Y2goYXN5bmMgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IubWVzc2FnZSA9PSAnZmluaXNoZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sb2cuaW5mbygnY3Jhd2wgZmluaXNoZWQgaW4gdGltZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc1RpbWVvdXQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHRoaXMubG9nLmluZm8oJ2NyYXdsIHRpbWVvdXQsIHN0b3AgYXVkaXRzIHRvIGdldCByZXN1bHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudGFza0ZpbmlzaGVkVGltZSA9IERhdGUubm93KCk7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGB0aW1lIHVzZWQgJHt0aGlzLnRhc2tGaW5pc2hlZFRpbWUgLSB0aGlzLnRhc2tTdGFydFRpbWV9bXNgKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlblRhc2tSZXN1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIGFzeW5jIGluaXRQYWdlKCkge1xuICAgICAgICB0aGlzLmRyaXZlclN0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5zZXRDb29raWUodXRpbHMuZ2V0Q29va2llSW5mbyh0aGlzLmFwcHVpbiwgdGhpcy5pbmRleFBhZ2VVcmwpKTsgLy8g6Lez6L2s5YmN56eN5YWld3h1aW4gY29va2ll77yM56Gu5L+d5omA5pyJ6K+35rGC6YO95Yiw5LiA5Y+w5py65ZmoXG4gICAgICAgIGF3YWl0IHRoaXMucGFnZS5lbXVsYXRlKGlQaG9uZVgpO1xuICAgICAgICBhd2FpdCB0aGlzLnBhZ2UuY292ZXJhZ2Uuc3RhcnRKU0NvdmVyYWdlKCk7XG4gICAgfVxuICAgIGFzeW5jIHN0YXJ0RGV0ZWN0KCkge1xuICAgICAgICBhd2FpdCB0aGlzLmNyYXdsQ3VycmVudFdlYnZpZXcoKTtcbiAgICB9XG4gICAgYXN5bmMgY3Jhd2xDdXJyZW50V2VidmlldygpIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMucGFnZTtcbiAgICAgICAgY29uc3Qgd2Vidmlld05hdGl2ZUhhbmRsZSA9IGF3YWl0IHRoaXMucGFnZS5ldmFsdWF0ZUhhbmRsZSgoKSA9PiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKSk7XG4gICAgICAgIGNvbnN0IHVybCA9IGF3YWl0IHBhZ2UuZXZhbHVhdGUod2VidmlldyA9PiB3ZWJ2aWV3LnVybCwgd2Vidmlld05hdGl2ZUhhbmRsZSk7XG4gICAgICAgIGNvbnN0IHVybFBhdGggPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgICAgICAgdGhpcy51cmxQYXRoTWFwW3VybFBhdGhdID0gdGhpcy51cmxQYXRoTWFwW3VybFBhdGhdIHx8IHtcbiAgICAgICAgICAgIGlzV2VidmlldzogZmFsc2UsXG4gICAgICAgICAgICBjbnQ6IDBcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHRoaXMudXJsUGF0aE1hcFt1cmxQYXRoXS5jbnQgPiAyKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5pbmZvKGAke3VybFBhdGh9IGhhcyBjcmF3bGVkIDMgdGltZXNgKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnVybFBhdGhNYXBbdXJsUGF0aF0uY250Kys7XG4gICAgICAgIGNvbnN0IHsgaGFzV2VidmlldywgZnJhbWUgfSA9IGF3YWl0IHRoaXMuaXNDdXJyZW50RnJhbWVSZWFkeTRDcmF3bCgpO1xuICAgICAgICBpZiAoIWZyYW1lKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignY3VycmVudCBmcmFtZSBjYW4gbm90IGJlIGNyYXdsaW5nJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgW2dldFRpdGxlRXJyb3IsIHRpdGxlXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChmcmFtZS5ldmFsdWF0ZSgoKSA9PiBkb2N1bWVudC50aXRsZSkpO1xuICAgICAgICBpZiAoZ2V0VGl0bGVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGdldFRpdGxlRXJyb3JgLCBnZXRUaXRsZUVycm9yKTtcbiAgICAgICAgICAgIGlmIChmcmFtZS5pc0RldGFjaGVkKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2cuaW5mbygncGFnZSB0aXRsZTogJywgdGl0bGUpO1xuICAgICAgICBsZXQgZmlsZW5hbWUgPSB1dGlscy5nZXRGaWxlTmFtZUJ5VXJsKHVybCk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oJ3BhZ2Ugc2F2ZSBmaWxlbmFtZTogJywgdXJsKTtcbiAgICAgICAgY29uc3QgW2dldFBhZ2VTdGFja0Vycm9yLCBwYWdlU3RhY2tdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldFBhZ2VTdGFjaygpLm1hcCgod2VidmlldykgPT4gd2Vidmlldy5wYXRoKSkpO1xuICAgICAgICBpZiAoZ2V0UGFnZVN0YWNrRXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMubG9nLmVycm9yKGBnZXRQYWdlU3RhY2tFcnJvcmAsIGdldFBhZ2VTdGFja0Vycm9yKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmxvZy5pbmZvKCdwYWdlU3RhY2snLCBwYWdlU3RhY2spO1xuICAgICAgICBjb25zdCBbc2F2ZUVycm9yXSA9IGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChQcm9taXNlLmFsbChbXG4gICAgICAgICAgICB0aGlzLnNhdmVTY3JlZW5TaG90KGZpbGVuYW1lKSxcbiAgICAgICAgICAgIHRoaXMuc2F2ZUZyYW1lSHRtbChmcmFtZSwgZmlsZW5hbWUpXG4gICAgICAgIF0pKTtcbiAgICAgICAgaWYgKHNhdmVFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYHNhdmUgZXJyb3IgJHtzYXZlRXJyb3IubWVzc2FnZX1cXG4ke3NhdmVFcnJvci5zdGFja31gKTtcbiAgICAgICAgICAgIGZpbGVuYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICAgIGF3YWl0IHNsZWVwKDUwMDApO1xuICAgICAgICB0aGlzLmNsaWNrYWJsZUVsZW1lbnRDb3VudCA9IGF3YWl0IHRoaXMuY291bnRFbGVtZW50cyhmcmFtZSwgd2Vidmlld05hdGl2ZUhhbmRsZSk7XG4gICAgICAgIC8vIGlmICghaGFzV2Vidmlldykge1xuICAgICAgICAvLyAgIGF3YWl0IHRoaXMuY2xpY2tFbGVtZW50cyhmcmFtZSwgd2Vidmlld05hdGl2ZUhhbmRsZSwgdXJsUGF0aClcbiAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgLy8gICB0aGlzLnVybFBhdGhNYXBbdXJsUGF0aF0uaXNXZWJ2aWV3ID0gdHJ1ZVxuICAgICAgICAvLyAgIHRoaXMubG9nLmVycm9yKCdoYXNXZWJ2aWV3ISEhISEhISEhJylcbiAgICAgICAgLy8gfVxuICAgICAgICB0aGlzLnRhc2tSZXN1bHQucGFnZXMucHVzaCh7XG4gICAgICAgICAgICB0YXNrX3VybDogdGhpcy5pbmRleFBhZ2VVcmwuc3BsaXQoJyMhJylbMV0gfHwgJycsXG4gICAgICAgICAgICBwYXRoOiB1cmxQYXRoLFxuICAgICAgICAgICAgZnVsbF9wYXRoOiB1cmwsXG4gICAgICAgICAgICBwYWdlc3RhY2s6IHBhZ2VTdGFjayxcbiAgICAgICAgICAgIHBpYzogZmlsZW5hbWUgPyBgJHtmaWxlbmFtZX0uanBnYCA6ICcnLFxuICAgICAgICAgICAgaHRtbDogZmlsZW5hbWUgPyBgJHtmaWxlbmFtZX0uaHRtbGAgOiAnJyxcbiAgICAgICAgICAgIHRpdGxlOiB0aXRsZSAhPT0gdW5kZWZpbmVkID8gdGl0bGUgOiAndW5kZWZpbmVkJyxcbiAgICAgICAgICAgIGxldmVsOiBwYWdlU3RhY2subGVuZ3RoIC0gMSxcbiAgICAgICAgICAgIHJlYWNoVHlwZTogMCxcbiAgICAgICAgICAgIGlzX3dlYnZpZXc6IGhhc1dlYnZpZXcgPyAxIDogMFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5sb2cuaW5mbyhgY3Jhd2wgdXJsICR7dXJsfSBkb25lYCk7XG4gICAgfVxuICAgIGFzeW5jIGlzQ3VycmVudEZyYW1lUmVhZHk0Q3Jhd2woKSB7XG4gICAgICAgIGNvbnN0IHsgaGFzV2VidmlldywgZnJhbWUsIGlkIH0gPSBhd2FpdCB0aGlzLndhaXRGb3JDdXJyZW50RnJhbWVJZGxlKCk7XG4gICAgICAgIGlmICghZnJhbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1dlYnZpZXcgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzV2Vidmlldykge1xuICAgICAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldywgZnJhbWUgfTtcbiAgICAgICAgfVxuICAgICAgICAvLyDov5nph4zlhYhzbGVlcCAxc++8jHdhaXRGb3JDdXJyZW50RnJhbWVJZGxl5qOA5p+l55qE5pe25YCZXG4gICAgICAgIC8vIOWPr+iDvemhtemdoueahOW+iOWkmuivt+axgumDveayoeW8gOWni+WPkei1t++8jOmAoOaIkGlkbGXnmoTlgYfosaFcbiAgICAgICAgYXdhaXQgc2xlZXAoMTAwMCk7XG4gICAgICAgIHRoaXMubG9nLmluZm8oYHdhaXRpbmcgZm9yIGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gd2VidmlldyByZWFkeWApO1xuICAgICAgICBjb25zdCBzdGFydFRvV2FpdCA9IERhdGUubm93KCk7XG4gICAgICAgIGF3YWl0IGF3YWl0X3RvX2pzXzEuZGVmYXVsdChmcmFtZS53YWl0Rm9yRnVuY3Rpb24oKCkgPT4gISF3aW5kb3cud2Vidmlldywge1xuICAgICAgICAgICAgdGltZW91dDogMTAwMDBcbiAgICAgICAgfSwgaWQpKTtcbiAgICAgICAgdGhpcy5sb2cuaW5mbygnd2VidmlldyBvYmplY3QgcmVhZHknKTtcbiAgICAgICAgaWYgKGZyYW1lLmlzRGV0YWNoZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5sb2cuaW5mbyhgb2ggZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBkZXRhY2hlZGApO1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmluZm8oYGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gd2VidmlldyByZWFkeSwgdGltZTogJHtEYXRlLm5vdygpIC0gc3RhcnRUb1dhaXR9bXNgKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldywgZnJhbWUgfTtcbiAgICB9XG4gICAgYXN5bmMgY291bnRFbGVtZW50cyhmcmFtZSwgd2Vidmlld0Jyb3dzZXJIYW5kbGUpIHtcbiAgICAgICAgdGhpcy5sb2cuZGVidWcoJ2ZpbmRpbmcgY2xpY2thYmxlIGVsZW1lbnRzJyk7XG4gICAgICAgIGNvbnN0IFtldmFsdWF0ZUVycm9yLCBjbGlja2FibGVDb3VudF0gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQoZnJhbWUuZXZhbHVhdGUod2VidmlldyA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50cyA9IHdlYnZpZXcuZ2V0RWxlbWVudHMoeyBjbGlja2FibGU6IHRydWUgfSk7XG4gICAgICAgICAgICBjb25zdCBuYXZpZ2F0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnd3gtbmF2aWdhdG9yJyk7XG4gICAgICAgICAgICBlbGVtZW50cy5mb3JFYWNoKGVsZW1lbnQgPT4ge1xuICAgICAgICAgICAgICAgIC8vIOi/h+a7pOW5v+WRilxuICAgICAgICAgICAgICAgIGlmICghZWxlbWVudC5jbG9zZXN0KCd3eC1hZCcpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKCdjcmF3bGVyLWNsaWNrLWVsJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwobmF2aWdhdG9ycywgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgnY3Jhd2xlci1jbGljay1lbCcsICd0cnVlJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbY3Jhd2xlci1jbGljay1lbF0nKS5sZW5ndGg7XG4gICAgICAgIH0sIHdlYnZpZXdCcm93c2VySGFuZGxlKSk7XG4gICAgICAgIGlmIChldmFsdWF0ZUVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLmxvZy5lcnJvcignZ2V0Q2xpY2thYmxlRWxlbWVudHMgZXJyb3InLCBldmFsdWF0ZUVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubG9nLmRlYnVnKCdnZXQgY2xpY2thYmxlIGVsZW1lbnRzLCBsZW5ndGgnLCBjbGlja2FibGVDb3VudCk7XG4gICAgICAgIGNvbnN0IGVsZW1lbnRzSGFuZGxlID0gKGF3YWl0IGZyYW1lLiQkKCdbY3Jhd2xlci1jbGljay1lbD1cInRydWVcIl0nKSkuc2xpY2UoMCwgMjAwKTtcbiAgICAgICAgcmV0dXJuIGNsaWNrYWJsZUNvdW50O1xuICAgIH1cbiAgICBhc3luYyBnZXRFbGVtZW50S2V5KGVsZW1lbnQsIGZyYW1lKSB7XG4gICAgICAgIGNvbnN0IFtnZXRFbGVtZW50S2V5RXJyb3IsIGVsZW1lbnRLZXldID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLmV2YWx1YXRlKGVsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNsaWVudFJlY3QgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgdGV4dEtleTogYCR7TWF0aC5yb3VuZChjbGllbnRSZWN0LndpZHRoKX0tJHtNYXRoLnJvdW5kKGNsaWVudFJlY3QuaGVpZ2h0KX0tJHtlbC50ZXh0Q29udGVudH1gLnJlcGxhY2UoL1xcbi9nLCAnXFxcXG4nKS5yZXBsYWNlKC9cXHMrL2csICcgJykuc3Vic3RyKDAsIDEwMCksXG4gICAgICAgICAgICAgICAgdGFnQ2xhc3NLZXk6IFtlbC50YWdOYW1lLCBlbC5jbGFzc05hbWUuc3BsaXQoL1xccysvKS5qb2luKCdfJyldLmpvaW4oJ19fJylcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0sIGVsZW1lbnQpKTtcbiAgICAgICAgaWYgKGdldEVsZW1lbnRLZXlFcnJvcikge1xuICAgICAgICAgICAgdGhpcy5sb2cuZXJyb3IoYGdldEVsZW1lbnRLZXlFcnJvcmAsIGdldEVsZW1lbnRLZXlFcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGVsZW1lbnRLZXk7XG4gICAgfVxuICAgIGFzeW5jIHNhdmVTY3JlZW5TaG90KGZpbGVuYW1lKSB7XG4gICAgICAgIGNvbnN0IHNjcmVlblNob3RQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMucmVzdWx0UGF0aCwgYC4vc2NyZWVuc2hvdC8ke2ZpbGVuYW1lfS5qcGdgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5wYWdlLnNjcmVlbnNob3QoeyBwYXRoOiBzY3JlZW5TaG90UGF0aCwgdHlwZTogJ2pwZWcnLCBxdWFsaXR5OiA5MCB9KTtcbiAgICB9XG4gICAgYXN5bmMgc2F2ZUZyYW1lSHRtbChmcmFtZSwgZmlsZW5hbWUpIHtcbiAgICAgICAgY29uc3QgcGFnZUh0bWwgPSBhd2FpdCBmcmFtZS5jb250ZW50KCk7XG4gICAgICAgIGNvbnN0IGh0bWxQYXRoID0gcGF0aC5yZXNvbHZlKHRoaXMucmVzdWx0UGF0aCwgYC4vaHRtbC8ke2ZpbGVuYW1lfS5odG1sYCk7XG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShodG1sUGF0aCwgcGFnZUh0bWwpO1xuICAgIH1cbiAgICBhc3luYyBnZW5UYXNrUmVzdWx0KCkge1xuICAgICAgICBjb25zdCBkZXZpY2VJbmZvID0gaVBob25lWDtcbiAgICAgICAgY29uc3QgcmVzdWx0RGV2aWNlSW5mbyA9IHtcbiAgICAgICAgICAgIG9zOiBcImlvc1wiLFxuICAgICAgICAgICAgc2NyZWVuV2lkdGg6IGRldmljZUluZm8udmlld3BvcnQud2lkdGgsXG4gICAgICAgICAgICBzY3JlZW5IZWlnaHQ6IGRldmljZUluZm8udmlld3BvcnQuaGVpZ2h0LFxuICAgICAgICAgICAgbW9kZWw6IGRldmljZUluZm8ubmFtZSxcbiAgICAgICAgICAgIGRwcjogZGV2aWNlSW5mby52aWV3cG9ydC5kZXZpY2VTY2FsZUZhY3RvcixcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgbm9uV2Vidmlld1BhZ2UgPSBPYmplY3Qua2V5cyh0aGlzLnVybFBhdGhNYXApLmZpbHRlcigoa2V5KSA9PiAhdGhpcy51cmxQYXRoTWFwW2tleV0uaXNXZWJ2aWV3KS5sZW5ndGg7XG4gICAgICAgIGNvbnN0IGNyYXdsUGFnZVRvdGFsID0gT2JqZWN0LmtleXModGhpcy51cmxQYXRoTWFwKS5sZW5ndGg7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGhpcy50YXNrUmVzdWx0LCB7XG4gICAgICAgICAgICBhY3Rpb25faGlzdG9yeTogW10sXG4gICAgICAgICAgICAvLyBjb3Zlcl9wYXRoX3JhdGlvOiBPYmplY3Qua2V5cyh0aGlzLnVybFBhdGhNYXApLmxlbmd0aCAvIHRoaXMud3hDb25maWcucGFnZXMubGVuZ3RoLFxuICAgICAgICAgICAgZGV2aWNlX2luZm86IHJlc3VsdERldmljZUluZm8sXG4gICAgICAgICAgICAvLyBkcml2ZXJUaW1lQ29zdDogdGhpcy50YXNrRmluaXNoZWRUaW1lIC0gdGhpcy50YXNrU3RhcnRUaW1lLFxuICAgICAgICAgICAgLy8gaWRlU3RhcnRUaW1lOiB0aGlzLmRyaXZlclN0YXJ0VGltZSxcbiAgICAgICAgICAgIC8vIG5vcm1hbFNlYXJjaFBhZ2VDb3VudDogbm9uV2Vidmlld1BhZ2UsXG4gICAgICAgICAgICAvLyByZWNvdmVyU3VjY2Vzczogbm9uV2Vidmlld1BhZ2UsXG4gICAgICAgICAgICAvLyByZWNvdmVyVG90YWw6IGNyYXdsUGFnZVRvdGFsLFxuICAgICAgICAgICAgLy8gcmVkaXJlY3RUb1BhZ2VDb3VudDpcbiAgICAgICAgICAgIC8vIHNlc3Npb25DcmVhdGVUaW1lOlxuICAgICAgICAgICAgLy8gcmVzdWx0X3N0YXR1czogLFxuICAgICAgICAgICAgLy8gdGFiYmFyczogdGhpcy53eENvbmZpZy50YWJCYXIgPyB0aGlzLnd4Q29uZmlnLnRhYkJhci5saXN0Lm1hcCgoaXRlbTogYW55KSA9PiBpdGVtLnBhZ2VQYXRoKSA6IFtdLFxuICAgICAgICAgICAgLy8gdGltZUNvc3Q6IHRoaXMudGFza0ZpbmlzaGVkVGltZSAtIHRoaXMuZHJpdmVyU3RhcnRUaW1lLFxuICAgICAgICAgICAgLy8gdG90YWxQYWdlQ291bnQ6IHRoaXMud3hDb25maWcucGFnZXMubGVuZ3RoLFxuICAgICAgICAgICAgLy8gdXJsX2NoYXJhY3Rlcjoge30sXG4gICAgICAgICAgICBpZGVfZXh0X2luZm86IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgICAgICAgICByZXF1ZXN0VG90YWw6IHRoaXMucmVxdWVzdFRvdGFsLFxuICAgICAgICAgICAgICAgIHJlcXVlc3RGYWlsZWRDbnQ6IHRoaXMucmVxdWVzdEZhaWxlZENudCxcbiAgICAgICAgICAgICAgICByZXF1ZXN0RG9tYWluU2V0OiB0aGlzLnJlcXVlc3REb21haW5TZXQsXG4gICAgICAgICAgICAgICAgaHR0cHNFeHBpcmVkU2V0OiB0aGlzLmh0dHBzRXhwaXJlZFNldCxcbiAgICAgICAgICAgICAgICBibGFua1BlcmNlbnQ6IHRoaXMuYmxhbmtQZXJjZW50LFxuICAgICAgICAgICAgICAgIGNsaWNrYWJsZUVsZW1lbnRDb3VudDogdGhpcy5jbGlja2FibGVFbGVtZW50Q291bnQsXG4gICAgICAgICAgICB9KVxuICAgICAgICB9KTtcbiAgICAgICAgYXdhaXQgZnMud3JpdGVGaWxlKHBhdGguam9pbih0aGlzLnJlc3VsdFBhdGgsIGAke3RoaXMuYXBwaWR9Lmpzb25gKSwgSlNPTi5zdHJpbmdpZnkodGhpcy50YXNrUmVzdWx0KSk7XG4gICAgICAgIHJldHVybiB0aGlzLnRhc2tSZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gQXVkaXRzQXV0bztcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi8uLi9qcy91dGlscy5qcycpO1xuY29uc3QgdXJsXzEgPSByZXF1aXJlKFwidXJsXCIpO1xuY29uc3QgZXZlbnRzXzEgPSByZXF1aXJlKFwiZXZlbnRzXCIpO1xuY2xhc3MgTmV0d29ya0xpc3RlbmVyIGV4dGVuZHMgZXZlbnRzXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYWdlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucmVxdWVzdENvdW50ID0gMDtcbiAgICAgICAgdGhpcy5oYW5kbGVyID0ge307XG4gICAgICAgIHRoaXMucmVxdWVzdElkTWFwID0gbmV3IFdlYWtNYXAoKTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0RXZlbnRNYXAgPSB7XG4gICAgICAgICAgICByZXF1ZXN0OiBuZXcgV2Vha01hcCgpLFxuICAgICAgICAgICAgcmVxdWVzdGZhaWxlZDogbmV3IFdlYWtNYXAoKSxcbiAgICAgICAgICAgIHJlcXVlc3RmaW5pc2hlZDogbmV3IFdlYWtNYXAoKSxcbiAgICAgICAgICAgIHJlc3BvbnNlOiBuZXcgV2Vha01hcCgpXG4gICAgICAgIH07XG4gICAgICAgIHRoaXMucmVxdWVzdElkSW5mbyA9IHt9O1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmluaXRIYW5kbGVyU2V0KCk7XG4gICAgICAgIHRoaXMuaW5pdE5ldHdvcmtMaXN0ZW5pbmcocGFnZSk7XG4gICAgfVxuICAgIGluaXRIYW5kbGVyU2V0KCkge1xuICAgICAgICB0aGlzLmhhbmRsZXJbJ3JlcXVlc3QnXSA9IG5ldyBTZXQoKTtcbiAgICAgICAgdGhpcy5oYW5kbGVyWydyZXF1ZXN0ZmFpbGVkJ10gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuaGFuZGxlclsncmVxdWVzdGZpbmlzaGVkJ10gPSBuZXcgU2V0KCk7XG4gICAgICAgIHRoaXMuaGFuZGxlclsncmVzcG9uc2UnXSA9IG5ldyBTZXQoKTtcbiAgICB9XG4gICAgbWFwUmVxdWVzdDJEZXRhaWwocmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgICAgICAgY29uc3QgdXJsID0gdGhpcy5nZXRSZWFsVXJsKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICBjb25zdCBpc1Byb3h5ID0gdXJsICE9IHJlcXVlc3QudXJsKCk7XG4gICAgICAgIGNvbnN0IHJlcXVlc3RJZCA9IHRoaXMucmVxdWVzdElkTWFwLmdldChyZXF1ZXN0KSB8fCArK3RoaXMucmVxdWVzdENvdW50O1xuICAgICAgICBjb25zdCBjdXJyZW50VGltZSA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IGZyb21DYWNoZSA9IHJlc3BvbnNlID8gcmVzcG9uc2UuZnJvbUNhY2hlKCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGZhaWx1cmUgPSByZXF1ZXN0LmZhaWx1cmUoKTtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBmYWlsdXJlID8gZmFpbHVyZS5lcnJvclRleHQgOiAnJztcbiAgICAgICAgY29uc3Qgc3RhdHVzQ29kZSA9IHJlc3BvbnNlID8gcmVzcG9uc2Uuc3RhdHVzKCkudG9TdHJpbmcoKSA6IHVuZGVmaW5lZDtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBbXTtcbiAgICAgICAgbGV0IHJlcXVlc3RJbmZvID0gdGhpcy5yZXF1ZXN0SWRJbmZvW3JlcXVlc3RJZF07XG4gICAgICAgIGlmICghcmVxdWVzdEluZm8pIHtcbiAgICAgICAgICAgIHRoaXMucmVxdWVzdElkTWFwLnNldChyZXF1ZXN0LCByZXF1ZXN0SWQpO1xuICAgICAgICAgICAgcmVxdWVzdEluZm8gPSB0aGlzLnJlcXVlc3RJZEluZm9bcmVxdWVzdElkXSA9IHsgcmVxdWVzdCwgdGltZVN0YW1wOiBjdXJyZW50VGltZSB9O1xuICAgICAgICB9XG4gICAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc3QgaGVhZGVyT2JqZWN0ID0gcmVzcG9uc2UuaGVhZGVycygpO1xuICAgICAgICAgICAgaGVhZGVycyA9IE9iamVjdC5rZXlzKGhlYWRlck9iamVjdCkubWFwKChoZWFkZXJLZXkpID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBoZWFkZXJLZXksXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiBoZWFkZXJPYmplY3RbaGVhZGVyS2V5XVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgcmVxdWVzdElkLFxuICAgICAgICAgICAgdHlwZTogcmVxdWVzdC5yZXNvdXJjZVR5cGUoKSxcbiAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgIHRpbWVTdGFtcDogY3VycmVudFRpbWUsXG4gICAgICAgICAgICByZXNwb25zZUhlYWRlcnM6IGhlYWRlcnMsXG4gICAgICAgICAgICBmcm9tQ2FjaGUsXG4gICAgICAgICAgICBzdGF0dXNDb2RlLFxuICAgICAgICAgICAgY29zdFRpbWU6IGN1cnJlbnRUaW1lIC0gcmVxdWVzdEluZm8udGltZVN0YW1wLFxuICAgICAgICAgICAgaXNQcm94eSxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgIH07XG4gICAgfVxuICAgIGdldFJlYWxVcmwodXJsKSB7XG4gICAgICAgIGlmICh1cmwuaW5kZXhPZignd3hhY3Jhd2xlcnJlcXVlc3QvcHJveHknKSA+IC0xKSB7XG4gICAgICAgICAgICBsZXQgdG1wVXJsT2JqID0gdXJsXzEucGFyc2UodXJsLCB0cnVlKTtcbiAgICAgICAgICAgIHVybCA9IHR5cGVvZiB0bXBVcmxPYmoucXVlcnkudXJsID09ICdzdHJpbmcnID8gdG1wVXJsT2JqLnF1ZXJ5LnVybCA6IHRtcFVybE9iai5xdWVyeS51cmxbMF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICB9XG4gICAgZ2V0TmV0d29ya0V2ZW50U291cmNlKHJlcXVlc3QsIGRldGFpbHMpIHtcbiAgICAgICAgdmFyIGZyYW1lID0gcmVxdWVzdC5mcmFtZSgpO1xuICAgICAgICBpZiAoIWZyYW1lKVxuICAgICAgICAgICAgcmV0dXJuICd1bmtub3cnO1xuICAgICAgICAvLyDnlLHkuo5hcHBzZXJ2aWNl55qE6K+35rGC5Y+v6IO95Lya6KKrbmF0aXZl5bGC5Yqg5Luj55CG77yM5omA5Lul6K+35rGC5p2l5rqQ55qEZnJhbWXlj6/og73mmK9uYXRpdmXogIzkuI3mmK9hcHBzZXJ2aWNlXG4gICAgICAgIGlmIChmcmFtZS5uYW1lKCkgPT09ICdhcHBzZXJ2aWNlJyB8fCBkZXRhaWxzLmlzUHJveHkpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nLmRlYnVnKCduZXR3b3JrTGlzdGVuZXIgcmVxdWVzdCBmcm9tIHNlcnZpY2UnLCBkZXRhaWxzLnJlcXVlc3RJZClcbiAgICAgICAgICAgIHJldHVybiAnYXBwc2VydmljZSc7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoL153ZWJ2aWV3XFwtLy50ZXN0KGZyYW1lLm5hbWUoKSkpIHtcbiAgICAgICAgICAgIC8vIHRoaXMubG9nLmRlYnVnKCduZXR3b3JrTGlzdGVuZXIgcmVxdWVzdCBmcm9tIHdlYnZpZXcnLCBmcmFtZUlkLCBkZXRhaWxzLnJlcXVlc3RJZClcbiAgICAgICAgICAgIHJldHVybiAnd2Vidmlldyc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICd1bmtub3cnO1xuICAgIH1cbiAgICBpbml0TmV0d29ya0xpc3RlbmluZyhwYWdlKSB7XG4gICAgICAgIHBhZ2Uub24oJ3JlcXVlc3QnLCBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgbGV0IHVybCA9IHRoaXMuZ2V0UmVhbFVybChyZXF1ZXN0LnVybCgpKTtcbiAgICAgICAgICAgIGlmICghdXRpbHMuaXNSZXF1ZXN0Tm90Rm9yQXVkaXQodXJsKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgncmVxdWVzdCcsIHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9nLmRlYnVnKCdyZXF1ZXN0IHVybDonLCAgdXJsKVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJlcXVlc3RFdmVudE1hcC5yZXF1ZXN0LmdldChyZXF1ZXN0KSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMucmVxdWVzdEV2ZW50TWFwLnJlcXVlc3Quc2V0KHJlcXVlc3QsIHRydWUpO1xuICAgICAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gcmVxdWVzdC5mcmFtZSgpO1xuICAgICAgICAgICAgICAgIGlmIChmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5tYXBSZXF1ZXN0MkRldGFpbChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnb25CZWZvcmVSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IHRoaXMuZ2V0TmV0d29ya0V2ZW50U291cmNlKHJlcXVlc3QsIGRldGFpbHMpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ09OX1JFUVVFU1RfRVZFTlQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZXZlbnRJbmZvXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnT05fUkVRVUVTVF9FVkVOVCcsIGV2ZW50SW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbigncmVxdWVzdGZhaWxlZCcsIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRSZWFsVXJsKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1JlcXVlc3ROb3RGb3JBdWRpdCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdyZXF1ZXN0ZmFpbGVkJywgcmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdElkID0gdGhpcy5yZXF1ZXN0RXZlbnRNYXAucmVxdWVzdC5nZXQocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAmJiBmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5tYXBSZXF1ZXN0MkRldGFpbChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZXZlbnRJbmZvID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnROYW1lOiAnb25FcnJvck9jY3VycmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1bmtub3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ09OX1JFUVVFU1RfRVZFTlQnLCBldmVudEluZm8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2Uub24oJ3JlcXVlc3RmaW5pc2hlZCcsIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBsZXQgdXJsID0gdGhpcy5nZXRSZWFsVXJsKHJlcXVlc3QudXJsKCkpO1xuICAgICAgICAgICAgaWYgKCF1dGlscy5pc1JlcXVlc3ROb3RGb3JBdWRpdCh1cmwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdyZXF1ZXN0ZmluaXNoZWQnLCByZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBjb25zdCByZXF1ZXN0SWQgPSB0aGlzLnJlcXVlc3RFdmVudE1hcC5yZXF1ZXN0LmdldChyZXF1ZXN0KTtcbiAgICAgICAgICAgICAgICBjb25zdCBmcmFtZSA9IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgICAgICBpZiAocmVxdWVzdElkICYmIGZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSB0aGlzLm1hcFJlcXVlc3QyRGV0YWlsKHJlcXVlc3QpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBldmVudEluZm8gPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvbkNvbXBsZXRlZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAndW5rbm93JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRldGFpbHNcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdPTl9SRVFVRVNUX0VWRU5UJywgZXZlbnRJbmZvKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBwYWdlLm9uKCdyZXNwb25zZScsIGFzeW5jIChyZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVxdWVzdCA9IHJlc3BvbnNlLnJlcXVlc3QoKTtcbiAgICAgICAgICAgIGxldCB1cmwgPSB0aGlzLmdldFJlYWxVcmwocmVxdWVzdC51cmwoKSk7XG4gICAgICAgICAgICBpZiAoIXV0aWxzLmlzUmVxdWVzdE5vdEZvckF1ZGl0KHVybCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ3Jlc3BvbnNlJywgcmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMubG9nLmRlYnVnKGByZXNwb25zZSB1cmw6ICR7dXJsfSBpc1JlcXVlc3ROb3RGb3JBdWRpdHMgJHt1dGlscy5pc1JlcXVlc3ROb3RGb3JBdWRpdCh1cmwpfWApXG4gICAgICAgICAgICAgICAgY29uc3QgcmVxdWVzdElkID0gdGhpcy5yZXF1ZXN0RXZlbnRNYXAucmVxdWVzdC5nZXQocmVxdWVzdCk7XG4gICAgICAgICAgICAgICAgY29uc3QgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlcXVlc3RJZCAmJiBmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkZXRhaWxzID0gdGhpcy5tYXBSZXF1ZXN0MkRldGFpbChyZXF1ZXN0LCByZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGV2ZW50SW5mbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TmFtZTogJ29uSGVhZGVyc1JlY2VpdmVkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICd1bmtub3cnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGV0YWlsc1xuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29tbWFuZDogJ09OX1JFUVVFU1RfRVZFTlQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogZXZlbnRJbmZvXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIGRldGFpbHMudGltZVN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbWl0KCdPTl9SRVFVRVNUX0VWRU5UJywgZXZlbnRJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnRJbmZvLmV2ZW50TmFtZSA9ICdvblJlc3BvbnNlU3RhcnRlZCc7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnT05fUkVRVUVTVF9FVkVOVCcsIGV2ZW50SW5mbyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBOZXR3b3JrTGlzdGVuZXI7XG4iLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGV2ZW50c18xID0gcmVxdWlyZShcImV2ZW50c1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4uLy4uL2xvZ1wiKTtcbmNvbnN0IHJlcG9ydElkS2V5XzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9yZXBvcnRJZEtleVwiKTtcbmNvbnN0IEJsYWNrTGlzdCA9IHtcbiAgICBcImh0dHBzOi8vbG9nLm1lbmd0dWlhcHAuY29tL3JlcG9ydC92MVwiOiB0cnVlLFxuICAgIFwiaHR0cHM6Ly9sb2cuYWxkd3guY29tL2QuaHRtbFwiOiB0cnVlLFxuICAgIFwibG9nLmFsZHd4LmNvbVwiOiB0cnVlXG59O1xubGV0IHJlcG9ydE5ld1Byb3h5SXAgPSBmYWxzZTtcbmNsYXNzIEZyYW1lRGF0YSBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgY29uc3RydWN0b3IoZnJhbWUsIG9wdCA9IHt9KSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuZXh0cmEgPSB7fTtcbiAgICAgICAgdGhpcy5yZXF1ZXN0TWFwID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmZyYW1lID0gZnJhbWU7XG4gICAgICAgIHRoaXMucmVxdWVzdE51bSA9IDA7XG4gICAgICAgIHRoaXMuaXNOZXR3b3JrSWRsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm5ldHdvcmtJZGxlVGltZXIgPSBudWxsO1xuICAgICAgICB0aGlzLmRpc2FibGVJbWcgPSBvcHQuZGlzYWJsZUltZyB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5kaXNhYmxlTWVkaWEgPSBvcHQuZGlzYWJsZU1lZGlhIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlzTXBjcmF3bGVyID0gb3B0LmlzTXBjcmF3bGVyIHx8IGZhbHNlO1xuICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gMDtcbiAgICAgICAgdGhpcy5pc01haW5GcmFtZSA9IG9wdC5pc01haW5GcmFtZSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5zZXRNYXhMaXN0ZW5lcnMoMTAwKTtcbiAgICB9XG4gICAgaXNEZXRhY2goKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmZyYW1lLmlzRGV0YWNoZWQoKTtcbiAgICB9XG4gICAgc2V0VGFza0V4dHJhKGV4dHJhKSB7XG4gICAgICAgIHRoaXMuZXh0cmEgPSBleHRyYTtcbiAgICB9XG4gICAgZ2V0UGVyZm9ybWFuY2UoaXNSZXNldCA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IHRpbWUgPSB0aGlzLnRpbWVQZXJSZXF1ZXN0O1xuICAgICAgICBpZiAoaXNSZXNldCkge1xuICAgICAgICAgICAgdGhpcy50aW1lUGVyUmVxdWVzdCA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGF2ZXJhZ2VUaW1lOiBNYXRoLnJvdW5kKHRpbWUpLFxuICAgICAgICAgICAgdGltZW91dDogdGhpcy5yZXF1ZXN0TnVtLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXNldFBlcmZvcm1hbmNlKCkge1xuICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gMDtcbiAgICB9XG4gICAgYXN5bmMgb25SZXF1ZXN0U3RhcnQocmVxdWVzdCkge1xuICAgICAgICB0aGlzLnJlcXVlc3RNYXAuc2V0KHJlcXVlc3QuX3JlcXVlc3RJZCwgRGF0ZS5ub3coKSk7XG4gICAgICAgIHRoaXMucmVxdWVzdE51bSsrO1xuICAgICAgICAvLyBMb2dnZXIuZGVidWcoYGZyYW1lWyR7dGhpcy5mcmFtZS5uYW1lKCl9XSByZXF1ZXN0TnVtKysgJHt0aGlzLnJlcXVlc3ROdW19YClcbiAgICAgICAgdGhpcy5pc05ldHdvcmtJZGxlID0gZmFsc2U7XG4gICAgICAgIGlmICh0aGlzLm5ldHdvcmtJZGxlVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5ldHdvcmtJZGxlVGltZXIpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIG9uUmVxdWVzdEVuZChyZXF1ZXN0LCBlbmRUeXBlKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgY29zdFRpbWUgPSBEYXRlLm5vdygpIC0gdGhpcy5yZXF1ZXN0TWFwLmdldChyZXF1ZXN0Ll9yZXF1ZXN0SWQpO1xuICAgICAgICBjb25zdCByVXJsID0gcmVxdWVzdC51cmwoKTtcbiAgICAgICAgaWYgKHJVcmwuc2VhcmNoKCcvd3hhY3Jhd2xlci8nKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vIGNvZGVzdnJcbiAgICAgICAgICAgIGlmIChlbmRUeXBlID09PSAnZmFpbGVkJyAmJiByZXF1ZXN0LnJlc291cmNlVHlwZSgpICE9PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZW5kICR7ZW5kVHlwZX0gcmVzVHlwZSAke3JlcXVlc3QucmVzb3VyY2VUeXBlKCl9IHJlcXVlc3Q6JyR7cmVxdWVzdC51cmwoKX0nIGVycm9yOiAke3JlcXVlc3QuX2ZhaWx1cmVUZXh0fSBjb3N0IHRpbWUgOiAke2Nvc3RUaW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZW5kVHlwZSA9PT0gJ2ZhaWxlZCcgPyByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuQ09ERVNWUl9SRVFVRVNUX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuQ09ERVNWUl9SRVFVRVNUX1NVQ0MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJVcmwuc2VhcmNoKCd3eGFjcmF3bGVycmVxdWVzdC9wcm94eScpICE9PSAtMSkge1xuICAgICAgICAgICAgLy8gcmVxdWVzdHByb3h55Luj55CGXG4gICAgICAgICAgICBpZiAoclVybC5zZWFyY2goJ3NlcnZpY2V3ZWNoYXQnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICBpZiAoZW5kVHlwZSA9PT0gJ2ZhaWxlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZW5kICR7ZW5kVHlwZX0gcmVxdWVzdDonJHtyZXF1ZXN0LnVybCgpfScgXG4gICAgICAgICAgICAgICAgICAgIGVycm9yOiAke3JlcXVlc3QuX2ZhaWx1cmVUZXh0fSBjb3N0IHRpbWUgOiAke2Nvc3RUaW1lfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbmRUeXBlID09PSAnZmFpbGVkJyA/IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5SRVFVRVNUX1NXX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUkVRVUVTVF9TV19TVUNDKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVuZFR5cGUgPT09ICdmYWlsZWQnID8gcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LlJFUVVFU1RfRkFJTEVEKSA6IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5SRVFVRVNUX1NVQ0MpO1xuICAgICAgICAgICAgaWYgKGVuZFR5cGUgPT09ICdmYWlsZWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlKCk7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZSA/IHJlc3BvbnNlLmhlYWRlcnMoKSA6IHt9O1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdQcm94eUlwID0gaGVhZGVyc1sneC1yZXF1ZXN0cHJveHktaXAnXTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkUHJveHlJcCA9IGhlYWRlcnNbJ3gtb2xkLXJlcXVlc3Rwcm94eS1pcCddO1xuICAgICAgICAgICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmYWlsZWQgcmVxdWVzdCEhISBOZXdQcm94eToke25ld1Byb3h5SXB9LiBPbGRQcm94eToke29sZFByb3h5SXB9LiB1cmw6JHtyVXJsfS4gcmV0Y29kZToke3Jlc3BvbnNlLnN0YXR1cygpfWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZmFpbGVkIHJlcXVlc3QhISEgJHtyVXJsfS5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbmRUeXBlID09PSAnZmFpbGVkJyA/IHJlcG9ydElkS2V5XzEucmVwb3J0SWRLZXkocmVwb3J0SWRLZXlfMS5JZEtleS5TUVVJRF9SRVFVRVNUX0ZBSUxFRCkgOiByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuU1FVSURfUkVRVUVTVF9TVUNDKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlcXVlc3ROdW0tLTtcbiAgICAgICAgLy8gTG9nZ2VyLmRlYnVnKGBmcmFtZVske3RoaXMuZnJhbWUubmFtZSgpfV0gcmVxdWVzdE51bS0tICR7dGhpcy5yZXF1ZXN0TnVtfWApXG4gICAgICAgIGlmICh0aGlzLnJlcXVlc3ROdW0gPD0gMCkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmV0d29ya0lkbGVUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLm5ldHdvcmtJZGxlVGltZXIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5uZXR3b3JrSWRsZVRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5pc05ldHdvcmtJZGxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1ZygnbmV0d29yayBpZGxlJywgdGhpcy5mcmFtZS5uYW1lKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnbmV0d29ya0lkbGUnKTtcbiAgICAgICAgICAgIH0sIDUwMCk7XG4gICAgICAgICAgICAvLyA1MDBtcyDmsqHmnInmlrDor7fmsYLlsLHorqTkuLrmmK9uZXR3b3JrSWRsZVxuICAgICAgICB9XG4gICAgICAgIC8vIOabtOaWsGZyYW1l55qE5bmz5Z2H6ICX5pe2XG4gICAgICAgIGlmICh0aGlzLnRpbWVQZXJSZXF1ZXN0ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gY29zdFRpbWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRpbWVQZXJSZXF1ZXN0ID0gKHRoaXMudGltZVBlclJlcXVlc3QgKyBjb3N0VGltZSkgLyAyO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmlzTWFpbkZyYW1lKSB7XG4gICAgICAgICAgICAvLyB3eC5yZXF1ZXN0XG4gICAgICAgICAgICBjb25zdCByZXNwb25zZSA9IHJlcXVlc3QucmVzcG9uc2UoKTtcbiAgICAgICAgICAgIGNvbnN0IGhlYWRlcnMgPSByZXNwb25zZSA/IHJlc3BvbnNlLmhlYWRlcnMoKSA6IHt9O1xuICAgICAgICAgICAgY29uc3QgbmV3UHJveHlJcCA9IGhlYWRlcnNbJ3gtcmVxdWVzdHByb3h5LWlwJ107XG4gICAgICAgICAgICBjb25zdCBvbGRQcm94eUlwID0gaGVhZGVyc1sneC1vbGQtcmVxdWVzdHByb3h5LWlwJ107XG4gICAgICAgICAgICBpZiAobmV3UHJveHlJcCAmJiAhcmVwb3J0TmV3UHJveHlJcCkge1xuICAgICAgICAgICAgICAgIC8vIGRlYnVnKGBOZXcgUHJveHkgSXBgLCBuZXdQcm94eUlwKTtcbiAgICAgICAgICAgICAgICByZXBvcnROZXdQcm94eUlwID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKG9sZFByb3h5SXAgJiYgIXJlcG9ydE5ld1Byb3h5SXApIHtcbiAgICAgICAgICAgICAgICAvLyBkZWJ1ZyhgT2xkIFByb3h5IElwYCwgb2xkUHJveHlJcCk7XG4gICAgICAgICAgICAgICAgcmVwb3J0TmV3UHJveHlJcCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogMDog5q2j5bi4XG4gICAgICogLTE6IOi2heaXtlxuICAgICAqIC0yOiBmcmFtZSBkZXRhY2hlZFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lb3V0XG4gICAgICogQHJldHVybnMge2FueX1cbiAgICAgKi9cbiAgICB3YWl0Rm9yTmV0d29ya0lkbGUodGltZW91dCA9IDUwMDApIHtcbiAgICAgICAgaWYgKHRoaXMuaXNEZXRhY2goKSlcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoLTIpO1xuICAgICAgICBpZiAodGhpcy5pc05ldHdvcmtJZGxlKVxuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHRpbWVvdXRIYW5kbGUgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGB3YWl0Rm9yTmV0d29ya0lkbGUgdGltZW91dDoke3RpbWVvdXR9YCk7XG4gICAgICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5Lk5FVFdPUktfSURMRV9USU1FT1VUKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKC0xKTtcbiAgICAgICAgICAgIH0sIHRpbWVvdXQpO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCduZXR3b3JrSWRsZScsICgpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKDApO1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0SGFuZGxlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbmNlKCdkZXRhY2gnLCAoZnJhbWVOYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGB3YWl0Rm9yTmV0d29ya0lkbGUgZmFpbDogZnJhbWVbJHtmcmFtZU5hbWV9XSBkZXRhY2hgKTtcbiAgICAgICAgICAgICAgICByZXNvbHZlKC0yKTtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGltZW91dEhhbmRsZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gRnJhbWVEYXRhO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBxcyA9IHJlcXVpcmUoXCJxc1wiKTtcbmNvbnN0IHV0aWxzXzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC91dGlsc1wiKTtcbmNsYXNzIEhpamFjayBleHRlbmRzIGV2ZW50c18xLkV2ZW50RW1pdHRlciB7XG4gICAgZnJhbWVFdmFsdWF0ZShmcmFtZSwgZnVuYywgLi4uYXJncykge1xuICAgICAgICBpZiAoIWZyYW1lLmlzRGV0YWNoZWQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lLmV2YWx1YXRlKGZ1bmMsIC4uLmFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuRlJBTUVfREVUQUNIRUQpO1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmFtZSBkZXRhY2hlZCEgbmFtZToke2ZyYW1lLm5hbWV9YCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgY29uc3RydWN0b3IocGFnZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBhZ2UgPSBwYWdlO1xuICAgICAgICB0aGlzLmluaXRFdmVudCgpO1xuICAgIH1cbiAgICBpbml0RXZlbnQoKSB7XG4gICAgICAgIHRoaXMucGFnZS5vbignY29uc29sZScsIChtc2cpID0+IHtcbiAgICAgICAgICAgIGlmIChtc2cudHlwZSgpID09PSAnaW5mbycpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBtc2cudGV4dCgpO1xuICAgICAgICAgICAgICAgIGlmIChzb3VyY2UuaW5kZXhPZignOi8vJykgPT09IC0xKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBzb3VyY2Uuc3BsaXQoJzovLycpO1xuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBtYXRjaFswXTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncmVkaXJlY3RUbyc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25hdmlnYXRlVG8nOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdzd2l0Y2hUYWInOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdyZUxhdW5jaCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ25hdmlnYXRlQmFjayc6XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1cmwgPSBtYXRjaFsxXSB8fCAnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW1pdCgnVVJMX0NIQU5HRScsIHsgdXJsLCB0eXBlIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3B1Ymxpc2hQYWdlRXZlbnQnOlxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgW25hbWUsIHF1ZXJ5XSA9IG1hdGNoWzFdLnNwbGl0KCc/Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBxcy5wYXJzZShxdWVyeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXMubmFtZSA9IG5hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVtaXQoJ1BBR0VfRVZFTlQnLCBwYXJhbXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9nZ2VyLmxvZ0luZm8oYFBBR0VfRVZFTlQ6JHtuYW1lfSx3ZWJ2aWV3SWQ6JHtwYXJhbXMud2Vidmlld0lkfWApO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGlqYWNrRGVmYXVsdCh7IGxvbmdpdHVkZSwgbGF0aXR1ZGUgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlLmV2YWx1YXRlKChpc0RlYnVnLCBsb25naXR1ZGUsIGxhdGl0dWRlKSA9PiB7XG4gICAgICAgICAgICBpZiAoaXNEZWJ1Zykge1xuICAgICAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdSVU5USU1FX0VOVicsICdkZXZlbG9wbWVudCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobmF2aWdhdG9yLCAnbGFuZ3VhZ2UnLCB7XG4gICAgICAgICAgICAgICAgICAgIGdldCgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAnemgtQ04nO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjYXRjaCAoZSkgeyB9XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLnNkay5nZXRMb2NhdGlvbiA9IGFzeW5jIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyBlcnJNc2c6ICdnZXRMb2NhdGlvbjpvaycsIGxvbmdpdHVkZTogbG9uZ2l0dWRlLCBsYXRpdHVkZTogbGF0aXR1ZGUgfTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuc2hhcmVEYXRhID0gbnVsbDtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuc2RrLnNoYXJlQXBwTWVzc2FnZURpcmVjdGx5XG4gICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5zaGFyZUFwcE1lc3NhZ2UgPSBhc3luYyBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2hhcmVEYXRhID0gZGF0YS5hcmdzO1xuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLnNldE9wdGlvbignYXV0b1Blcm1pc3Npb24nLCB0cnVlKTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuc2V0T3B0aW9uKCdhdXRvQXV0aG9yaXphdGlvbicsIHRydWUpO1xuICAgICAgICAgICAgLy8gaGFjayDkuIDkupvlvLnnqpfmk43kvZxcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuc2RrLmNob29zZVZpZGVvXG4gICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5vcGVuTG9jYXRpb25cbiAgICAgICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5vcGVuQWRkcmVzc1xuICAgICAgICAgICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5vcGVuV2VSdW5TZXR0aW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPSB3aW5kb3cubmF0aXZlLnNkay5vcGVuU2V0dGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLmNob29zZUltYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLmNob29zZUludm9pY2VUaXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gd2luZG93Lm5hdGl2ZS5zZGsuc2hvd01vZGFsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gd2luZG93Lm5hdGl2ZS5zZGsuZW50ZXJDb250YWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IHdpbmRvdy5uYXRpdmUuc2RrLnByZXZpZXdJbWFnZSA9IGZ1bmN0aW9uIChkYXRhID0ge30pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJNc2c6IGAke2RhdGEuYXBpfTpva2AsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQgPSB3aW5kb3cuY29uc29sZS5sb2c7IC8vIOWFqOWxgOabv+aNouaOiWFsZXJ0LOemgeaOieWQjOatpeaJp+ihjFxuICAgICAgICB9LCAhIXByb2Nlc3MuZW52LkRFQlVHLCBsb25naXR1ZGUsIGxhdGl0dWRlKTtcbiAgICB9XG4gICAgaGlqYWNrUGFnZUV2ZW50KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgICAgICAgIC8vIHdlYnZpZXdQdWJsaXNoUGFnZUV2ZW50XG4gICAgICAgICAgICB3aW5kb3cuX19oYW5kbGVXZWJ2aWV3UHVibGlzaCA9IHdpbmRvdy5uYXRpdmUuaGFuZGxlV2Vidmlld1B1Ymxpc2g7XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLmhhbmRsZVdlYnZpZXdQdWJsaXNoID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBtc2cuZGF0YS5ldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdQQUdFX0VWRU5UJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWdlRXZlbnROYW1lID0gbXNnLmRhdGEuZGF0YS5kYXRhLmV2ZW50TmFtZTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgd2Vidmlld0lkID0gbXNnLndlYnZpZXdJZDtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBwdWJsaXNoUGFnZUV2ZW50Oi8vJHtwYWdlRXZlbnROYW1lfT93ZWJ2aWV3SWQ9JHt3ZWJ2aWV3SWR9YCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdpbmRvdy5fX2hhbmRsZVdlYnZpZXdQdWJsaXNoLmFwcGx5KHdpbmRvdy5uYXRpdmUsIFttc2ddKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cuX19oYW5kbGVBcHBTZXJ2aWNlUHVibGlzaCA9IHdpbmRvdy5uYXRpdmUuaGFuZGxlQXBwU2VydmljZVB1Ymxpc2g7XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLmhhbmRsZUFwcFNlcnZpY2VQdWJsaXNoID0gZnVuY3Rpb24gKG1zZykge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBtc2cuZGF0YS5ldmVudE5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWUgPT09ICdvbkFwcFJvdXRlJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJhbXMgPSBtc2cuZGF0YS5kYXRhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IHtvcGVuVHlwZSwgd2Vidmlld0lkLCBwYXRoLCBxdWVyeX0gPSBtc2chLmRhdGEhLmRhdGEhLmRhdGE7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gT2JqZWN0LmtleXMocGFyYW1zKS5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGAke2tleX09JHtlbmNvZGVVUklDb21wb25lbnQocGFyYW1zW2tleV0pfWA7XG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJyYnKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBwdWJsaXNoUGFnZUV2ZW50Oi8vb25BcHBSb3V0ZT8ke3F1ZXJ5fWApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3aW5kb3cuX19oYW5kbGVBcHBTZXJ2aWNlUHVibGlzaC5hcHBseSh3aW5kb3cubmF0aXZlLCBbbXNnXSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgaGlqYWNrTmF2aWdhdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5yZWRpcmVjdFRvID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgcmVkaXJlY3RUbzovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5uYXZpZ2F0ZVRvID0gZnVuY3Rpb24gKHVybCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUuaW5mbyhgbmF2aWdhdGVUbzovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5zd2l0Y2hUYWIgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBzd2l0Y2hUYWI6Ly8ke3VybH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS5uYXZpZ2F0b3IucmVMYXVuY2ggPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGByZUxhdW5jaDovLyR7dXJsfWApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5uYXZpZ2F0ZUJhY2sgPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBuYXZpZ2F0ZUJhY2s6Ly8ke3VybH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8g5Y+z5LiK6KeS55qE5Zue5Yiw6aaW6aG15Lmf6ZyA6KaB5Yqr5oyB77yM5Li75Yqo5Y+R546w6L+b77yM5p+Q5Lqb5oOF5Ya15Lya6Kem5Y+RXG4gICAgICAgICAgICB3aW5kb3cubmF0aXZlLm5hdmlnYXRvci5sYXVuY2ggPSBmdW5jdGlvbiAodXJsKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5pbmZvKGBsYXVuY2g6Ly8ke3VybH1gKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2luZG93Lm5hdGl2ZS53ZWJ2aWV3TWFuYWdlci5yZW1vdmVBbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3IoZXZlbnQsIGtleSwgdGltZW91dCA9IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNiID0gKGFyZ3MpID0+IHtcbiAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3Nba2V5XSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5vbmNlKGV2ZW50LCBjYik7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICByZWplY3QoJ3RpbWVvdXQnKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBjYik7XG4gICAgICAgICAgICB9LCB0aW1lb3V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHdhaXRGb3JVcmwodGltZW91dCA9IDEwMDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMud2FpdEZvcignVVJMX0NIQU5HRScsICd1cmwnLCB0aW1lb3V0KTtcbiAgICB9XG4gICAgd2FpdEZvclBhZ2VFdmVudChldmVudE5hbWUsIG9wdCA9IHsgdGltZW91dDogMTAwMCB9KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjYiA9ICh7IHdlYnZpZXdJZCwgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAob3B0LndlYnZpZXdJZCA9PT0gdW5kZWZpbmVkIHx8IG9wdC53ZWJ2aWV3SWQgPT09IHdlYnZpZXdJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgnb2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ1BBR0VfRVZFTlQnLCBjYik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5vbignUEFHRV9FVkVOVCcsIGNiKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHJlamVjdCgndGltZW91dCcpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIoJ1BBR0VfRVZFTlQnLCBjYik7XG4gICAgICAgICAgICB9LCBvcHQudGltZW91dCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiDngrnlh7vliY3lhYjliqvmjIHkuIDkupt3ZWJ2aWV35L6n55qE5by556qX5pON5L2cXG4gICAgICogQHBhcmFtIHtGcmFtZX0gZnJhbWVcbiAgICAgKi9cbiAgICBoaWphY2tXZWJpdmV3QWxlcnQoZnJhbWUpIHtcbiAgICAgICAgcmV0dXJuIHV0aWxzXzEuZnJhbWVFdmFsdWF0ZShmcmFtZSwgKC4uLmFyZ3MpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydCA9IHdpbmRvdy5jb25zb2xlLmxvZztcbiAgICAgICAgfSk7XG4gICAgfVxufVxuZXhwb3J0cy5kZWZhdWx0ID0gSGlqYWNrO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBldmVudHNfMSA9IHJlcXVpcmUoXCJldmVudHNcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi8uLi9sb2dcIik7XG5jb25zdCBkb21VdGlsc18xID0gcmVxdWlyZShcIi4uLy4uL3V0aWwvZG9tVXRpbHNcIik7XG5jb25zdCBGcmFtZURhdGFfMSA9IHJlcXVpcmUoXCIuL0ZyYW1lRGF0YVwiKTtcbmNvbnN0IHJlcG9ydElkS2V5XzEgPSByZXF1aXJlKFwiLi4vLi4vdXRpbC9yZXBvcnRJZEtleVwiKTtcbmNsYXNzIFBhZ2VCYXNlIGV4dGVuZHMgZXZlbnRzXzEuRXZlbnRFbWl0dGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwYWdlLCBvcHQgPSB7fSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLmxvZyA9IGxvZ18xLmRlZmF1bHQ7XG4gICAgICAgIHRoaXMucGFnZSA9IHBhZ2U7XG4gICAgICAgIHRoaXMuaXNNcGNyYXdsZXIgPSBvcHQuaXNNcGNyYXdsZXIgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZnJhbWVNYXAgPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IG1haW5GcmFtZSA9IHBhZ2UubWFpbkZyYW1lKCk7XG4gICAgICAgIHRoaXMubWFpbkZyYW1lRGF0YSA9IG5ldyBGcmFtZURhdGFfMS5kZWZhdWx0KG1haW5GcmFtZSwgeyBpc01haW5GcmFtZTogdHJ1ZSwgaXNNcGNyYXdsZXI6IHRoaXMuaXNNcGNyYXdsZXIgfSk7XG4gICAgICAgIHRoaXMuZnJhbWVNYXAuc2V0KG1haW5GcmFtZSwgdGhpcy5tYWluRnJhbWVEYXRhKTtcbiAgICAgICAgdGhpcy5kaXNhYmxlSW1nID0gb3B0LmRpc2FibGVJbWcgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuZGlzYWJsZU1lZGlhID0gb3B0LmRpc2FibGVNZWRpYSB8fCBmYWxzZTtcbiAgICAgICAgdGhpcy5pbml0VHMgPSBEYXRlLm5vdygpO1xuICAgIH1cbiAgICBpbml0UGFnZUV2ZW50KCkge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5wYWdlO1xuICAgICAgICBwYWdlLm9uKCdmcmFtZWF0dGFjaGVkJywgKGZyYW1lKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZURhdGEgPSBuZXcgRnJhbWVEYXRhXzEuZGVmYXVsdChmcmFtZSwge1xuICAgICAgICAgICAgICAgIGRpc2FibGVJbWc6IHRoaXMuZGlzYWJsZUltZyxcbiAgICAgICAgICAgICAgICBkaXNhYmxlTWVkaWE6IHRoaXMuZGlzYWJsZU1lZGlhLFxuICAgICAgICAgICAgICAgIGlzTXBjcmF3bGVyOiB0aGlzLmlzTXBjcmF3bGVyXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuZnJhbWVNYXAuc2V0KGZyYW1lLCBmcmFtZURhdGEpO1xuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbignZnJhbWVkZXRhY2hlZCcsIChmcmFtZSkgPT4ge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5kZWJ1ZygnZnJhbWUgZGV0YWNoOiAnLCBmcmFtZS5uYW1lKCkpO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVEYXRhID0gdGhpcy5mcmFtZU1hcC5nZXQoZnJhbWUpO1xuICAgICAgICAgICAgaWYgKGZyYW1lRGF0YSkge1xuICAgICAgICAgICAgICAgIGZyYW1lRGF0YS5lbWl0KCdkZXRhY2gnLCBmcmFtZS5uYW1lKCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuZnJhbWVNYXAuZGVsZXRlKGZyYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2Uub24oJ3JlcXVlc3QnLCBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgZnJhbWUgPSByZXF1ZXN0LmZyYW1lKCk7XG4gICAgICAgICAgICBpZiAoIWZyYW1lKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGZyYW1lRGF0YSA9IHRoaXMuZnJhbWVNYXAuZ2V0KGZyYW1lKTtcbiAgICAgICAgICAgIGlmICghZnJhbWVEYXRhKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGZyYW1lRGF0YS5vblJlcXVlc3RTdGFydChyZXF1ZXN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2Uub24oJ3JlcXVlc3RmYWlsZWQnLCBhc3luYyAocmVxdWVzdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc291cmNlVHlwZSA9IHJlcXVlc3QucmVzb3VyY2VUeXBlKCk7XG4gICAgICAgICAgICBpZiAoc291cmNlVHlwZSAhPT0gJ2ltYWdlJyAmJiBzb3VyY2VUeXBlICE9PSAnbWVkaWEnKSB7XG4gICAgICAgICAgICAgICAgLy8gZGVidWcoYGZhaWxlZCByZXF1ZXN0ICR7cmVxdWVzdC5yZXNvdXJjZVR5cGUoKX06ICR7cmVxdWVzdC51cmwoKX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGZyYW1lID0gYXdhaXQgcmVxdWVzdC5mcmFtZSgpO1xuICAgICAgICAgICAgaWYgKCFmcmFtZSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBmcmFtZURhdGEgPSB0aGlzLmZyYW1lTWFwLmdldChmcmFtZSk7XG4gICAgICAgICAgICBpZiAoIWZyYW1lRGF0YSlcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBmcmFtZURhdGEub25SZXF1ZXN0RW5kKHJlcXVlc3QsICdmYWlsZWQnKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2Uub24oJ3JlcXVlc3RmaW5pc2hlZCcsIGFzeW5jIChyZXF1ZXN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBmcmFtZSA9IGF3YWl0IHJlcXVlc3QuZnJhbWUoKTtcbiAgICAgICAgICAgIGlmICghZnJhbWUpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgZnJhbWVEYXRhID0gdGhpcy5mcmFtZU1hcC5nZXQoZnJhbWUpO1xuICAgICAgICAgICAgaWYgKCFmcmFtZURhdGEpXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSByZXF1ZXN0LnJlc3BvbnNlKCk7XG4gICAgICAgICAgICBpZiAocmVzcG9uc2UgJiYgIS9eKDJ8MylcXGRcXGQkLy50ZXN0KHJlc3BvbnNlLnN0YXR1cygpLnRvU3RyaW5nKCkpKSB7XG4gICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgZmFpbGVkIHJlcXVlc3QhIHN0YXR1cyA9ICR7cmVzcG9uc2Uuc3RhdHVzKCl9LmApO1xuICAgICAgICAgICAgICAgIGZyYW1lRGF0YS5vblJlcXVlc3RFbmQocmVxdWVzdCwgJ2ZhaWxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgZnJhbWVEYXRhLm9uUmVxdWVzdEVuZChyZXF1ZXN0LCAnZmluaXNoZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHBhZ2Uub24oJ3BhZ2VlcnJvcicsIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgcGFnZWVycm9yIG9jY3VyISAke2Vycm9yLm1lc3NhZ2V9ICR7ZXJyb3Iuc3RhY2t9YCk7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUEFHRV9FWENFUFRJT04pO1xuICAgICAgICB9KTtcbiAgICAgICAgcGFnZS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBwYWdlIGVycm9yIG9jY3VyOmAsIGVycik7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoJ3BhZ2UgZXJyb3Igb2NjdXIgYW5kIGdvaW5nIHRvIGNyYXNoOicsIHBhZ2UudXJsKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LlBBR0VfQ1JBU0gpO1xuICAgICAgICAgICAgdGhpcy5lbWl0KCdwYWdlRXJyb3InLCBlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgd2FpdEZvckN1cnJlbnRGcmFtZUlkbGUodGltZW91dENudCA9IDApIHtcbiAgICAgICAgY29uc3QgeyBmcmFtZSwgaWQgfSA9IGF3YWl0IGRvbVV0aWxzXzEuZ2V0Q3VycmVudEZyYW1lKHRoaXMucGFnZSk7XG4gICAgICAgIGNvbnN0IGZyYW1lRGF0YSA9IHRoaXMuZ2V0RnJhbWVEYXRhKGZyYW1lKTtcbiAgICAgICAgaWYgKCFmcmFtZSB8fCAhZnJhbWVEYXRhKSB7XG4gICAgICAgICAgICAvLyByZWFsbHkgbm90IGxpa2VseVxuICAgICAgICAgICAgcmVwb3J0SWRLZXlfMS5yZXBvcnRJZEtleShyZXBvcnRJZEtleV8xLklkS2V5LlBBR0VfTk9fRlJBTUUpO1xuICAgICAgICAgICAgdGhpcy5sb2cuZGVidWcoYG5vIGZyYW1lIG9yIGZyYW1lRGF0YSAhISFgKTtcbiAgICAgICAgICAgIHJldHVybiB7IGZyYW1lOiB1bmRlZmluZWQsIGhhc1dlYnZpZXc6IGZhbHNlLCBmcmFtZURhdGEsIHRpbWVvdXQ6IDAsIGlkIH07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5sb2cuZGVidWcoYGdldCBjdXJyZW50IGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gZG9uZWApO1xuICAgICAgICBjb25zdCBpc1dlYnZpZXcgPSBhd2FpdCBkb21VdGlsc18xLmhhc1dlYnZpZXcoZnJhbWUpO1xuICAgICAgICB0aGlzLmxvZy5kZWJ1ZyhgY2hlY2sgaGFzIHdlYnZpZXcgWyR7aXNXZWJ2aWV3fV0gZG9uZWApO1xuICAgICAgICBpZiAoaXNXZWJ2aWV3KSB7XG4gICAgICAgICAgICAvLyDljIXlkKt3ZWJ2aWV377yM55u05o6l5Lu75Yqh5aSx6LSlLCDpobXpnaLmmK/lkKbljIXlkKt3ZWJ2aWV377yM5ZyoIHBhZ2UgZG9tIHJlYWR55ZCO5bCx5Y+v5Lul55+l6YGTXG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmRlYnVnKCd0YXNrIGZhaWwgYmVjYXVzZSBwYWdlIGhhcyB3ZWJ2aWV3Jyk7XG4gICAgICAgICAgICByZXBvcnRJZEtleV8xLnJlcG9ydElkS2V5KHJlcG9ydElkS2V5XzEuSWRLZXkuUEFHRV9JU19XRUJWSUVXKTtcbiAgICAgICAgICAgIHJldHVybiB7IGhhc1dlYnZpZXc6IHRydWUsIGZyYW1lLCBmcmFtZURhdGEsIHRpbWVvdXQ6IDAsIGlkIH07XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgZmFpbCBiZWNhdXNlIG9mIGZyYW1lIGRldGFjaCwgdHJ5IHRvIHJldHVybiBuZXcgZnJhbWVcbiAgICAgICAgLy8g6ZyA6KaBbWFpbkZyYW1l77yId2FpdENvZGUxKeWSjOW9k+WJjWZyYW1lKHdhaXRDb2RlMinnmoTnvZHnu5zlkIzml7bnqbrpl7JcbiAgICAgICAgY29uc3QgW3dhaXRDb2RlMSwgd2FpdENvZGUyXSA9IGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLm1haW5GcmFtZURhdGEud2FpdEZvck5ldHdvcmtJZGxlKCksIGZyYW1lRGF0YS53YWl0Rm9yTmV0d29ya0lkbGUoKV0pO1xuICAgICAgICBjb25zdCBjdXJyZW50SWQgPSBhd2FpdCBkb21VdGlsc18xLmdldEN1cnJlbnRJZCh0aGlzLnBhZ2UpO1xuICAgICAgICBpZiAod2FpdENvZGUyID09PSAtMiB8fCBmcmFtZS5pc0RldGFjaGVkKCkgfHwgaWQgIT09IGN1cnJlbnRJZCkge1xuICAgICAgICAgICAgLy8gd2FpdENvZGUyID0gMCDkvYblhbblrp5mcmFtZeW3sue7j2RldGFjaOeahO+8jOWPkeeUn+WcqOmhtemdouWFiG5ldHdvcmtpZGxl5YaN6KKrZGV0YWNo55qEY2FzZSwg5omA5Lul6L+Z6YeM6KaB5YW85a655LiA5LiLXG4gICAgICAgICAgICAvLyDlnKjnrYnlvZPliY1mcmFtZee9kee7nOaXtu+8jOmhtemdoui3s+i9rO+8jOW9k+WJjWZyYW1l5bey57uP5Y+Y77yM6ZyA6KaB6YeN5paw6I635Y+WXG4gICAgICAgICAgICAvLyDov5jmnInkuIDnp41jYXNl5piv77yM5bu25pe25LiA5Lya5YaN5pyJ6Lez6L2s77yM6L+Z56eN5oOF5Ya15pqC5pe25peg5Yqe5rOV5aSE55CGXG4gICAgICAgICAgICBsb2dfMS5kZWZhdWx0LmRlYnVnKGB3YWl0IGZvciBjdXJyZW50IGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gaWRsZSBmYWlsOiBhbHJlYWR5IGRldGFjaCwgdHJ5IGFnYWluYCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWl0Rm9yQ3VycmVudEZyYW1lSWRsZSh0aW1lb3V0Q250KTsgLy8g562J5b6F5pe2ZnJhbWUgZGV0YWNo5LqG77yM6ZyA6KaB6YeN5paw5ou/5b2T5YmNZnJhbWU7XG4gICAgICAgICAgICAvLyByZXR1cm4ge2hhc1dlYnZpZXc6IGZhbHNlLCBmcmFtZTogdW5kZWZpbmVkLCBmcmFtZURhdGEsIHRpbWVvdXQ6IDAsIGlkfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHdhaXRDb2RlMSA9PT0gLTEgfHwgd2FpdENvZGUyID09PSAtMSkge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5kZWJ1ZyhgZnJhbWVbJHtmcmFtZS5uYW1lKCl9XSBpZGxlIHRpbWVvdXQsIGNvZGU6IGAsIHdhaXRDb2RlMSwgd2FpdENvZGUyKTtcbiAgICAgICAgICAgIHRpbWVvdXRDbnQrKztcbiAgICAgICAgfVxuICAgICAgICBsb2dfMS5kZWZhdWx0LmRlYnVnKGBjdXJyZW50IGZyYW1lWyR7ZnJhbWUubmFtZSgpfV0gbmV0d29yayBpZGxlIGRvbmVgKTtcbiAgICAgICAgcmV0dXJuIHsgaGFzV2VidmlldzogZmFsc2UsIGZyYW1lLCBmcmFtZURhdGEsIHRpbWVvdXQ6IHRpbWVvdXRDbnQsIGlkIH07XG4gICAgfVxuICAgIC8vIHByb3RlY3RlZCBhc3luYyB3YWl0Rm9yRnJhbWVJZGxlKGZyYW1lOiBwdXBwZXRlZXIuRnJhbWUsIHRpbWVvdXQ6IG51bWJlcikge1xuICAgIC8vICAgICBjb25zdCBmcmFtZURhdGEgPSB0aGlzLmdldEZyYW1lRGF0YShmcmFtZSk7XG4gICAgLy8gICAgIGlmICghZnJhbWVEYXRhKSByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKC0yKTtcbiAgICAvLyAgICAgY29uc3QgW3dhaXRDb2RlMSwgd2FpdENvZGUyXSA9IGF3YWl0IFByb21pc2UuYWxsKFt0aGlzLm1haW5GcmFtZURhdGEud2FpdEZvck5ldHdvcmtJZGxlKHRpbWVvdXQpLCBmcmFtZURhdGEud2FpdEZvck5ldHdvcmtJZGxlKHRpbWVvdXQpXSk7XG4gICAgLy8gICAgIGRlYnVnKCd3YWl0IGZvciBmcmFtZSBpZGxlJywgd2FpdENvZGUxLCB3YWl0Q29kZTIpO1xuICAgIC8vICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHdhaXRDb2RlMik7XG4gICAgLy8gfVxuICAgIGdldEZyYW1lRGF0YShmcmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5mcmFtZU1hcC5nZXQoZnJhbWUpO1xuICAgIH1cbiAgICBhc3luYyB3YWl0Rm9yRnJhbWVDaGFuZ2Uod2Vidmlld0lkLCB7IHRpbWVvdXQgfSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlLndhaXRGb3IoKGlkKSA9PiB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKS5pZCAhPT0gaWQsIHsgdGltZW91dCB9LCB3ZWJ2aWV3SWQpO1xuICAgIH1cbiAgICBpc1BhZ2VSZWRpcmVjdGVkKHVybCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wYWdlLmV2YWx1YXRlKCh1cmwpID0+IHtcbiAgICAgICAgICAgIHJldHVybiB1cmwuaW5kZXhPZihsb2NhdGlvbi5wYXRobmFtZSkgPT09IC0xO1xuICAgICAgICB9LCB1cmwpO1xuICAgIH1cbiAgICBnZXRUaW1lKCkge1xuICAgICAgICByZXR1cm4gRGF0ZS5ub3coKSAtIHRoaXMuaW5pdFRzO1xuICAgIH1cbn1cbmV4cG9ydHMuZGVmYXVsdCA9IFBhZ2VCYXNlO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBwYXRoID0gcmVxdWlyZShcInBhdGhcIik7XG5jb25zdCBmcyA9IHJlcXVpcmUoXCJmcy1leHRyYVwiKTtcbmNvbnN0IHB1cHBldGVlciA9IHJlcXVpcmUoXCJwdXBwZXRlZXJcIik7XG5jb25zdCBGYXRhbERldGVjdF8xID0gcmVxdWlyZShcIi4vRmF0YWxEZXRlY3RcIik7XG5jb25zdCBsb2dfMSA9IHJlcXVpcmUoXCIuLi9sb2dcIik7XG5jb25zdCBpc1Byb2QgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgZ2V0VGFza0VudiA9IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBhcHBpZCA9IHByb2Nlc3MuZW52LmFwcGlkO1xuICAgIGNvbnN0IHRhc2tpZCA9IHByb2Nlc3MuZW52LnRhc2tpZDtcbiAgICBjb25zdCBhcHB1aW4gPSBwYXJzZUludChwcm9jZXNzLmVudi5hcHB1aW4sIDEwKSB8fCAwO1xuICAgIGNvbnN0IGluZGV4UGFnZVVybCA9IHByb2Nlc3MuZW52LmluZGV4UGFnZVVybDtcbiAgICBjb25zdCB0ZXN0VGlja2V0ID0gcHJvY2Vzcy5lbnYudGlja2V0O1xuICAgIGxldCBSRVNVTFRfUEFUSCA9IHBhdGgucmVzb2x2ZShwcm9jZXNzLmN3ZCgpLCBgLi90YXNrLyR7YXBwaWR9XyR7dGFza2lkfS9yZXN1bHRgKTtcbiAgICBpZiAocHJvY2Vzcy5lbnYudGFza1BhdGgpIHtcbiAgICAgICAgUkVTVUxUX1BBVEggPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5lbnYudGFza1BhdGgsIGAuLyR7YXBwaWR9XyR7dGFza2lkfS9yZXN1bHRgKTtcbiAgICB9XG4gICAgY29uc3QgYXVkaXRCdXNpbmVzcyA9IFsyLCA0LCA3LCAxMCwgMTMsIDE0LCAxNV07XG4gICAgY29uc3QgcmVNYXRjaCA9IGluZGV4UGFnZVVybC5tYXRjaCgvd3hhY3Jhd2xlclxcL1xcZHsxLDJ9XyhcXGR7MSwyfSlcXC8vaSk7XG4gICAgY29uc3QgYnVzaW5lc3NJZCA9IHJlTWF0Y2ggPyBwYXJzZUludChyZU1hdGNoWzFdLCAxMCkgOiAwO1xuICAgIGxldCBpc01wY3Jhd2xlciA9IGZhbHNlO1xuICAgIGlmIChhdWRpdEJ1c2luZXNzLmluZGV4T2YoYnVzaW5lc3NJZCkgPT09IC0xKSB7XG4gICAgICAgIGlzTXBjcmF3bGVyID0gdHJ1ZTtcbiAgICB9XG4gICAgbGV0IHBhcmFtTGlzdCA9IFtdO1xuICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHBhcmFtSnNvbiA9IEpTT04ucGFyc2UocHJvY2Vzcy5lbnYudGFza1BhcmFtKTtcbiAgICAgICAgaWYgKHBhcmFtSnNvbi5oYXNPd25Qcm9wZXJ0eSgncGFyYW1fbGlzdCcpKSB7XG4gICAgICAgICAgICBwYXJhbUxpc3QgPSBwYXJhbUpzb24ucGFyYW1fbGlzdDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjYXRjaCAoZSkge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBqc29uIHBhcnNlIGVycm9yISAke3Byb2Nlc3MuZW52LnRhc2tQYXJhbX1gKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgYXBwaWQsXG4gICAgICAgIHRhc2tpZCxcbiAgICAgICAgYXBwdWluLFxuICAgICAgICBpbmRleFBhZ2VVcmwsXG4gICAgICAgIHRlc3RUaWNrZXQsXG4gICAgICAgIFJFU1VMVF9QQVRILFxuICAgICAgICBpc01wY3Jhd2xlcixcbiAgICAgICAgYnVzaW5lc3NJZCxcbiAgICAgICAgcGFyYW1MaXN0XG4gICAgfTtcbn07XG4oYXN5bmMgKCkgPT4ge1xuICAgIC8vIHJlcG9ydElkS2V5KElkS2V5LlRBU0tfU1RBUlQpXG4gICAgY29uc3QgdGFza1N0YXJ0VGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdGFza0VudiA9IGdldFRhc2tFbnYoKTtcbiAgICBjb25zdCB7IHBhcmFtTGlzdCB9ID0gdGFza0VudjtcbiAgICBpZiAocGFyYW1MaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBwYXJhbUxpc3QgZXJyb3IhICR7cHJvY2Vzcy5lbnYudGFza1BhcmFtfWApO1xuICAgICAgICByZXR1cm4gLTQwMDA7XG4gICAgfVxuICAgIGNvbnN0IGNvbmZpZyA9IHtcbiAgICAgICAgdXJsOiB0YXNrRW52LmluZGV4UGFnZVVybCxcbiAgICAgICAgYXBwaWQ6IHRhc2tFbnYuYXBwaWQsXG4gICAgICAgIHRhc2tpZDogdGFza0Vudi50YXNraWQsXG4gICAgICAgIGFwcHVpbjogdGFza0Vudi5hcHB1aW4sXG4gICAgICAgIGJ1c2luZXNzSWQ6IHRhc2tFbnYuYnVzaW5lc3NJZCxcbiAgICAgICAgcmVzdWx0UGF0aDogdGFza0Vudi5SRVNVTFRfUEFUSCxcbiAgICAgICAgdGFza1N0YXJ0VGltZSxcbiAgICAgICAgY3Jhd2xfdHlwZTogcGFyYW1MaXN0WzBdLmNyYXdsX3R5cGUsXG4gICAgICAgIGxvbmdpdHVkZTogcGFyYW1MaXN0WzBdLmxvbmdpdHVkZSxcbiAgICAgICAgbGF0aXR1ZGU6IHBhcmFtTGlzdFswXS5sYXRpdHVkZSxcbiAgICB9O1xuICAgIGNvbnN0IGxvZ1BhdGggPSBgJHt0YXNrRW52LlJFU1VMVF9QQVRIfWA7XG4gICAgZnMuZW5zdXJlRGlyU3luYyhsb2dQYXRoKTtcbiAgICBmcy5lbnN1cmVEaXJTeW5jKGAke3Rhc2tFbnYuUkVTVUxUX1BBVEh9L3NjcmVlbnNob3RgKTtcbiAgICBmcy5lbnN1cmVEaXJTeW5jKGAke3Rhc2tFbnYuUkVTVUxUX1BBVEh9L2h0bWxgKTtcbiAgICBsb2dfMS5kZWZhdWx0LmluaXRMb2dnZXIobG9nUGF0aCwgY29uZmlnLmFwcGlkKTtcbiAgICBsZXQgYnJvd3NlckFyZ3MgPSBbXTtcbiAgICBpZiAoaXNQcm9kKSB7XG4gICAgICAgIGJyb3dzZXJBcmdzID0gW1xuICAgICAgICAgICAgJy0tcHJveHktc2VydmVyPWh0dHA6Ly9tbWJpend4YWF1ZGl0bmF0cHJveHkud3guY29tOjExMTc3JyxcbiAgICAgICAgICAgICctLXByb3h5LWJ5cGFzcy1saXN0PTEwLjIwNi4zMC44MDoxMjM2MTs5LjIuODcuMjIyOjEyMzYxOyo6MTg1NjknXG4gICAgICAgIF07XG4gICAgICAgIC8vICctLXByb3h5LWJ5cGFzcy1saXN0PTEwLjIwNi4zMC44MDoxMjM2MTs5LjIuODcuMjIyOjEyMzYxJ107XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBicm93c2VyQXJncyA9IFtcbiAgICAgICAgLy8gJy0tcHJveHktc2VydmVyPWh0dHA6Ly8xMjcuMC4wLjE6MTI2MzknXG4gICAgICAgIF07XG4gICAgfVxuICAgIGNvbnN0IGlzSGVhZGxlc3MgPSBwcm9jZXNzLmVudi5jaHJvbWVNb2RlID09PSAnaGVhZGxlc3MnO1xuICAgIGNvbnN0IHB1cHBldGVlckNvbmZpZyA9IHtcbiAgICAgICAgaGVhZGxlc3M6IGlzSGVhZGxlc3MsXG4gICAgICAgIGRldnRvb2xzOiAhaXNQcm9kLFxuICAgICAgICBpZ25vcmVIVFRQU0Vycm9yczogdHJ1ZSxcbiAgICAgICAgYXJnczogWyctLW5vLXNhbmRib3gnLCAnLS1kaXNhYmxlLXdlYi1zZWN1cml0eScsIC4uLmJyb3dzZXJBcmdzXSxcbiAgICB9O1xuICAgIGxvZ18xLmRlZmF1bHQuaW5mbygncHVwcGV0ZWVyQ29uZmlnJywgcHVwcGV0ZWVyQ29uZmlnKTtcbiAgICBjb25zdCBicm93c2VyID0gYXdhaXQgcHVwcGV0ZWVyLmxhdW5jaChwdXBwZXRlZXJDb25maWcpO1xuICAgIHByb2Nlc3Mub24oJ3VuY2F1Z2h0RXhjZXB0aW9uJywgYXN5bmMgKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGNhdGNoIHByb2Nlc3MgZXJyb3IgJHtlcnJvci5tZXNzYWdlfVxcbiAke2Vycm9yLnN0YWNrfWApO1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5QUk9DRVNTX0NSQVNIKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9KTtcbiAgICBwcm9jZXNzLm9uKCd3YXJuaW5nJywgKGVycm9yKSA9PiB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQud2FybigncHJvY2VzcyBvbiB3YXJuaW5nJyk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQud2FybihlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC53YXJuKGVycm9yLnN0YWNrKTtcbiAgICB9KTtcbiAgICBjb25zdCBwYWdlID0gYXdhaXQgYnJvd3Nlci5uZXdQYWdlKCk7XG4gICAgY29uc3QgZmF0YWxEZXRlY3QgPSBuZXcgRmF0YWxEZXRlY3RfMS5kZWZhdWx0KHBhZ2UsIGNvbmZpZyk7XG4gICAgbG9nXzEuZGVmYXVsdC5pbmZvKCduZXcgRmF0YWxEZXRlY3QgQ3Jhd2xlciBzdWNjJyk7XG4gICAgZmF0YWxEZXRlY3Qub24oJ3BhZ2VFcnJvcicsIGFzeW5jIChlcnJvcikgPT4ge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBjYXRjaCBwYWdlIGNyYXNoICR7ZXJyb3IubWVzc2FnZX1cXG4gJHtlcnJvci5zdGFja31gKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9KTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCB0YXNrUmVzdWx0ID0gYXdhaXQgZmF0YWxEZXRlY3Quc3RhcnQoKTtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGBUaW1lIGNvc3QgJHtNYXRoLnJvdW5kKChEYXRlLm5vdygpIC0gdGFza1N0YXJ0VGltZSkgLyAxMDAwKX0gc2ApO1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmluZm8oJ0F1ZGl0cyByZXN1bHQ6ICcsIEpTT04uc3RyaW5naWZ5KHRhc2tSZXN1bHQpKTtcbiAgICAgICAgaWYgKHRhc2tSZXN1bHQpIHtcbiAgICAgICAgICAgIC8vIHJlcG9ydElkS2V5KElkS2V5LlRBU0tfU1VDQyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5UQVNLX05PX1JFU1VMVCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgY2F0Y2ggbWFpbiBlcnJvciAke2UubWVzc2FnZX1cXG4gJHtlLnN0YWNrfWApO1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5DUkFXTEVSX0VSUk9SKTtcbiAgICAgICAgYXdhaXQgYnJvd3Nlci5jbG9zZSgpO1xuICAgICAgICBwcm9jZXNzLmV4aXQoKTtcbiAgICB9XG59KSgpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLklES19MSUIgPSAnL2hvbWUvcXNwYWNlL21tYml6d3hhY3Jhd2xlcndvcmtlci9saWI2NC9saWJvc3NhdHRyYXBpJztcbmV4cG9ydHMuTWFpbklkS2V5ID0gMTE4NzIyO1xudmFyIElkS2V5O1xuKGZ1bmN0aW9uIChJZEtleSkge1xuICAgIElkS2V5W0lkS2V5W1wiVEFTS19TVEFSVFwiXSA9IDFdID0gXCJUQVNLX1NUQVJUXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJQUk9DRVNTX0NSQVNIXCJdID0gMl0gPSBcIlBST0NFU1NfQ1JBU0hcIjtcbiAgICBJZEtleVtJZEtleVtcIlBBR0VfQ1JBU0hcIl0gPSAzXSA9IFwiUEFHRV9DUkFTSFwiO1xuICAgIElkS2V5W0lkS2V5W1wiVEFTS19TVUNDXCJdID0gNF0gPSBcIlRBU0tfU1VDQ1wiO1xuICAgIElkS2V5W0lkS2V5W1wiQ1JBV0xFUl9FUlJPUlwiXSA9IDVdID0gXCJDUkFXTEVSX0VSUk9SXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJGSVJTVF9QQUdFX1JFRElSRUNUXCJdID0gNl0gPSBcIkZJUlNUX1BBR0VfUkVESVJFQ1RcIjtcbiAgICBJZEtleVtJZEtleVtcIkZJUlNUX1BBR0VfV0VCVklFV1wiXSA9IDddID0gXCJGSVJTVF9QQUdFX1dFQlZJRVdcIjtcbiAgICBJZEtleVtJZEtleVtcIkFVRElUU19GUkFNRV9ERVRBQ0hFRFwiXSA9IDhdID0gXCJBVURJVFNfRlJBTUVfREVUQUNIRURcIjtcbiAgICBJZEtleVtJZEtleVtcIkdFTl9SRVNVTFRfRVJST1JcIl0gPSA5XSA9IFwiR0VOX1JFU1VMVF9FUlJPUlwiO1xuICAgIElkS2V5W0lkS2V5W1wiR0VOX1JFU1VMVF9PVVRfT0ZfVElNRVwiXSA9IDEwXSA9IFwiR0VOX1JFU1VMVF9PVVRfT0ZfVElNRVwiO1xuICAgIElkS2V5W0lkS2V5W1wiUEFHRV9JU19XRUJWSUVXXCJdID0gMTFdID0gXCJQQUdFX0lTX1dFQlZJRVdcIjtcbiAgICBJZEtleVtJZEtleVtcIlBBR0VfTk9fRlJBTUVcIl0gPSAxMl0gPSBcIlBBR0VfTk9fRlJBTUVcIjtcbiAgICBJZEtleVtJZEtleVtcIkdFVF9DTElDS0FCTEVfRUxFTUVOVF9FUlJPUlwiXSA9IDEzXSA9IFwiR0VUX0NMSUNLQUJMRV9FTEVNRU5UX0VSUk9SXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJGT1VORF9OT19DTElDS0FCTEVfRUxFTUVOVFNcIl0gPSAxNF0gPSBcIkZPVU5EX05PX0NMSUNLQUJMRV9FTEVNRU5UU1wiO1xuICAgIElkS2V5W0lkS2V5W1wiQ0xJQ0tfRUxFTUVOVF9FUlJPUlwiXSA9IDE1XSA9IFwiQ0xJQ0tfRUxFTUVOVF9FUlJPUlwiO1xuICAgIElkS2V5W0lkS2V5W1wiUEFHRV9FWENFUFRJT05cIl0gPSAxNl0gPSBcIlBBR0VfRVhDRVBUSU9OXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJDT0RFU1ZSX1JFUVVFU1RfRkFJTEVEXCJdID0gMTddID0gXCJDT0RFU1ZSX1JFUVVFU1RfRkFJTEVEXCI7XG4gICAgSWRLZXlbSWRLZXlbXCJDT0RFU1ZSX1JFUVVFU1RfU1VDQ1wiXSA9IDE4XSA9IFwiQ09ERVNWUl9SRVFVRVNUX1NVQ0NcIjtcbiAgICBJZEtleVtJZEtleVtcIlJFUVVFU1RfU1dfRkFJTEVEXCJdID0gMTldID0gXCJSRVFVRVNUX1NXX0ZBSUxFRFwiO1xuICAgIElkS2V5W0lkS2V5W1wiUkVRVUVTVF9TV19TVUNDXCJdID0gMjBdID0gXCJSRVFVRVNUX1NXX1NVQ0NcIjtcbiAgICBJZEtleVtJZEtleVtcIlJFUVVFU1RfRkFJTEVEXCJdID0gMjFdID0gXCJSRVFVRVNUX0ZBSUxFRFwiO1xuICAgIElkS2V5W0lkS2V5W1wiUkVRVUVTVF9TVUNDXCJdID0gMjJdID0gXCJSRVFVRVNUX1NVQ0NcIjtcbiAgICBJZEtleVtJZEtleVtcIlNRVUlEX1JFUVVFU1RfRkFJTEVEXCJdID0gMjNdID0gXCJTUVVJRF9SRVFVRVNUX0ZBSUxFRFwiO1xuICAgIElkS2V5W0lkS2V5W1wiU1FVSURfUkVRVUVTVF9TVUNDXCJdID0gMjRdID0gXCJTUVVJRF9SRVFVRVNUX1NVQ0NcIjtcbiAgICBJZEtleVtJZEtleVtcIk5FVFdPUktfSURMRV9USU1FT1VUXCJdID0gMjVdID0gXCJORVRXT1JLX0lETEVfVElNRU9VVFwiO1xuICAgIElkS2V5W0lkS2V5W1wiVEFTS19OT19SRVNVTFRcIl0gPSAyNl0gPSBcIlRBU0tfTk9fUkVTVUxUXCI7XG59KShJZEtleSA9IGV4cG9ydHMuSWRLZXkgfHwgKGV4cG9ydHMuSWRLZXkgPSB7fSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBhd2FpdF90b19qc18xID0gcmVxdWlyZShcImF3YWl0LXRvLWpzXCIpO1xuLy8gaW1wb3J0IHtJZEtleX0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi4vbG9nXCIpO1xuY29uc3QgdXRpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpO1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudEZyYW1lKHBhZ2UpIHtcbiAgICBjb25zdCBpZCA9IGF3YWl0IGdldEN1cnJlbnRJZChwYWdlKTtcbiAgICAvLyBkZWJ1ZygnZ2V0IEN1cnJlbnQgRnJhbWUgSWQ6JywgaWQpO1xuICAgIGNvbnN0IGZyYW1lID0gYXdhaXQgZ2V0Q3VycmVudEZyYW1lQnlXZWJ2aWV3SWQocGFnZSwgaWQpO1xuICAgIHJldHVybiB7XG4gICAgICAgIGZyYW1lLFxuICAgICAgICBpZFxuICAgIH07XG59XG5leHBvcnRzLmdldEN1cnJlbnRGcmFtZSA9IGdldEN1cnJlbnRGcmFtZTtcbmZ1bmN0aW9uIGdldEN1cnJlbnRJZChwYWdlKSB7XG4gICAgcmV0dXJuIHBhZ2UuZXZhbHVhdGUoKCkgPT4ge1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gd2luZG93Lm5hdGl2ZS53ZWJ2aWV3TWFuYWdlci5nZXRDdXJyZW50KCk7XG4gICAgICAgIHJldHVybiBjdXJyZW50LmlkO1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRDdXJyZW50SWQgPSBnZXRDdXJyZW50SWQ7XG5hc3luYyBmdW5jdGlvbiBnZXRDdXJyZW50RnJhbWVEYXRhKHBhZ2UsIGZyYW1lTWFwKSB7XG4gICAgY29uc3QgeyBmcmFtZSB9ID0gYXdhaXQgZ2V0Q3VycmVudEZyYW1lKHBhZ2UpO1xuICAgIGlmICghZnJhbWUpXG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIGZyYW1lTWFwLmdldChmcmFtZSk7XG59XG5leHBvcnRzLmdldEN1cnJlbnRGcmFtZURhdGEgPSBnZXRDdXJyZW50RnJhbWVEYXRhO1xuYXN5bmMgZnVuY3Rpb24gZ2V0Q3VycmVudEZyYW1lQnlXZWJ2aWV3SWQocGFnZSwgd2Vidmlld0lkKSB7XG4gICAgY29uc3QgZnJhbWVMaXN0ID0gYXdhaXQgcGFnZS5mcmFtZXMoKTtcbiAgICBjb25zdCBwZW5kaW5nRnJhbWUgPSBbXTtcbiAgICBmb3IgKGNvbnN0IGZyYW1lIG9mIGZyYW1lTGlzdCkge1xuICAgICAgICBpZiAoZnJhbWUubmFtZSgpID09PSAnJykge1xuICAgICAgICAgICAgcGVuZGluZ0ZyYW1lLnB1c2goZnJhbWUpO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGZyYW1lLm5hbWUoKSA9PT0gYHdlYnZpZXctJHt3ZWJ2aWV3SWR9YCkge1xuICAgICAgICAgICAgLy8gTG9nZ2VyLmluZm8oYGZvdW5kIHdlYnZpZXctJHt3ZWJ2aWV3SWR9ISEhYCk7XG4gICAgICAgICAgICByZXR1cm4gZnJhbWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaW4gdGhlIHBlbmRpbmcgZnJhbWUgd2FpdCBmb3IgaXQgYW5kIHJldHVyblxuICAgIC8vIGRlYnVnKCdnZXQgY3VycmVudCBmcmFtZSBieSBpZCBpbiBwZW5kaW5nIGxpc3QnKTtcbiAgICBmb3IgKGNvbnN0IGZyYW1lIG9mIHBlbmRpbmdGcmFtZSkge1xuICAgICAgICBjb25zdCBbd2FpdFRpbWVvdXRdID0gYXdhaXQgYXdhaXRfdG9fanNfMS5kZWZhdWx0KGZyYW1lLndhaXRGb3JOYXZpZ2F0aW9uKHsgdGltZW91dDogMTAwMCB9KSk7XG4gICAgICAgIGlmIChmcmFtZS5uYW1lKCkgPT09IGB3ZWJ2aWV3LSR7d2Vidmlld0lkfWApIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydHMuZ2V0Q3VycmVudEZyYW1lQnlXZWJ2aWV3SWQgPSBnZXRDdXJyZW50RnJhbWVCeVdlYnZpZXdJZDtcbmFzeW5jIGZ1bmN0aW9uIGdldEFwcFNlcnZpY2VGcmFtZShwYWdlKSB7XG4gICAgY29uc3QgZnJhbWVMaXN0ID0gYXdhaXQgcGFnZS5mcmFtZXMoKTtcbiAgICBmb3IgKGNvbnN0IGZyYW1lIG9mIGZyYW1lTGlzdCkge1xuICAgICAgICBpZiAoZnJhbWUubmFtZSgpID09PSAnYXBwc2VydmljZScpIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbn1cbmV4cG9ydHMuZ2V0QXBwU2VydmljZUZyYW1lID0gZ2V0QXBwU2VydmljZUZyYW1lO1xuZnVuY3Rpb24gc2Nyb2xsVG9Ub3AoZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIC8vIEB0b2RvIOWIpOWumuW9k+WJjemhtemdouaYr+WQpuaciXNjcm9sbC12aWV3LCDmnIlzY3JvbGwtdmlld+aXtu+8jOmcgOimgeWIq+eahOaWueW8j+a7muWKqFxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNjcm9sbFRvVG9wID0gc2Nyb2xsVG9Ub3A7XG5mdW5jdGlvbiBzY3JvbGxUb0JvdHRvbShmcmFtZSkge1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgLy8gQHRvZG8g5Yik5a6a5b2T5YmN6aG16Z2i5piv5ZCm5pyJc2Nyb2xsLXZpZXcsIOaciXNjcm9sbC12aWV35pe277yM6ZyA6KaB5Yir55qE5pa55byP5rua5YqoXG4gICAgICAgIGNvbnN0IGhlaWdodCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBoZWlnaHQgLSB3aW5kb3dIZWlnaHQpO1xuICAgICAgICAvLyB3aW5kb3cud3gucHVibGlzaFBhZ2VFdmVudCgnb25SZWFjaEJvdHRvbScsIHt9KTtcbiAgICB9KTtcbn1cbmV4cG9ydHMuc2Nyb2xsVG9Cb3R0b20gPSBzY3JvbGxUb0JvdHRvbTtcbmZ1bmN0aW9uIHNjcm9sbERvd24oZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5zY3JvbGxZO1xuICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzY3JvbGxUb3AgKyB3aW5kb3dIZWlnaHQgLSA2NCk7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgfSk7XG59XG5leHBvcnRzLnNjcm9sbERvd24gPSBzY3JvbGxEb3duO1xuZnVuY3Rpb24gZWxlbUluV2luZG93KGZyYW1lKSB7XG59XG5leHBvcnRzLmVsZW1JbldpbmRvdyA9IGVsZW1JbldpbmRvdztcbmZ1bmN0aW9uIGR1bXBTY29wZURhdGFUb0RPTU5vZGUoZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cuX192aXJ0dWFsRE9NX18uc3ByZWFkU2NvcGVEYXRhVG9ET01Ob2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzY29wZSBkYXRhIGVycm9yICR7ZS5tZXNzYWdlfSAke2Uuc3RhY2t9YCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmV4cG9ydHMuZHVtcFNjb3BlRGF0YVRvRE9NTm9kZSA9IGR1bXBTY29wZURhdGFUb0RPTU5vZGU7XG5mdW5jdGlvbiBnZXRGcmFtZUh0bWwoZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cuX192aXJ0dWFsRE9NX18uc3ByZWFkU2NvcGVEYXRhVG9ET01Ob2RlKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzY29wZSBkYXRhIGVycm9yICR7ZS5tZXNzYWdlfSAke2Uuc3RhY2t9YCk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc3R5bGVTaGVldHMgPSBkb2N1bWVudC5zdHlsZVNoZWV0cztcbiAgICAgICAgbGV0IGNzcyA9ICcnO1xuICAgICAgICBjb25zdCBlbGVtZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyonKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGVsZW1lbnRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBlbCA9IGVsZW1lbnRzW2ldO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHN0eWxlU2hlZXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgY3NzUnVsZXMgPSBzdHlsZVNoZWV0c1tpXS5jc3NSdWxlcztcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY3NzUnVsZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnVsZSA9IGNzc1J1bGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAocnVsZS5hZGRlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsLndlYmtpdE1hdGNoZXNTZWxlY3RvcihydWxlLnNlbGVjdG9yVGV4dCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJ1bGUuYWRkZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3NzICs9IHJ1bGUuY3NzVGV4dDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYDxodG1sPjxtZXRhIGNoYXJzZXQ9XCJVVEYtOFwiPjxtZXRhIG5hbWU9XCJ2aWV3cG9ydFwiIGNvbnRlbnQ9XCJ3aWR0aD1kZXZpY2Utd2lkdGgsXG4gICAgICAgICAgICAgICAgdXNlci1zY2FsYWJsZT1ubywgaW5pdGlhbC1zY2FsZT0xLjAsIG1heGltdW0tc2NhbGU9MS4wLCBtaW5pbXVtLXNjYWxlPTEuMFwiPjxzdHlsZT4ke2Nzc308L3N0eWxlPlxuICAgICAgICAgICAgICAgICR7ZG9jdW1lbnQuYm9keS5vdXRlckhUTUx9YDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuZ2V0RnJhbWVIdG1sID0gZ2V0RnJhbWVIdG1sO1xuYXN5bmMgZnVuY3Rpb24gZ2V0RWxlbUNydyhlbGVtLCBmcmFtZSkge1xuICAgIGNvbnN0IFtlcnIsIGNyd10gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoZWxlbSkgPT4ge1xuICAgICAgICBjb25zdCByZWN0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgY29uc3QgY29tU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbGVtKTtcbiAgICAgICAgcmV0dXJuIGAke3JlY3QubGVmdH0sJHtyZWN0LnRvcH0sJHtyZWN0LnJpZ2h0fSwke3JlY3QuYm90dG9tfSwke2NvbVN0eWxlLmZvbnRTaXplfSwke2NvbVN0eWxlLmJvcmRlcldpZHRofSwke2NvbVN0eWxlLmJhY2tncm91bmRDb2xvcn0sJHtjb21TdHlsZS5ib3JkZXJDb2xvcn0sJHtjb21TdHlsZS5jb2xvcn0sJHtjb21TdHlsZS5wYWRkaW5nfSwke2NvbVN0eWxlLm1hcmdpbn1gO1xuICAgIH0sIGVsZW0pKTtcbiAgICBpZiAoZXJyKSB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoJ2ZhaWwgZ2V0IGVsZW0gY3J3JywgZXJyKTtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICByZXR1cm4gY3J3O1xufVxuZXhwb3J0cy5nZXRFbGVtQ3J3ID0gZ2V0RWxlbUNydztcbmFzeW5jIGZ1bmN0aW9uIGluc2VydENyd0luZm8oZnJhbWUpIHtcbiAgICBjb25zdCBtc2cgPSBhd2FpdCB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsICgpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBmdW5jdGlvbiB0cmF2ZXJzZUVsZW1lbnQoZWwpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkRWxDbnQgPSBlbC5jaGlsZEVsZW1lbnRDb3VudDtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2hpbGRFbENudDsgKytpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgcmVjdCA9IGVsLmNoaWxkcmVuW2ldLmdldENsaWVudFJlY3RzKCk7XG4gICAgICAgICAgICAgICAgY29uc3QgY29tU3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbC5jaGlsZHJlbltpXSk7XG4gICAgICAgICAgICAgICAgbGV0IGNyd0F0dHIgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAocmVjdC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgY3J3QXR0ciA9IGAke3JlY3RbMF0ubGVmdH0sJHtyZWN0WzBdLnRvcH0sJHtyZWN0WzBdLnJpZ2h0fSxgXG4gICAgICAgICAgICAgICAgICAgICAgICArIGAke3JlY3RbMF0uYm90dG9tfSwke2NvbVN0eWxlLmZvbnRTaXplfSwke2NvbVN0eWxlLmJvcmRlcldpZHRofSxgXG4gICAgICAgICAgICAgICAgICAgICAgICArIGAke2NvbVN0eWxlLmJhY2tncm91bmRDb2xvcn0sJHtjb21TdHlsZS5ib3JkZXJDb2xvcn0sJHtjb21TdHlsZS5jb2xvcn0sYFxuICAgICAgICAgICAgICAgICAgICAgICAgKyBgJHtjb21TdHlsZS5wYWRkaW5nfSwke2NvbVN0eWxlLm1hcmdpbn1gO1xuICAgICAgICAgICAgICAgICAgICBlbC5jaGlsZHJlbltpXS5zZXRBdHRyaWJ1dGUoJ3d4LWNydycsIGNyd0F0dHIpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cmF2ZXJzZUVsZW1lbnQoZWwuY2hpbGRyZW5baV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgMCk7XG4gICAgICAgICAgICB0cmF2ZXJzZUVsZW1lbnQoZG9jdW1lbnQuYm9keSk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGB0cmF2ZXJzZUVsZW1lbnQgZXJyb3IgJHtlLm1lc3NhZ2V9ICR7ZS5zdGFja31gKTtcbiAgICAgICAgICAgIHJldHVybiBlLm1lc3NhZ2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICdvayc7XG4gICAgfSk7XG4gICAgaWYgKG1zZyAhPT0gJ29rJykge1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBpbnNlcnRDcndJbmZvIGVycm9yISAke21zZ31gKTtcbiAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuSU5TRVJUX0NSV19FUlIpO1xuICAgIH1cbiAgICByZXR1cm4gbXNnO1xufVxuZXhwb3J0cy5pbnNlcnRDcndJbmZvID0gaW5zZXJ0Q3J3SW5mbztcbmFzeW5jIGZ1bmN0aW9uIGdldEFuZEluc2VydFNoYXJlRGF0YShwYWdlLCBmcmFtZSkge1xuICAgIGxldCBzaGFyZURhdGE7XG4gICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICAvLyDop6blj5HliIbkuqtcbiAgICAgICAgICAgIGNvbnN0IHdlYnZpZXcgPSB3aW5kb3cubmF0aXZlLndlYnZpZXdNYW5hZ2VyLmdldEN1cnJlbnQoKTtcbiAgICAgICAgICAgIHdpbmRvdy5uYXRpdmUuYXBwU2VydmljZU1lc3Nlbmdlci5zZW5kKHtcbiAgICAgICAgICAgICAgICBjb21tYW5kOiAnQVBQU0VSVklDRV9PTl9FVkVOVCcsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBldmVudE5hbWU6ICdvblNoYXJlQXBwTWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGg6IHdlYnZpZXcudXJsLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogJ2NvbW1vbicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB3ZWJ2aWV3SWQ6IHdlYnZpZXcuaWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IHV0aWxzXzEuc2xlZXAoMjAwKTtcbiAgICAgICAgc2hhcmVEYXRhID0gYXdhaXQgcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyh3aW5kb3cuc2hhcmVEYXRhKTtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2hhcmVEYXRhO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgY2F0Y2ggKGUpIHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgISEhISEgZ2V0U2hhcmVEYXRhIGV2YWx1YXRlIGZhaWxlZCAke2UubWVzc2FnZX0gJHtlLnN0YWNrfWApO1xuICAgIH1cbiAgICBsb2dfMS5kZWZhdWx0LmluZm8oYHNoYXJlZGF0YSBpcyAke0pTT04uc3RyaW5naWZ5KHNoYXJlRGF0YSl9YCk7XG4gICAgaWYgKHNoYXJlRGF0YSAmJiAoc2hhcmVEYXRhLmhhc093blByb3BlcnR5KFwidGl0bGVcIikgfHwgc2hhcmVEYXRhLmhhc093blByb3BlcnR5KFwiaW1hZ2VVcmxcIikpKSB7XG4gICAgICAgIGNvbnN0IHJlYWxTaGFyZURhdGEgPSB7XG4gICAgICAgICAgICBcInRpdGxlXCI6IHNoYXJlRGF0YS50aXRsZSA/IHNoYXJlRGF0YS50aXRsZSA6IFwiXCIsXG4gICAgICAgICAgICBcImltYWdlVXJsXCI6IFwiXCJcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHNoYXJlRGF0YS5pbWFnZVVybCAmJiBhd2FpdCB1dGlsc18xLmNoZWNrSW1hZ2VWYWxpZChzaGFyZURhdGEuaW1hZ2VVcmwpID09PSAwKSB7XG4gICAgICAgICAgICByZWFsU2hhcmVEYXRhLmltYWdlVXJsID0gc2hhcmVEYXRhLmltYWdlVXJsO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgaW1hZ2U6JHtzaGFyZURhdGEuaW1hZ2VVcmx9IGlzIGludmFsaWQhYCk7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoc0RhdGEpID0+IHtcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCd3eC1zaGFyZS1kYXRhJywgSlNPTi5zdHJpbmdpZnkoc0RhdGEpKTtcbiAgICAgICAgfSwgcmVhbFNoYXJlRGF0YSk7XG4gICAgfVxufVxuZXhwb3J0cy5nZXRBbmRJbnNlcnRTaGFyZURhdGEgPSBnZXRBbmRJbnNlcnRTaGFyZURhdGE7XG5mdW5jdGlvbiBnZXRGcmFtZUluZm8oZnJhbWUpIHtcbiAgICByZXR1cm4gdXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBwYWdlSGVpZ2h0OiBkb2N1bWVudC5ib2R5Lm9mZnNldEhlaWdodCxcbiAgICAgICAgICAgIHdpbmRvd0hlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgICAgICB9O1xuICAgIH0pO1xufVxuZXhwb3J0cy5nZXRGcmFtZUluZm8gPSBnZXRGcmFtZUluZm87XG5hc3luYyBmdW5jdGlvbiBnZXRVc2VySW5mbyhmcmFtZSwgcGFnZSkge1xuICAgIGNvbnN0IGZyYW1lTGlzdCA9IGF3YWl0IHBhZ2UuZnJhbWVzKCk7XG4gICAgZm9yIChjb25zdCBmcmFtZSBvZiBmcmFtZUxpc3QpIHtcbiAgICAgICAgaWYgKGZyYW1lLm5hbWUoKSA9PT0gJ2FwcHNlcnZpY2UnKSB7XG4gICAgICAgICAgICBjb25zdCBbZXJyLCB1c2VySW5mb10gPSBhd2FpdCBhd2FpdF90b19qc18xLmRlZmF1bHQodXRpbHNfMS5mcmFtZUV2YWx1YXRlKGZyYW1lLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgICAgICAgICAgICB3eC5nZXRVc2VySW5mbyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzKHJlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUocmVzLnVzZXJJbmZvKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBmYWlsKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGB1c2VyaW5mbyBpcyAke0pTT04uc3RyaW5naWZ5KHVzZXJJbmZvKX1gKTtcbiAgICAgICAgICAgIGlmICh1c2VySW5mbykge1xuICAgICAgICAgICAgICAgIHJldHVybiB1c2VySW5mbztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHJlcG9ydElkS2V5KElkS2V5LkdFVF9VU0VSSU5GT19FTVBUWSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybjtcbn1cbmV4cG9ydHMuZ2V0VXNlckluZm8gPSBnZXRVc2VySW5mbztcbmZ1bmN0aW9uIGdldFdlYnZpZXdJbmZvKHBhZ2UpIHtcbiAgICByZXR1cm4gcGFnZS5ldmFsdWF0ZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRXZWJ2aWV3ID0gd2luZG93Lm5hdGl2ZS53ZWJ2aWV3TWFuYWdlci5nZXRDdXJyZW50KCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1cmw6IGN1cnJlbnRXZWJ2aWV3LnVybCxcbiAgICAgICAgICAgIGlkOiBjdXJyZW50V2Vidmlldy5pZCxcbiAgICAgICAgICAgIHBhdGg6IGN1cnJlbnRXZWJ2aWV3LnBhdGgsXG4gICAgICAgICAgICBwYWdlVGl0bGU6IGN1cnJlbnRXZWJ2aWV3LnBhZ2VDb25maWcud2luZG93Lm5hdmlnYXRpb25CYXJUaXRsZVRleHQsXG4gICAgICAgICAgICBzdGFjazogd2luZG93Lm5hdGl2ZS53ZWJ2aWV3TWFuYWdlci5nZXRQYWdlU3RhY2soKS5tYXAoKHdlYnZpZXcpID0+IHdlYnZpZXcucGF0aCksXG4gICAgICAgIH07XG4gICAgfSk7XG59XG5leHBvcnRzLmdldFdlYnZpZXdJbmZvID0gZ2V0V2Vidmlld0luZm87XG5mdW5jdGlvbiBoYXNXZWJ2aWV3KGZyYW1lKSB7XG4gICAgcmV0dXJuIHV0aWxzXzEuZnJhbWVFdmFsdWF0ZShmcmFtZSwgKCkgPT4ge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignd3gtd2ViLXZpZXcnKSAhPT0gbnVsbDtcbiAgICB9KTtcbn1cbmV4cG9ydHMuaGFzV2VidmlldyA9IGhhc1dlYnZpZXc7XG5mdW5jdGlvbiBpbnNlcnRUYXNrSW5mbyh0YXNrSW5mbywgZnJhbWUpIHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUoKTtcbiAgICB0YXNrSW5mby50aW1lID0gZC50b0xvY2FsZVN0cmluZygpO1xuICAgIHJldHVybiB1dGlsc18xLmZyYW1lRXZhbHVhdGUoZnJhbWUsIChzRGF0YSkgPT4ge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnd3gtY3Jhd2xlci10YXNraW5mbycsIEpTT04uc3RyaW5naWZ5KHNEYXRhKSk7XG4gICAgfSwgdGFza0luZm8pO1xufVxuZXhwb3J0cy5pbnNlcnRUYXNrSW5mbyA9IGluc2VydFRhc2tJbmZvO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCBjb25maWdfMSA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmNvbnN0IGxvZ18xID0gcmVxdWlyZShcIi4uL2xvZ1wiKTtcbmNvbnN0IHJlcXVpcmVGdW5jID0gdHlwZW9mIF9fd2VicGFja19yZXF1aXJlX18gPT09IFwiZnVuY3Rpb25cIiA/IF9fbm9uX3dlYnBhY2tfcmVxdWlyZV9fIDogcmVxdWlyZTtcbmNvbnN0IGlzUHJvZCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbic7XG5sZXQgbGliO1xuaWYgKGlzUHJvZCkge1xuICAgIGNvbnN0IGZmaSA9IHJlcXVpcmVGdW5jKCdmZmknKTtcbiAgICBsaWIgPSBmZmkuTGlicmFyeShjb25maWdfMS5JREtfTElCLCB7XG4gICAgICAgICdPc3NBdHRySW5jJzogWydpbnQnLCBbJ2ludCcsICdpbnQnLCAnaW50J11dLFxuICAgIH0pO1xufVxuZnVuY3Rpb24gcmVwb3J0KGlkLCBrZXksIHZhbCkge1xuICAgIGlmIChpc1Byb2QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGxpYi5Pc3NBdHRySW5jKGlkLCBrZXksIHZhbCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcigncmVwb3J0SWRLZXkgZmFpbCcsIGVycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZGVidWcoJ3JlcG9ydElkS2V5IHJlcG9ydCcsIGlkLCBrZXksIHZhbCk7XG4gICAgfVxufVxuLyoqXG4gKiDkuIrmiqXnm5HmjqfmlbDmja5cbiAqIEBwYXJhbSBrZXlcbiAqIEBwYXJhbSB7bnVtYmVyfSB2YWxcbiAqL1xuZnVuY3Rpb24gcmVwb3J0SWRLZXkoa2V5LCB2YWwgPSAxKSB7XG4gICAgY29uc3QgdGVtcCA9IChrZXkgKyAnJykuc3BsaXQoJ18nKTtcbiAgICBpZiAodGVtcC5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcmVwb3J0KHBhcnNlSW50KHRlbXBbMF0sIDEwKSwgcGFyc2VJbnQodGVtcFsxXSwgMTApLCB2YWwpO1xuICAgIH1cbiAgICBlbHNlIGlmIChjb25maWdfMS5NYWluSWRLZXkgJiYgdGVtcC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVwb3J0KGNvbmZpZ18xLk1haW5JZEtleSwga2V5LCB2YWwpO1xuICAgIH1cbn1cbmV4cG9ydHMucmVwb3J0SWRLZXkgPSByZXBvcnRJZEtleTtcbnZhciBjb25maWdfMiA9IHJlcXVpcmUoXCIuL2NvbmZpZ1wiKTtcbmV4cG9ydHMuSWRLZXkgPSBjb25maWdfMi5JZEtleTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgSmltcCA9IHJlcXVpcmUoXCJqaW1wXCIpO1xuLy8gaW1wb3J0IHtFbGVtZW50SGFuZGxlfSBmcm9tIFwicHVwcGV0ZWVyXCI7XG5jb25zdCBxcyA9IHJlcXVpcmUoXCJxc1wiKTtcbmNvbnN0IHVybFV0aWwgPSByZXF1aXJlKFwidXJsXCIpO1xuLy8gaW1wb3J0IHtJZEtleX0gZnJvbSBcIi4uL2NvbmZpZ1wiO1xuY29uc3QgbG9nXzEgPSByZXF1aXJlKFwiLi4vbG9nXCIpO1xuLy8gaW1wb3J0IHtyZXBvcnRJZEtleX0gZnJvbSBcIi4uL3JlcG9ydElkS2V5XCI7XG5jb25zdCBkZXZpY2VzID0gcmVxdWlyZSgncHVwcGV0ZWVyL0RldmljZURlc2NyaXB0b3JzJyk7XG5mdW5jdGlvbiBzbGVlcCh0aW1lKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQocmVzb2x2ZSwgdGltZSk7XG4gICAgfSk7XG59XG5leHBvcnRzLnNsZWVwID0gc2xlZXA7XG5mdW5jdGlvbiBmcmFtZUV2YWx1YXRlKGZyYW1lLCBmdW5jLCAuLi5hcmdzKSB7XG4gICAgaWYgKCFmcmFtZS5pc0RldGFjaGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIGZyYW1lLmV2YWx1YXRlKGZ1bmMsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuRlJBTUVfREVUQUNIRUQpO1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmcmFtZUV2YWx1YXRlIGZhaWxlZCBmcmFtZVske2ZyYW1lLm5hbWUoKX1dIGRldGFjaGVkIWApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyYW1lIGRldGFjaGVkISBuYW1lOiR7ZnJhbWUubmFtZSgpfWApO1xuICAgIH1cbn1cbmV4cG9ydHMuZnJhbWVFdmFsdWF0ZSA9IGZyYW1lRXZhbHVhdGU7XG5mdW5jdGlvbiBmcmFtZSQkKGZyYW1lLCBzZWxlY3Rvcikge1xuICAgIGlmICghZnJhbWUuaXNEZXRhY2hlZCgpKSB7XG4gICAgICAgIHJldHVybiBmcmFtZS4kJChzZWxlY3Rvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGZyYW1lLiQkIGZhaWxlZCBmcmFtZSBkZXRhY2hlZCFgKTtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBmcmFtZSBkZXRhY2hlZCEgbmFtZTogJHtmcmFtZS5uYW1lKCl9YCk7XG4gICAgfVxufVxuZXhwb3J0cy5mcmFtZSQkID0gZnJhbWUkJDtcbmZ1bmN0aW9uIGZyYW1lJCRldmFsKGZyYW1lLCBzZWxlY3RvciwgZnVuYywgLi4uYXJncykge1xuICAgIGlmICghZnJhbWUuaXNEZXRhY2hlZCgpKSB7XG4gICAgICAgIHJldHVybiBmcmFtZS4kJGV2YWwoc2VsZWN0b3IsIGZ1bmMsIC4uLmFyZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gcmVwb3J0SWRLZXkoSWRLZXkuRlJBTUVfREVUQUNIRUQpO1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmVycm9yKGBmcmFtZS4kJCBmYWlsZWQgZnJhbWUgZGV0YWNoZWQhYCk7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgZnJhbWUgZGV0YWNoZWQhIG5hbWU6ICR7ZnJhbWUubmFtZSgpfWApO1xuICAgIH1cbn1cbmV4cG9ydHMuZnJhbWUkJGV2YWwgPSBmcmFtZSQkZXZhbDtcbmZ1bmN0aW9uIGZyYW1lJChmcmFtZSwgc2VsZWN0b3IpIHtcbiAgICBpZiAoIWZyYW1lLmlzRGV0YWNoZWQoKSkge1xuICAgICAgICByZXR1cm4gZnJhbWUuJChzZWxlY3Rvcik7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyByZXBvcnRJZEtleShJZEtleS5GUkFNRV9ERVRBQ0hFRCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuZXJyb3IoYGZyYW1lLiQgZmFpbGVkIGZyYW1lIGRldGFjaGVkIWApO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYGZyYW1lIGRldGFjaGVkISBuYW1lOiAke2ZyYW1lLm5hbWUoKX1gKTtcbiAgICB9XG59XG5leHBvcnRzLmZyYW1lJCA9IGZyYW1lJDtcbmZ1bmN0aW9uIGdldERhdGFSZXBvcnREZWZhdWx0KHBhcmFtcykge1xuICAgIGNvbnN0IHsgVGFza1VybCwgUmVzdWx0U3RhdHVzLCBJc1dlYlZpZXcgPSAwLCBQYXJlbnRVcmwgPSAnJywgUGtnVW5leGlzdGVkID0gMCB9ID0gcGFyYW1zO1xuICAgIHJldHVybiB7XG4gICAgICAgIFRhc2tQYWdlOiBUYXNrVXJsLnNwbGl0KCc/JylbMF0sXG4gICAgICAgIFRhc2tVcmw6IFRhc2tVcmwuc3Vic3RyKDAsIDEwMDApLFxuICAgICAgICBSZXN1bHRQYWdlOiAnJyxcbiAgICAgICAgUmVzdWx0VXJsOiAnJyxcbiAgICAgICAgSGFzQXV0b0NsaWNrOiAwLFxuICAgICAgICBJc05ldHdvcmtJZGxlVGltZU91dDogMCxcbiAgICAgICAgSXNXZWJ2aWV3V2FpdFRpbWVPdXQ6IDAsXG4gICAgICAgIFRpbWVDb3N0OiAwLFxuICAgICAgICBJc1dlYlZpZXcsXG4gICAgICAgIFdhaXRGb3JXZWJ2aWV3RXJyb3I6IDAsXG4gICAgICAgIFJlc3VsdFN0YXR1czogUmVzdWx0U3RhdHVzIHx8IDAsXG4gICAgICAgIFVybENyYXdsQmVnaW5UaW1lOiBEYXRlLm5vdygpLFxuICAgICAgICBQa2dVbmV4aXN0ZWQsXG4gICAgICAgIFBhcmVudFVybDogUGFyZW50VXJsLnN1YnN0cigwLCAxMDAwKVxuICAgIH07XG59XG5leHBvcnRzLmdldERhdGFSZXBvcnREZWZhdWx0ID0gZ2V0RGF0YVJlcG9ydERlZmF1bHQ7XG5mdW5jdGlvbiBnZXREZXZpY2VJbmZvKCkge1xuICAgIGNvbnN0IGlQaG9uZSA9IGRldmljZXNbJ2lQaG9uZSA2J107XG4gICAgaVBob25lLnZpZXdwb3J0LmRldmljZVNjYWxlRmFjdG9yID0gMTtcbiAgICByZXR1cm4gaVBob25lO1xufVxuZXhwb3J0cy5nZXREZXZpY2VJbmZvID0gZ2V0RGV2aWNlSW5mbztcbmZ1bmN0aW9uIGdldENvb2tpZUluZm8oYXBwdWluLCB1cmwpIHtcbiAgICBjb25zdCBkb21haW4gPSB1cmwubWF0Y2goL15odHRwcz86XFwvXFwvKFteOlxcL10rKVs6XFwvXS9pKTtcbiAgICBjb25zdCB3eHVpbiA9IGFwcHVpbiA/IGFwcHVpbiA6IERhdGUubm93KCkgKiAxMDAwICsgcGFyc2VJbnQoTWF0aC5yYW5kb20oKSAqIDEwMDAgKyAnJywgMTApO1xuICAgIHJldHVybiB7XG4gICAgICAgIG5hbWU6ICd3eHVpbicsXG4gICAgICAgIHZhbHVlOiB3eHVpbiArICcnLFxuICAgICAgICBleHBpcmVzOiBuZXcgRGF0ZSgnMjAzOC0wMS0xOVQwMzoxNDowNy4wMCcpLmdldFRpbWUoKSxcbiAgICAgICAgZG9tYWluOiBkb21haW4gPyBkb21haW5bMV0gOiAnd3hhY3Jhd2xlci5jb20nLFxuICAgICAgICBwYXRoOiAnLycsXG4gICAgICAgIGh0dHBPbmx5OiBmYWxzZSxcbiAgICB9O1xufVxuZXhwb3J0cy5nZXRDb29raWVJbmZvID0gZ2V0Q29va2llSW5mbztcbmZ1bmN0aW9uIGdldEZpbGVOYW1lQnlVcmwodXJsKSB7XG4gICAgbGV0IG5hbWUgPSB1cmwucmVwbGFjZSgvXFwufFxcL3xcXFxcfFxcKnxcXD98PXwmfCUvZywgJ18nKTtcbiAgICBpZiAobmFtZS5sZW5ndGggPiAxNjgpIHtcbiAgICAgICAgbmFtZSA9IG5hbWUuc3Vic3RyKDAsIDE2OCkgKyAnXycgKyBNYXRoLnJvdW5kKERhdGUubm93KCkgLyAxMDAwKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG5hbWUgKz0gJ18nICsgTWF0aC5yb3VuZChEYXRlLm5vdygpIC8gMTAwMCk7XG4gICAgfVxuICAgIHJldHVybiBuYW1lO1xufVxuZXhwb3J0cy5nZXRGaWxlTmFtZUJ5VXJsID0gZ2V0RmlsZU5hbWVCeVVybDtcbmZ1bmN0aW9uIGNoZWNrSW1hZ2VWYWxpZChpbWFnZVVybCkge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoMCk7XG4gICAgLypcbiAgICBjb25zdCByYW5kID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKigxMDApKTtcbiAgICBpZiAocmFuZCA+IDApIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgwKTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlKSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXF1ZXN0KHtcbiAgICAgICAgICAgICAgICB1cmw6IGltYWdlVXJsLFxuICAgICAgICAgICAgICAgIG1ldGhvZDogXCJHRVRcIixcbiAgICAgICAgICAgICAgICB0aW1lb3V0OiAzMDAwLFxuICAgICAgICAgICAgfSwgKGVycm9yLCByZXNwb25zZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICghZXJyb3IgJiYgLzJcXGRcXGR8MzA0Ly50ZXN0KHJlc3BvbnNlLnN0YXR1c0NvZGUudG9TdHJpbmcoKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udGVudFR5cGU6IHN0cmluZyA9IHJlc3BvbnNlLmhlYWRlcnNbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgICAgICAgICAgICAgICAgICBMb2dnZXIuaW5mbyhgJHtjb250ZW50VHlwZX1gKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKC9pbWFnZS9pLnRlc3QoY29udGVudFR5cGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgwKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcG9ydElkS2V5KElkS2V5LklOVkFMSURfU0hBUkVfSU1BR0UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0SWRLZXkoSWRLZXkuQ0hFQ0tfU0hBUkVfSU1BR0VfRVJSKTtcbiAgICAgICAgICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBjaGVja1NoYXJlRGF0YUltYWdlVXJsICR7aW1hZ2VVcmx9IGZhaWxlZCEgJHtlcnJvcn1gKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICByZXBvcnRJZEtleShJZEtleS5DSEVDS19TSEFSRV9JTUFHRV9DQVRDSF9FUlIpO1xuICAgICAgICAgICAgTG9nZ2VyLmVycm9yKGBjaGVja1NoYXJlRGF0YUltYWdlVXJsIHJlcXVlc3QgZXJyb3IgJHtpbWFnZVVybH0hICR7ZS5tZXNzYWdlfWApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoLTEpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgKi9cbn1cbmV4cG9ydHMuY2hlY2tJbWFnZVZhbGlkID0gY2hlY2tJbWFnZVZhbGlkO1xuY29uc3QgcHJlZml4ID0gU3RyaW5nKERhdGUubm93KCkpLnN1YnN0cigwLCA1KTtcbmNvbnN0IHRpbWVSZWcgPSBuZXcgUmVnRXhwKGA9JHtwcmVmaXh9XFxcXGR7OCx9KCR8JilgKTtcbmZ1bmN0aW9uIHJlcGxhY2VUaW1lU3RhbXAodXJsKSB7XG4gICAgaWYgKCF1cmwpXG4gICAgICAgIHJldHVybiB1cmw7XG4gICAgaWYgKCF0aW1lUmVnLnRlc3QodXJsKSlcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICAvLyDpnIDopoHmm7/mjaJcbiAgICBjb25zdCBbcGF0aCwgcGFyYW1zXSA9IHVybC5zcGxpdCgnPycpO1xuICAgIGlmIChwYXJhbXMpIHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSBxcy5wYXJzZShwYXJhbXMpO1xuICAgICAgICBjb25zdCBuZXdRdWVyeSA9IE9iamVjdC5rZXlzKHF1ZXJ5KS5yZWR1Y2UoKG9iaiwga2V5KSA9PiB7XG4gICAgICAgICAgICBpZiAoL15cXGR7MTMsfSQvLnRlc3QocXVlcnlba2V5XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqW2tleV0gPSBxdWVyeVtrZXldO1xuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgfSwge30pO1xuICAgICAgICBjb25zdCBuZXdVcmwgPSBgJHtwYXRofT8ke3FzLnN0cmluZ2lmeShuZXdRdWVyeSl9YDtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGByZXBsYWNlIHRpbWVzdGFtcDogJHt1cmx9ID0+ICR7bmV3VXJsfWApO1xuICAgICAgICByZXR1cm4gbmV3VXJsO1xuICAgIH1cbiAgICByZXR1cm4gdXJsO1xufVxuZXhwb3J0cy5yZXBsYWNlVGltZVN0YW1wID0gcmVwbGFjZVRpbWVTdGFtcDtcbmZ1bmN0aW9uIHJlbW92ZVVzZWxlc3NQYXJhbSh1cmwpIHtcbiAgICBpZiAoIXVybClcbiAgICAgICAgcmV0dXJuIHVybDtcbiAgICBjb25zdCB1cmxPYmogPSBuZXcgdXJsVXRpbC5VUkwodXJsLCAnaHR0cDovL21wY3Jhd2xlcicpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdwdHAnKTtcbiAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmRlbGV0ZSgncmVmX3BhZ2VfbmFtZScpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdyZWZfcGFnZV9pZCcpO1xuICAgIHVybE9iai5zZWFyY2hQYXJhbXMuZGVsZXRlKCdhY20nKTtcbiAgICB1cmxPYmouc2VhcmNoUGFyYW1zLmRlbGV0ZSgnb3BlbmlkJyk7XG4gICAgdXJsT2JqLnNlYXJjaFBhcmFtcy5kZWxldGUoJ2NvbWVmcm9tJyk7XG4gICAgY29uc3QgbmV3VXJsID0gdXJsT2JqLmhyZWYucmVwbGFjZSgnaHR0cDovL21wY3Jhd2xlci8nLCAnJyk7XG4gICAgbG9nXzEuZGVmYXVsdC5pbmZvKGBuZXdVcmwgaXMgJHtuZXdVcmx9YCk7XG4gICAgcmV0dXJuIG5ld1VybDtcbn1cbmV4cG9ydHMucmVtb3ZlVXNlbGVzc1BhcmFtID0gcmVtb3ZlVXNlbGVzc1BhcmFtO1xuZnVuY3Rpb24gaXNCbGFja1JlcXVlc3QodXJsLCBibGFja1VybExpc3QpIHtcbiAgICBpZiAoIXVybClcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIGNvbnN0IHVybE9iaiA9IG5ldyB1cmxVdGlsLlVSTCh1cmwsICdodHRwOi8vbXBjcmF3bGVyJyk7XG4gICAgY29uc3QgcmVxdWVzdFVybCA9IHVybE9iai5zZWFyY2hQYXJhbXMuZ2V0KCd1cmwnKTtcbiAgICBpZiAocmVxdWVzdFVybCkge1xuICAgICAgICBjb25zdCByZU1hdGNoID0gcmVxdWVzdFVybC5zcGxpdCgnPycpWzBdLm1hdGNoKC9odHRwczpcXC9cXC8oLis/KVxcLy9pKTtcbiAgICAgICAgY29uc3QgaG9zdCA9IHJlTWF0Y2ggPyByZU1hdGNoWzFdLnJlcGxhY2UoL15cXHMrfFxccyskL2csIFwiXCIpIDogXCJcIjtcbiAgICAgICAgLy8gTG9nZ2VyLmluZm8oYGJsYWNrIGhvc3QgaXMgJHtob3N0fWApXG4gICAgICAgIGlmIChibGFja1VybExpc3QuaW5kZXhPZihob3N0KSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgYmxhY2sgdXJsIGlzICR7aG9zdH1gKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8vIGNvbnN0IGhvc3QgPSByZXF1ZXN0VXJsID8gcmVxdWVzdFVybC5zcGxpdCgnPycpWzBdLnJlcGxhY2UoL15cXHMrfFxccyskL2csXCJcIikgOiBcIlwiO1xuICAgIC8vIExvZ2dlci5pbmZvKGB1cmxob3N0IGlzICR7aG9zdH0gYmxhY2sgdXJsIGlzICR7SlNPTi5zdHJpbmdpZnkoYmxhY2tVcmxMaXN0KX1gKTtcbiAgICAvLyBpZiAocmVxdWVzdFVybCAmJiByZXF1ZXN0VXJsLnNwbGl0KCc/JylbMF0gaW4gYmxhY2tVcmxMaXN0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuZXhwb3J0cy5pc0JsYWNrUmVxdWVzdCA9IGlzQmxhY2tSZXF1ZXN0O1xuZnVuY3Rpb24gaXNCbGFua1BpY3R1cmUocGljKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gSmltcC5yZWFkKHBpYykudGhlbihpbWFnZSA9PiB7XG4gICAgICAgIGltYWdlID0gaW1hZ2UuZ3JleXNjYWxlKCk7IC8vIC53cml0ZSgnbGFqaWdvdS5qcGcnKTtcbiAgICAgICAgLy8gY29uc3QgdGhyZXNob2xkID0gODA7IC8vIOmYiOWAvFxuICAgICAgICBjb25zdCBwaXhlbENvbG9ySW5mbyA9IHt9OyAvLyA6IE1hcDxudW1iZXIsIG51bWJlcj4gPSBuZXcgTWFwKCk7XG4gICAgICAgIC8vIOWDj+e0oOajgOa1i1xuICAgICAgICBsb2dfMS5kZWZhdWx0LmluZm8oYHdpZHRoPSR7aW1hZ2UuYml0bWFwLndpZHRofSBoZWlnaHQ9JHtpbWFnZS5iaXRtYXAuaGVpZ2h0fWApO1xuICAgICAgICBpbWFnZS5zY2FuKDAsIDY3LCBpbWFnZS5iaXRtYXAud2lkdGggLSAxLCBpbWFnZS5iaXRtYXAuaGVpZ2h0IC0gNjcsIGZ1bmN0aW9uICh4LCB5LCBpZHgpIHtcbiAgICAgICAgICAgIGlmICh4ICE9PSBpbWFnZS5iaXRtYXAud2lkdGggLSAxICYmIHkgIT09IGltYWdlLmJpdG1hcC5oZWlnaHQgLSAxKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgYml0ID0gdGhpcy5iaXRtYXAuZGF0YVtpZHggKyAwXTtcbiAgICAgICAgICAgICAgICBpZiAoIXBpeGVsQ29sb3JJbmZvW2JpdF0pIHtcbiAgICAgICAgICAgICAgICAgICAgcGl4ZWxDb2xvckluZm9bYml0XSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBpeGVsQ29sb3JJbmZvW2JpdF0gKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoYml0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nXzEuZGVmYXVsdC5pbmZvKGB1bmRlZmluZSBiaXQgeD0ke3h9IHk9JHt5fSBpZHg9JHtpZHh9IGJpdD0ke2JpdH1gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICAvLyDpmY3luo9cbiAgICAgICAgY29uc3QgcGl4ZWxDb2xvckxpc3QgPSBPYmplY3Qua2V5cyhwaXhlbENvbG9ySW5mbykuc29ydCgoYSwgYikgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHBpeGVsQ29sb3JJbmZvW2FdIDwgcGl4ZWxDb2xvckluZm9bYl0gPyAxIDogLTE7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgbWF4UGl4ZWxQZXJjZW50ID0gcGl4ZWxDb2xvckluZm9bcGl4ZWxDb2xvckxpc3RbMF1dIC8gKGltYWdlLmJpdG1hcC53aWR0aCAqIGltYWdlLmJpdG1hcC5oZWlnaHQpO1xuICAgICAgICBjb25zdCBzZWNvbmRQaXhlbFBlcmNlbnQgPSBwaXhlbENvbG9ySW5mb1twaXhlbENvbG9yTGlzdFsxXV0gLyAoaW1hZ2UuYml0bWFwLndpZHRoICogaW1hZ2UuYml0bWFwLmhlaWdodCk7XG4gICAgICAgIGxvZ18xLmRlZmF1bHQuaW5mbyhgbWF4UGl4ZWxQZXJjZW50ID0gJHttYXhQaXhlbFBlcmNlbnR9IHNlY29uZFBpeGVsUGVyY2VudCA9ICR7c2Vjb25kUGl4ZWxQZXJjZW50fWApO1xuICAgICAgICBpZiAobWF4UGl4ZWxQZXJjZW50ID4gMC41ICYmIHNlY29uZFBpeGVsUGVyY2VudCA+IDAuMikge1xuICAgICAgICAgICAgbWF4UGl4ZWxQZXJjZW50ICs9IDAuMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWF4UGl4ZWxQZXJjZW50ICogMTAwO1xuICAgICAgICAvLyBmb3IgKGNvbnN0IGtleSBvZiBwaXhlbENvbG9yTGlzdCkge1xuICAgICAgICAvLyAgICAgTG9nZ2VyLmluZm8oYCR7a2V5fSBjb3VudCBpcyAke3BpeGVsQ29sb3JJbmZvW2tleV19YCk7XG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgKG1heFBpeGVsUGVyY2VudCoxMDAgPiB0aHJlc2hvbGQpIHtcbiAgICAgICAgLy8gICAgIHJldHVybiB0cnVlO1xuICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAvLyAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAvLyB9XG4gICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcbiAgICAgICAgbG9nXzEuZGVmYXVsdC5lcnJvcihgaXNCbGFua1BpY3R1cmUgZmFpbGVkISAke2Vycn1gKTtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydHMuaXNCbGFua1BpY3R1cmUgPSBpc0JsYW5rUGljdHVyZTtcbiIsIm1vZHVsZS5leHBvcnRzLiQgPSBmdW5jdGlvbiAoc2VsZWN0b3IsIGVsKSB7XG4gIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKVxuICB9XG5cbiAgcmV0dXJuIChlbCB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcbn1cblxubW9kdWxlLmV4cG9ydHMuJCQgPSBmdW5jdGlvbiAoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpXG59XG5cbm1vZHVsZS5leHBvcnRzLnNob3cgPSBmdW5jdGlvbiAoZWwpIHtcbiAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpXG4gIH1cblxuICBlbC5zdHlsZS5kaXNwbGF5ID0gJydcbn1cblxubW9kdWxlLmV4cG9ydHMuaGlkZSA9IGZ1bmN0aW9uIChlbCkge1xuICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbClcbiAgfVxuXG4gIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbn1cblxubW9kdWxlLmV4cG9ydHMuc3ByaW50ZiA9IGZ1bmN0aW9uIChzdHIsIGFyZ3MpIHtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgc3RyID0gc3RyLnJlcGxhY2UoLyVzLywgYXJnc1tpXSlcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbm1vZHVsZS5leHBvcnRzLnJlcG9ydEJlaGF2aW9yID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgLy8gZGF0YTogc2NvcmVfbnVtLCBzY29yZV9sZXZlbCwgZmFpbGVkX2RldGFpbCwgaWdub3JlZF9kZXRhaWwsIHVzZV90aW1lXG4gIHRoaXMubG9nKCdyZXBvcnRCZWhhdmlvcicsIGRhdGEpXG4gIHBsdWdpbk1lc3NhZ2VyLmludm9rZSgnUkVQT1JUJywgSlNPTi5zdHJpbmdpZnkoZGF0YSkpXG59XG5cbm1vZHVsZS5leHBvcnRzLmxvZyA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnKSB7XG4gICAgY29uc3QgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cylcbiAgICBhcmdzLnVuc2hpZnQoJ2NvbG9yOiAjZWE2ZjVhOycpXG4gICAgYXJncy51bnNoaWZ0KCclY1tBdWRpdF0nKVxuICAgIC8vIGFyZ3NbMF0gPSAnW0F1ZGl0XSAnICsgKGFyZ3NbMF0gfHwgJycpXG4gICAgY29uc29sZS5sb2coLi4uYXJncylcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cy5mb3JtYXRTaXplID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgY29uc3QgdW5pdHMgPSBbJ0InLCAnSycsICdNJywgJ0cnXVxuICBsZXQgdW5pdFxuICB3aGlsZSAoKHVuaXQgPSB1bml0cy5zaGlmdCgpKSAmJiBzaXplID4gMTAyNCkge1xuICAgIHNpemUgLz0gMTAyNFxuICB9XG4gIHJldHVybiAodW5pdCA9PT0gJ0InID8gc2l6ZSA6IHNpemUudG9GaXhlZCgyKSkgKyB1bml0XG59XG5cbm1vZHVsZS5leHBvcnRzLmhhc2ggPSBmdW5jdGlvbiAodGV4dCkge1xuICBsZXQgaGFzaCA9IDUzODFcbiAgbGV0IGluZGV4ID0gdGV4dC5sZW5ndGhcblxuICB3aGlsZSAoaW5kZXgpIHtcbiAgICBoYXNoID0gKGhhc2ggKiAzMykgXiB0ZXh0LmNoYXJDb2RlQXQoLS1pbmRleClcbiAgfVxuXG4gIHJldHVybiBoYXNoID4+PiAwXG59XG5cbi8vICDorqHnrpflrZfnrKbkuLLlrZfnrKbmlbBcbm1vZHVsZS5leHBvcnRzLmJ5dGVDb3VudCA9IGZ1bmN0aW9uIChzKSB7XG4gIHJldHVybiBlbmNvZGVVUkkocykuc3BsaXQoLyUuLnwuLykubGVuZ3RoIC0gMVxufVxuXG4vLyAg5pWw57uE5Y676YeNXG5tb2R1bGUuZXhwb3J0cy51bmlxdWUgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIC8vIHJldHVybiBBcnJheS5mcm9tKG5ldyBTZXQoYXJyYXkpKTtcbiAgY29uc3QgbmV3QXJyID0gW11cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAobmV3QXJyLmluZGV4T2YoYXJyW2ldKSA9PT0gLTEpIHtcbiAgICAgIG5ld0Fyci5wdXNoKGFycltpXSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG5ld0FyclxufVxuXG5tb2R1bGUuZXhwb3J0cy5nZXRUeXBlID0gZnVuY3Rpb24gKHZhbCkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbCkuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKClcbn1cblxubW9kdWxlLmV4cG9ydHMuY29tcGFyZVZlcnNpb24gPSBmdW5jdGlvbiAodjEsIHYyKSB7XG4gIHYxID0gdjEuc3BsaXQoJy4nKVxuICB2MiA9IHYyLnNwbGl0KCcuJylcbiAgY29uc3QgbGVuID0gTWF0aC5tYXgodjEubGVuZ3RoLCB2Mi5sZW5ndGgpXG5cbiAgd2hpbGUgKHYxLmxlbmd0aCA8IGxlbikge1xuICAgIHYxLnB1c2goJzAnKVxuICB9XG4gIHdoaWxlICh2Mi5sZW5ndGggPCBsZW4pIHtcbiAgICB2Mi5wdXNoKCcwJylcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjb25zdCBudW0xID0gcGFyc2VJbnQodjFbaV0pXG4gICAgY29uc3QgbnVtMiA9IHBhcnNlSW50KHYyW2ldKVxuXG4gICAgaWYgKG51bTEgPiBudW0yKSB7XG4gICAgICByZXR1cm4gMVxuICAgIH0gZWxzZSBpZiAobnVtMSA8IG51bTIpIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAwXG59XG5cbm1vZHVsZS5leHBvcnRzLmlzUmVxdWVzdE5vdEZvckF1ZGl0ID0gZnVuY3Rpb24gKHVybCkge1xuICBjb25zdCBpbnZhbGlkRG9tYWluUmVnID0gW1xuICAgIC9eZGF0YVxcOi8sXG4gICAgLy8g5LqR5Ye95pWw6ZW/6L2u6K+i6K+35rGCXG4gICAgL15odHRwczpcXC9cXC9zZXJ2aWNld2VjaGF0LmNvbVxcL3d4YS1xYmFzZVxcL3FiYXNlY2hlY2tyZXN1bHQvLFxuICAgIC9eaHR0cHM/OlxcL1xcL1teL10qXFwudGNiXFwucWNsb3VkXFwubGFcXC8vLFxuICAgIC8vIOW5v+WRiue7hOS7tueahOi1hOa6kFxuICAgIC9eaHR0cHM/OlxcL1xcL3d4c25zZHl0aHVtYlxcLnd4c1xcLnFxXFwuY29tXFwvLyxcbiAgICAvXmh0dHBzPzpcXC9cXC9tbWJpelxcLnFwaWNcXC5jblxcLy8sXG4gICAgL15odHRwcz86XFwvXFwvd3hcXC5xbG9nb1xcLmNuXFwvLyxcbiAgICAvLyDlnLDlm77nu4Tku7bnmoTotYTmupBcbiAgICAvXmh0dHBzPzpcXC9cXC9bXi9dKlxcLnFxXFwuY29tXFwvLyxcbiAgICAvXmh0dHBzPzpcXC9cXC9bXi9dKlxcLmd0aW1nXFwuY29tXFwvLyxcbiAgICAvXmh0dHBzPzpcXC9cXC9bXi9dKlxcLm15YXBwXFwuY29tXFwvLyxcbiAgICAvLyDlt6XlhbflhoXpg6jor7fmsYJcbiAgICAvXmh0dHA6XFwvXFwvMTI3LjAuMC4xOi8sXG4gICAgLy8g5omp5bGVXG4gICAgL15jaHJvbWUtZXh0ZW5zaW9uOlxcL1xcLy8sXG4gICAgLy8gcnVudGltZeeOr+Wig1xuICAgIC9eaHR0cHM/OlxcL1xcL3NlcnZpY2V3ZWNoYXRcXC5jb21cXC8vLFxuICAgIC9cXC9hdWRpdHNcXC9hc3NlcnRcXC8vLFxuICAgIC9cXC93eGFjcmF3bGVyXFwvLyxcblxuICAgIC8vIOahhuaetui1hOa6kFxuICAgIC8vIC9eaHR0cDpcXC9cXC8xMjcuMC4wLjE6W1xcZF0rXFwvZmF2aWNvbi5pY28vLFxuICBdXG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnZhbGlkRG9tYWluUmVnLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHVybC5tYXRjaChpbnZhbGlkRG9tYWluUmVnW2ldKSkge1xuICAgICAgcmV0dXJuIHRydWVcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuY29uc3QgZmlsdGVyTGliU3RhY2sgPSBmdW5jdGlvbiAoc3RhY2tzKSB7XG4gIHJldHVybiBzdGFja3MuZmlsdGVyKChzdGFjaykgPT4ge1xuICAgIHJldHVybiAhL14oX19kZXZfX3xfX2FzZGVidWdfX3xfX3BhZ2VmcmFtZV9ffGFwcHNlcnZpY2VcXD8pfGF1ZGl0c1xcL2Fzc2VydFxcL2luamVjdHxXQVNlcnZpY2UuanN8V0FXZWJ2aWV3LmpzfHd4YWNyYXdsZXJcXC9wdWJsaWMvLnRlc3Qoc3RhY2suZmlsZSlcbiAgfSlcbn1cblxubW9kdWxlLmV4cG9ydHMucGFyc2VTdGFja1N0cmluZ3MgPSBmdW5jdGlvbiAoc3RhY2tTdHIsIGZpbHRlckxpYiA9IHRydWUpIHtcbiAgbGV0IHN0YWNrcyA9IHN0YWNrU3RyLnNwbGl0KCdcXG4nKVxuICBsZXQgUkVHX0VYUCA9IC9hdFxccysoW1xcU10rKVxccytcXCgoXFxTKylcXCkvXG4gIGxldCByZXN1bHQgPSBzdGFja3MubWFwKChzdGFjaykgPT4ge1xuICAgIGxldCByZXN1bHQgPSBzdGFjay5tYXRjaChSRUdfRVhQKVxuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0WzFdICYmIHJlc3VsdFsyXSkge1xuICAgICAgbGV0IGZpbGVTdHJpbmcgPSByZXN1bHRbMl0ucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvaHR0cDpcXC9cXC8xMjdcXC4wXFwuMFxcLjE6XFxkK1xcLyg6Pyg6P2FwcHNlcnZpY2V8d3hhY3Jhd2xlclxcL1xcZCtcXC9wcm9ncmFtXFwvXFx3Kyk/XFwvKT8vLCAnJylcbiAgICAgIGxldCBbZmlsZSwgbGluZSwgY29sdW1uXSA9IGZpbGVTdHJpbmcuc3BsaXQoJzonKVxuICAgICAgaWYgKGZpbGVTdHJpbmcuc3BsaXQoJzonKS5sZW5ndGggPT0gMykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGZ1bmM6IHJlc3VsdFsxXS5yZXBsYWNlKC9eQXVkaXRfKHNldFRpbWVvdXR8c2V0SW50ZXJ2YWwpXz8uKiQvLCAnJDEnKSxcbiAgICAgICAgICBmaWxlLFxuICAgICAgICAgIGxpbmU6ICtsaW5lLFxuICAgICAgICAgIGNvbHVtbjogK2NvbHVtblxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0pLmZpbHRlcihzdGFjayA9PiAhIXN0YWNrKVxuXG4gIGlmIChmaWx0ZXJMaWIpIHtcbiAgICByZXN1bHQgPSBmaWx0ZXJMaWJTdGFjayhyZXN1bHQpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzLmdldENhbGxTdGFjayA9IGZ1bmN0aW9uIChmaWx0ZXJMaWIgPSB0cnVlKSB7XG4gIGxldCByZXN1bHQgPSBleHBvcnRzLnBhcnNlU3RhY2tTdHJpbmdzKG5ldyBFcnJvcigpLnN0YWNrKVxuXG4gIGlmIChmaWx0ZXJMaWIpIHtcbiAgICByZXN1bHQgPSBmaWx0ZXJMaWJTdGFjayhyZXN1bHQpXG4gIH1cblxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzLm9uR2VuZXJhdGVGdW5jUmVhZHkgPSBmdW5jdGlvbiAoZnVuYykge1xuICBpZiAod2luZG93Ll9fZ2VuZXJhdGVGdW5jX18pIHtcbiAgICBzZXRUaW1lb3V0KGZ1bmMpXG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZ2VuZXJhdGVGdW5jUmVhZHknLCBmdW5jKVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzLnN0YXR1cyA9ICdydW5uaW5nJ1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXdhaXQtdG8tanNcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiZXZlbnRzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImZzLWV4dHJhXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImppbXBcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwibG9nNGpzXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInBhdGhcIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwicHVwcGV0ZWVyXCIpOyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInB1cHBldGVlci9EZXZpY2VEZXNjcmlwdG9yc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJxc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJ1cmxcIik7Il0sInNvdXJjZVJvb3QiOiIifQ==