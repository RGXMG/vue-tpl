/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/23
 * Time: 11:31
 *
 */
const state = {
  count: 0,
};
const actions = {
  plus({ commit }) {
    commit('PLUS');
  },
  reduce({ commit }) {
    commit('REDUCE');
  },
  delayPlus({ commit }) {
    setTimeout(() => {
      commit('PLUS');
    }, 1000);
  },
};
const mutations = {
  PLUS(state) {
    state.count++;
  },
  REDUCE(state) {
    state.count--;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
