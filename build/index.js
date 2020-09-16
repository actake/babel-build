const fs = require('fs');
const path = require('path');
const uglifyjs = require('uglify-js');
const babel = require('@babel/core');

const ROOT_PATH = process.cwd();

// 编译配置，包括源文件夹和目标文件夹
const CONFIG = {
  origin: 'build/origin',
  target: 'build/target',
};
// babel 编译配置
const BABEL_OPTION = babel.loadOptions({
  presets: ['@babel/preset-env'],
});
// 压缩配置
const MINIFY_OPTION = {
  compress: true,
  mangle: true,
  sourceMap: {
    includeSources: true,
  },
};

// 将 js 代码编译、压缩
function buildJsCode(originCode) {
  return new Promise((resolve, reject) => {
    try {
      const { code: codeAfterBabelBuild } = babel.transformSync(
        originCode,
        BABEL_OPTION,
      );
      const { code: codeAfterUglifyBuild } = uglifyjs.minify(
        codeAfterBabelBuild,
        MINIFY_OPTION,
      );
      const code = codeAfterUglifyBuild;
      resolve(code);
    } catch (error) {
      reject(error);
    }
  });
}

// 将 js 文件编译、压缩
async function buildJsFile(filePath) {
  if (!filePath) {
    return;
  }
  const originCode = fs.readFileSync(filePath, 'utf8');
  return buildJsCode(originCode)
    .then(code => {
      console.log(`${filePath} build success!`);
      return code;
    })
    .catch(error => {
      console.log(`${filePath} build error!`);
      console.log(error);
    });
}

// 编译文件夹，目前只支持编译 js 文件
// todo：添加 less 文件编译
function buildFolder(originFolder, targetFolder) {
  if (!originFolder || !targetFolder) {
    return;
  }
  const absoluteFolderPath = path.join(ROOT_PATH, originFolder);
  fs.readdir(absoluteFolderPath, (error, files) => {
    if (error) {
      return;
    }
    files.forEach(async fileName => {
      const absoluteOriginFile = path.join(
        ROOT_PATH,
        `${originFolder}/${fileName}`,
      );
      const absoluteTargetFile = path.join(
        ROOT_PATH,
        `${targetFolder}/${fileName}`,
      );
      if (fileName.includes('.js')) {
        const code = await buildJsFile(absoluteOriginFile);
        fs.writeFileSync(absoluteTargetFile, code, 'utf8');
        console.log(`${absoluteTargetFile} write success!`);
      }
    });
  });
}

// 启动函数
buildFolder(CONFIG.origin, CONFIG.target);
