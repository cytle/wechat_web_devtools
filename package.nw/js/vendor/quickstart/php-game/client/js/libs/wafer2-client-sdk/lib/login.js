var utils = require('./utils');
var constants = require('./constants');
var Session = require('./session');

/***
 * @class
 * 表示登录过程中发生的异常
 */
var LoginError = (function () {
    function LoginError(type, message) {
        Error.call(this, message);
        this.type = type;
        this.message = message;
    }

    LoginError.prototype = new Error();
    LoginError.prototype.constructor = LoginError;

    return LoginError;
})();

/**
 * 微信登录，获取 code 和 encryptData
 */
var getWxLoginResult = function getLoginCode(callback) {
    wx.login({
        success: function (loginResult) {
            wx.getUserInfo({
                success: function (userResult) {
                    callback(null, {
                        code: loginResult.code,
                        encryptedData: userResult.encryptedData,
                        iv: userResult.iv,
                        userInfo: userResult.userInfo,
                    });
                },

                fail: function (userError) {
                    var error = new LoginError(constants.ERR_WX_GET_USER_INFO, '获取微信用户信息失败，请检查网络状态');
                    error.detail = userError;
                    callback(error, null);
                },
            });
        },

        fail: function (loginError) {
            var error = new LoginError(constants.ERR_WX_LOGIN_FAILED, '微信登录失败，请检查网络状态');
            error.detail = loginError;
            callback(error, null);
        },
    });
};

var noop = function noop() {};
var defaultOptions = {
    method: 'GET',
    success: noop,
    fail: noop,
    loginUrl: null,
};

/**
 * @method
 * 进行服务器登录，以获得登录会话
 *
 * @param {Object} options 登录配置
 * @param {string} options.loginUrl 登录使用的 URL，服务器应该在这个 URL 上处理登录请求
 * @param {string} [options.method] 请求使用的 HTTP 方法，默认为 "GET"
 * @param {Function} options.success(userInfo) 登录成功后的回调函数，参数 userInfo 微信用户信息
 * @param {Function} options.fail(error) 登录失败后的回调函数，参数 error 错误信息
 */
var login = function login(options) {
    options = utils.extend({}, defaultOptions, options);

    if (!defaultOptions.loginUrl) {
        options.fail(new LoginError(constants.ERR_INVALID_PARAMS, '登录错误：缺少登录地址，请通过 setLoginUrl() 方法设置登录地址'));
        return;
    }

    var doLogin = () => getWxLoginResult(function (wxLoginError, wxLoginResult) {
        if (wxLoginError) {
            options.fail(wxLoginError);
            return;
        }
        
        var userInfo = wxLoginResult.userInfo;

        // 构造请求头，包含 code、encryptedData 和 iv
        var code = wxLoginResult.code;
        var encryptedData = wxLoginResult.encryptedData;
        var iv = wxLoginResult.iv;
        var header = {};

        header[constants.WX_HEADER_CODE] = code;
        header[constants.WX_HEADER_ENCRYPTED_DATA] = encryptedData;
        header[constants.WX_HEADER_IV] = iv;

        // 请求服务器登录地址，获得会话信息
        wx.request({
            url: options.loginUrl,
            header: header,
            method: options.method,
            data: options.data,
            success: function (result) {
                var data = result.data;

                // 成功地响应会话信息
                if (data && data.code === 0 && data.data.skey) {
                    var res = data.data
                    if (res.userinfo) {
                        Session.set(res.skey);
                        options.success(userInfo);
                    } else {
                        var errorMessage = '登录失败(' + data.error + ')：' + (data.message || '未知错误');
                        var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, errorMessage);
                        options.fail(noSessionError);
                    }

                // 没有正确响应会话信息
                } else {
                    var noSessionError = new LoginError(constants.ERR_LOGIN_SESSION_NOT_RECEIVED, JSON.stringify(data));
                    options.fail(noSessionError);
                }
            },

            // 响应错误
            fail: function (loginResponseError) {
                var error = new LoginError(constants.ERR_LOGIN_FAILED, '登录失败，可能是网络错误或者服务器发生异常');
                options.fail(error);
            },
        });
    });

    var session = Session.get();
    if (session) {
        wx.checkSession({
            success: function () {
                options.success(session.userInfo);
            },

            fail: function () {
                Session.clear();
                doLogin();
            },
        });
    } else {
        doLogin();
    }
};

var setLoginUrl = function (loginUrl) {
    defaultOptions.loginUrl = loginUrl;
};

module.exports = {
    LoginError: LoginError,
    login: login,
    setLoginUrl: setLoginUrl,
};