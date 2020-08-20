const path = require('path')
const fs = require('fs')

const uglifyjs = require('uglify-js')
const babel = require('@babel/core')

function babelBuild (fileIn, fileOut) {
  var origCode = fs.readFileSync(fileIn, 'utf8')

  const customOption = babel.loadOptions({
    presets: ['@babel/preset-env']
  })
  const ast = babel.parseSync(origCode, customOption)
  babel.transformFromAst(ast, '', (error, result) => {
    fs.writeFileSync(fileOut, result.code, 'utf8')
  })
}

function uglify (fileIn, fileOut) {
  var origCode = fs.readFileSync(fileIn, 'utf8')
  const result = uglifyjs.minify(origCode, {
    compress: true,
    mangle: true,
    sourceMap: {
      includeSources: true
    }
  })

  fs.writeFileSync(fileOut, result.code, 'utf8')
}

babelBuild(__dirname + '/origin/test.js', __dirname + '/target/test.babel.js')
uglify(__dirname + '/target/test.babel.js', __dirname + '/target/test.min.js')
