const fs = require('fs')
const path = require('path')
const UglifyJS = require('uglify-js')
const babel = require('babel-core')
const babelCodeFrame = require('babel-code-frame')
const sourcemap = require('source-map')
const getSourceMap = require('./cdbf7243dc99f8461acbb1d57af1d8ae.js')
const {tryTranslateSingleFile} = require('./9bf0a2234353851e1737ce759370bceb.js')

const {
  FILE_NOT_UTF8,
  BABEL_TRANS_JS_ERR,
  UGLIFY_JS_ERR,
  BABILI_JS_ERR,
  FILE_FLAT_ERR
} = require('./949d8235c744ced2a80121e4dba34c28.js')

module.exports = function processJS(code, query) {
  const {
    projectPath,
    file,
    es6,
    minified,
    sourceMaps,
    sourceFileName,
    uglifyFileName,
    nameMapping,
  } = query
  const beginTime = Date.now()
  console.log('process task', file)
  try {
    let map = getSourceMap(path.join(projectPath, file), code)
    if (es6 && es6.toLowerCase() === 'yes') {
      try {
        // 同时 ['es2015', 'stage-0', 'minify'] babel 会跪
        const trans = babel.transform(code, {
          presets: ['es2015', 'stage-0'],
          babelrc: false,
          sourceFileName: sourceFileName || file,
          inputSourceMap: map,
          sourceMaps,
          babelrc: false
        })

        code = trans.code
        map = trans.map
      } catch (error) {
        const message = `file: ${file}\n ${error.message}\n ${babelCodeFrame(code, error.loc.line, error.loc.column > 0 ? error.loc.column : 1)}`
        return {
          error: {
            message,
            code: BABEL_TRANS_JS_ERR
          }
        }
      }

      if (minified && minified.toLowerCase() === 'yes') {
        // Babel minify 有一个 bug，会把 `${abc}` === 123 变成 '123'+abc，导致逻辑错误。
        // try {
        //   let trans = babel.transform(`(function(){\n ${code} \n})()`, {
        //     presets: ['minify'],
        //     babelrc: false,
        //     inputSourceMap: map,
        //     sourceFileName: file,
        //     sourceMaps
        //   })

        //   code = trans.code
        //   map= trans.map
        // } catch (error) {
        //   let message = `file: ${file}\n ${error.message}\n ${babelCodeFrame(code, error.loc.line, error.loc.column > 0? error.loc.column: 1)}`
        //   const err = {
        //     message,
        //     code: BABILI_JS_ERR
        //   }
        //   throw err
        // }
        const sourceMapOptions = map ? {
          content: map,
          filename: file
        } : {
          content: null,
          filename: file
        }
        const result = UglifyJS.minify(code, {
          toplevel: true,
          sourceMap: sourceMapOptions,
        })

        if (result.error) {
          const message = `file: ${file}\n ${result.error.message}\n ${babelCodeFrame(code, result.error.line, result.error.col > 0 ? result.error.col : 1)}`
          // let message = JSON.stringify({
          //   file,
          //   error: `${result.error.line} - ${result.error.message}`
          // })
          return {
            error: {
              message,
              code: UGLIFY_JS_ERR,
            }
          }
        }
        code = result.code
        map = result.map
      }
    } else if (minified && minified.toLowerCase() === 'yes') {
      try {
        // 因为我们加了 （function(){
        // })()
        // 所以有以下恶心的逻辑
        if (map) {
          const consumer = new sourcemap.SourceMapConsumer(map)
          const generator = new sourcemap.SourceMapGenerator({
            file
          })

          consumer.eachMapping((mapping) => {
            if (typeof mapping.originalLine !== 'number' ||
              typeof mapping.originalColumn !== 'number') {
              return
            }

            const newMapping = {
              generated: {
                // 加一行
                line: mapping.generatedLine + 1,
                column: mapping.generatedColumn
              }
            }

            if (mapping.source != null) {
              newMapping.source = mapping.source
              newMapping.original = {
                line: mapping.originalLine,
                column: mapping.originalColumn
              }

              if (mapping.name != null) {
                newMapping.name = mapping.name
              }
            }

            generator.addMapping(newMapping)
          })

          consumer.sources.forEach(function (sourceFile) {
            const sourceRelative = sourceFile

            if (!generator._sources.has(sourceRelative)) {
              generator._sources.add(sourceRelative)
            }

            const content = consumer.sourceContentFor(sourceFile)
            if (content != null) {
              generator.setSourceContent(sourceFile, content)
            }
          })

          map = generator.toJSON()
        } else {
          const generator = new sourcemap.SourceMapGenerator({
            file
          })

          const codeLen = code.split('\n').length
          for (let i = 0; i < codeLen; i++) {
            generator.addMapping({
              generated: {
                line: i + 2,
                column: 0
              },
              original: {
                line: i + 1,
                column: 0
              },
              source: file
            })
          }

          generator._sources.add(file)
          generator.setSourceContent(file, code)
          map = generator.toJSON()
        }

        const trans = babel.transform(`(function(){\n${code}\n})()`, {
          presets: ['minify'],
          sourceMap: 'map',
          sourceFileName: sourceFileName || file,
          inputSourceMap: map,
          babelrc: false
        })


        code = trans.code
        map = trans.map
      } catch (error) {
        error.loc = error.loc || {}
        const message = `file: ${file}\n ${error.message}\n ${babelCodeFrame(code, error.loc.line, error.loc.column > 0 ? error.loc.column : 1)}`
        return {
          error: {
            message,
            code: BABILI_JS_ERR,
          }
        }
      }
    }

    // 文件名混淆
    if (uglifyFileName && uglifyFileName.toLowerCase() === 'yes') {
      if (nameMapping) {
        const nameMappingObject = JSON.parse(nameMapping)
        const uglifyResult = tryTranslateSingleFile({
          rootPath: projectPath,
          filePath: file,
          code: code,
          nameMapping: nameMappingObject,
          sourceMap: map,
          sourceFileName: sourceFileName || file,
          check: true,
        })

        if (uglifyResult.translated) {
          code = uglifyResult.translatedContent
          map = uglifyResult.translatedSourceMap || map
        } else {
          return {
            error: {
              message: uglifyResult.errMsg,
              code: FILE_FLAT_ERR
            }
          }
        }
      }
    }

    return {
      error: null,
      map: (map ? (typeof map === 'string' ? map : JSON.stringify(map)) : null),
      code
    }
  } catch (err) {
    return {
      error: {
        message: err.message
      }
    }
  }
}
