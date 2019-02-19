;!function(require, directRequire){;'use strict';const path=require('path'),tools=require('./84b183688a46c9e2626d3e6f83365e13.js'),getAllPages=(a)=>{const b=[...a.pages];if(a.subPackages)for(const c of a.subPackages)for(const a of c.pages)b.push(tools.normalizePath(path.posix.join(c.root,a)));return b};module.exports={getAllPages};
;}(require("lazyload"), require);
