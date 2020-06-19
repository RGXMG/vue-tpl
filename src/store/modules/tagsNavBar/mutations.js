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
  DEL_VISITED_VIEW: (state, view) => {
    for (const [i, v] of state.visitedViews.entries()) {
      if (v.path === view.path) {
        state.visitedViews.splice(i, 1);
        break;
      }
    }
  },
  DEL_CACHED_VIEW: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    index > -1 && state.cachedViews.splice(index, 1);
  },
  DEL_OTHERS_VISITED_VIEWS: (state, view) => {
    state.visitedViews = state.visitedViews.filter(v => {
      return v.meta.affix || v.path === view.path;
    });
  },
  DEL_OTHERS_CACHED_VIEWS: (state, view) => {
    const index = state.cachedViews.indexOf(view.name);
    if (index > -1) {
      state.cachedViews = state.cachedViews.slice(index, index + 1);
    } else {
      // if index = -1, there is no cached tags
      state.cachedViews = [];
    }
  },
  DEL_ALL_VISITED_VIEWS: state => {
    // keep affix tags
    const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
    state.visitedViews = affixTags;
  },
  DEL_ALL_CACHED_VIEWS: state => {
    state.cachedViews = [];
  },
  UPDATE_VISITED_VIEW: (state, view) => {
    for (let v of state.visitedViews) {
      if (v.path === view.path) {
        v = Object.assign(v, view);
        break;
      }
    }
  },
};
