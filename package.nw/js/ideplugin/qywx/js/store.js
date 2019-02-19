
/* store 插件统一的存储控制部分 */
const Store = function() {
    // 主状态树的数据
    var _cacheData = {
        corpinfo: {
            corplist: [],
            state: 1,    //1: 加载中 2:加载完毕 3:加载失败   
            selected_corpid: '',
            show: 0
        },
        auth: {
            show: 0,
            api_name: '',
            app_name: '',
            app_logo: '',
            auth_content: ''
        },
        appinfo: {
            appName: '', 
            appImageUrl: ''
        },
        msgdialog: {
            show: 0,            
            msgText: '',
            buttonText: ''
        },
        contactdialog: {
            type: '',   // 枚举值：user、department、external
            show: 0,
            mockData: [],
            showBottomBar: 0,            
            isSingle: 0
        },
        profile: {
            show: 0
        }    
    };
    // mock对象的数据
    var _mockData = {
        user : [
            {
                avatar: 'http://p.qlogo.cn/bizmail/123/0',
                headimage: './images/officialAvatar1.png',
                name: '张三',
                id: 'zhangsan',
                checked: 0
            },
            {
                avatar: 'http://p.qlogo.cn/bizmail/234/0',
                headimage: './images/officialAvatar2.png',
                name: '李四',
                id: 'lisi',
                checked: 0
            },
            {
                avatar: 'http://p.qlogo.cn/bizmail/456/0',
                headimage: './images/officialAvatar3.png',
                name: '王五',
                id: 'wangwu',
                checked: 0
            }
        ],
        department: [
            {
                name: '设计部门',
                id: '12',
                checked: 0
            },
            {
                name: '研发部门',
                id: '23',
                checked: 0
            },
            {
                name: '销售部门',
                id: '34',
                checked: 0
            }
        ],
        external: [
            {
                type: 0,  // 0: 微信  1: 企业   
                name: '张三',
                headimage: './images/officialAvatar1.png',
                id: 'woo549Adfsdfiuu123',
                checked: 0
            },
            {
                type: 1,  
                name: '李四',
                corpname: '腾讯',
                headimage: './images/officialAvatar2.png',
                id: 'woo549Adfsdfiuu456',
                checked: 0
            },
            {
                type: 0,  
                name: '王五',                    
                headimage: './images/officialAvatar3.png',
                id: 'woo549Adfsdfiuu567',
                checked: 0
            },
        ],
        profile: {
            avatar: './images/officialAvatar2.png',
            en_name: 'curryzhang',
            zh_name: '张克力',
            station: '运营经理',
            tel: 18828865171,
            email: 'curryzhang@hao.com',
            corpname: '好再来信息咨询有限公司',
            department: '运营部'
        }
    };

    // 读取数据的接口，key：KEY1.KEY2.KEY3
    var get = function (key, defaultValue) {
        if (typeof (key) == 'undefined') {
            return _cacheData;
        } else {            
            let keys = key.split('.');
            let targetData = getNsDataByKey(key);

            return typeof(targetData[keys[keys.length - 1]]) == 'undefined' ? 
                defaultValue : targetData[keys[keys.length - 1]];
        }        
    }

    // 写入数据的接口，key：KEY1.KEY2.KEY3
    var set = function (key, value, defaultValue) {
        let keys = key.split('.');
        let targetData = getNsDataByKey(key);
        
        targetData[keys[keys.length - 1]] = typeof (value) == 'undefined' ? defaultValue : value;

        if (key == 'userState') {  // 如果是用户身份的处理，则调用JSAPI写入工具的缓存中
            if (typeof wechatide != 'undefined') {
                console.log('set user info:%o', _cacheData[key]);
                wechatide.invoke('SET_USER_INFO', _cacheData[key]);
            }
        }
    }

    var getNsDataByKey = function (key) {
        let keys = key.split('.');
        let tmpData;
         
        tmpData = _cacheData;
    
        for (let i = 0; i < keys.length - 1; i++) {
            if (typeof (tmpData[keys[i]]) === 'undefined') {
                tmpData[keys[i]] = {};
            }
    
            tmpData = tmpData[keys[i]];
        }
    
        return tmpData;
    }

     // 加载时自动执行JSAPI从开发者工具获取身份态
    var _readStateFromDevTool = function (){
        return new Promise(function(resolve, reject) {
            if (typeof wechatide != 'undefined') {
                wechatide.invoke('GET_USER_INFO', {})
                    .then(function(res){    
                        console.log('cache userinfo:%o', res);
                        _cacheData.userState = res;
                        resolve();
                    }).catch(function(err){
                        _cacheData.userState = {};
                        resolve();
                    });        
                }                     
            }
        );   
    }

    return  {
        set,
        get,  
        mockData: _mockData,      
        initFromCache: _readStateFromDevTool
    }
}();