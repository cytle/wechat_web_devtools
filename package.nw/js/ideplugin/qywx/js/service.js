
/* services 数据请求服务层 */

let G_Service_hook;
let G_TicketUpdateTimer;

// 统一的拦截器
axios.interceptors.request.use(function (config) {
    let userState = Store.get('userState', {});

    config.data = config.data || {};

    if (userState.sid) {  // 拦截器统一增加身份验证参数
        config.data.sid = userState.sid;
    }

    return config;
}, function (error) {    
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {    
    var data = response.data.data;

    if (data) {
        data.errCode = data.errcode;
        data.errMsg = data.errmsg;

        delete data.errcode;
        delete data.errmsg;
        
        return data;    
    } else if (response.data.result) {
        Plugins.dispatch(EVT_SYSTEM_BUSY, {});
        return {};
    }    
}, function (error) {    
    return Promise.reject(error);
});

/* JSAPI部分接口功能实现 */
async function getLoginCode() {
    return new Promise(function(resolve, reject) {  
        axios.post('/api_login')
            .then(function(res){ 
                resolve({
                    code: res.code
                })                   
            }).catch(function(error){
                resolve({
                    code: ''
                })                  
            });
    });
}

async function checkSession() {
    return new Promise(function(resolve, reject) {
        axios.post('/api_checksession')
            .then(function(res){ 
                resolve(res)                          
            }).catch(function(error){
                resolve({
                    errCode: -1
                })                  
            });
    });
}

async function operateWWData(api_name, opt) {
    return new Promise(function(resolve, reject) {
        axios.post('/api_operatewwdata', { api_name: api_name, opt: opt })   
            .then(function(res){
                if (res.errCode == -12000 || res.errCode == -12006) { // 需要先进行授权操作
                    Plugins.dispatch(EVT_SHOW_SIMULATOR);
                                        
                    Store.set('auth', {
                        show: 1,
                        api_name: api_name,
                        app_name: Store.get('appinfo.appName'),
                        app_logo: Store.get('appinfo.appImageUrl'),
                        auth_content: G_AUTH_CONFIG[api_name] || ''
                    })

                    G_Service_hook = resolve;                    
                } else {
                    resolve(res);
                }                   
            }).catch(function(error){
                resolve({
                    errCode: -1
                })                
            });
    });
}

// 清除用户的所有授权信息
async function clearScopeAuth() {
    return new Promise(function(resolve, reject) {
        axios.post('/api_clearscopeauth')
            .then(function(res){ 
                resolve(res)                          
            }).catch(function(error){
                resolve({
                    errCode: -1
                })                  
            });
    });
}

// 检查用户的身份态是否有效
async function checkUserState(force, quiet) {
    let userState = Store.get('userState', {});

    if(!userState.select_corpid || force) {
        Plugins.dispatch(EVT_SHOW_SIMULATOR); 
        
        Store.set('corpinfo.state', 1); // 设置状态为加载中
        Store.set('corpinfo.show', 1);  // 显示企业选择器
        
        wechatide.invoke('SEND_AUTH_REQUEST', {}, (res) => {
            let code = res.tmpcode;

            if (code) {
                axios.get('/login?code=' + code)
                    .then(function(res){                      
                        userState.gid = res.gid;
                            
                        Store.set('corpinfo', { state: 2, corplist: res.corplist, show: 1, selected_corpid: Store.get('corpinfo.selected_corpid')});                    
                        
                        // Store.set('corpinfo', { state: 2, corplist: [], show: 1 });                                            
                        Store.set('userState', userState);                                     
                    })
                
                statAPICall('wx_login_succ');
            } else {
                statAPICall('wx_login_failed');

                Plugins.dispatch(EVT_SYSTEM_BUSY, {
                    message: '请使用正式的appid进行调试'
                })
            }           
        })
    } else {         
        // 静默更新票据
        updateUserStateByCorp({
            scorp_id: userState.select_corpid
        }, quiet);
    }
}

// 根据企业信息更新用户的企业身份态
async function updateUserStateByCorp(params, quiet) {
    let userState = Store.get('userState', {});

    axios({
        url: `login_by_corpid`,        
        method: 'post',
        data: {
            gid: userState.gid,
            scorp_id: params.scorp_id
        }
    }).then(function(res){   
        userState.select_corpid = params.scorp_id;
        userState.sid = res.sid;

        Store.set('userState', userState);
        Store.set('corpinfo.selected_corpid', params.scorp_id);

        if(!quiet) {
            Plugins.dispatch(EVT_HIDE_SIMULATOR);                                 
        }        
    });
}

// 打开选择联系人的组件
async function selectEnterpriseContact(params) {
    return new Promise(function(resolve, reject) {
        Plugins.dispatch(EVT_SHOW_SIMULATOR);

        let mockData = params.type[0] == 'user' ? Store.mockData.user : 
                    (params.type[0] == 'external' ? Store.mockData.external : Store.mockData.department);

        mockData.forEach(function(item) {
            item.checked = false;
        });

        Store.set('contactdialog', {
            show: 1, 
            type: params.type[0],
            mockData: mockData,
            isSingle: params.mode == 'single' ? 1 : 0
        });   

        G_Service_hook = resolve;
    });   
}

// 用户信息profile组件
async function openUserProfile() {
    return new Promise(function(resolve, reject) {
        Plugins.dispatch(EVT_SHOW_SIMULATOR);
        
        Store.set('profile', {
            show: 1,             
            mockData: Store.mockData.profile            
        });   

        resolve({});
    });   
}

// 用户确认授权后的操作
function confirmAuthorize(isAllow) {
    axios.post('/api_operatewwdata', {  
        api_name: Store.get('auth.api_name'), 
        opt: isAllow ? 1 : 2 
    }).then(function(res) {
            G_Service_hook && G_Service_hook(res);                          
        }).catch(function(error) {
            G_Service_hook && G_Service_hook({
                errCode: -1
            });                  
        });
}
// 完成联系人选择对话框
function completeContactDialog(isConfirm, data) {
    Plugins.dispatch(EVT_HIDE_SIMULATOR);
    Store.set('contactdialog.show', 0);

    if (G_Service_hook) {
        G_Service_hook({
            errCode: isConfirm ? 0 : '-101',
            list: data.type == 'department' ? [] : data.list,
            departmentList: data.type == 'department' ? data.list : []
        });
    }
}

// 静默续期操作
function startAutoUpdateTicket() {
    if(!G_TicketUpdateTimer) {
        G_TicketUpdateTimer = setInterval(function() {
            userState = Store.get('userState', {});
            
            updateUserStateByCorp({
                scorp_id: userState.select_corpid
            }, true);
        }, G_APP_CONFIG.ticketUpdateFreq);
    }
}

// API调用统计
function statAPICall(api) {
    axios.post('/api_stat', {  
        key: api
    })
}

startAutoUpdateTicket();

// 对外暴露调用的接口
const Service = {
    statAPICall,
    getLoginCode,
    checkSession,    
    clearScopeAuth,
    checkUserState,
    operateWWData,
    openUserProfile,
    confirmAuthorize,
    updateUserStateByCorp,
    completeContactDialog,
    selectEnterpriseContact
}