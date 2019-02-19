
/* 全局的指令常量 */
const EVT_CORP_SELECTED  = 'corp_selectd';
const EVT_SHOW_SIMULATOR = 'show_simulator';
const EVT_HIDE_SIMULATOR = 'hide_simulator';
const EVT_REQUEST_ERROR  = 'request_error';
const EVT_NETWORK_ERROR  = 'network_error';
const EVT_SYSTEM_BUSY    = 'system_busy';

/* 插件配置对象 */
const G_APP_CONFIG = {
    baseURL: 'https://work.weixin.qq.com/wework_admin/devtool/',
    ticketUpdateFreq: 30 * 60 * 1000,
    wxwork_register: 'https://work.weixin.qq.com/wework_admin/register_wx?from=devtool',
    wxwork_api_doc: 'https://work.weixin.qq.com/api/doc#90000/90136/90289',
    ww_version: '2.7.0'
}

/* 企业微信的公有JSAPI接口清单 */
const G_PUBLIC_API_CONFIG = [
    'login',    // 企业微信身份体系下的code获取，依赖后台接口
    'checkSession',  // 企业微信身份体系下的session验证接口，依赖后台接口
    'getMobile',    // 依赖后台接口
    'authorize',    // 验证企业微信的企业权限，依赖后台接口
    'getSetting',   // 获取企业微信的权限集合，依赖后台接口
    'getEmail',     // 依赖后台接口
    'getAvatar',    // 依赖后台接口
    'getSystemInfo',   // 不依赖后台接口
    'getUserInfo',    // 获取企业成员基本信息，依赖后台接口
    'getQrCode',  // 获取企业成员个人二维码，依赖后台接口
    'getEnterpriseUserInfo',  // 和getUserInfo等效
    'selectEnterpriseContact',  // 打开通讯录选人，前端模拟
    'openEnterpriseChat',      // 创建会话，前端模拟
    'selectExternalContact',   // 打开外部联系人列表选人，前端模拟
    'getCurExternalContact',    // 获取当前外部联系人userid，前端模拟
    'openUserProfile',      // 打开个人信息页，依赖后台接口
    'getNFCReaderState',    // 提示真机体验
    'startNFCReader',   // 提示真机体验
    'stopNFCReader',    // 提示真机体验  
    'requestPayment'   // 企业支付接口
]

/* 企业微信的私有JSAPI接口清单 */
const G_PRIVATE_API_CONFIG = [
    'wwLog',
    'wwReport',
    'getCorpList',
    'chooseAttach',
    'updateForwardButton',
    'sendMessageToConv',
    'wwOpenUrlScheme',
    'sendMessageToWX',
    'showUserProfile',
    'postNotification',
    'chooseWxworkContact',
    'getDepartmentList',
    'selectConvAndAction',
    'getDepartmentUserList',
    'openWechatMiniProgram',
    'chooseWxworkVisibleRange',
    'checkAppShareMessageEnable',
    'bioassayAuthentication',    
    'shareAppMessageEx',
    'idcardVerify',
    'openEnterpriseContact',
    'enterHWOpenTalk',
    'queryCurrHWOpenTalk',
    'startWecast',
]

/* Auth授权的配置以及接口 */
const G_AUTH_CONFIG = {
    'getMobile' : '手机号',
    'getEmail'  : '邮箱',
    'getQrCode' : '个人二维码',
    'getAvatar' : '头像',
    'getEnterpriseUserInfo' : '姓名、性别'
}

const G_WORDING_CONFIG = {
    NOT_SUPPROT : '请在真机中调试',
    MSG_BUTTON_TEXT: '好的',
    SYSBUSY_TEXT: '企业微信插件系统繁忙'
}

/* axios全局配置 */
axios.defaults.baseURL = G_APP_CONFIG.baseURL;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';



