const $processJS = () => require('./5a27be0d793ab227beb9ce4bd0a0331d.js')
const $gitAssistant = () => require('./10d189950315dfd1175f5ab19aab8480.js').gitassistant

const $isSameColorImage = () => {
  const {
    isSameColorImage,
  } = require('./cd620104bf2364be459176b37d86401b.js')
  return isSameColorImage
}

const $git = () => require('./ca1e7a270d7164f67bf37d499855bb54.js')

module.exports = async function processTask(pathName, query, body) {
  switch (pathName.toLowerCase()) {
    case '/gitassistant': {
      return $gitAssistant().handler(body)
    }
    case '/processjs': {
      return $processJS()(body, query)
    }

    case '/issamecolorimage': {
      return $isSameColorImage()(body, query)
    }

    case '/getgithead': {
      return $git().getGitHead(body, query)
    }

    case '/getgitenabled': {
      return $git().getGitEnabled(body, query)
    }

    case '/getgitstatus': {
      return $git().getGitStatus(body, query)
    }

    case '/getgitlinediffs': {
      return $git().getGitLineDiffs(body, query)
    }

    case '/getgitcommitfile': {
      return $git().getGitCommitFile(body, query)
    }

    default: {
      return {
        error: {
          message: 'invalid request'
        }
      }
    }
  }
}
