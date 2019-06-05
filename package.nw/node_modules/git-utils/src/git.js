const path = require('path')
const fs = require('fs-plus')
const {Repository} = require('../build/Release/git.node')

const statusIndexNew = 1 << 0
const statusIndexModified = 1 << 1
const statusIndexDeleted = 1 << 2
const statusIndexRenamed = 1 << 3
const statusIndexTypeChange = 1 << 4
const statusWorkingDirNew = 1 << 7
const statusWorkingDirModified = 1 << 8
const statusWorkingDirDelete = 1 << 9
const statusWorkingDirTypeChange = 1 << 10
const statusIgnored = 1 << 14

const modifiedStatusFlags =
  statusWorkingDirModified |
  statusIndexModified |
  statusWorkingDirDelete |
  statusIndexDeleted |
  statusWorkingDirTypeChange |
  statusIndexTypeChange

const newStatusFlags = statusWorkingDirNew | statusIndexNew

const deletedStatusFlags = statusWorkingDirDelete | statusIndexDeleted

const indexStatusFlags =
  statusIndexNew |
  statusIndexModified |
  statusIndexDeleted |
  statusIndexRenamed |
  statusIndexTypeChange

Repository.prototype.release = function () {
  for (let submodulePath in this.submodules) {
    const submoduleRepo = this.submodules[submodulePath]
    if (submoduleRepo) submoduleRepo.release()
  }
  return this._release()
}

Repository.prototype.getWorkingDirectory = function () {
  if (!this.workingDirectory) {
    this.workingDirectory = this._getWorkingDirectory()
    if (this.workingDirectory) this.workingDirectory = this.workingDirectory.replace(/\/$/, '')
  }
  return this.workingDirectory
}

Repository.prototype.getShortHead = function () {
  const head = this.getHead()
  if (head == null) return head
  if (head.startsWith('refs/heads/')) return head.substring(11)
  if (head.startsWith('refs/tags/')) return head.substring(10)
  if (head.startsWith('refs/remotes/')) return head.substring(13)
  if (head.match(/[a-fA-F0-9]{40}/)) return head.substring(0, 7)
  return head
}

Repository.prototype.isStatusModified = function (status = 0) {
  return (status & modifiedStatusFlags) > 0
}

Repository.prototype.isPathModified = function (path) {
  return this.isStatusModified(this.getStatus(path))
}

Repository.prototype.isStatusNew = function (status = 0) {
  return (status & newStatusFlags) > 0
}

Repository.prototype.isPathNew = function (path) {
  return this.isStatusNew(this.getStatus(path))
}

Repository.prototype.isStatusDeleted = function (status = 0) {
  return (status & deletedStatusFlags) > 0
}

Repository.prototype.isPathDeleted = function (path) {
  return this.isStatusDeleted(this.getStatus(path))
}

Repository.prototype.isPathStaged = function (path) {
  return this.isStatusStaged(this.getStatus(path))
}

Repository.prototype.isStatusIgnored = function (status = 0) {
  return (status & statusIgnored) > 0
}

Repository.prototype.isStatusStaged = function (status = 0) {
  return (status & indexStatusFlags) > 0
}

Repository.prototype.getUpstreamBranch = function (branch) {
  if (branch == null) branch = this.getHead()
  if (!branch || !branch.startsWith('refs/heads/')) return null
  const shortBranch = branch.substring(11)

  const branchMerge = this.getConfigValue(`branch.${shortBranch}.merge`)
  if (!branchMerge || !branchMerge.startsWith('refs/heads/')) return null
  const shortBranchMerge = branchMerge.substring(11)

  const branchRemote = this.getConfigValue(`branch.${shortBranch}.remote`)
  if (!branch || branch.length === 0) return null

  return `refs/remotes/${branchRemote}/${shortBranchMerge}`
}

Repository.prototype.getAheadBehindCount = function (branch = 'HEAD') {
  if (branch !== 'HEAD' && !branch.startsWith('refs/heads/')) {
    branch = `refs/heads/${branch}`
  }

  const headCommit = this.getReferenceTarget(branch)
  if (!headCommit || headCommit.length === 0) return {ahead: 0, behind: 0}

  const upstream = this.getUpstreamBranch()
  if (!upstream || upstream.length === 0) return {ahead: 0, behind: 0}

  const upstreamCommit = this.getReferenceTarget(upstream)
  if (!upstreamCommit || upstreamCommit.length === 0) return {ahead: 0, behind: 0}

  return this.compareCommits(headCommit, upstreamCommit)
}

Repository.prototype.getAheadBehindCountAsync = function (branch = 'HEAD') {
  if (branch !== 'HEAD' && !branch.startsWith('refs/heads/')) {
    branch = `refs/heads/${branch}`
  }

  const headCommit = this.getReferenceTarget(branch)
  if (!headCommit || headCommit.length === 0) return {ahead: 0, behind: 0}

  const upstream = this.getUpstreamBranch()
  if (!upstream || upstream.length === 0) return {ahead: 0, behind: 0}

  const upstreamCommit = this.getReferenceTarget(upstream)
  if (!upstreamCommit || upstreamCommit.length === 0) return {ahead: 0, behind: 0}

  return performAsyncWork(this, done => this.compareCommitsAsync(
    done,
    headCommit,
    upstreamCommit
  ))
}

Repository.prototype.checkoutReference = function (branch, create) {
  if (branch.indexOf('refs/heads/') !== 0) branch = `refs/heads/${branch}`
  return this.checkoutRef(branch, create)
}

Repository.prototype.relativize = function (path) {
  let workingDirectory
  if (!path) return path

  if (process.platform === 'win32') {
    path = path.replace(/\\/g, '/')
  } else {
    if (path[0] !== '/') return path
  }

  if (this.caseInsensitiveFs) {
    const lowerCasePath = path.toLowerCase()

    workingDirectory = this.getWorkingDirectory()
    if (workingDirectory) {
      workingDirectory = workingDirectory.toLowerCase()
      if (lowerCasePath.startsWith(`${workingDirectory}/`)) {
        return path.substring(workingDirectory.length + 1)
      } else if (lowerCasePath === workingDirectory) {
        return ''
      }
    }

    if (this.openedWorkingDirectory) {
      workingDirectory = this.openedWorkingDirectory.toLowerCase()
      if (lowerCasePath.startsWith(`${workingDirectory}/`)) {
        return path.substring(workingDirectory.length + 1)
      } else if (lowerCasePath === workingDirectory) {
        return ''
      }
    }
  } else {
    workingDirectory = this.getWorkingDirectory()
    if (workingDirectory) {
      if (path.startsWith(`${workingDirectory}/`)) {
        return path.substring(workingDirectory.length + 1)
      } else if (path === workingDirectory) {
        return ''
      }
    }

    if (this.openedWorkingDirectory) {
      if (path.startsWith(`${this.openedWorkingDirectory}/`)) {
        return path.substring(this.openedWorkingDirectory.length + 1)
      } else if (path === this.openedWorkingDirectory) {
        return ''
      }
    }
  }

  return path
}

Repository.prototype.submoduleForPath = function (path) {
  path = this.relativize(path)
  if (!path) return null

  for (let submodulePath in this.submodules) {
    const submoduleRepo = this.submodules[submodulePath]
    if (path === submodulePath) {
      return submoduleRepo
    } else if (path.startsWith(`${submodulePath}/`)) {
      path = path.substring(submodulePath.length + 1)
      return submoduleRepo.submoduleForPath(path) || submoduleRepo
    }
  }

  return null
}

Repository.prototype.isWorkingDirectory = function (path) {
  if (!path) return false

  if (process.platform === 'win32') {
    path = path.replace(/\\/g, '/')
  } else {
    if (path[0] !== '/') return false
  }

  if (this.caseInsensitiveFs) {
    const lowerCasePath = path.toLowerCase()
    const workingDirectory = this.getWorkingDirectory()
    if (workingDirectory && workingDirectory.toLowerCase() === lowerCasePath) return true
    if (this.openedWorkingDirectory && this.openedWorkingDirectory.toLowerCase() === lowerCasePath) return true
  } else {
    return path === this.getWorkingDirectory() || path === this.openedWorkingDirectory
  }

  return false
}

const {getHeadAsync, getStatus, getStatusAsync, getStatusForPath} = Repository.prototype
delete Repository.prototype.getStatusForPath

Repository.prototype.getStatusForPaths = function (paths) {
  if (paths && paths.length > 0) {
    return getStatus.call(this, paths)
  } else {
    return {}
  }
}

Repository.prototype.getStatus = function (path) {
  if (typeof path === 'string') {
    return getStatusForPath.call(this, path)
  } else {
    return getStatus.call(this)
  }
}

Repository.prototype.getHeadAsync = function () {
  return performAsyncWork(this, done => getHeadAsync.call(this, done))
}

Repository.prototype.getStatusAsync = function () {
  return performAsyncWork(this, done => getStatusAsync.call(this, done))
}

Repository.prototype.getStatusForPathsAsync = function (paths) {
  return performAsyncWork(this, done => getStatusAsync.call(this, done, paths))
}

function performAsyncWork (repo, fn) {
  fn = promisify(fn)

  if (repo._lastAsyncPromise) {
    repo._lastAsyncPromise = repo._lastAsyncPromise.then(fn, fn)
  } else {
    repo._lastAsyncPromise = fn()
  }
  return repo._lastAsyncPromise
}

function promisify (fn) {
  return () => new Promise((resolve, reject) =>
    fn((error, result) => error ? reject(error) : resolve(result))
  )
}

function realpath (unrealPath) {
  try {
    return fs.realpathSync(unrealPath)
  } catch (e) {
    return unrealPath
  }
}

function isRootPath (repositoryPath) {
  if (process.platform === 'win32') {
    return /^[a-zA-Z]+:[\\/]$/.test(repositoryPath)
  } else {
    return repositoryPath === path.sep
  }
}

function openRepository (repositoryPath, search) {
  const symlink = realpath(repositoryPath) !== repositoryPath

  if (process.platform === 'win32') repositoryPath = repositoryPath.replace(/\\/g, '/')
  const repository = new Repository(repositoryPath, search)
  if (repository.exists()) {
    repository.caseInsensitiveFs = fs.isCaseInsensitive()
    if (symlink) {
      const workingDirectory = repository.getWorkingDirectory()
      while (!isRootPath(repositoryPath)) {
        if (realpath(repositoryPath) === workingDirectory) {
          repository.openedWorkingDirectory = repositoryPath
          break
        }
        repositoryPath = path.resolve(repositoryPath, '..')
      }
    }
    return repository
  } else {
    return null
  }
}

function openSubmodules (repository) {
  repository.submodules = {}

  for (let relativePath of repository.getSubmodulePaths()) {
    if (relativePath) {
      const submodulePath = path.join(repository.getWorkingDirectory(), relativePath)
      const submoduleRepo = openRepository(submodulePath, false)
      if (submoduleRepo) {
        if (submoduleRepo.getPath() === repository.getPath()) {
          submoduleRepo.release()
        } else {
          openSubmodules(submoduleRepo)
          repository.submodules[relativePath] = submoduleRepo
        }
      }
    }
  }
}

exports.open = function (repositoryPath, search = true) {
  const repository = openRepository(repositoryPath, search)
  if (repository) openSubmodules(repository)
  return repository
}
