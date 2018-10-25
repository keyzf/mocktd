const http = require('http');
const Koa = require('koa');
const path = require('path');
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const Bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const koaStatic = require('koa-static-plus');
const koaOnError = require('koa-onerror');
const cors = require('@koa/cors');
const passport = require('koa-passport');
const proxy = require('koa-server-http-proxy');
const Router = require('koa-router');
// const github = require('./auth/github');
// const google = require('./auth/google');
const localAuth = require('./auth/local/local');
const router = Router();
require('./smartRequire');
const orm = smartRequire('orm');
const handleResponse = require('./handleResponse');
const session = require('koa-session');
// console.log('the dirname', __dirname);
// global.appRoot = '/home/jeffchung/work/source/web/js/personal/koa2-startkit';
global.srcRoot = __dirname;
const config = smartRequire('config');

const app = new Koa();
// mock请求不能被任何的拦截
app.use(async function(ctx, next) {
  if (/^\/mock/.test(ctx.request.url)) {
    if (ctx.request.path.split('/') < 4) {
      ctx.body = 'url不符合要求';
    } else {
      const requestPath = ctx.request.path.split('/').slice(2).join('/');
      const interfaceObj = await orm.Interface.findOne({
        where: {
          url2: requestPath
        }
      });
      const responseId = interfaceObj.responseType;
      if (responseId == 0) {
        const currentProject = await orm.Project.findOne({
          where: {
            id: interfaceObj.projectId
          }
        });
        await proxy({
          target: currentProject.host,
          pathRewrite: {
            [`^/mock/${currentProject.url}`]: '/'
          },
          changeOrigin: true
        })(ctx, next);
        return;
      }
      const responseObj = await orm.Response.findOne({
        where: {
          id: responseId
        }
      });
      await handleResponse(ctx, responseObj.type, responseObj.content);
    }
  } else {
    await next();
  }
});
app.keys = ['keyboard cat'];
app.use(session({
}, app));

const bodyparser = Bodyparser();

//create sequelize object and load sequelize models in global scope
smartRequire('services/orm/sequelize.js');
// app.use(async function (ctx, next){
//   console.log('23523423');
// });
// middlewares
app.use(cors());
app.use(convert(bodyparser));
app.use(convert(json()));
app.use(convert(logger()));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, cb) {
    cb(null, user);
});
passport.deserializeUser(function(user, cb) {
    cb(null, user);
});
localAuth(passport, router, app);
router.get('/auth/logout', async function(ctx, next){
    ctx.logout();
    ctx.redirect('/');
});
router.get('/auth/checkLogin', async function (ctx) {
  if(ctx.isAuthenticated()) {
    ctx.body = 'yes';
  } else {
    ctx.body = 'no';
  }
});
app.use(async (ctx, next) => {
  await router.routes()(ctx, next);
});
app.use(async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    ctx.userId = ctx.session.passport.user.id;
    await next();
  } else {
    ctx.session['success_redirect'] = ctx.request.url;
    ctx.redirect('/auth/login');
  }
});
//to let route use the passport object
// static
app.use(
  convert(
    koaStatic(path.join(__dirname, '../public'), {
      pathPrefix: '',
    })
  )
);

// views
app.use(
  views(path.join(__dirname, '../views'), {
    extension: 'ejs',
  })
);
//
//

// http status logger response
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
// error logger
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.status = 400;
    console.log(err);
    err.expose = true;
    err._error = err.message;
    ctx.body = err;
  }
});
// response router
app.use(async (ctx, next) => {
  await smartRequire('routes').routes()(ctx, next);
});
app.use(async (ctx, next) => {
  await smartRequire('routes').allowedMethods();
});
// database
app.use(async (ctx, next) => {
  console.log('middle ware');
  await next();
});

const port = parseInt(config.port || '3000');
const server = http.createServer(app.callback());

server.listen(port);
server.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(port + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(port + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
server.on('listening', () => {
  console.log('Listening on port: %d', port);
});

module.exports = server;
