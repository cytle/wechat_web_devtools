/* actions JSAPI 监听逻辑层 */
async function login() {
    let res = await Service.getLoginCode();
    Service.statAPICall('login');

    return {
        result: {
            code: res.code,
            errMsg: 'qy__login:' + (res.code == '' ? 'fail' : 'ok')
        },
        preventDefault: true
    }
}

async function checkSession() {
    let res = await Service.checkSession();
    let result = {
        errMsg: 'qy__checkSession:' + (res.errCode == 0 ? 'ok' : 'fail ' + res.errMsg)
    }
    Service.statAPICall('checkSession');

    if(res.errCode == 0) {
        result.expireIn = res.session_expire_in;        
    } else {
        result.errCode = res.errCode;
    }

    return {
        result: result,
        preventDefault: true
    }
}

async function authorize() {
    let res = await Service.authorize();

    return {
        result: {
            errMsg: 'qy__authorize:ok'
        },
        preventDefault: true
    }
}

async function getSetting() {
    let res = await Service.getSetting();

    return {
        result: {
            errMsg: 'qy__getSetting:ok'
        },
        preventDefault: true
    }
}

async function getMobile() {
    let res = await Service.operateWWData('getMobile', 0);
    let result = convertReqResponse(res, 'getMobile');
    Service.statAPICall('getMobile');

    return {
        result: result,
        preventDefault: true
    }
}

async function getEmail() {
    let res = await Service.operateWWData('getEmail', 0);
    let result = convertReqResponse(res, 'getEmail');
    Service.statAPICall('getEmail');

    return {
        result: result,
        preventDefault: true
    }
}

async function getQrCode() {
    let res = await Service.operateWWData('getQrCode', 0);
    let result = convertReqResponse(res, 'getQrCode');
    Service.statAPICall('getQrCode');

    return {
        result: result,
        preventDefault: true
    }
}

async function getAvatar() {
    let res = await Service.operateWWData('getAvatar', 0);
    let result = convertReqResponse(res, 'getAvatar');
    Service.statAPICall('getAvatar');

    return {
        result: result,
        preventDefault: true
    }
}

async function getSystemInfo() {
    Service.statAPICall('getSystemInfo');

    return {
        result: {
            version: G_APP_CONFIG.ww_version,
            errMsg: 'qy__getSystemInfo:ok'
        },
        preventDefault: true
    }
}

async function getUserInfo() {
    let res = await Service.operateWWData('getEnterpriseUserInfo', 0);
    let result = convertReqResponse(res, 'getEnterpriseUserInfo');
    Service.statAPICall('getUserInfo');

    return {
        result: result,
        preventDefault: true
    }
}

async function getEnterpriseUserInfo() {
    let res = await Service.operateWWData('getEnterpriseUserInfo', 0);
    let result = convertReqResponse(res, 'getEnterpriseUserInfo');
    Service.statAPICall('getEnterpriseUserInfo');

    return {
        result: result,
        preventDefault: true
    }
}

async function openUserProfile() {
    Service.statAPICall('openUserProfile');
    Service.openUserProfile();

    return {
        result: {
            errCode: 0,
            errMsg: 'qy__openUserProfile:ok'
        },
        preventDefault: true
    }
}

async function selectEnterpriseContact(params) {
    let res = await Service.selectEnterpriseContact(params);
    let result = {
        errCode: res.errCode,
        errMsg: 'qy__selectEnterpriseContact:' + (res.errCode == 0 ? 'ok' : 'fail cancel'),
    }
    Service.statAPICall('selectEnterpriseContact');

    if (res.errCode == 0) {
        result.result = {
            userList: res.list || [],
            departmentList: res.departmentList || []
        }
    }

    return {
        result: result,
        preventDefault: true
    }
}

async function selectExternalContact(params) {
    params.type = ['external']; // 复用一个选人控件，通过类型区分

    let res = await Service.selectEnterpriseContact(params);
    let result = {
        errCode: res.errCode,
        errMsg: 'qy__selectExternalContact:' + (res.errCode == 0 ? 'ok' : 'fail cancel'),
    }
    Service.statAPICall('selectExternalContact');

    if (res.errCode == 0) {
        result.userIds = res.list;
    }

    return {
        result: result,
        preventDefault: true
    }
}

async function openEnterpriseChat() {    
    return showSimulatorNotSupport('openEnterpriseChat');
}

async function getCurExternalContact() {      
    return showSimulatorNotSupport('getCurExternalContact');
}

async function getNFCReaderState() {  
    return showSimulatorNotSupport('getNFCReaderState');
}

async function startNFCReader() {    
    return showSimulatorNotSupport('startNFCReader');
}

async function stopNFCReader() {    
    return showSimulatorNotSupport('stopNFCReader');
}

// 此action为重置调微信的接口输出
async function getSystemInfoSyncWx(res) {
    Service.statAPICall('getSystemInfoSyncWx');

    return {
        ...res,
        environment: 'wxwork'
    }
}

async function getSystemInfoWx(res) {
    Service.statAPICall('getSystemInfoWx');

    return {
        ...res,
        environment: 'wxwork'
    }
}

async function requestPayment() {
    Service.statAPICall('requestPayment');
    Plugins.dispatch(EVT_SYSTEM_BUSY, {
        message: '请使用wx.requestPayment接口'
    })

    return {
        result: {
            errMsg: 'qy__requestPayment:fail'
        }
    }
}

async function NOT_SUPPORT_HANDLER() { 
    Plugins.dispatch(EVT_SYSTEM_BUSY, {
        message: '不支持此接口调用！'
    })

    return {
        result: {
            errMsg: 'qy__no_support:fail'
        }
    }
}

function showSimulatorNotSupport(api) {
    Plugins.dispatch(EVT_SHOW_SIMULATOR);
    Store.set('msgdialog', {
        show: 1,
        msgText: G_WORDING_CONFIG.NOT_SUPPROT,
        buttonText: G_WORDING_CONFIG.MSG_BUTTON_TEXT
    });
    Service.statAPICall(api);

    return {
        result: {
            errMsg: `qy__${api}:fail`
        }
    }
}

function convertReqResponse(res, api) {
    let result = res.data ? JSON.parse(res.data) : {};

    result.errMsg = `qy__${api}:` + (res.data ? 'ok' : 'fail' + (res.errCode == 0 ? '' : `:${res.errMsg}`));
    result.errCode = res.errCode;

    return result;
}

const Action = {
    login,
    checkSession,
    getMobile,
    authorize,
    getSetting,
    getEmail,
    getAvatar,
    getSystemInfo,
    getUserInfo,
    getQrCode,
    getEnterpriseUserInfo,
    openUserProfile,
    selectEnterpriseContact,
    openEnterpriseChat,
    selectExternalContact,
    getCurExternalContact,
    getNFCReaderState,
    startNFCReader,
    stopNFCReader,
    requestPayment,
    getSystemInfoWx,
    getSystemInfoSyncWx,
    NOT_SUPPORT_HANDLER
}