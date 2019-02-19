/**
 * 企业选择组件
 */

Vue.component('choose-company', {
    props: ['selected'],
    template: '<div class="corps_list">\
                    <div class="corp_content_container" v-if="corpinfo.state == 2">\
                        <div v-if="corpinfo && corpinfo.corplist.length > 0">\
                            <div class="corps_title">选择企业</div>\
                            <div class="corp_item_row" v-for="item in corpinfo.corplist">\
                                <div class="corp_item_line selected" v-on:click="onSelectCorpItem" :data-id="item.scorp_id" v-if="item.isSelected">\
                                    {{item.name}}\
                                </div>\
                                <div class="corp_item_line" v-on:click="onSelectCorpItem"  :data-id="item.scorp_id" v-else >\
                                    {{item.name}}\
                                </div>\
                                <span class="corp_select_state" v-if="item.scorp_id == corpinfo.selected_corpid">✓</span>\
                                <img src="./images/right-arrow.png" class="corp_select_arrow" />\
                            </div>\
                        </div>\
                        <div class="corp_empty_content" v-else>\
                            <img src="./images/corp_empty.png" class="corp_empty_icon_holder">\
                            <div class="corp_empty_text">暂未加入企业</div>\
                            <div class="corp_regiter_button" v-on:click="onBindGuideWxWork">注册企业微信</div>\
                        </div>\
                    </div>\
                    <div v-else-if="corpinfo.state == 1" class="corp_loading_container">\
                        <div class="weui-mask_transparent"></div>\
                        <div class="weui-toast">\
                            <i class="weui-loading weui-icon_toast"></i>\
                            <p class="weui-toast__content">加载中</p>\
                        </div>\
                    </div>\
               </div>',
    data: function () {
        return Store.get();
    },
    computed: {        
    },
    methods: {
        onSelectCorpItem: function (e) {
            let scorp_id = e.target.dataset.id;

            if(scorp_id) {
                Plugins.dispatch(EVT_CORP_SELECTED, {
                    scorp_id: scorp_id
                });
            }
        },
        onBindGuideWxWork: function() {
            wechatide.invoke('GOTO', {
                url: G_APP_CONFIG.wxwork_register
            })
        }
    },
    beforeMount: function () {
        var context = this;


    }
})