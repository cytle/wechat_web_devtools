'use strict';!function(require,directRequire){const a=require('glob'),b=require('fs'),c=require('path'),d=require('mkdir-p'),e=require('./eef4ce0c7ba11eb89c58f566edadbd28.js');module.exports=(f,g)=>{d.sync(g);const h=c.join(f,'app.json'),i=JSON.parse(b.readFileSync(h,'utf8'));let j=i.pages,k=a.sync(`**/*.js`,{cwd:f}),l=[],m={"app.js":!0},n=b.readFileSync(c.join(f,'app.js'),'utf8');b.writeFileSync(c.join(g,'app.js'),`module.exports = function(define, require, App, Page, getApp, wx) {
define('app.js', function(require, module, exports) {
${n}
})
require('app.js')}
${e('app.js',n,2)}
`),l.push('app.js');let o='var global={};var __wxAppData = {};var __wxRoute;var __wxRouteBegin;';return j.forEach((a)=>{let h=`${a}.js`;m[h]=!0;let i=b.readFileSync(c.join(f,`${a}.js`),'utf8'),j=c.join(g,`${a}.js`),k=c.dirname(j);d.sync(k),b.writeFileSync(j,`module.exports = function(define, require, App, Page, getApp, wx) {
__wxRoute = '${a}';__wxRouteBegin = true;
define('${a}.js', function(require, module, exports) {
${i}
})
require('${a}.js')}
${e(a+'.js',i,3)}
`),l.push(h)}),k.forEach((a)=>{let h=a;if(!m[h]){let i=b.readFileSync(c.join(f,a),'utf8'),j=c.join(g,a),k=c.dirname(j);d.sync(k),b.writeFileSync(j,`module.exports = function(define, require, App, Page, getApp, wx) {
${o}
define('${a}', function(require, module, exports) {
${i}
})}
${e(a,i,3)}
  `),o='',l.unshift(h)}}),l}}(require('lazyload'),require);