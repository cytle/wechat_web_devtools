/**
 * 企业微信开发者工具插件的主入口页面
 */

var store = Store.get();

new Vue({
    template: '\
                <div class="container">\
                    <choose-company v-if="corpinfo.show"></choose-company>\
                    <authorize-dialog v-if="auth.show"></authorize-dialog>\
                    <msg-dialog v-if="msgdialog.show"></msg-dialog>\
                    <contact-dialog v-if="contactdialog.show"></contact-dialog>\
                    <profile-dialog v-if="profile.show"></profile-dialog>\
                </div>\
              ',
    el: '#js_container',
    data: function () {
        return store;
    },
    methods: {      
        customEventHandler: function(eventName, data) {
            switch(eventName) {
                case EVT_CORP_SELECTED:
                    Store.set('corpinfo.show', 0);                 
                    Service.updateUserStateByCorp(data);
                    break;  
                case EVT_REQUEST_ERROR:
                    break;    
                case EVT_SYSTEM_BUSY:
                    wechatide.invoke('PRINT_ERROR', {                        
                        message: data.message || G_WORDING_CONFIG.SYSBUSY_TEXT,
                    })
                    break;          
            } 
        },
    },    
    beforeMount: function() {
        
        Store.initFromCache().then(function(){
            Service.checkUserState(false, false);
        });        

        Plugins.all(this.customEventHandler);
    }
});

