const path = require('path');
const fs = require('fs');
const Router = require('koa-router');
const router = Router();

const child = fs.readdirSync(path.resolve('./src/routes'));
function getModuleFromFilename(filename) {
  return filename.slice(0, -3)
}

function resolveFile (filepath) {
  let importedModel = require(filepath);
  ['get', 'post'].forEach(function (method) {
    if (typeof importedModel[method] !== 'undefined') {
      Object.keys(importedModel[method]).forEach(function (route) {
        router[method](`${getModuleFromFilename(path.normalize(path.resolve(filepath).substring(path.resolve(`./src/routes`).length)).split(path.sep).join('/'))}/${route}`, async function dsd(ctx, next) {
          const body = await importedModel[method][route](ctx, next);
          ctx.body = {
              code: 200,
              data: body
          }
        });
      })
    }
  })
}

function reDir(dir) {
  const child = fs.readdirSync(dir);
  for (let model of child) {
    const modelPath = path.resolve(`${dir}/${model}`);
    const dirStat = fs.statSync(modelPath);
    if (dirStat.isFile()) {
      resolveFile(modelPath);
    } else if (dirStat.isDirectory()) {
      reDir(modelPath)
    }
  }
}

for (let model of child) {
  if (model !== 'index.js') {
    const modelPath = path.resolve(`./src/routes/${model}`);
    const dirStat = fs.statSync(modelPath);
    if (dirStat.isFile()) {
      resolveFile(modelPath);
    } else if (dirStat.isDirectory()) {
      reDir(modelPath)
    }
  }
}

module.exports = router;
