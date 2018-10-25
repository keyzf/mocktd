import { post, get } from '../services/request';
const state = {
    interfaces: [],
    currentInterface: null,
};

const mutations = {
    getListSync(state, { data }) {
        state.interfaces = data;
    },
    setCurrentInterface(state, { data }) {
        state.currentInterface = data;
    },
};

const actions = {
    async add({dispatch}, {name, url, projectId, projectUrl}) {
        post('interface/index/add', {
            data: {
                projectId,
                url,
                name,
                projectUrl,
            }
        }).then(() => {
            dispatch('interface/getList', {projectId});
        });
    },
    async changeResponseType({dispatch}, {responseType, interfaceId}) {
        post('interface/index/changeResponseType', {
            data: {
                interfaceId,
                responseType,
            }
        }).then(() => {
            dispatch('response/getTypes', {interfaceId});
        });
    },
    async getDetail({commit}, {interfaceId}) {
        const data = await get('interface/index/getDetail', {
            params: {
                interfaceId,
            }
        })
        commit('interface/setCurrentInterface', {data});
    },
    async getList({commit}, { projectId }) {
        get('interface/index/list', {
            params: {
                projectId
            }
        }).then((data) => {
            commit('interface/getListSync', {data});
        });
    },
    async editName({dispatch}, {interfaceId, name, projectId}) {
        post('interface/index/edit', {
            data: {
                interfaceId,
                name,
                projectId
            }
        }).then(() => {
            dispatch('interface/getList', {projectId});
            dispatch('interface/getDetail', {interfaceId});
        });
    },
    async deleteInterface({dispatch}, {interfaceId, projectId}) {
        await post('interface/index/deleteInterface', {
            data: {
                interfaceId,
            }
        }).then(() => {
            dispatch('interface/getList', {projectId});
        });
    },
    async editUrl({dispatch}, {interfaceId, url, projectId}) {
        post('interface/index/edit', {
            data: {
                interfaceId,
                url,
                projectId
            }
        }).then(() => {
            dispatch('interface/getList', {projectId});
            dispatch('interface/getDetail', {interfaceId});
        });
    }
};

export default {
    state,
    mutations,
    actions,
};