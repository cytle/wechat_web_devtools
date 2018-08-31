'use strict';!function(require,directRequire){const a=require('path'),b=require('./162bf2ee28b76d3b3d95b685cede4146.js'),c=require('./1bd2563d13db26950ae47494b2c34454.js'),d=require('./3a0e2a5a82dc34230808dd17fc084d06.js'),e=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./6242f55dbdfe53c2f07b7a51568311f2.js');module.exports=async function(d,h){const j=h.replace(/^\//,''),k=/\.js$/.test(j);await e.init(d);const i=await b(d),l=e.CACHE_KEYS.JS_SUBPACKAGE_GAME,m=a.posix.join(i.srcPath,h);let n=e.get(l,m);if(!n||global.appConfig.isDev){const b=i.getAllJSFiles(),o=await c(d),p=[],q=f.calculatePathSize(a.join(i.srcPath,j),g.gameWhiteFileExtName);for(let a=0,c=b.length;a<c;a++){const c=b[a];(k&&c==j||0==c.indexOf(j))&&p.push(`${c}`)}const r=[];k?r.push(`require('${j}')`):r.push(`require('${j}game.js')`);let s=Date.now()+''+Math.random();s=s.replace(/\./,'');const t=[`
      var total${s} = ${p.length}
      var scriptCounter${s} = ${p.length}
      var requireScriptAppended${s} = false

      var requireScript${s} = document.createElement('script')
      requireScript${s}.text = \`${r.join('\n')}\`
      var scriptLoaded = function(event) {
        if (this.__loaded) {
          return
        }
        this.__loaded = true
        scriptCounter${s}--

        // 进度。。。。
        var progress = (total${s} - scriptCounter${s})/total${s}
        alert('SUBPACKAGE_PROGRESS_' + progress + '_${q}_${h}')

        if (!requireScriptAppended${s} && scriptCounter${s} <= 0) {
          requireScriptAppended${s} = true
          document.head.appendChild(requireScript${s})
          alert('SUBPACKAGE_READY_${h}')
        }
      }
    `];for(let a=0,b=p.length;a<b;a++)t.push(`var script${a}${s} = document.createElement('script')
      script${a}${s}.src = '${p[a]}'
      script${a}${s}.onload = scriptLoaded.bind(script${a}${s})
      script${a}${s}.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          scriptLoaded.call(this)
        }
      }
      document.head.appendChild(script${a}${s})`);n=t.join('\n'),e.set(l,m,n)}return n}}(require('lazyload'),require);