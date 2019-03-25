const init = () => {
  window.loadSubApp = ({name, el, context}) => {
    switch (name) {
      case 'cloudFunctionsDebuggerFrontend': {
        const cssLinkEl = document.createElement('link')
        cssLinkEl.rel = 'stylesheet'
        cssLinkEl.href = '../static/cloud-function-debugger.css'
        document.head.appendChild(cssLinkEl)

        const s = document.createElement('script')
        s.src = '../js/common/cloud-functions-debugger-frontend/browser.js'
        s.onload = () => {
          window.cloudFunctionsDebuggerFrontend.renderApp(el, context)
        }
        document.head.appendChild(s)
      }
    }
  }

  if (window.onSubAppLoaderReady) {
    window.onSubAppLoaderReady()
  }

  const urlSearchParams = new URLSearchParams(location.search)
  if (urlSearchParams.get('autoload') === 'true') {
    console.log('[subapp loader] autoload starts...')

    const newDiv = document.createElement('div')
    newDiv.style.cssText = 'width: 100%; height: 100%;'
    const containerClassName = decodeURIComponent(urlSearchParams.get('containerClassName'))
    if (containerClassName) {
      newDiv.className = containerClassName
    }
    document.body.appendChild(newDiv)

    const app = decodeURIComponent(urlSearchParams.get('app'))
    console.log('[subapp loader] will autoload app: ', app)
    
    const context = JSON.parse(decodeURIComponent(urlSearchParams.get('context')))
    console.log('[subapp loader] app context ', context)

    window.loadSubApp({
      name: app,
      el: newDiv,
      context,
    })
  }
}

if (document.readyState === 'complete') {
  init()
} else {
  document.addEventListener('DOMContentLoaded', init)
}

window.onerror = function (e) {
  document.body.innerText = e.toString()
}
