import { base } from '@api';
import router, { resetRouter } from '@router';
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
   * @returns {Promise<void>}
   */
  async login({ commit }, userInfo) {
    const { username, password } = userInfo;
    const { data } = await base.Api_user_login_post({
      username: username.trim(),
      password: password,
    });
    commit('SET_TOKEN', data.token);
  },

  /**
   * 获取信息
   * @param commit
   * @param state
   * @returns {Promise<unknown>}
   */
  async getInfo({ commit, state }) {
    try {
      const { data } = await base.Api_user_getInfo_get(state.token);
      if (!data) {
        new Error('Verification failed, please Login again.');
      }
      const { roles, introduction, ...rest } = data;
      // roles must be a non-empty array
      if (!roles || roles.length <= 0) {
        new Error('getInfo: roles must be a non-null array!');
      }
      commit('SET_ROLES', roles);
      commit('SET_INFO', rest);
      commit('SET_INTRODUCTION', introduction);
    } catch (e) {
      console.error(e);
    }
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token)
        .then(() => {
          commit('SET_TOKEN', '');
          commit('SET_ROLES', []);
          resetRouter();

          // reset visited views and cached views
          // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
          dispatch('tagsView/delAllViews', null, { root: true });

          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },

  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '');
      commit('SET_ROLES', []);
      resolve();
    });
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
    const token = role + '-token';
    commit('SET_TOKEN', token);
    const { roles } = await dispatch('getInfo');
    resetRouter();
    const accessRoutes = await dispatch('permission/generateRoutes', roles, {
      root: true,
    });
    router.addRoutes(accessRoutes);
    dispatch('tagsView/delAllViews', null, { root: true });
  },
};
