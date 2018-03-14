"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./index.d.ts" />
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const inspector = require("inspector");
const child_process_1 = require("child_process");
const WebSocket = require("ws");
const nodeSyncIpc = require("node-sync-ipc");
const URL = require("url");
const childIpc = nodeSyncIpc.child();
const noop = () => { };
let networkApiInjected = false;
let systemInfoCache = null;
let usingLocalStorage = false;
const SyncSDKNames = {
    getSystemInfo: () => {
        return typeof systemInfoCache !== 'string';
    },
    getSystemInfoSync: () => {
        return typeof systemInfoCache !== 'string';
    },
    getStorage: () => {
        return !usingLocalStorage;
    },
    getStorageSync: () => {
        return !usingLocalStorage;
    },
    setStorage: () => {
        return !usingLocalStorage;
    },
    setStorageSync: () => {
        return !usingLocalStorage;
    },
    removeStorage: false,
    removeStorageSync: () => {
        return !usingLocalStorage;
    },
    clearStorage: false,
    clearStorageSync: () => {
        return !usingLocalStorage;
    },
    getStorageInfo: false,
    getStorageInfoSync: () => {
        return !usingLocalStorage;
    },
    getBackgroundAudioState: true,
    setBackgroundAudioState: true,
    operateBackgroundAudio: true,
    createRequestTask: () => {
        return !networkApiInjected;
    },
    createUploadTask: true,
    createDownloadTask: () => {
        return !networkApiInjected;
    },
    createSocketTask: true,
    operateSocketTask: true,
    createAudioInstance: true,
    unlink: true,
};
let managedRequestTaskId = 0;
const managedRequestTaskCallIdTaskIdMap = {};
const managedRealRequestTaskIdFakeTaskIdMap = {};
let managedDownloadTaskId = 0;
const managedDownloadTaskCallIdTaskIdMap = {};
const managedRealDownloadTaskIdFakeTaskIdMap = {};
function isSdkSync(sdkName) {
    if (SyncSDKNames.hasOwnProperty(sdkName)) {
        const sdk = SyncSDKNames[sdkName];
        if (typeof sdk === 'function') {
            return Boolean(sdk());
        }
        return Boolean(sdk);
    }
    return (/Sync$/).test(sdkName);
}
const MAX_SYNC_TIME = 60 * 1000;
let errorsAndWarns = [];
let isDev = process.env.isDev === 'yes'; // declare variable first
const log = global.log = {};
let sendLogTimer;
if (isDev) {
    Object.defineProperty(log, 'i', {
        get() {
            return console.log.bind(console, '[REMOTE]');
        }
    });
    Object.defineProperty(log, 'w', {
        get() {
            return console.warn.bind(console, '[REMOTE]');
        }
    });
    Object.defineProperty(log, 'e', {
        get() {
            return console.error.bind(console, '[REMOTE]');
        }
    });
}
else {
    Object.defineProperty(log, 'i', {
        value: noop
    });
    Object.defineProperty(log, 'w', {
        value: function (...args) {
            errorsAndWarns.push([...args]);
            if (!sendLogTimer) {
                sendLogTimer = setTimeout(() => {
                    sendLogTimer = undefined;
                    const errorMessage = {
                        type: 'error',
                        data: {
                            error: errorsAndWarns.join('\n')
                        }
                    };
                    errorsAndWarns = [];
                    sendMessageToMaster(errorMessage);
                }, 0);
            }
        }
    });
    Object.defineProperty(log, 'e', {
        value: function (...args) {
            errorsAndWarns.push([...args]);
            if (!sendLogTimer) {
                sendLogTimer = setTimeout(() => {
                    sendLogTimer = undefined;
                    const errorMessage = {
                        type: 'error',
                        data: {
                            error: errorsAndWarns.join('\n'),
                        },
                    };
                    errorsAndWarns = [];
                    sendMessageToMaster(errorMessage);
                }, 0);
            }
        }
    });
}
;
(['dir', 'tempDir', 'vendorDir', 'isDev', 'files', 'httpPort', 'initialInspectPort', 'dataDir', 'usingLocalStorage', 'wsurl']).forEach(key => {
    if (typeof process.env[key] !== 'string') {
        log.e(key, 'is not defined in process.env');
        process.exit();
    }
});
if (typeof process.send !== 'function') {
    log.e('process.send is not available');
    process.exit();
}
const { dir, tempDir, vendorDir, dataDir, wsurl, } = process.env;
const files = JSON.parse(process.env.files || '[]');
isDev = process.env.isDev === 'yes';
const httpPort = parseInt(process.env.httpPort, 10);
const initialInspectPort = parseInt(process.env.initialInspectPort, 10);
usingLocalStorage = process.env.usingLocalStorage === 'yes';
let debugEnabled = true;
(function () {
    let port = initialInspectPort;
    const _findPort = () => {
        try {
            inspector.open(port);
        }
        catch (e) {
            port = port + 1;
            _findPort();
        }
    };
    _findPort();
})();
const timers = {};
let timerCount = 0;
const vmGlobal = {
    require: undefined,
    eval: undefined,
    process: undefined,
    setTimeout(...args) {
        const timer = global.setTimeout.call(global, ...args);
        timers[++timerCount] = timer;
        if (timerCount % 5 === 0) {
            for (const key in timers) {
                const item = timers[key];
                if (item && !item._repeat && item._called && item._destroyed) {
                    delete timers[key];
                }
            }
        }
        return timerCount;
    },
    clearTimeout(id) {
        const timer = timers[id];
        if (timer) {
            clearTimeout(timer);
            delete timers[id];
        }
    },
    setInterval(...args) {
        const timer = global.setInterval.call(global, ...args);
        timers[++timerCount] = timer;
        if (timerCount % 5 === 0) {
            for (const key in timers) {
                const item = timers[key];
                if (item && !item._repeat && item._called && item._destroyed) {
                    delete timers[key];
                }
            }
        }
        return timerCount;
    },
    clearInterval(id) {
        const timer = timers[id];
        if (timer) {
            clearInterval(timer);
            delete timers[id];
        }
    },
    console: (() => {
        let consoleClone = Object.create(Object.getPrototypeOf(console));
        const names = Object.getOwnPropertyNames(console);
        for (const key of names) {
            try {
                const desc = Object.getOwnPropertyDescriptor(console, key);
                if (desc) {
                    const newDesc = {
                        configurable: false,
                    };
                    if (desc.hasOwnProperty('writable')) {
                        newDesc.writable = false;
                    }
                    Object.defineProperty(consoleClone, key, Object.assign({}, desc, newDesc));
                }
                else {
                    consoleClone[key] = console[key];
                }
            }
            catch (e) {
                consoleClone = Object.assign(Object.create(Object.getPrototypeOf(console)), console);
                Object.freeze(consoleClone);
                break;
            }
        }
        return consoleClone;
    })()
};
const jsVm = vm.createContext(vmGlobal);
function sendMessageToMaster(message) {
    // process.send!(message)
    if (ws) {
        ws.send(JSON.stringify(message), e => e && console.error('[REMOTE] websocket send error', e));
    }
    else {
        console.warn('[REMOTE] websocket not ready');
    }
}
function sendDebugMessageToClient(debugObject, category, extra, raw = false) {
    const message = {
        type: 'sendMessageToClient',
        data: {
            category,
            debugObject
        }
    };
    if (extra) {
        message.data.extra = extra;
    }
    if (raw) {
        return message;
    }
    else {
        return sendMessageToMaster(message);
    }
}
function parseUrl(url) {
    const urlObject = URL.parse(url);
    return {
        pathName: (urlObject.pathname || '').replace(/\.html$/, ''),
    };
}
function updateAppData() {
    if (getWXAppDatasTimeout) {
        clearTimeout(getWXAppDatasTimeout);
    }
    getWXAppDatasTimeout = setTimeout(handleGetWxAppDatas, 200);
}
function handleRegisterInterface(data) {
    const interfaces = {};
    const methods = data.obj_methods;
    const objName = data.obj_name;
    for (const m of methods) {
        const methodName = m.method_name;
        const methodArgs = m.method_args;
        const fn = function (...fnArgs) {
            const sdkName = fnArgs[0];
            const sdkArgs = fnArgs[1];
            const _sdkCallId = parseInt(fnArgs[2], 10);
            const sdkCallId = isNaN(_sdkCallId) ? 0 : _sdkCallId;
            const callInterface = (callId, extra = {}, raw = false) => {
                const callInterfaceMessage = {
                    name: objName,
                    method: methodName,
                    args: fnArgs,
                    call_id: callId,
                };
                // send to remote client
                sdkResolves[callId] = {
                    sdkName,
                    timeStamp: Date.now(),
                    dataSize: (sdkArgs || '').length + sdkName.length,
                };
                return sendDebugMessageToClient(callInterfaceMessage, 'callInterface', extra, raw);
            };
            if (!debugEnabled && methodName === 'invokeHandler') {
                return JSON.stringify({
                    errMsg: sdkName + ':fail debug invoke no active session'
                });
            }
            if (methodName === 'invokeHandler' && isSdkSync(sdkName)) {
                // sync function
                const debugMessage = callInterface(sdkCallId, {
                    is_sync: true,
                    timestamp: Date.now(),
                    sdkName: sdkName,
                }, true);
                try {
                    const res = childIpc.sendSync('sdksyncapi', debugMessage);
                    reportSDKAPI(sdkCallId, (res && res.result && res.result.length) || 0);
                    if (!res || res.error) {
                        throw res && res.error;
                    }
                    if ((sdkName === 'getSystemInfo' || sdkName === 'getSystemInfoSync') && res.result) {
                        const ret = JSON.parse(res.result);
                        if ((/^getSystemInfo(Sync)?\:ok/i).test(ret.errMsg)) {
                            // cache the result
                            systemInfoCache = res.result;
                            log.i('systemInfoCache cached.');
                        }
                    }
                    return res.result;
                }
                catch (e) {
                    return JSON.stringify({
                        errMsg: `${sdkName}:fail ${e}`,
                    });
                }
            }
            else if (methodName === 'invokeHandler' && sdkName === 'createRequestTask') {
                // request task
                callInterface(sdkCallId);
                const requestTaskId = ++managedRequestTaskId;
                managedRequestTaskCallIdTaskIdMap[sdkCallId] = requestTaskId;
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    requestTaskId: String(requestTaskId)
                });
            }
            else if (methodName === 'invokeHandler' && sdkName === 'createDownloadTask') {
                // download task
                callInterface(sdkCallId);
                const downloadTaskId = ++managedDownloadTaskId;
                managedDownloadTaskCallIdTaskIdMap[sdkCallId] = downloadTaskId;
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    downloadTaskId: String(downloadTaskId)
                });
            }
            else if (methodName === 'invokeHandler' && sdkName === 'getSystemInfo' || sdkName === 'getSystemInfoSync') {
                return systemInfoCache;
            }
            else if (usingLocalStorage && methodName === 'invokeHandler' && (sdkName === 'getStorage' || sdkName === 'getStorageSync' || sdkName === 'setStorage' || sdkName === 'setStorageSync' || sdkName === 'removeStorage' || sdkName === 'removeStorageSync' || sdkName === 'clearStorage' || sdkName === 'clearStorageSync' || sdkName === 'getStorageInfo' || sdkName === 'getStorageInfoSync')) {
                const debugMessage = callInterface(sdkCallId, {
                    is_sync: true,
                    timestamp: Date.now(),
                    sdkName: sdkName,
                }, true);
                try {
                    const res = childIpc.sendSync('sdkstorageapi', debugMessage);
                    reportSDKAPI(sdkCallId, (res && res.result && res.result.length) || 0);
                    if (!res || res.error) {
                        throw res && res.error;
                    }
                    return res.result;
                }
                catch (e) {
                    return JSON.stringify({
                        errMsg: `${sdkName}:fail ${e}`,
                    });
                }
            }
            else if (methodName === 'invokeHandler' && (sdkName === 'navigateTo' || sdkName === 'redirectTo' || sdkName === 'switchTab' || sdkName === 'reLaunch')) {
                // page navigations
                try {
                    const uri = JSON.parse(sdkArgs).url;
                    const parsed = parseUrl(uri);
                    const subRoot = getSubpackageRootForPath(parsed.pathName);
                    if (subRoot) {
                        loadSubpackage(subRoot);
                    }
                }
                catch (e) {
                    log.e('[REMOTE] load subpackage failed', e);
                }
                callInterface(sdkCallId, {
                    len: (sdkArgs || '').length + sdkName.length,
                });
                return undefined;
            }
            else if (methodName === 'publishHandler') {
                try {
                    if (sdkName.endsWith('invokeWebviewMethod')) {
                        const params = JSON.parse(sdkArgs);
                        const name = params.data.name;
                        if (name === 'appDataChange') {
                            updateAppData();
                        }
                    }
                    else if (sdkName.endsWith('vdSync') ||
                        sdkName.endsWith('vdSyncBatch') || sdkName.endsWith('appDataChange') || sdkName.endsWith('pageInitData') || sdkName.endsWith('__updateAppData')) {
                        updateAppData();
                    }
                }
                catch (e) {
                    // do nothing
                }
                callInterface(sdkCallId, {
                    len: (sdkArgs || '').length,
                });
                return undefined;
            }
            else {
                // async function
                callInterface(sdkCallId, {
                    len: (sdkArgs || '').length + sdkName.length,
                });
                return undefined;
            }
        };
        interfaces[methodName] = fn;
    }
    vmGlobal[objName] = interfaces;
}
let vmCounter = 0;
function handleEvaluateJavascript(data) {
    const script = ';' + data.script + '\n;';
    const evaluateId = parseInt(String(data.evaluate_id), 10);
    let ret = undefined;
    try {
        // only keep 50 vms in source panel
        vmCounter = vmCounter >= 50 ? 0 : (vmCounter + 1);
        ret = vm.runInContext(script, jsVm, {
            filename: '[VM ' + vmCounter + ']',
        });
    }
    catch (err) {
        ret = undefined;
        log.e('eval script', `evaluate_id #${evaluateId}`, 'failed', err);
    }
    if (typeof ret === 'object' || typeof ret === 'undefined') {
        // not primitive values
        ret = '';
    }
    else {
        // primitive values
        try {
            ret = JSON.stringify(ret);
        }
        catch (err) {
            ret = '';
            log.e('stringify ret failed', err);
        }
    }
    if (!isNaN(evaluateId)) {
        // evaluate id is correct.
        // send back to client.
        const evaluateJavascriptResult = {
            evaluate_id: evaluateId,
            ret
        };
        sendDebugMessageToClient(evaluateJavascriptResult, 'evaluateJavascriptResult', {
            len: (ret || '').length,
        });
    }
}
let sdkResolves = {};
let sdkReports = [];
let invokeCounter = 0;
function reportSDKAPI(callId, retDataSize) {
    if (sdkResolves[callId]) {
        const sdk = sdkResolves[callId];
        const delta = Date.now() - sdk.timeStamp;
        const sdkApiReport = {
            cost_time: delta,
            sdk_name: sdk.sdkName,
            data_size: sdk.dataSize,
            call_id: callId,
            ret_data_size: retDataSize,
        };
        sdkReports.push(sdkApiReport);
        invokeCounter = invokeCounter + 1;
        if (invokeCounter % 10 === 0) {
            invokeCounter = 0;
            sendSDKAPIReport();
        }
    }
}
let sdkApiReportTimer = undefined;
function sendSDKAPIReport() {
    if (!sdkApiReportTimer) {
        sdkApiReportTimer = setTimeout(() => {
            sdkApiReportTimer = undefined;
            const message = {
                type: 'sdkapireport',
                data: sdkReports.slice(0, 100),
            };
            sendMessageToMaster(message);
            sdkReports = [];
            sdkResolves = {};
        }, 30000);
    }
}
function handleCallInterfaceResult(data) {
    let ret = {};
    const retDataSize = (data && data.ret && data.ret.length) || 0;
    try {
        ret = JSON.parse(data.ret);
    }
    catch (e) {
        log.e('error parsing call interface result', data);
        ret = {};
    }
    const _callId = parseInt(String(data.call_id), 10);
    const callId = isNaN(_callId) ? 0 : _callId;
    reportSDKAPI(callId, retDataSize);
    if (vmGlobal.WeixinJSBridge && typeof vmGlobal.WeixinJSBridge.invokeCallbackHandler === 'function') {
        if (networkApiInjected && managedRequestTaskCallIdTaskIdMap[callId] && ret.requestTaskId) {
            managedRealRequestTaskIdFakeTaskIdMap[ret.requestTaskId] = managedRequestTaskCallIdTaskIdMap[callId];
        }
        else if (networkApiInjected && managedDownloadTaskCallIdTaskIdMap[callId] && ret.downloadTaskId) {
            managedRealDownloadTaskIdFakeTaskIdMap[ret.downloadTaskId] = managedDownloadTaskCallIdTaskIdMap[callId];
        }
        const handler = vmGlobal.WeixinJSBridge.invokeCallbackHandler;
        handler.call(vmGlobal.WeixinJSBridge, callId, ret);
    }
    else {
        log.e('vmGlobal.WeixinJSBridge.invokeCallbackHandler is not valid');
    }
}
function handleDebugEnable(data) {
    debugEnabled = Boolean(data.enabled);
}
function handleInitPubLib(pubMd5) {
    // use ios md5 for now
    const fileName = 'WAService.js';
    let ret;
    try {
        let publibFilePath = path.join(tempDir, fileName);
        if (!fs.existsSync(publibFilePath)) {
            log.e('publibFilePath not found');
            publibFilePath = path.join(__dirname, fileName);
        }
        const script = fs.readFileSync(publibFilePath, 'utf-8').toString();
        ret = vm.runInContext(script, jsVm, {
            filename: '[publib]',
        });
        // restore the original console
        vmGlobal.console = console;
    }
    catch (err) {
        // something went wrong in pub lib code
        // notify master
        log.e('error run publib', err);
    }
    return ret;
}
function trailing(str, piece) {
    return str.endsWith(piece) ? str : (str + piece);
}
function leading(str, piece) {
    return str.startsWith(piece) ? str : (piece + str);
}
let appJson = null;
function handleInitUserCode(userMd5) {
    // run user codes
    let ret;
    try {
        for (const file of files) {
            if (!file) {
                continue;
            }
            const filePath = path.join(dir, file);
            if (file === 'app.json') {
                const raw = fs.readFileSync(filePath, 'utf-8').toString();
                appJson = JSON.parse(raw);
            }
            else if (path.extname(filePath).toLowerCase() === '.js') {
                // javascript files
                if (appJson && appJson.subPackages && Array.isArray(appJson.subPackages)) {
                    let inSubPackages = false;
                    for (const sub of appJson.subPackages) {
                        if (!sub || typeof sub.root !== 'string') {
                            continue;
                        }
                        const root = trailing(sub.root, '/');
                        if (file.indexOf(root) === 0) {
                            inSubPackages = true;
                            break;
                        }
                    }
                    if (inSubPackages) {
                        // do not load subpackage files for now
                        continue;
                    }
                }
                ret = loadCode(filePath);
            }
            else {
                console.warn('[REMOTE] load invalid file', file);
            }
        }
    }
    catch (err) {
        // something went wrong in user code
    }
    return ret;
}
function loadCode(filePath, sourceURL) {
    let ret;
    try {
        const script = fs.readFileSync(filePath, 'utf-8').toString();
        ret = vm.runInContext(script, jsVm, {
            filename: sourceURL,
        });
    }
    catch (e) {
        // something went wrong in user code
    }
    return ret;
}
function getSubpackageRootForPath(pathName) {
    if (!appJson || !appJson.subPackages) {
        return null;
    }
    for (const sub of appJson.subPackages) {
        if (pathName.indexOf(trailing(sub.root, '/')) === 0) {
            return sub.root;
        }
    }
    return null;
}
const subpackageLoaded = {};
function loadSubpackage(subRoot) {
    if (subpackageLoaded[subRoot] || !appJson || !appJson.subPackages) {
        return;
    }
    let config = null;
    const _subRoot = trailing(subRoot, '/');
    for (const sub of appJson.subPackages) {
        if (trailing(sub.root, '/') === _subRoot) {
            config = sub;
            break;
        }
    }
    if (!config) {
        return;
    }
    subpackageLoaded[subRoot] = true;
    // load subpackages
    for (const file of files) {
        if (!file) {
            continue;
        }
        if (path.extname(file).toLowerCase() === '.js') {
            if (file.indexOf(_subRoot) === 0) {
                const filePath = path.join(dir, file);
                loadCode(filePath);
            }
        }
    }
}
let getCurrentPages = vmGlobal.getCurrentPages || null;
const savedWebviewIds = new Set();
function handleSetupContext(data) {
    const rio = data.register_interface;
    handleRegisterInterface(rio);
    const cfgJs = data.configure_js || '';
    handleEvaluateJavascript({
        script: cfgJs
    });
    // load wxml xcjs
    loadCode(path.join(tempDir, 'wxmlxcjs.js'));
    // load wx app code
    loadCode(path.join(tempDir, 'wxappcode.js'));
    const pubMd5 = data.public_js_md5;
    handleInitPubLib(pubMd5);
    // inject network apis
    if (vmGlobal.WeixinJSBridge && typeof vmGlobal.WeixinJSBridge.subscribeHandler === 'function') {
        const realSubscribeHandler = vmGlobal.WeixinJSBridge.subscribeHandler;
        getCurrentPages = vmGlobal.getCurrentPages || null;
        Object.defineProperty(vmGlobal.WeixinJSBridge, 'subscribeHandler', {
            value: function (...args) {
                if (args[0] === 'onRequestTaskStateChange' && args[1] && args[1].requestTaskId) {
                    const realId = args[1].requestTaskId;
                    if (managedRealRequestTaskIdFakeTaskIdMap[realId]) {
                        args[1].requestTaskId = managedRealRequestTaskIdFakeTaskIdMap[realId];
                    }
                }
                else if (args[0] === 'onDownloadTaskStateChange' && args[1] && args[1].downloadTaskId) {
                    const realId = args[1].downloadTaskId;
                    if (managedRealDownloadTaskIdFakeTaskIdMap[realId]) {
                        args[1].downloadTaskId = managedRealDownloadTaskIdFakeTaskIdMap[realId];
                    }
                }
                else if (args[0] === 'onAppRouteDone') {
                    const fn = typeof (getCurrentPages || vmGlobal.getCurrentPages) === 'function' ? (getCurrentPages || vmGlobal.getCurrentPages) : noop;
                    const pages = fn.call(vmGlobal);
                    if (Array.isArray(pages) && pages.length > 0 && pages.every(p => {
                        return typeof (p || {}).__wxWebviewId__ === 'number';
                    })) {
                        // const webviewIds = pages.map(p => {
                        //   return p.__wxWebviewId__
                        // })
                        pages.forEach(p => {
                            savedWebviewIds.add(p.__wxWebviewId__);
                        });
                        const message = {
                            type: 'wxpagesinfo',
                            data: {
                                currentWebviewId: pages[pages.length - 1].__wxWebviewId__,
                                webviewIds: Array.from(savedWebviewIds),
                            }
                        };
                        sendMessageToMaster(message);
                    }
                }
                else if (args[0] === 'onAppRoute') {
                    const opts = args[1];
                    if (opts) {
                        if (opts.openType === 'navigateBack') {
                            const webviewId = args[2];
                            savedWebviewIds.clear();
                            savedWebviewIds.add(webviewId);
                            updateAppData();
                        }
                        else if (opts.openType === 'reLaunch'
                            || opts.openType === 'autoReLaunch'
                            || opts.openType === 'redirectTo'
                            || opts.openType === 'appLaunch') {
                            savedWebviewIds.clear();
                            updateAppData();
                        }
                        else if (opts.openType === 'switchTab') {
                            updateAppData();
                        }
                    }
                }
                return realSubscribeHandler.call(vmGlobal.WeixinJSBridge, ...args);
            }
        });
        log.i('subscribeHandler injected');
        networkApiInjected = true;
    }
    else {
        log.w('subscribeHandler injected failed');
    }
    const userMd5 = data.three_js_md5;
    handleInitUserCode(userMd5);
}
let getWXAppDatasTimeout = undefined;
function handleProcessMessage(msg) {
    if (!msg) {
        log.e('invalid master message', msg);
        return;
    }
    if (msg.type === 'handleSetupContext') {
        handleSetupContext(msg.data);
    }
    else if (msg.type === 'handleEvaluateJavascript') {
        handleEvaluateJavascript(msg.data);
    }
    else if (msg.type === 'handleCallInterfaceResult') {
        handleCallInterfaceResult(msg.data);
    }
    else if (msg.type === 'debugEnable') {
        handleDebugEnable(msg.data);
    }
    else if (msg.type === 'getWXAppDatas') {
        updateAppData();
    }
    else if (msg.type === 'setWXAppDatas') {
        handleSetWxAppDatas(msg.data);
    }
    else {
        log.e('unrecognized message from master', msg);
    }
}
// process.on('message', handleProcessMessage)
function handleGetWxAppDatas() {
    if (getWXAppDatasTimeout) {
        clearTimeout(getWXAppDatasTimeout);
    }
    getWXAppDatasTimeout = undefined;
    const fn = typeof (getCurrentPages || vmGlobal.getCurrentPages) === 'function' ? (getCurrentPages || vmGlobal.getCurrentPages) : null;
    if (!fn) {
        // not ready
        return;
    }
    const pages = fn.call(vmGlobal);
    const appDatas = {};
    for (const p of pages) {
        appDatas[p.__route__ || p.route] = Object.assign({}, (p.data || {}), { __webviewId__: p.__wxWebviewId__ });
    }
    const message = {
        type: 'wxappdatas',
        data: appDatas,
    };
    sendMessageToMaster(message);
}
function handleSetWxAppDatas(data) {
    const fn = typeof (getCurrentPages || vmGlobal.getCurrentPages) === 'function' ? (getCurrentPages || vmGlobal.getCurrentPages) : null;
    if (!fn) {
        // not ready
        return;
    }
    const pageMaps = {};
    const pages = fn.call(vmGlobal);
    pages.forEach(page => {
        pageMaps[page.__route__ || page.route] = page;
    });
    for (const item in data) {
        const dataItem = data[item];
        const __webviewId__ = dataItem.__webviewId__;
        if (pageMaps[item] && typeof pageMaps[item].setData == 'function') {
            pageMaps[item].setData(dataItem);
        }
        else if (vmGlobal.wx && typeof vmGlobal.wx.invokeWebviewMethod === 'function') {
            vmGlobal.wx.invokeWebviewMethod.call(vmGlobal.wx, {
                name: 'appDataChange',
                args: {
                    data: dataItem,
                },
            });
        }
    }
}
process.on('uncaughtException', error => {
    log.e('uncaughtException', error);
    console.error('uncaughtException', error);
    const message = {
        type: 'error',
        data: {
            error
        }
    };
    sendMessageToMaster(message);
});
process.on('disconnect', (...args) => {
    console.error('[process] disconnect', ...args);
});
process.on('unhandledRejection', (...args) => {
    console.warn('[process] unhandledRejection', ...args);
});
process.on('beforeExit', (...args) => {
    console.warn('[process] beforeExit', ...args);
});
process.on('exit', (...args) => {
    console.warn('[process] exit', ...args);
});
function notifyMaster() {
    sendMessageToMaster({
        type: 'vmReady',
        data: {
            inspectUrl: inspector.url()
        }
    });
}
let ws;
function initWs() {
    if (ws) {
        ws.removeAllListeners();
        try {
            ws.close();
        }
        catch (e) {
            // nothing
        }
    }
    ws = new WebSocket(wsurl, 'cp');
    ws.on('open', notifyMaster);
    ws.on('message', (message) => {
        if (typeof message === 'string') {
            try {
                const json = JSON.parse(message);
                handleProcessMessage(json);
            }
            catch (e) {
                log.e('error parsing cp ws message', message);
            }
        }
        else if (message && message.data) {
            try {
                const json = JSON.parse(message.data);
                handleProcessMessage(json);
            }
            catch (e) {
                log.e('error parsing cp ws message', message.data);
            }
        }
        else {
            log.w('invalid cp ws message', message);
        }
    });
    ws.on('close', (code, reason) => {
        if (String(code) === '500') {
            setTimeout(initWs, 100);
        }
        else {
            console.error('[REMOTE] websocket close', code, reason);
            process.exit();
        }
    });
    ws.on('error', (err) => {
        console.error('[REMOTE] websocket error', err);
        setTimeout(initWs, 100);
    });
    global.ws = ws;
}
setTimeout(initWs, 0);
const isMac = process.platform === 'darwin';
let descriptors = {};
if (isDev) {
    descriptors = {
        _dir: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${dir}"`);
                return;
            },
            enumerable: false
        },
        _tmp: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${tempDir}"`);
                return;
            },
            enumerable: false
        },
        _log: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${dir}/../../log/"`);
                return;
            },
            enumerable: false
        }
    };
    global.jsVM = jsVm;
}
else {
    descriptors = {
        __dir: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${path.join(dir, '../../')}"`);
                return;
            },
            enumerable: false,
            configurable: true,
        }
    };
}
Object.defineProperties(global, descriptors);
Object.defineProperties(vmGlobal, descriptors);
// hide this code in source panel
//# sourceURL=[publib]
