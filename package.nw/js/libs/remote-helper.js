"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./index.d.ts" />
const vm = require("vm");
const fs = require("fs");
const path = require("path");
// @ts-ignore
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
    measureText: true,
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
    createUploadTask: () => {
        return !networkApiInjected;
    },
    createDownloadTask: () => {
        return !networkApiInjected;
    },
    createSocketTask: () => {
        return !networkApiInjected;
    },
    operateSocketTask: true,
    operateDownloadTask: true,
    operateUploadTask: true,
    operateRequestTask: true,
    createAudioInstance: true,
    unlink: true,
};
let managedRequestTaskId = 0;
let managedDownloadTaskId = 0;
let managedUploadTaskId = 0;
let managedSocketTaskId = 0;
const networkTaskIdRealFakeMap = {
    request: {},
    download: {},
    upload: {},
    socket: {},
};
const networkDatas = {
    request: {},
    download: {},
    upload: {},
    socket: {},
};
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
        },
    });
    Object.defineProperty(log, 'w', {
        get() {
            return console.warn.bind(console, '[REMOTE]');
        },
    });
    Object.defineProperty(log, 'e', {
        get() {
            return console.error.bind(console, '[REMOTE]');
        },
    });
}
else {
    Object.defineProperty(log, 'i', {
        value: noop,
    });
    Object.defineProperty(log, 'w', {
        value: function (...args) {
            console.warn(...args);
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
        },
    });
    Object.defineProperty(log, 'e', {
        value: function (...args) {
            console.error(...args);
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
        },
    });
}
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
    })(),
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
            debugObject,
        },
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
            let sdkArgs = fnArgs[1];
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
                    errMsg: sdkName + ':fail debug invoke no active session',
                });
            }
            // transforms
            if (sdkName === 'operateSocketTask') {
                const parsedArgs = JSON.parse(sdkArgs);
                const fakeId = parsedArgs.socketTaskId;
                const realId = getNetworkRealIdByFakeId(fakeId, 'socket');
                if (realId !== null) {
                    log.i('operateSocketTask tranform id from', fakeId, 'to', realId);
                    parsedArgs.socketTaskId = realId;
                    sdkArgs = JSON.stringify(parsedArgs);
                    fnArgs[1] = sdkArgs;
                }
            }
            else if (sdkName === 'operateDownloadTask') {
                const parsedArgs = JSON.parse(sdkArgs);
                const fakeId = parsedArgs.downloadTaskId;
                const realId = getNetworkRealIdByFakeId(fakeId, 'download');
                if (realId !== null) {
                    log.i('operateDownloadTask tranform id from', fakeId, 'to', realId);
                    parsedArgs.downloadTaskId = realId;
                    sdkArgs = JSON.stringify(parsedArgs);
                    fnArgs[1] = sdkArgs;
                }
            }
            else if (sdkName === 'operateUploadTask') {
                const parsedArgs = JSON.parse(sdkArgs);
                const fakeId = parsedArgs.uploadTaskId;
                const realId = getNetworkRealIdByFakeId(fakeId, 'upload');
                if (realId !== null) {
                    log.i('operateUploadTask tranform id from', fakeId, 'to', realId);
                    parsedArgs.uploadTaskId = realId;
                    sdkArgs = JSON.stringify(parsedArgs);
                    fnArgs[1] = sdkArgs;
                }
            }
            else if (sdkName === 'operateRequestTask') {
                const parsedArgs = JSON.parse(sdkArgs);
                const fakeId = parsedArgs.requestTaskId;
                const realId = getNetworkRealIdByFakeId(fakeId, 'request');
                if (realId !== null) {
                    log.i('operateRequestTask tranform id from', fakeId, 'to', realId);
                    parsedArgs.requestTaskId = realId;
                    sdkArgs = JSON.stringify(parsedArgs);
                    fnArgs[1] = sdkArgs;
                }
            }
            // end transforms
            if (methodName === 'invokeHandler' && isSdkSync(sdkName)) {
                // sync function
                const debugMessage = callInterface(sdkCallId, {
                    is_sync: true,
                    timestamp: Date.now(),
                    sdkName: sdkName,
                    len: (sdkArgs || '').length + sdkName.length,
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
                const parsedArgs = JSON.parse(sdkArgs) || {};
                const requestTaskId = ++managedRequestTaskId;
                networkDatas.request[sdkCallId] = {
                    id: String(requestTaskId),
                    api: 'request',
                    info: {
                        url: parsedArgs.url,
                        method: parsedArgs.method || 'GET',
                        data: parsedArgs.data || parsedArgs.formData || undefined,
                    },
                    state: 'requestSent',
                    data: null,
                };
                callInterface(sdkCallId);
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    requestTaskId: String(requestTaskId),
                });
            }
            else if (methodName === 'invokeHandler' && sdkName === 'createDownloadTask') {
                // download task
                const downloadTaskId = ++managedDownloadTaskId;
                const parsedArgs = JSON.parse(sdkArgs) || {};
                networkDatas.download[sdkCallId] = {
                    id: String(downloadTaskId),
                    api: 'download',
                    info: {
                        url: parsedArgs.url,
                        method: parsedArgs.method || 'GET',
                        data: parsedArgs.data || parsedArgs.formData || undefined,
                    },
                    state: 'requestSent',
                    data: null,
                };
                callInterface(sdkCallId);
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    downloadTaskId: String(downloadTaskId),
                });
            }
            else if (methodName === 'invokeHandler' && sdkName === 'createUploadTask') {
                // download task
                const uploadTaskId = ++managedUploadTaskId;
                const parsedArgs = JSON.parse(sdkArgs) || {};
                networkDatas.upload[sdkCallId] = {
                    id: String(uploadTaskId),
                    api: 'upload',
                    info: {
                        url: parsedArgs.url,
                        method: parsedArgs.method || 'POST',
                        data: parsedArgs.data || parsedArgs.formData || undefined,
                    },
                    state: 'requestSent',
                    data: null,
                };
                callInterface(sdkCallId);
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    uploadTaskId: String(uploadTaskId),
                });
            }
            else if (methodName === 'invokeHandler' && sdkName === 'createSocketTask') {
                // download task
                const socketTaskId = ++managedSocketTaskId;
                const parsedArgs = JSON.parse(sdkArgs) || {};
                networkDatas.socket[sdkCallId] = {
                    id: String(socketTaskId),
                    api: 'socket',
                    info: {
                        url: parsedArgs.url,
                        data: parsedArgs.data || parsedArgs.formData || undefined,
                    },
                    state: 'requestSent',
                    data: null,
                };
                callInterface(sdkCallId);
                return JSON.stringify({
                    errMsg: `${sdkName}:ok`,
                    socketTaskId: String(socketTaskId),
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
                    len: (sdkArgs || '').length + sdkName.length,
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
                    // const uri = JSON.parse(sdkArgs).url
                    // const parsed = parseUrl(uri)
                    // const subRoot = getSubpackageRootForPath(parsed.pathName)
                    // if (subRoot) {
                    //   loadSubpackage(subRoot)
                    // }
                    // clear system info cache
                    systemInfoCache = null;
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
                        sdkName.endsWith('vdSyncBatch') ||
                        sdkName.endsWith('appDataChange') ||
                        sdkName.endsWith('pageInitData') ||
                        sdkName.endsWith('__updateAppData')) {
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
    let ret;
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
            ret,
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
let sdkApiReportTimer;
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
        if (networkApiInjected && networkDatas.request[callId] && ret.requestTaskId) {
            networkTaskIdRealFakeMap.request[ret.requestTaskId] = networkDatas.request[callId].id;
            if (exchangeGetNetworkRequestInfos[ret.requestTaskId]) {
                const exchange = exchangeGetNetworkRequestInfos[ret.requestTaskId] || [];
                handleMasterExchange(exchange[0], exchange[1], exchange[2]);
                log.i('reinvoke exchange', exchange);
                delete exchangeGetNetworkRequestInfos[ret.requestTaskId];
            }
        }
        else if (networkApiInjected && networkDatas.download[callId] && ret.downloadTaskId) {
            networkTaskIdRealFakeMap.download[ret.downloadTaskId] = networkDatas.download[callId].id;
            if (exchangeGetNetworkRequestInfos[ret.downloadTaskId]) {
                const exchange = exchangeGetNetworkRequestInfos[ret.downloadTaskId] || [];
                handleMasterExchange(exchange[0], exchange[1], exchange[2]);
                delete exchangeGetNetworkRequestInfos[ret.downloadTaskId];
            }
        }
        else if (networkApiInjected && networkDatas.upload[callId] && ret.uploadTaskId) {
            networkTaskIdRealFakeMap.upload[ret.uploadTaskId] = networkDatas.upload[callId].id;
            if (exchangeGetNetworkRequestInfos[ret.uploadTaskId]) {
                const exchange = exchangeGetNetworkRequestInfos[ret.uploadTaskId] || [];
                handleMasterExchange(exchange[0], exchange[1], exchange[2]);
                delete exchangeGetNetworkRequestInfos[ret.uploadTaskId];
            }
        }
        else if (networkApiInjected && networkDatas.socket[callId] && ret.socketTaskId) {
            networkTaskIdRealFakeMap.socket[ret.socketTaskId] = networkDatas.socket[callId].id;
            if (exchangeGetNetworkRequestInfos[ret.socketTaskId]) {
                const exchange = exchangeGetNetworkRequestInfos[ret.socketTaskId] || [];
                handleMasterExchange(exchange[0], exchange[1], exchange[2]);
                delete exchangeGetNetworkRequestInfos[ret.socketTaskId];
            }
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
            const currentVersion = JSON.parse(fs.readFileSync(path.join(__dirname, '../vendor/config.json'), 'utf-8').toString()).currentLibVersion;
            publibFilePath = path.join(__dirname, '../vendor', currentVersion, fileName);
        }
        const script = fs.readFileSync(publibFilePath, 'utf-8').toString();
        ret = vm.runInContext(script, jsVm, {
            filename: '[publib]',
        });
        // restore the original console
        vmGlobal.console = console;
        // finishing up
        loadCode('', '[__WXWorkerHelper__]', `
      ;(function () {
        const logNotSupport = function() {
          console.group(new Date(), 'Worker 调试')
          console.error('远程调试暂不支持 Worker 调试，请使用模拟器或真机预览进行调试。')
          console.groupEnd()
        }
        const notSupport = {
          postMessage() {
            logNotSupport()
          },
          onMessage() {
            logNotSupport()
          },
        }
        try {
          Object.defineProperty((typeof wx === 'object' ? wx : {}), 'createWorker', {
            get() {
              return function() {
                logNotSupport()
                return notSupport
              }
            },
          })
        } catch (e) {
          // ignore
        }
      })();
    `);
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
                // load subpackages for now
                // if (appJson && appJson.subPackages && Array.isArray(appJson.subPackages)) {
                //   let inSubPackages = false
                //   for (const sub of appJson.subPackages) {
                //     if (!sub || typeof sub.root !== 'string') {
                //       continue
                //     }
                //     const root = trailing(sub.root, '/')
                //     if (file.indexOf(root) === 0) {
                //       inSubPackages = true
                //       break
                //     }
                //   }
                //   if (inSubPackages) {
                //     // do not load subpackage files for now
                //     continue
                //   }
                // }
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
function loadCode(filePath, sourceURL, content) {
    let ret;
    try {
        const script = typeof content === 'string' ? content : fs.readFileSync(filePath, 'utf-8').toString();
        ret = vm.runInContext(script, jsVm, {
            filename: sourceURL,
        });
    }
    catch (e) {
        // something went wrong in user code
        console.error(e);
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
function sendNetworkDebug(data, timestamp) {
    const message = {
        type: 'networkdebug',
        data,
        timestamp,
    };
    log.i('sending network debug', message, timestamp);
    sendMessageToMaster(message);
}
function plainCopy(o) {
    return JSON.parse(JSON.stringify(o));
}
function onRequestTaskStateChange(args) {
    const data = args[1] || {};
    const nativeTime = (args[3] || {}).nativeTime || Date.now();
    const obj = getNetworkDebugByRealId(data.requestTaskId, 'request');
    if (!obj) {
        log.w('onRequestTaskStateChange', data.requestTaskId, 'not found');
        return;
    }
    if (data.state === 'headersReceived') {
        obj.responseHeaders = plainCopy(data.header);
        obj.state = 'headersReceived';
        const message = {
            id: data.requestTaskId,
            api: 'request',
            responseHeaders: data.header,
            state: 'headersReceived',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'success') {
        obj.state = 'success';
        obj.data = data.data;
        obj.statusCode = data.statusCode;
        obj.statusText = data.statusText;
        const message = {
            id: data.requestTaskId,
            state: 'success',
            api: 'request',
            statusCode: data.statusCode,
            statusText: data.statusText,
            dataLength: (data.data || '').length,
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'fail') {
        obj.state = 'fail';
        obj.statusCode = obj.statusCode || data.statusCode;
        const message = {
            id: data.requestTaskId,
            api: 'request',
            state: 'fail',
        };
        sendNetworkDebug(message, nativeTime);
    }
}
function onDownloadTaskStateChange(args) {
    const data = args[1] || {};
    const nativeTime = (args[3] || {}).nativeTime || Date.now();
    const obj = getNetworkDebugByRealId(data.downloadTaskId, 'download');
    if (!obj) {
        log.w('onDownloadTaskStateChange', data.downloadTaskId, 'not found');
        return;
    }
    if (data.state === 'headersReceived') {
        obj.responseHeaders = plainCopy(data.header);
        obj.state = 'headersReceived';
        const message = {
            id: data.downloadTaskId,
            api: 'download',
            responseHeaders: data.header,
            state: 'headersReceived',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'progressUpdate') {
        obj.state = 'dataReceived';
        obj.dataLength = data.totalBytesWritten;
        const message = {
            id: data.downloadTaskId,
            state: 'dataReceived',
            dataLength: data.totalBytesWritten,
            api: 'download',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'success') {
        obj.state = 'success';
        if (typeof obj.dataLength === 'number') {
            obj.data = `Saved ${obj.dataLength} Bytes at "${data.tempFilePath}"`;
        }
        else {
            obj.data = `Saved at ${data.tempFilePath}`;
        }
        obj.statusCode = data.statusCode;
        obj.statusText = data.statusText;
        const message = {
            id: data.downloadTaskId,
            state: 'success',
            api: 'download',
            statusCode: data.statusCode,
            statusText: data.statusText,
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'fail') {
        obj.state = 'fail';
        obj.statusCode = obj.statusCode || data.statusCode;
        const message = {
            id: data.downloadTaskId,
            api: 'download',
            state: 'fail',
        };
        sendNetworkDebug(message, nativeTime);
    }
}
function onUploadTaskStateChange(args) {
    const data = args[1] || {};
    const nativeTime = (args[3] || {}).nativeTime || Date.now();
    const obj = getNetworkDebugByRealId(data.uploadTaskId, 'upload');
    if (!obj) {
        log.w('onUploadTaskStateChange', data.uploadTaskId, 'not found');
        return;
    }
    if (data.state === 'headersReceived') {
        obj.responseHeaders = plainCopy(data.header);
        obj.state = 'headersReceived';
        const message = {
            id: data.uploadTaskId,
            api: 'upload',
            responseHeaders: data.header,
            state: 'headersReceived',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'progressUpdate') {
        obj.state = 'dataSent';
        obj.dataLength = data.totalBytesSent;
        const message = {
            id: data.uploadTaskId,
            state: 'dataSent',
            dataLength: data.totalBytesSent,
            api: 'upload',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'success') {
        obj.state = 'success';
        obj.data = data.data;
        obj.statusCode = data.statusCode;
        obj.statusText = data.statusText;
        const message = {
            id: data.uploadTaskId,
            state: 'success',
            api: 'upload',
            statusCode: data.statusCode,
            statusText: data.statusText,
            dataLength: (data.data || '').length,
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'fail') {
        obj.state = 'fail';
        obj.statusCode = obj.statusCode || data.statusCode;
        const message = {
            id: data.uploadTaskId,
            api: 'upload',
            state: 'fail',
        };
        sendNetworkDebug(message, nativeTime);
    }
}
function onSocketTaskStateChange(args) {
    const data = args[1] || {};
    const nativeTime = (args[3] || {}).nativeTime || Date.now();
    const obj = getNetworkDebugByRealId(data.socketTaskId, 'socket');
    if (!obj) {
        log.w('onSocketTaskStateChange', data.socketTaskId, 'not found');
        return;
    }
    if (data.state === 'open') {
        obj.responseHeaders = plainCopy(data.header);
        obj.state = 'headersReceived';
        const message = {
            id: data.socketTaskId,
            api: 'socket',
            responseHeaders: data.header,
            state: 'headersReceived',
            websocketState: 'open',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'close') {
        obj.state = 'success';
        obj.statusCode = data.statusCode;
        obj.statusText = data.statusText;
        const message = {
            id: data.socketTaskId,
            state: 'success',
            api: 'socket',
            statusCode: data.statusCode,
            statusText: data.statusText,
            websocketState: 'close',
        };
        sendNetworkDebug(message, nativeTime);
    }
    else if (data.state === 'error') {
        obj.state = 'fail';
        obj.statusCode = obj.statusCode || data.statusCode;
        const message = {
            id: data.socketTaskId,
            api: 'socket',
            websocketState: 'error',
            state: 'fail',
        };
        sendNetworkDebug(message, nativeTime);
    }
}
let getCurrentPages = vmGlobal.getCurrentPages || null;
const savedWebviewIds = new Set();
function handleSetupContext(data) {
    const rio = data.register_interface;
    handleRegisterInterface(rio);
    const cfgJs = data.configure_js || '';
    handleEvaluateJavascript({
        script: cfgJs,
    });
    // initialization
    loadCode('', '[__InitHelper__]', `var __wxAppData = __wxAppData || {};
    var __wxRoute;
    var __wxRouteBegin;
    var __wxAppCode__ = __wxAppCode__ || {};
    var __wxAppCurrentFile__;
    var Component = Component || function() {};
    var Behavior = Behavior || function() {};
    var definePlugin = definePlugin || function() {};
    var requirePlugin = requirePlugin || function() {};
    var global = global || {};
    var __workerVendorCode__ = __workerVendorCode__ || {};
    var __workersCode__ = __workersCode__ || {};
    var WeixinWorker = WeixinWorker || {}
    var __WeixinWorker = WeixinWorker
    var __initHelper = 1;
    var $gwx;`);
    // load wxml xcjs
    loadCode(path.join(tempDir, 'wxmlxcjs.js'));
    // load wx app code
    loadCode(path.join(tempDir, 'wxappcode.js'));
    const pubMd5 = data.public_js_md5;
    handleInitPubLib(pubMd5);
    // load plugin code
    loadCode(path.join(tempDir, 'wxplugincode.js'));
    // inject network apis
    if (vmGlobal.WeixinJSBridge && typeof vmGlobal.WeixinJSBridge.subscribeHandler === 'function') {
        const realSubscribeHandler = vmGlobal.WeixinJSBridge.subscribeHandler;
        getCurrentPages = vmGlobal.getCurrentPages || null;
        Object.defineProperty(vmGlobal.WeixinJSBridge, 'subscribeHandler', {
            value: function (...args) {
                if (args[0] === 'onRequestTaskStateChange' && args[1] && args[1].requestTaskId) {
                    onRequestTaskStateChange(args);
                    const realId = args[1].requestTaskId;
                    if (networkTaskIdRealFakeMap.request[realId]) {
                        args[1].requestTaskId = networkTaskIdRealFakeMap.request[realId];
                    }
                }
                else if (args[0] === 'onDownloadTaskStateChange' && args[1] && args[1].downloadTaskId) {
                    onDownloadTaskStateChange(args);
                    const realId = args[1].downloadTaskId;
                    if (networkTaskIdRealFakeMap.download[realId]) {
                        args[1].downloadTaskId = networkTaskIdRealFakeMap.download[realId];
                    }
                }
                else if (args[0] === 'onUploadTaskStateChange') {
                    onUploadTaskStateChange(args);
                    const realId = args[1].uploadTaskId;
                    if (networkTaskIdRealFakeMap.upload[realId]) {
                        args[1].uploadTaskId = networkTaskIdRealFakeMap.upload[realId];
                    }
                }
                else if (args[0] === 'onSocketTaskStateChange') {
                    onSocketTaskStateChange(args);
                    const realId = args[1].socketTaskId;
                    if (networkTaskIdRealFakeMap.socket[realId]) {
                        args[1].socketTaskId = networkTaskIdRealFakeMap.socket[realId];
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
                            },
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
            },
        });
        log.i('subscribeHandler injected');
        networkApiInjected = true;
    }
    else {
        log.w('subscribeHandler injected failed');
    }
    if (fs.existsSync(path.join(tempDir, 'wacloud.js'))) {
        loadCode(path.join(tempDir, 'wacloud.js'));
    }
    const userMd5 = data.three_js_md5;
    handleInitUserCode(userMd5);
}
let getWXAppDatasTimeout;
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
    else if (msg.type === 'exchange') {
        handleMasterExchange(msg.id, msg.command, msg.data);
    }
    else {
        log.e('unrecognized message from master', msg);
    }
}
// process.on('message', handleProcessMessage)
function getNetworkDebugByRealId(realId, api) {
    const networkApi = (api || '').toLowerCase();
    const map = networkTaskIdRealFakeMap[networkApi];
    const networkMap = networkDatas[networkApi];
    if (map && map.hasOwnProperty('' + realId) && networkMap) {
        const fakeId = map[realId];
        return getNetworkDebugByFakeId(fakeId, networkApi);
    }
    return null;
}
function getNetworkDebugByFakeId(fakeId, api) {
    let obj = null;
    const networkApi = (api || '').toLowerCase();
    const networkMap = networkDatas[networkApi];
    if (!networkMap) {
        return null;
    }
    for (const key in networkMap) {
        if (networkMap[key].id === fakeId) {
            obj = networkMap[key];
            break;
        }
    }
    return obj;
}
function getNetworkRealIdByFakeId(fakeId, api) {
    const networkApi = (api || '').toLowerCase();
    const networkMap = networkTaskIdRealFakeMap[networkApi];
    if (!networkMap) {
        return null;
    }
    for (const key in networkMap) {
        if (networkMap[key] === fakeId) {
            return key;
        }
    }
    return null;
}
const exchangeGetNetworkRequestInfos = {};
function handleMasterExchange(id, command, data) {
    if (command === 'getNetworkRequestInfo') {
        if (!data || !id) {
            log.w('invalid getNetworkRequestInfo, data =', data);
            return;
        }
        const clientId = data.id;
        const api = data.api;
        const obj = getNetworkDebugByRealId(clientId, api);
        if (obj) {
            const message = {
                type: 'exchange',
                id,
                result: obj.info,
            };
            sendMessageToMaster(message);
        }
        else {
            log.i('exchange', command, clientId, api, 'not found, push to queue.');
            exchangeGetNetworkRequestInfos[clientId] = Array.from(arguments);
        }
    }
    else if (command === 'getNetworkResponseBody') {
        if (!data || !id) {
            log.w('invalid getNetworkRequestInfo, data =', data);
            return;
        }
        log.i('obtaining network response body', data);
        const clientId = data.id;
        const api = data.api;
        const obj = getNetworkDebugByRealId(clientId, api);
        if (obj) {
            const message = {
                type: 'exchange',
                id,
                result: obj.data,
            };
            sendMessageToMaster(message);
        }
    }
    else if (command === 'resetNetworkCache') {
        for (const api in networkDatas) {
            if (!networkDatas.hasOwnProperty(api)) {
                continue;
            }
            const map = networkDatas[api];
            for (const idKey in map) {
                if (!map.hasOwnProperty(idKey)) {
                    continue;
                }
                const item = map[idKey];
                if (item.state === 'success' || item.state === 'fail') {
                    // safe delete
                    log.i('deleting network cache', item);
                    delete item.data;
                    delete item.info;
                    delete item.responseHeaders;
                }
            }
        }
    }
    else {
        log.w('invalid exchange command', command);
    }
}
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
        if (!p || !(p.__route__ || p.route)) {
            continue;
        }
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
process.on('uncaughtException', (error) => {
    log.e('uncaughtException', error);
    console.error('uncaughtException', error);
    const message = {
        type: 'error',
        data: {
            error,
        },
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
            inspectUrl: inspector.url(),
        },
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
            enumerable: false,
        },
        _tmp: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${tempDir}"`);
                return;
            },
            enumerable: false,
        },
        _log: {
            get() {
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${dir}/../../log/"`);
                return;
            },
            enumerable: false,
        },
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
        },
    };
}
Object.defineProperties(global, descriptors);
Object.defineProperties(vmGlobal, descriptors);
// hide this code in source panel
//# sourceURL=[publib]
