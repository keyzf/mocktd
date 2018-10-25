
import { post, get } from '../services/request';
const state = {
    responses: [],
    type: null,
};

const mutations = {
    getTypesSync(state, {data}) {
        state.type = data.responseType;
        state.responses = data.responses;
    },
};

const actions = {
    async getTypes({commit}, {interfaceId}) {
        const data = await get('response/index/getTypes', {
            params: {
                interfaceId
            }
        });
        commit('response/getTypesSync', {data});
    },
    async upateContent({}, {responseId, content}) {
        await post('response/index/update', {
            data: {
                content,
                responseId,
            }
        });
    },
    async addType({dispatch}, {interfaceId, name, responseType, projectId}) {
        await post('response/index/add', {
            data: {
                interfaceId,
                name,
                type: responseType,
                projectId,
            }
        });
        dispatch('response/getTypes', {interfaceId});
    }
};

export default {
    state,
    mutations,
    actions,
};