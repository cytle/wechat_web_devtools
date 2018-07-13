'use strict';!function(require,directRequire){function a(){l={}}function b(b,c){d.extname(c);if('game.json'==c)return void a();for(var e in l)0==c.indexOf(e)&&delete l[e]}async function c(c){let d=await e(c);k&&k.srcPath==d.srcPath||(a(),k&&k.unWatch(b),k=d,k.watch(b))}const d=require('path'),e=require('./162bf2ee28b76d3b3d95b685cede4146.js'),f=require('./1bd2563d13db26950ae47494b2c34454.js'),g=require('./3a0e2a5a82dc34230808dd17fc084d06.js'),h=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),j=require('./6242f55dbdfe53c2f07b7a51568311f2.js');var k,l={};module.exports=async function(a,b){let e=b.replace(/^\//,''),g=/\.js$/.test(e);if(g||(e=d.posix.normalize(e+'/')),await c(a),!l[b]||!0){let c=k.getAllJSFiles(),q=await f(a),r=[],s=h.calculatePathSize(d.join(k.srcPath,e),j.gameWhiteFileExtName);for(var m=0,i=c.length;m<i;m++){let a=c[m];(g&&a==e||0==a.indexOf(e))&&r.push(`${a}`)}var n=[];g?n.push(`require('${e}')`):n.push(`require('${e}game.js')`);var o=Date.now()+''+Math.random();o=o.replace(/\./,'');var p=[`
      var total${o} = ${r.length}
      var scriptCounter${o} = ${r.length}
      var requireScriptAppended${o} = false

      var requireScript${o} = document.createElement('script')
      requireScript${o}.text = \`${n.join('\n')}\`
      var scriptLoaded = function(event) {
        if (this.__loaded) {
          return
        }
        this.__loaded = true
        scriptCounter${o}--

        // 进度。。。。
        var progress = (total${o} - scriptCounter${o})/total${o}
        alert('SUBPACKAGE_PROGRESS_' + progress + '_${s}_${b}')

        if (!requireScriptAppended${o} && scriptCounter${o} <= 0) {
          requireScriptAppended${o} = true
          document.head.appendChild(requireScript${o})
          alert('SUBPACKAGE_READY_${b}')
        }
      }
    `];for(let a=0,b=r.length;a<b;a++)p.push(`var script${a}${o} = document.createElement('script')
      script${a}${o}.src = '${r[a]}'
      script${a}${o}.onload = scriptLoaded.bind(script${a}${o})
      script${a}${o}.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          scriptLoaded.call(this)
        }
      }
      document.head.appendChild(script${a}${o})`);l[b]=p.join('\n')}return l[b]}}(require('lazyload'),require);