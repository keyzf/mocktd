const orm = smartRequire('orm');
const path = require('path');
function formatUrl(url) {
    return url.replace(/(?:\\+)|(?:\/+)/g, '/');
}
module.exports = {
    get: {
        async list(ctx, next) {
			const result = await orm.Interface.findAll({
                where: {
                    projectId: ctx.request.query.projectId,
                }
            });
			return result;
        },
        async getDetail(ctx) {
            const result = await orm.Interface.findOne({
                where: {
                    id: ctx.request.query.interfaceId,
                }
            });
			return result;
        }
    },
    post: {
        update(ctx, next) {
			ctx.body = '333';
        },
        async deleteInterface(ctx, next) {
            const result = await orm.Interface.destroy(
                {
                    where: {
                        id: ctx.request.body.interfaceId
                    }
                }
            );
			return result;
        },
        async changeResponseType(ctx, next) {
            const result = await orm.Interface.update(
                {
                    responseType: ctx.request.body.responseType,
                },
                {
                    where: {
                        id: ctx.request.body.interfaceId
                    }
                }
            );
			return result;
        },
        async add(ctx, next) {
            const result = await orm.Interface.create({
                userId: ctx.userId,
                projectId: ctx.request.body.projectId,
                name: ctx.request.body.name,
                url: formatUrl(`/${ctx.request.body.url}`),
                url2: formatUrl(`${ctx.request.body.projectUrl}/${ctx.request.body.url}`),
            });
			return result;
        },
        async edit(ctx, next) {
            const updateData = {};
            if (ctx.request.body.name) {
                updateData.name = ctx.request.body.name;
            } else if (ctx.request.body.url) {
                // 获取project的url
                const projectRow = await orm.Project.findOne(
                    {
                        where: {
                            id: ctx.request.body.projectId
                        }
                    }
                );
                updateData.url = formatUrl(`/${ctx.request.body.url}`);
                updateData.url2 = formatUrl(`${projectRow.url}/${ctx.request.body.url}`);
            }
            const result = await orm.Interface.update(
                updateData,
                {
                    where: {
                        id: ctx.request.body.interfaceId,
                    }
                }
            );
			return result;
        },
    }
}