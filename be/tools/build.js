var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
const path = require('path');
var compiler = webpack(webpackConfig);
const {
    spawn
} = require('child_process');
let serverProcess = null;
// compiler.hooks.compiler.tap('done', function () {
//     console.log('编译完成');
//     startServer();
// });
compiler.watch({

}, function (){
    console.log('监听运行中');
    startServer();
});
function startServer() {
    serverProcess = spawn('node', [path.join(__dirname, '../dist/main.js')]);
    serverProcess.stdout.on('data', function (data) {
        console.log(data);
    });
    serverProcess.stderr.on('data', function (data) {
        console.log('err--', data.toString());
    });
    serverProcess.on('close', function () {
        console.log('服务器关闭');
    });
    console.log('启动服务器');
}