;!function(require, directRequire){;"use strict";async function private_openUrl(a,b){if(global.autoTest)return{errMsg:`${b.api}:ok`};const c=b.args.url;return c&&/^https?:\/\//i.test(c)?(nw.Shell.openExternal(c),{errMsg:`${b.api}:ok`}):{errMsg:`${b.api}:fail invalid protocol`}}module.exports={private_openUrl};
;}(require("lazyload"), require);
