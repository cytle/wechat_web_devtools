
Vue.component('contact-dialog', {
    props: [],
    template:  '<div class="contact-dialog">\
                    <div class="contact-items">\
                        <div class="contact-row" v-for="item in contactdialog.mockData">\
                            <div v-if="contactdialog.type == \'user\'" class="contact-row_content" :data-id="item.id" v-on:click="onItemSelected">\
                                <img src="./images/radio-checked.png" class="radio-icon" v-if="item.checked" />\
                                <img src="./images/radio-unchecked.png" class="radio-icon" v-else />\
                                <img :src="item.headimage" class="contact-avatar" />\
                                <span class="contact-name">{{item.name}}</span>\
                            </div>\
                            <div v-if="contactdialog.type == \'department\'" class="contact-row_content" :data-id="item.id" v-on:click="onItemSelected">\
                                <img src="./images/radio-checked.png" class="radio-icon" v-if="item.checked" />\
                                <img src="./images/radio-unchecked.png" class="radio-icon" v-else />\
                                <span class="contact-folder-wrapper">\
                                    <img src="./images/department.png" class="contact-folder" />\
                                </span>\
                                <span class="contact-name">{{item.name}}</span>\
                            </div>\
                            <div v-else-if="contactdialog.type == \'external\'" class="contact-row_content" :data-id="item.id" v-on:click="onItemSelected">\
                                <img src="./images/radio-checked.png" class="radio-icon" v-if="item.checked" />\
                                <img src="./images/radio-unchecked.png" class="radio-icon" v-else />\
                                <img :src="item.headimage" class="contact-avatar" />\
                                <span class="contact-name">{{item.name}}</span>\
                                <span class="contact-subname green" v-if="item.type == 0">@微信</span>\
                                <span class="contact-subname yellow" v-if="item.type == 1">@{{item.corpname}}</span>\
                            </div>\
                        </div>\
                    </div>\
                    <div class="contact-bottombar">\
                        <template v-for="item in contactdialog.mockData">\
                            <template v-if="item.checked">\
                                <img :src="item.headimage" class="contact-bottombar_avatar" v-if="contactdialog.type != \'department\'" />\
                                <span class="contact-bottombar-text" v-else>{{item.name}}</span>\
                            </template>\
                        </template>\
                        <span class="contact-confirm-button contact-button" v-on:click="onBindConfirm">确定({{selectCount}})</span>\
                        <span class="contact-cancel-button contact-button" v-on:click="onBindCancel">取消</span>\
                    </div>\
                </div>',
    data: function () {
        return Store.get();
    },
    computed: {        
        selectCount: function() {
            let mockData = this.$data.contactdialog.mockData;
            let length = mockData.length;
            var count = 0;

            for(let i = 0; i < length; i++) {
                if(mockData[i].checked) {
                    count ++;
                }
            }

            return count;
        }
    },
    methods: {
        onItemSelected: function (e) {
            let id = e.currentTarget.dataset.id;
            let mockData = this.$data.contactdialog.mockData;  
            let context = this;          

            mockData.forEach(function(item) {
                if(item.id == id) {
                    item.checked = !item.checked;
                }else if (context.$data.contactdialog.isSingle) {
                    item.checked = false;
                }
            });            
        },
        onBindConfirm: function (e) {
            let data = [];
            let mockData = this.$data.contactdialog.mockData;    
            let type = this.$data.contactdialog.type;   

            mockData.forEach(function(item) {
                if(item.checked) {
                    if (type == 'user') {
                        data.push({
                            id: item.id,
                            avatar: item.avatar,
                            name: item.name 
                        });
                    } else if (type == 'external') {
                        data.push(item.id);
                    } else {
                        data.push({
                            id: item.id,
                            name: item.name
                        });
                    }
                }
            });                        

            Service.completeContactDialog(1, {
                type: type,
                list: data
            });
        },
        onBindCancel: function (e) {
            Service.completeContactDialog(0, {});
        }
    }    
})