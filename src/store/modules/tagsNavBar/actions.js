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
  /**
   * 删除访问过的view
   * @param commit
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
  async delVisitedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_VISITED_VIEW', view);
      resolve([...state.visitedViews]);
    });
  },
  /**
   * 删除缓存的view
   * @param commit
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
  async delCachedView({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_CACHED_VIEW', view);
      resolve([...state.cachedViews]);
    });
  },
  /**
   * 删除除去当前的view之外的views的缓存和visited
   * @param dispatch
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
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
  /**
   * 删除除当前的访问过的views
   * @param commit
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
  async delOthersVisitedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_VISITED_VIEWS', view);
      resolve([...state.visitedViews]);
    });
  },
  /**
   * 删除除去当前view之外的views
   * @param commit
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
  async delOthersCachedViews({ commit, state }, view) {
    return new Promise(resolve => {
      commit('DEL_OTHERS_CACHED_VIEWS', view);
      resolve([...state.cachedViews]);
    });
  },
  /**
   * 删除所有views, 缓存以及访问过的
   * @param dispatch
   * @param state
   * @param view
   * @returns {Promise<unknown>}
   */
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
  /**
   * 删除所有访问过的views
   * @param commit
   * @param state
   * @returns {Promise<*[]>}
   */
  async delAllVisitedViews({ commit, state }) {
    commit('DEL_ALL_VISITED_VIEWS');
    return [...state.visitedViews];
  },
  /**
   * 删除所有缓存views
   * @param commit
   * @param state
   * @returns {Promise<*[]>}
   */
  async delAllCachedViews({ commit, state }) {
    console.log('delAllCachedViews');
    commit('DEL_ALL_CACHED_VIEWS');
    return [...state.cachedViews];
  },
  /**
   * 更新访问过的views
   * 适用于更改了query等参数，需要更改保存的view object
   * @param commit
   * @param view
   * @returns {Promise<void>}
   */
  async updateVisitedView({ commit }, view) {
    commit('UPDATE_VISITED_VIEW', view);
  },
};
