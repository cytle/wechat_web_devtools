(function(a){function b(d){if(c[d])return c[d].exports;var e=c[d]={i:d,l:!1,exports:{}};return a[d].call(e.exports,e,e.exports,b),e.l=!0,e.exports}var c={};return b.m=a,b.c=c,b.i=function(a){return a},b.d=function(a,c,d){b.o(a,c)||Object.defineProperty(a,c,{configurable:!1,enumerable:!0,get:d})},b.n=function(a){var c=a&&a.__esModule?function(){return a['default']}:function(){return a};return b.d(c,'a',c),c},b.o=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},b.p='',b(b.s=318)})({318:function(){const a={};let b=1;const c={Run:'run',TriggerOnMessage:'triggerOnMsg'},d={WeixinWorkerInvoke:'WeixinWorkerInvoke'},e=`
  WeixinWorker = {}
  WeixinWorker.create = scriptName => {
    self.postMessage({
      type: 'WeixinWorkerInvoke',
      method: 'create',
      arguments: [WeixinWorker.__workerId__, scriptName],
    })
  }
  WeixinWorker.terminate = workerId => {
    self.postMessage({
      type: 'WeixinWorkerInvoke',
      method: 'terminate',
      arguments: [WeixinWorker.__workerId__, workerId],
    })
  }
  WeixinWorker.postMsgToWorker = (workerId, msg) => {
    self.postMessage({
      type: 'WeixinWorkerInvoke',
      method: 'postMsgToWorker',
      arguments: [WeixinWorker.__workerId__, workerId, msg],
    })
  }
  WeixinWorker.postMsgToAppService = msg => {
    try {
      self.postMessage({
        type: 'WeixinWorkerInvoke',
        method: 'postMsgToAppService',
        arguments: [WeixinWorker.__workerId__, JSON.parse(msg)],
      })
    } catch (err) {
      console.error('send msg to appservice error: ', err)
    }
  }
`;WeixinWorker.create=()=>{const f=new __global.Worker('__workerasdebug__/weixinworker.js');if(a[b]=f,f.onmessage=(a)=>{if(a.data)switch(a.data.type){case d.WeixinWorkerInvoke:{switch(a.data.method){case'postMsgToAppService':{a.data.arguments&&a.data.arguments.length&&WeixinWorker.workerMsgHandler&&WeixinWorker.workerMsgHandler.apply(WeixinWorker,a.data.arguments);break}case'postMsgToWorker':{a.data.arguments&&a.data.arguments.length&&__WeixinWorker.postMsgToWorker.apply(__WeixinWorker,a.data.arguments);break}}break}}},f.postMessage({type:c.Run,code:e+`\nWeixinWorker.__workerId__ = ${b}`}),f.postMessage({type:c.Run,code:`__wxConfig = ${JSON.stringify(__wxConfig)}`}),!__workerVendors__||!__workerVendorCode__)throw new Error('missing worker vendor code');for(let a,b=0,d=__workerVendors__.length;b<d;b++){if(a=__workerVendorCode__[__workerVendors__[b]],!a)throw new Error(`missing worker vendor code`);f.postMessage({type:c.Run,code:a})}if(!__workersCode__)throw new Error('missing workers code');for(let a in __workersCode__){let b=__workersCode__[a];f.postMessage({type:c.Run,code:b})}return b++,b-1},WeixinWorker.terminate=(b)=>{const c=a[b];c&&(c.terminate(),delete a[b])},WeixinWorker.postMsgToWorker=(b,d)=>{const e=a[b];if(e)try{e.postMessage({type:c.TriggerOnMessage,msg:JSON.parse(d)})}catch(a){console.error('post msg to worker err: [workerId] ',b,' [msg] ',d)}}}});