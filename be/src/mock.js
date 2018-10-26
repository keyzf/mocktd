const orm = smartRequire('orm');
const proxy = require('koa-server-http-proxy');
const handleResponse = require('./handleResponse');
module.exports = function (app) {
    // mock请求不能被任何的拦截
    app.use(async function (ctx, next) {
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
}