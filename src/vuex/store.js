import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    count: 0
};

const mutations = {
    mutationsAddCount (state, n = 0) {
        return (state.count += n);
    },
    mutationsZero (state) {
        return (state.count = 0);
    }
    // mutationsReduceCount (state, n = 0) {
    //     return (state.count -= n);
    // }
};
const actions = {
    actionsAddCount ({ commit }, n = 0) {
        return commit('mutationsAddCount', n);
    }
};
export default new Vuex.Store({
    state,
    mutations,
    actions
});
