'use strict';!function(require,directRequire){const a=require('path'),b=require('./162bf2ee28b76d3b3d95b685cede4146.js'),c=require('./1bd2563d13db26950ae47494b2c34454.js'),d=require('./3a0e2a5a82dc34230808dd17fc084d06.js'),e=require('./2e9637e8a0816a626f7db9a0dee5efe8.js'),f=require('./d3976cc01aeebc5b09e11c4135b6bd8d.js'),g=require('./6242f55dbdfe53c2f07b7a51568311f2.js');module.exports=async function(d,h){const j=h.replace(/^\//,''),k=/\.js$/.test(j);await e.init(d);const i=await b(d),l=e.CACHE_KEYS.JS_SUBPACKAGE_GAME,m=a.posix.join(i.srcPath,h);let n=e.get(l,m);if(!n||global.appConfig.isDev){const b=i.getAllJSFiles(),o=await c(d),p=[],q=f.calculatePathSize(a.join(i.srcPath,j),g.gameWhiteFileExtName);for(let a=0,c=b.length;a<c;a++){const c=b[a];(k&&c==j||0==c.indexOf(j))&&p.push(`${c}`)}const r=[];let s='';s=k?j:`${j}game.js`,s=encodeURI(s),r.push(`var decodePathName = decodeURI("${s}")`),r.push(`require(decodePathName)`);let t=Date.now()+''+Math.random();t=t.replace(/\./,'');const u=[`
      var total${t} = ${p.length}
      var scriptCounter${t} = ${p.length}
      var requireScriptAppended${t} = false

      var requireScript${t} = document.createElement('script')
      requireScript${t}.text = \`${r.join('\n')}\`
      var scriptLoaded = function(event) {
        if (this.__loaded) {
          return
        }
        this.__loaded = true
        scriptCounter${t}--

        // 进度。。。。
        var progress = (total${t} - scriptCounter${t})/total${t}
        alert('SUBPACKAGE_PROGRESS_' + progress + '_${q}_${h}')

        if (!requireScriptAppended${t} && scriptCounter${t} <= 0) {
          requireScriptAppended${t} = true
          document.head.appendChild(requireScript${t})
          alert('SUBPACKAGE_READY_${h}')
        }
      }
    `];for(let a=0,b=p.length;a<b;a++)u.push(`var script${a}${t} = document.createElement('script')
      script${a}${t}.src = '${p[a]}'
      script${a}${t}.onload = scriptLoaded.bind(script${a}${t})
      script${a}${t}.onreadystatechange = function() {
        if (this.readyState == 'complete') {
          scriptLoaded.call(this)
        }
      }
      document.head.appendChild(script${a}${t})`);n=u.join('\n'),e.set(l,m,n)}return n}}(require('lazyload'),require);