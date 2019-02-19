

Vue.component('authorize-dialog', {
    props: ['name'],
    template:   '<div class="authrize-dialog">\
                    <div class="weui-mask"></div>\
                    <div class="weui-dialog">\
                        <div class="weui-dialog__hd show-border-bottom"><strong class="weui-dialog__title">企业微信授权</strong></div>\
                        <div class="weui-dialog__bd authrize-content">\
                            <img :src="auth.app_logo" class="logo" />\
                            <div class="authrize-main_title show-border-bottom">{{auth.app_name}}申请获得以下权限：</div>\
                            <ul class="authrize-ul">\
                                <li>获得你的{{auth.auth_content}}</li>\
                            </ul>\
                        </div>\
                        <div class="weui-dialog__ft">\
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_default" v-on:click="onBindDeny">拒绝</a>\
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" v-on:click="onBindAllow">允许</a>\
                        </div>\
                    </div>\
                </div>',
    data: function () {
        return Store.get();
    },
    computed: {
        renderValue: function() {
      
        }
    },
    methods: {        
        onBindDeny: function (e) {
            Store.set('auth.show', 0);
            Service.confirmAuthorize(false);
            Plugins.dispatch(EVT_HIDE_SIMULATOR);
        },
        onBindAllow: function (e) {
            Store.set('auth.show', 0);
            Service.confirmAuthorize(true);
            Plugins.dispatch(EVT_HIDE_SIMULATOR);
        }
    },
    beforeMount: function () {
        

    }
})