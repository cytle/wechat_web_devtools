;!function(require, directRequire){;'use strict';const LEVEL_TO_CONSOLE={debug:'debug',log:'log',info:'info',warn:'warn',error:'error'},show=(a,b,c)=>{const d=encodeURIComponent(c),e=`console.${LEVEL_TO_CONSOLE[b]}(decodeURIComponent(\`${d}\`))`;a.executeScript({code:e})};module.exports=(a,b,c)=>{'clear'===b?a.executeScript({code:'console.clear()'}):show(a,b,c)};
;}(require("lazyload"), require);
