'use strict';!function(require,directRequire){function a(a,b,c,d){c=0<c?c:1;let e=h(a,b,c);return`${d}\n${e}`}const b=require('fs'),c=require('path'),d=require('./3bfffbe88b3d923921f851c0697974fe.js'),e=require('./949d8235c744ced2a80121e4dba34c28.js'),f=require('./6242f55dbdfe53c2f07b7a51568311f2.js').errorPrefix,g=require('./libs/jsonlint.js').parser,h=require('babel-code-frame'),i=require('./162bf2ee28b76d3b3d95b685cede4146.js'),j=require('./a63026ab5a5a3c59a61a9749a18aa2ca.js');g.parseError=g.lexer.parseError=function(a,b){throw b};const k={};k.parseWXMLRuntimeErr=async(b)=>{let c=d.getCurrent(),e=b.message,g=[],h='',k='';if(f.WXML_PLUGIN_RUNTIME_ERROR_REG.test(e)){let a=f.WXML_PLUGIN_RUNTIME_ERROR_REG.exec(e);e=e.replace(f.WXML_PLUGIN_RUNTIME_ERROR_REG,'').replace(/`/g,'\\`'),g=e.split(':'),h=`插件: ${a[1]} 版本: ${a[2]} 文件:${g[0]}`;try{let a=await j(c);k=a.getFile(g[0])}catch(a){return{file:h,msg:e}}}else{e=e.replace(f.WXML_RUNTIME_ERROR_REG,'').replace(/`/g,'\\`'),e=e.replace('WXMLRT:',''),g=e.split(':'),h=g[0];try{let a=await i(c);k=a.getFile(h)}catch(a){return{file:h,msg:e}}}let l=parseInt(g[2]),m=parseInt(g[3]);if(-1!==l)try{let b=e.replace(`${g[0]}:${g[1]}:${g[2]}:${g[3]}:`,'').replace(/`/g,'"');e=a(k,l,m,b)}catch(a){}return{file:h,msg:e}},k.parseJsFileErr=async(a)=>{let b=a.file.replace(/\.js$/,''),c=a.project,d=await i(c),e=JSON.parse(d.getFile('app.json')),f=e.pages,g=f.findIndex((a)=>{return a==b});return{file:b,msg:` app.json.pages\n > | pages[${g}] : ${f[g]}`}},k.parseJsonContentErr=(a)=>{return{file:a.file,msg:a.data}},k.parseJsonEntranceErr=(a)=>{let b=JSON.parse(a.data),c=b.pages;return{file:a.file,msg:`未找到入口页面\napp.json 中定义的 pages : ${JSON.stringify(c)}`}},k.parseJsonFileErr=(a)=>{return{file:a.file,msg:`未找到入口 ${a.file} 文件，或者文件读取失败，请检查后重新编译。`}},k.parseJsonParseErr=(b)=>{let c=b.data;try{g.parse(c)}catch(b){let d=`Expecting ${b.expected}, got ${b.token}`,e=a(c,b.line,b.loc.first_column,d);return e}return b.error},k.parsePluginWxmlErr=async(b,c)=>{let d=(c||'').trim().split(':');try{if(d.length){let c=await j(b),e=parseInt(d[1].trim()),f=parseInt(d[2].trim()-1),g=a(c.getFile(d[0]),e,f,d[3]),h={file:d[0],msg:g};return h}}catch(a){return{file:'',msg:c}}},k.parseWxmlErr=async(b,c)=>{let d=(c||'').trim().split(':');try{if(d.length){let c=await i(b),e=parseInt(d[1].trim()),f=parseInt(d[2].trim()-1),g=a(c.getFile(d[0]),e,f,d[3]),h={file:d[0],msg:g};return h}}catch(a){return{file:'',msg:c}}},k.parseWxssErr=async(b,c)=>{try{if(c='object'==typeof c?c.msgForConsole:c,c=c.split('\n')[0],/not found from/.test(c)){let a=c.match(/ERR:.+?`(.+)`.+?`(.+)`/),b=a[1],d=a[2],e={file:d,msg:`File not found: ${b}`};return e}let d=c.match(/ERR:\s(.+)\((\d*):(\d*)\):\s*?(.+)/),e=parseInt(d[2]),f=parseInt(d[3]-1),g=d[4].replace(/`/g,'"'),h=d[1],j=await i(b),k=j.getFile(h),l=a(k,e,f,g);return{file:h,reason:g,msg:l}}catch(a){return{file:'',msg:c}}},module.exports=k}(require('lazyload'),require);