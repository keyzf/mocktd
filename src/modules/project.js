import { post, get } from '../services/request';
const state = {
    projects: [],
    currentProject: {}
};

const mutations = {
    setList(state, {data}) {
        state.projects = data;
    },
    setCurrentProject(state, {data}) {
        state.currentProject = data;
    },
};

const actions = {
    async getList({commit}) {
        return get('project/index/getList', {
        }).then((data) => {
            commit('project/setList', {data});
        });
    },
    async editProject({dispatch}, {name, url, host, id}) {
        return post('project/index/edit', {
            data: {
                name,
                url,
                host,
                id,
            }
        }).then(() => {
            return dispatch('project/getList');
        });
    },
    async getProjectDetail({commit}, {projectId}) {
        const data = await get('project/index/getDetail', {
            params: {
                projectId,
            }
        });
        commit('project/setCurrentProject', {data});
    },
    async addProject({dispatch}, {name, url, host}) {
        return post('project/index/add', {
            data: {
                name,
                url,
                host,
            }
        });
        dispatch('project/getList');
    }
};

export default {
    state,
    mutations,
    actions,
};