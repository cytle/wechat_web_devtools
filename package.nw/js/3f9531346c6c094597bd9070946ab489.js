'use strict';!function(require,directRequire){function a(){j={}}function b(b,c){d.extname(c);if('game.json'==c)return void a();for(var e in j)0==c.indexOf(e)&&delete j[e]}async function c(c){let d=await e(c);h&&h.srcPath==d.srcPath||(a(),h&&h.unWatch(b),h=d,h.watch(b))}const d=require('path'),e=require('./162bf2ee28b76d3b3d95b685cede4146.js'),f=require('./1bd2563d13db26950ae47494b2c34454.js'),g=require('./3a0e2a5a82dc34230808dd17fc084d06.js');var h,j={};module.exports=async function(a,b){let e=b.replace(/^\//,''),k=/\.js$/.test(e);if(k||(e=d.posix.normalize(e+'/')),await c(a),!j[b]||global.appConfig.isDev){let c=h.getAllJSFiles(),d=await f(a),p=[],q=0;for(var l=0,i=c.length;l<i;l++){let b=c[l];if(k&&b==e||0==b.indexOf(e)){let c=await g(a,b,'utf8');c&&(q+=c.length),p.push(`${b}`)}}var m=[];k?m.push(`require('${e}')`):m.push(`require('${e}game.js')`);var n=Date.now()+''+Math.random();n=n.replace(/\./,'');var o=[`
      var total${n} = ${p.length}
      var scriptCounter${n} = ${p.length}
      var requireScriptAppended${n} = false

      var requireScript${n} = document.createElement('script')
      requireScript${n}.text = \`${m.join('\n')}\`
      var scriptLoaded = function(event) {
        if (this.__loaded) {
          return
        }
        this.__loaded = true
        scriptCounter${n}--

        // 进度。。。。
        var progress = (total${n} - scriptCounter${n})/total${n}
        alert('SUBPACKAGE_PROGRESS_' + progress + '_${q}_${b}')

        if (!requireScriptAppended${n} && scriptCounter${n} <= 0) {
          requireScriptAppended${n} = true
          document.head.appendChild(requireScript${n})
          alert('SUBPACKAGE_READY_${b}')
        }
      }
    `];for(let a=0,b=p.length;a<b;a++)o.push(`var script${a}${n} = document.createElement('script')
      script${a}${n}.src = '${p[a]}'
      script${a}${n}.onload = scriptLoaded.bind(script${a}${n})
      script${a}${n}.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          scriptLoaded.call(this)
        }
      }
      document.head.appendChild(script${a}${n})`);j[b]=o.join('\n')}return j[b]}}(require('lazyload'),require);