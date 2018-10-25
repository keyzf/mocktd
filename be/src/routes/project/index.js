const orm = smartRequire('orm');
module.exports = {
    get: {
        async getList() {
            return await orm.Project.findAll();
        },
        async getDetail(ctx) {
            return await orm.Project.findOne({
                where: {
                    id: ctx.request.query.projectId,
                }
            });
        },
    },
    post: {
        async add(ctx) {
            return await orm.Project.create({
                userId: ctx.userId,
                name: ctx.request.body.name,
                url: ctx.request.body.url,
                host: ctx.request.body.host,
            });
        },
        async edit(ctx) {
            return await orm.Project.update(
                {
                    name: ctx.request.body.name,
                    url: ctx.request.body.url,
                    host: ctx.request.body.host,
                },
                {
                    where: {
                        id: ctx.request.body.id
                    }
                }
            );
        },
    }
}