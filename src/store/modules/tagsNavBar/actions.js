/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:07
 *
 */
export default {
  /**
   * 添加view tag
   * @param dispatch
   * @param view
   * @returns {Promise<void>}
   */
  async addView({ dispatch }, view) {
    dispatch('addVisitedView', view);
    dispatch('addCachedView', view);
  },
  /**
   * 添加访问过的view
   * @param commit
   * @param view
   * @returns {Promise<void>}
   */
  async addVisitedView({ commit }, view) {
    commit('ADD_VISITED_VIEW', view);
  },
  /**
   * 添加缓存的view
   * @param commit
   * @param view
   * @returns {Promise<void>}
   */
  async addCachedView({ commit }, view) {
    commit('ADD_CACHED_VIEW', view);
  },
  /**
   * 删除view
   * 1. 从visited
   * 2. 从cached
   * @param dispatch
   * @param state
   * @param view
   * @returns {Promise<object>}
   */
  async delView({ dispatch, state }, view) {
    await dispatch('delVisitedView', view);
    await dispatch('delCachedView', view);
    return {
      visitedViews: [...state.visitedViews],
      cachedViews: [...state.cachedViews],
    };
  },
  async delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  async delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },
  async delOthersViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delOthersVisitedViews', view);
      dispatch('delOthersCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  async delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  async delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    });
  },
  async delAllViews({ dispatch, state }, view) {
    return new Promise(resolve => {
      dispatch('delAllVisitedViews', view);
      dispatch('delAllCachedViews', view);
      resolve({
        visitedViews: [...state.visitedViews],
        cachedViews: [...state.cachedViews],
      });
    });
  },
  async delAllVisitedViews({ commit, state }) {
    commit('DEL_ALL_VISITED_VIEWS');
    return [...state.visitedViews];
  },
  async delAllCachedViews({ commit, state }) {
    commit('DEL_ALL_CACHED_VIEWS');
    return [...state.cachedViews];
  },
  async updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view);
  },
};
