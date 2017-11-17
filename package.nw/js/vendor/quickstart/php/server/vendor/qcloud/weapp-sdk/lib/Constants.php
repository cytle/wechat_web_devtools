<?php
namespace QCloud_WeApp_SDK;

class Constants {
    // 初始化 SDK 时缺少配置项
    const E_INIT_LOST_CONFIG = 'E_INIT_LOST_CONFIG';
    // 初始化 SDK 时配置类型错误
    const E_INIT_CONFIG_TYPE = 'E_INIT_CONFIG_TYPE';

    /* AUTH */
    // 自定义 http header
    const WX_HEADER_CODE = 'x-wx-code';
    const WX_HEADER_ENCRYPTED_DATA = 'x-wx-encrypted-data';
    const WX_HEADER_IV = 'x-wx-iv';
    const WX_HEADER_SKEY = 'x-wx-skey';

    // 腾讯云代理登录参数缺失
    const E_PROXY_LOGIN_LOST_PRAMA = 'E_PROXY_LOGIN_LOST_PRAMA';
    // 腾讯云代理登录请求错误
    const E_PROXY_LOGIN_REQUEST_FAILED = 'E_PROXY_LOGIN_REQUEST_FAILED';
    // 腾讯云代理登录失败
    const E_PROXY_LOGIN_FAILED = 'E_PROXY_LOGIN_FAILED';
    // 解密失败
    const E_DECRYPT_FAILED = 'E_DECRYPT_FAILED';

    // 登录成功
    const S_AUTH = 1;
    // 登录失败
    const E_AUTH = 0;
    
    /* MySQL */
    // 连接数据库错误
    const E_CONNECT_TO_DB = 'E_CONNECT_TO_DB';
    // 函数参数错误
    const E_CALL_FUNCTION_PARAM = 'E_CALL_FUNCTION_PARAM';
    // 插入数据错误
    const E_EXEC_SQL_QUERY = 'E_EXEC_SQL_QUERY';

    /* 信道连接 */
    const E_CONNECT_TO_TUNNEL_SERVER = 'E_CONNECT_TO_TUNNEL_SERVER';

    /* COS */
    const E_INIT_COS_SDK = 'E_INIT_COS_SDK';
}
