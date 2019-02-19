;!function(require, directRequire){;'use strict';async function getClipboardData(a,b){const c=nw.Clipboard.get(),d=c.get('text');return{errMsg:`${b.api}:ok`,data:d}}async function setClipboardData(a,b){const c=nw.Clipboard.get();return c.set(b.args.data,'text'),{errMsg:`${b.api}:ok`}}module.exports={getClipboardData,setClipboardData};
;}(require("lazyload"), require);
