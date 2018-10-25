import { get } from '../services/request';
const state = {
    userInfo: null
};

const mutations = {
    setUserInfo(state, {data}) {
        state.userInfo = data;
    },
};

const actions = {
    async getUserInfo({commit}) {
        return get('user/index/getUserInfo', {
        }).then((data) => {
            commit('user/setUserInfo', {data});
        });
    },
};

export default {
    state,
    mutations,
    actions,
};