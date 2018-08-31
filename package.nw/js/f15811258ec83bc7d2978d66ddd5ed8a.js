'use strict';var _extends=Object.assign||function(a){for(var b,c=1;c<arguments.length;c++)for(var d in b=arguments[c],b)Object.prototype.hasOwnProperty.call(b,d)&&(a[d]=b[d]);return a};!function(require,directRequire){function a(a,b){if(a&&(a.contextMenus.removeAll(),b&&Array.isArray(b)))for(const c of b)c&&a.contextMenus.create(c)}function b(a,b,c){var d=Math.round;if(a&&b){a.contextMenus.removeAll();const e=a.getBoundingClientRect().left+b.left,f=a.getBoundingClientRect().top+b.top,g=new nw.Menu,h={};for(const a of b.items){if(!a)continue;(!a.id||h[a.id])&&(a.id=Math.random()+'');const b=new nw.MenuItem(_extends({},a,{label:a.title||a.label,id:void 0,click:()=>c({menuItemId:a.id})}));h[a.id]=b}const i=[];for(const a of b.items){if(!a)continue;if(!a.parentId||!h[a.parentId]){i.push(h[a.id]);continue}const b=h[a.parentId];b.submenu||(b.submenu=new nw.Menu),b.submenu.append(h[a.id])}for(const a of i)a&&g.append(a);g.popup(d(e),d(f))}}var c=c||{};const d=new WeakMap;c.enable=function(c,e){const f=function(a){e&&e.onShowContextMenu&&e.onShowContextMenu(a)},g=function(b){e&&e.onClickContextMenu&&e.onClickContextMenu(b);const d=(b&&b.menuItemId||'').replace(/\'/g,'\\\'');c.executeScript({code:`;(function() {
        var s = document.createElement('script')
        var sid = '__ctxmh__'
        s.id = sid
        s.text = \`;(function(window, document){
          if (typeof window.$contextMenuClicked === 'function') {
            window.$contextMenuClicked('${d}')
          }
          var scriptEl = document.getElementById('\${sid}')
          if (scriptEl) {
            scriptEl.remove()
            scriptEl = null
          }
          //# sourceURL=[__contextMenuHelper__]
        })(window, document);\`
        var node = document.head || document.body || document.documentElement
        if (node) {
          node.appendChild(s)
        }
        s = null
      })();`}),a(c,null)},h=function(d){const f=d.messageType;let h=d.messageText;const i=d.dialog;if('prompt'===f&&i&&h)if(h.startsWith('contextmenu:')){d.preventDefault(),h=h.replace(/^contextmenu\:/,''),a(c,null);try{const b=JSON.parse(h);e&&e.shouldShowContextMenu&&!e.shouldShowContextMenu(b)?i.cancel&&i.cancel():(a(c,b),i.ok&&i.ok('true'))}catch(a){i.cancel&&i.cancel()}}else if(h.startsWith('nwmenu:')){d.preventDefault(),h=h.replace(/^nwmenu\:/,''),a(c,null);try{const a=JSON.parse(h);e&&e.shouldShowContextMenu&&!e.shouldShowContextMenu(a)?i.cancel&&i.cancel():(b(c,a,g),i.ok&&i.ok('true'))}catch(a){i.cancel&&i.cancel()}}},i=()=>{a(c,null)};c.contextMenus.onClicked.addListener(g),c.contextMenus.onShow.addListener(f),c.addEventListener('dialog',h),c.addEventListener('contextmenu',i,!0),d.set(c,{showListener:f,clickListener:g,promptListener:h,contextmenuListener:i})},c.disable=function(a){const b=d.get(a);b&&('function'==typeof b.clickListener&&a.contextMenus.onClicked.removeListener(b.clickListener),'function'==typeof b.showListener&&a.contextMenus.onShow.removeListener(b.showListener),'function'==typeof b.promptListener&&a.removeEventListener('dialog',b.promptListener),'function'==typeof b.contextmenuListener&&a.removeEventListener('contextmenu',b.contextmenuListener,!0),d.delete(a))},module.exports=c}(require('lazyload'),require);