"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="./index.d.ts" />
const vm = require("vm");
const fs = require("fs");
const path = require("path");
const inspector = require("inspector");
const child_process_1 = require("child_process");
const nodeSyncIpc = require("node-sync-ipc");
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
    createAudioInstance: true
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
const warns = global.__warns = [];
const errs = global.__errs = [];
let isDev = process.env.isDev === 'yes'; // declare variable first
const log = {};
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
            warns.push([...args]);
        }
    });
    Object.defineProperty(log, 'e', {
        value: function (...args) {
            errs.push([...args]);
        }
    });
}
;
(['dir', 'tempDir', 'devVendorList', 'devVendorPath', 'isDev', 'files', 'httpPort', 'initialInspectPort', 'dataDir', 'usingLocalStorage']).forEach(key => {
    if (typeof process.env[key] !== 'string') {
        log.e(key, 'is not defined in process.env');
        process.exit();
    }
});
if (typeof process.send !== 'function') {
    log.e('process.send is not available');
    process.exit();
}
const { dir, tempDir, devVendorPath, dataDir, } = process.env;
const files = JSON.parse(process.env.files || '[]');
const devVendorList = JSON.parse(process.env.devVendorList);
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
const vmGlobal = {
    require: undefined,
    eval: undefined,
    process: undefined,
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
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
    process.send(message);
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
function handleRegisterInterface(data) {
    const interfaces = {};
    const methods = data.obj_methods;
    const objName = data.obj_name;
    for (const m of methods) {
        const methodName = m.method_name;
        const methodArgs = m.method_args;
        const fn = function (...fnArgs) {
            const callInterface = (callId, extra = {}, raw = false) => {
                log.i('calling interface', methodName, fnArgs, callId);
                const callInterfaceMessage = {
                    name: objName,
                    method: methodName,
                    args: fnArgs,
                    call_id: callId,
                };
                return sendDebugMessageToClient(callInterfaceMessage, 'callInterface', extra, raw);
            };
            const sdkName = fnArgs[0];
            const sdkArgs = fnArgs[1];
            const _sdkCallId = parseInt(fnArgs[2], 10);
            const sdkCallId = isNaN(_sdkCallId) ? 0 : _sdkCallId;
            if (!debugEnabled && methodName === 'invokeHandler') {
                return JSON.stringify({
                    errMsg: sdkName + ':fail debug invoke no active session'
                });
            }
            if (methodName === 'invokeHandler' && isSdkSync(sdkName)) {
                // sync function
                log.i(sdkName, 'is a sync function.');
                const debugMessage = callInterface(sdkCallId, {
                    is_sync: true,
                    timestamp: Date.now(),
                    sdkName: sdkName,
                }, true);
                try {
                    const res = childIpc.sendSync('sdksyncapi', debugMessage);
                    if (!res || res.error) {
                        throw res && res.error;
                    }
                    if ((sdkName === 'getSystemInfo' || sdkName === 'getSystemInfoSync') && res.result) {
                        const ret = JSON.parse(res.result);
                        if ((/^getSystemInfo(Sync)?\:ok/i).test(ret.errMsg)) {
                            // cache the result
                            systemInfoCache = res.result;
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
            if (methodName === 'invokeHandler' && sdkName === 'getSystemInfo' || sdkName === 'getSystemInfoSync') {
                log.i('using systemInfoCache');
                return systemInfoCache;
            }
            else if (usingLocalStorage && methodName === 'invokeHandler' && (sdkName === 'getStorage' || sdkName === 'getStorageSync' || sdkName === 'setStorage' || sdkName === 'setStorageSync' || sdkName === 'removeStorage' || sdkName === 'removeStorageSync' || sdkName === 'clearStorage' || sdkName === 'clearStorageSync' || sdkName === 'getStorageInfo' || sdkName === 'getStorageInfoSync')) {
                log.i('invoke storage apis');
                const debugMessage = callInterface(sdkCallId, {
                    is_sync: true,
                    timestamp: Date.now(),
                    sdkName: sdkName,
                }, true);
                try {
                    const res = childIpc.sendSync('sdkstorageapi', debugMessage);
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
            else {
                // async function
                log.i(sdkName, 'is ASYNC.');
                callInterface(sdkCallId);
                return undefined;
            }
        };
        interfaces[methodName] = fn;
    }
    vmGlobal[objName] = interfaces;
}
function handleEvaluateJavascript(data) {
    const script = ';' + data.script + '\n;';
    const evaluateId = parseInt(String(data.evaluate_id), 10);
    let ret = undefined;
    try {
        ret = vm.runInContext(script, jsVm, {
            filename: '[VM]',
        });
        log.i('eval script', `evaluate_id #${evaluateId}`, 'result', ret);
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
        sendDebugMessageToClient(evaluateJavascriptResult, 'evaluateJavascriptResult');
    }
}
function handleCallInterfaceResult(data) {
    let ret = {};
    try {
        ret = JSON.parse(data.ret);
    }
    catch (e) {
        log.e('error parsing call interface result', data);
        ret = {};
    }
    const _callId = parseInt(String(data.call_id), 10);
    const callId = isNaN(_callId) ? 0 : _callId;
    log.i('invoke async function result', `call_id #${callId}`);
    if (vmGlobal.WeixinJSBridge && typeof vmGlobal.WeixinJSBridge.invokeCallbackHandler === 'function') {
        if (networkApiInjected && managedRequestTaskCallIdTaskIdMap[callId] && ret.requestTaskId) {
            log.i('register fake request task id', managedRequestTaskCallIdTaskIdMap[callId], 'with real id', ret.requestTaskId);
            managedRealRequestTaskIdFakeTaskIdMap[ret.requestTaskId] = managedRequestTaskCallIdTaskIdMap[callId];
        }
        else if (networkApiInjected && managedDownloadTaskCallIdTaskIdMap[callId] && ret.downloadTaskId) {
            log.i('register fake download task id', managedDownloadTaskCallIdTaskIdMap[callId], 'with real id', ret.downloadTaskId);
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
    let ret;
    try {
        const publibFilePath = path.join(__dirname, 'WAService.js');
        const script = fs.readFileSync(publibFilePath, 'utf-8').toString();
        ret = vm.runInContext(script, jsVm, {
            filename: '[VM]',
        });
    }
    catch (err) {
        // something went wrong in pub lib code
        // notify master
    }
    return ret;
}
function handleInitUserCode(userMd5) {
    // run user codes
    let script;
    let ret;
    try {
        for (const file of files) {
            script = fs.readFileSync(path.join(dir, file), 'utf-8').toString();
            ret = vm.runInContext(script, jsVm);
        }
    }
    catch (err) {
        // something went wrong in user code
        // notify master
    }
    return ret;
}
function handleSetupContext(data) {
    const rio = data.register_interface;
    handleRegisterInterface(rio);
    const cfgJs = data.configure_js || '';
    handleEvaluateJavascript({
        script: cfgJs
    });
    const pubMd5 = data.public_js_md5;
    handleInitPubLib(pubMd5);
    // inject network apis
    if (vmGlobal.WeixinJSBridge && typeof vmGlobal.WeixinJSBridge.subscribeHandler === 'function') {
        const realSubscribeHandler = vmGlobal.WeixinJSBridge.subscribeHandler;
        Object.defineProperty(vmGlobal.WeixinJSBridge, 'subscribeHandler', {
            value: function (...args) {
                if (args[0] === 'onRequestTaskStateChange' && args[1] && args[1].requestTaskId) {
                    const realId = args[1].requestTaskId;
                    if (managedRealRequestTaskIdFakeTaskIdMap[realId]) {
                        log.i('replacing', realId, 'with', managedRealRequestTaskIdFakeTaskIdMap[realId]);
                        args[1].requestTaskId = managedRealRequestTaskIdFakeTaskIdMap[realId];
                    }
                }
                else if (args[0] === 'onDownloadTaskStateChange' && args[1] && args[1].downloadTaskId) {
                    const realId = args[1].downloadTaskId;
                    if (managedRealDownloadTaskIdFakeTaskIdMap[realId]) {
                        log.i('replacing', realId, 'with', managedRealDownloadTaskIdFakeTaskIdMap[realId]);
                        args[1].downloadTaskId = managedRealDownloadTaskIdFakeTaskIdMap[realId];
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
process.on('message', (msg) => {
    log.i('received message from master', msg);
    if (!msg) {
        log.e('invalid master message');
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
    else {
        log.e('unrecognized message from master');
    }
});
process.on('uncaughtException', error => {
    log.e('uncaughtException', error);
    const message = {
        type: 'error',
        data: {
            error
        }
    };
    sendMessageToMaster(message);
});
function notifyMaster() {
    sendMessageToMaster({
        type: 'vmReady',
        data: {
            inspectUrl: inspector.url()
        }
    });
}
setTimeout(notifyMaster, 0);
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
                child_process_1.exec(`${isMac ? 'open' : 'explorer'} "${dir}/../../"`);
                return;
            },
            enumerable: false,
            configurable: true,
        }
    };
}
Object.defineProperties(global, descriptors);
Object.defineProperties(vmGlobal, descriptors);
//# sourceURL=[helper]
