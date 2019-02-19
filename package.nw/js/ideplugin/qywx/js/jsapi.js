 
 //基础的事件对象扩展
var Plugins = function(){
    var EventCache = {};   
    var indentity = 0;  

    function GID() {
        return "wework_plugin_" + indentity ++;
    }

    function emit(id,event,data) {
        EventCache[id]||(EventCache[id] = {});
        var list = EventCache[id][event],fn;
        
        if(list){
            var evs = list.slice(0);
            while((fn = evs.shift())){
                fn.call(EventCache[id].owner,data);
            }
        }

        var evs = (EventCache.all_listener || []).slice(0);
        while((fn = evs.shift())){
            fn(event, data);
        }
    }    

    var all = function(fn) {
        if(!fn) {
            return this;
        }

        EventCache.all_listener = EventCache.all_listener || [];
        EventCache.all_listener.push(fn);
    }
    
    var dispatch = function(event,data){
        if(this.id){
            emit(this.id,event,data);
        }   
        return this;            
    }    
    
    return {
        id: GID(),
        all,
        dispatch
    }
}();

/* JSAPI 主动调用监听 */
if (typeof (wechatide) != 'undefined') {
    const onBeforeInvoke = wechatide.appservice.onBeforeInvoke;
    const onAfterInvoke = wechatide.appservice.onAfterInvoke;

    // JSAPI主调监听：遍历所有的JSAPI并自动绑定监听事件
    for(let i = 0; i < G_PUBLIC_API_CONFIG.length; i++) {
        onBeforeInvoke('qy__' + G_PUBLIC_API_CONFIG[i], { noTimeout: true }, Action[G_PUBLIC_API_CONFIG[i]]);
    }

    for(let i = 0; i < G_PRIVATE_API_CONFIG.length; i++) {
        onBeforeInvoke('qy__' + G_PRIVATE_API_CONFIG[i], { noTimeout: true }, Action.NOT_SUPPORT_HANDLER);
    }

    onAfterInvoke('getSystemInfoSync', {}, Action['getSystemInfoSyncWx']);
    onAfterInvoke('getSystemInfo', {}, Action['getSystemInfoWx']);

    // 选择企业被调监听
    wechatide.on('SETTING_ACTION', (action) => {
        console.log(action);
                
        if (action === 'select_cop') { 
            Service.checkUserState(true);  //强制拉起企业选择器
        } else if (action === 'clear_authrize') {
            Service.clearScopeAuth();
        } else if (action === 'clear_userinfo') {
            wechatide.invoke('CLEAR_USER_INFO', {});
        } else if (action === 'open_document') {
            wechatide.invoke('GOTO', {
                url: G_APP_CONFIG.wxwork_api_doc
            })
        }
    })

    // 加载时获取环境变量的小程序信息
    wechatide.invoke('GET_APP_INFO', {}, function(res) {        
        Store.set('appinfo', {
            appName: res.appName, 
            appImageUrl: res.appImageUrl
        });
    });
}

/*
 * 与开发者工具通信的接口调用
 */
function devtoolJSAPIHandler (eventName, data) {
    switch(eventName) {
        case EVT_SHOW_SIMULATOR:
            wechatide.invoke('SHOW_SIMULATOR');           
            break;
        case EVT_HIDE_SIMULATOR: 
            wechatide.invoke('HIDE_SIMULATOR');
            break;
    }
}

Plugins.all(devtoolJSAPIHandler);



