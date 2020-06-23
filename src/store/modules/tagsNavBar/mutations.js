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
   * 添加访问过的view
   * 向visitedViews中添加该view
   * @param state
   * @param view
   * @constructor
   */
  ADD_VISITED_VIEW: (state, view) => {
    if (state.visitedViews.some(v => v.path === view.path)) return;
    state.visitedViews.push(
      Object.assign({}, view, {
        title: view.meta.title || 'no-name',
      })
    );
  },
  /**
   * 添加需要被缓存的view
   * 向cachedViews中添加，会判断meta中是否存在noCache
   * @param state
   * @param view
   * @constructor
   */
  ADD_CACHED_VIEW: (state, view) => {
    if (state.cachedViews.includes(view.name)) return;
    if (!view.meta.noCache) {
      state.cachedViews.push(view.name);
    }
  },
  /**
   * 删除当前views中访问过着的view
   * @param state
   * @param view
   * @constructor
   */
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  /**
   * 删除当前views中缓存着的view
   * @param state
   * @param view
   * @constructor
   */
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  /**
   * 删除其他访问过views
   * @param state
   * @param view
   * @constructor
   */
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
  },
  /**
   * 删除其他缓存过的views
   * @param state
   * @param view
   * @constructor
   */
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },
  /**
   * 删除所有访问过的views
   * @param state
   * @constructor
   */
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    state.visitedViews = state.visitedViews.filter(tag => tag.meta.affix);
  },
  /**
   * 删除所有缓存这的views
   * @param state
   * @constructor
   */
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = [];
  },
  /**
   * 更新访问过的view
   * @param state
   * @param view
   * @constructor
   */
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};
