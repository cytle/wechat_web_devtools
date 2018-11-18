;!function(require, directRequire){;"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const idePluginMessager=require('./e9e3fd38aeedddd6db73d1d015ff6952.js');global.debugTcb=(a=!0)=>{global.debuggingTcb=a;const b=idePluginMessager.get("cloudconsole");b.triggerOnEvent("DEBUG_STATE_CHANGED",a)};
;}(require("lazyload"), require);
