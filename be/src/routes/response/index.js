const orm = smartRequire('orm');
import { water } from '../../tools/utils';
module.exports = {
    post: {
        async add(ctx) {
            const result = await water(
                async function create() {
                    return await orm.Response.create({
                        name: ctx.request.body.name,
                        type: ctx.request.body.type,
                        userId: ctx.userId,
                        projectId: ctx.request.body.projectId,
                    });
                },
                async function select() {
                    return await orm.Interface.findOne({
                        where: {
                            id: ctx.request.body.interfaceId,
                        }
                    });
                },
                async function update(interfaceRow, result) {
                    let temp = [];
                    try {
                        temp = JSON.parse(interfaceRow.responses)
                    } catch (e) {}
                    const oldTypes = new Set(temp);
                    oldTypes.add(result[0].id);
                    return await orm.Interface.update(
                        {
                            responses: JSON.stringify(oldTypes),
                            responseType: result[0].id,
                        },
                        {
                            where: {
                                id: ctx.request.body.interfaceId,
                            }
                        }
                    );
                },
            );
            return result;
        },
        async update(ctx) {
            return await orm.Response.update(
                {
                    content: ctx.request.body.content,
                },
                {
                    where: {
                        id: ctx.request.body.responseId,
                    }
                }
            );
        }
    },
    get: {
        async getTypes(ctx, next) {
            return await water(
                async function One() {
                    const result = await orm.Interface.findOne({
                        where: {
                            id: ctx.request.query.interfaceId
                        }
                    });
                    if (!result) {
                        return {
                            responses: null,
                            responseType: '0',
                        };
                    }
                    let temp = [];
                    let responseType = result.responseType;
                    try {
                        temp = JSON.parse(result.responses);
                    } catch(e) {}
                    if (temp && temp.length > 0 && result.responseType === null) {
                        await orm.Interface.update(
                            {
                                responseType: temp[0].id,
                            },
                            {
                                where: {
                                    id: ctx.request.query.interfaceId
                                }
                            }
                        )
                        responseType = temp[0].id;
                    }
                    return {
                        responses: temp || [],
                        responseType: responseType.toString()
                    };
                },
                async function ({responses, responseType}) {
                    if (responses === null) {
                        return {
                            responses,
                            responseType
                        }
                    }
                    responses = await orm.Response.findAll({
                        where: {
                            id: {
                                in: responses
                            }
                        }
                    });
                    return {
                        responses,
                        responseType,
                    }
                }
            );
        },
    }
}