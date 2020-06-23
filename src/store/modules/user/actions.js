import { base } from '@api';
import router, { asyncRoutes, resetRouter } from '@router';
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}

/**
 * 筛选过滤异步routes
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}
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
   * 登录
   * @param commit
   * @param userInfo {Object<{username: string, password: string}>}
   * @returns {Promise<boolean>}
   */
  async login({ commit }, userInfo) {
    try {
      const { username, password } = userInfo;
      const { data } = await base.Api_user_login_post({
        username: username.trim(),
        password: password,
      });
      commit('SET_TOKEN', data.token);
      return true;
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 获取信息
   * @param commit
   * @param state
   * @returns {Promise<Object>}
   */
  async getInfo({ commit, state }) {
    try {
      const { data } = await base.Api_user_getInfo_get(state.token);
      if (!data) {
        new Error('Verification failed, please Login again.');
      }
      const { roles, ...rest } = data;
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        new Error('getInfo: roles must be a non-null array!');
      }
      commit('SET_ROLES', roles);
      commit('SET_INFO', rest);
      return data;
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 用户登出
   * @param commit
   * @param state
   * @param dispatch
   * @returns {Promise<void>}
   */
  async logout({ commit, state, dispatch }) {
    try {
      await base.Api_user_logout_post(state.token);
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      resetRouter();
      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsNavBar/delAllViews', null, { root: true });
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 重置token
   * @param commit
   * @returns {Promise<void>}
   */
  async resetToken({ commit }) {
    try {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
    } catch (e) {
      console.error(e);
    }
  },

  /**
   * 当角色发生改变
   * 1. 设置token
   * 2. 获取角色对应的权限信息
   * 3. 根据返回的权限重置router
   * 4. 删除界面快捷导航的所有view
   * @param commit
   * @param dispatch
   * @param role
   * @returns {Promise<unknown>}
   */
  async changeRoles({ commit, dispatch }, role) {
    try {
      const token = role + '-token';
      commit('SET_TOKEN', token);
      const { roles } = await dispatch('getInfo');
      resetRouter();
      const accessRoutes = await dispatch('generateRoutes', roles);
      router.addRoutes(accessRoutes);
      dispatch('tagsNavBar/delAllViews', null, { root: true });
    } catch (e) {
      console.error(e);
    }
  },
  /**
   * 生成routes
   * @param commit
   * @param roles
   * @returns {Promise<unknown>}
   */
  async generateRoutes({ commit }, roles) {
    try {
      let accessedRoutes;
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      commit('SET_ROUTES', accessedRoutes);
      return accessedRoutes;
    } catch (e) {
      console.error(e);
    }
  },
};
