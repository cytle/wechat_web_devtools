const path = require('path')
const git = require('./0d657e9d4701812224e40d6b99666d3c.js')

var exports = exports || {}

function getRepo(dir) {
  const repo = git.open(dir)
  if (repo) {
    const realDir = repo.getWorkingDirectory()
    const relative = path.relative(realDir.toLowerCase(), dir.toLowerCase())
    if (relative && relative !== '.') {
      repo.release()
      return null
    }
  }
  return repo
}

exports.getGitHead = function getGitHead(body, query) {
  const {
    dir,
  } = query
  console.log('process task getgithead', dir)
  let result = null
  try {
    const repo = getRepo(dir)
    let head = null
    if (repo) {
      head = repo.getShortHead()
      result = {
        enabled: true,
        head: String(head || ''), // do not make json stringify crash
      }
      repo.release()
    } else {
      result = {
        enabled: false,
        head: null
      }
    }
  } catch (err) {
    result = {
      error: err.toString()
    }
  }
  return result
}

exports.getGitEnabled = function getGitEnabled(body, query) {
  const {
    dir,
  } = query
  let result = null
  try {
    const repo = getRepo(dir)
    if (repo) {
      result = {
        enabled: true
      }
      repo.release()
    } else {
      result = {
        enabled: false
      }
    }
  } catch (err) {
    result = {
      error: err.toString()
    }
  }
  return result
}

exports.getGitStatus = function getGitStatus(body, query) {
  const {
    dir,
  } = query
  let result
  try {
    const repo = getRepo(dir)
    if (repo) {
      const status = repo.getStatus() || {}
      result = {
        status,
      }
      repo.release()
    } else {
      result = {
        status: {}
      }
    }
  } catch (err) {
    result = {
      error: err.toString()
    }
  }
  return result
}

exports.getGitLineDiffs = function getGitLineDiffs(body, query) {
  const {
    dir,
    path,
  } = query
  let result
  try {
    const repo = getRepo(dir)
    if (repo) {
      const gitLineDiffs = repo.getLineDiffs(path, body, {
        ignoreEolWhitespace: false
      }) || []
      result = {
        gitLineDiffs,
      }
      repo.release()
    } else {
      result = {
        gitLineDiffs: []
      }
    }
  } catch (err) {
    result = {
      error: err.toString()
    }
  }
  return result
}

exports.getGitCommitFile = function getGitCommitFile(body, query) {
  const {
    dir,
    path,
  } = query
  let result
  try {
    const repo = getRepo(dir)
    if (repo) {
      const content = repo.getHeadBlob(path) || ''
      const stats = repo.getDiffStats(path) || null
      result = {
        content,
        stats,
      }
      repo.release()
    } else {
      result = {
        content: null,
        stats: null,
      }
    }
  } catch (err) {
    result = {
      error: err.toString()
    }
  }
  return result
}

module.exports = exports
