const webpack = require('webpack');
const chalk = require('chalk');
const path = require('path');
const passport = require('passport');
const webpackDevServer = require('webpack-dev-server');
const proxy = require('http-proxy-middleware');
const spawn = require('cross-spawn');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('../tools/webpack.config');
const request = require('request');
const chokidar = require('chokidar');
webpackConfig.entry.main.unshift('webpack-hot-middleware/client?noInfo=true&reload=true');
webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin());
webpackConfig.plugins.push(new webpack.NamedModulesPlugin());
const compiler = webpack(webpackConfig);
const hotMiddleware = webpackHotMiddleware(compiler);
let childProcess = null;
let server = null;
let timer = null;
function startBe(type, type2, cpath) {
    clearTimeout(timer);
    timer = setTimeout(function () {
        if (childProcess && childProcess.kill) {
            process.kill(childProcess.pid);
            childProcess = null;
        }
        childProcess = spawn('node', ['start.js'], {
            cwd: path.join(__dirname, '../be'),
        });
        childProcess.stdout.on('data', function (data) {
            console.log(chalk.green('后台输出：', data));
        });
        childProcess.stderr.on('data', function (data) {
            console.log(chalk.blue('后台报错：', data));
        });
        childProcess.on('close', function (data) {
            console.log(chalk.yellow('后台终止：', data));
        });
    }, 200);
}
startBe();
const watcher = chokidar.watch(path.join(__dirname, '../be'), {
    persistent: true,
    ignored: function (path2) {
        return /(?:node_modules|\/dist\/|\/\.git\/|be\/\.|__test)/.test(path2);
    },
});
watcher.on('all', startBe.bind(null, 'change'))
server = new webpackDevServer(compiler, {
    publicPath: webpackConfig.output.publicPath,
    historyApiFallback: {
        rewrites: [
            { from: /^\/.*$/, to: '/dist/index.html' },
        ],
    },
    before(app) {
        app.use(require('cookie-parser')());
        // mock请求不能拦截
        app.use('/mock/*', proxy({
            target: 'http://localhost:3009',
            changeOrigin:true,
        }));
        // 这个地方是重点，不能用app.get proxy 的方式，因为取的url变成 /
        app.use(function(req, res, next) {
            if (/^\/auth/.test(req.url)) {
                // 这个必须用http-proxy-middleware, 因为支持pathRewrite
                proxy({
                    target: 'http://localhost:3009',
                    preserveHostHdr: true,
                    changeOrigin:true,
                })(req, res, next);
            } else {
                next();
            }
        });
        app.use(function(req, res, next) {
            request({
                // 如果用https，必须证书是对的，不然返回结果302
                url: 'http://mock.dlife.top/auth/checkLogin',
                method: 'GET',
                headers: {
                    'cookie': req.headers.cookie,
                    // 是req.headers.cookie
                },
                timeout: 3000,
                followRedirect: false,
            }, function (error, response, body) {
                if (body === 'no') {
                    res.redirect('/auth/login');
                } else {
                    next();
                }
            });
        });
        app.use('/api/*', proxy({
            target: 'http://localhost:3009',
            changeOrigin:true,
            pathRewrite: {
                '^/api': ''
            }
        }));
        
        app.use(hotMiddleware);
    },
    open: true,
});
server.listen(8081);