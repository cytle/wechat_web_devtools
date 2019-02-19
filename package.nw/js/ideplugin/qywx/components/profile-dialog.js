

Vue.component('profile-dialog', {    
    template:   '<div class="profile-dialog">\
                    <div class="profile-header">\
                        <img :src="profile.mockData.avatar" class="profile-avatar" />\
                        <div class="profile-header-content">\
                            <span class="profile-en-name">{{profile.mockData.en_name}}</span>\
                            <img src="./images/male.png" class="profile-male" />\
                            <div class="profile-zh-name">{{profile.mockData.zh_name}}</div>\
                            <div class="profile-station">{{profile.mockData.station}}</div>\
                        </div>\
                    </div>\
                    <div class="profile-detail">\
                        <div class="weui-cells">\
                            <a class="weui-cell" href="javascript:;">\
                                <div class="weui-cell__labal">\
                                    <p>手机</p>\
                                </div>\
                                <div class="weui-cell__ft blue">{{profile.mockData.tel}}</div>\
                            </a>\
                            <a class="weui-cell" href="javascript:;">\
                                <div class="weui-cell__labal">\
                                    <p>邮箱</p>\
                                </div>\
                                <div class="weui-cell__ft blue">{{profile.mockData.email}}</div>\
                            </a>\
                            <a class="weui-cell" href="javascript:;">\
                                <div class="weui-cell__labal">\
                                    <p>部门</p>\
                                </div>\
                                <div class="weui-cell__ft">{{profile.mockData.corpname}}</div>\
                            </a>\
                        </div>\
                        <div class="button-group">\
                            <div class="button button-blue" v-on:click="onBindClose">发消息</div>\
                            <div class="button button-light" v-on:click="onBindClose">语音通话</div>\
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
            Store.set('profile.show', 0);
        }
    },
    beforeMount: function () {
    }
})