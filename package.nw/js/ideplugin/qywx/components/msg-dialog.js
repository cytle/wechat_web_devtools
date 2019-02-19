

Vue.component('msg-dialog', {    
    template:   '<div class="authrize-dialog">\
                    <div class="weui-mask"></div>\
                    <div class="weui-dialog">\
                        <div class="weui-dialog__bd">{{msgdialog.msgText}}</div>\
                        <div class="weui-dialog__ft">\
                            <a href="javascript:;" class="weui-dialog__btn weui-dialog__btn_primary" v-on:click="onBindClose">{{msgdialog.buttonText}}</a>\
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
        onBindClose: function () {
            Plugins.dispatch(EVT_HIDE_SIMULATOR);
            Store.set('msgdialog.show', 0);
        }
    },
    beforeMount: function () {
    }
})