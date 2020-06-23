/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:07
 *
 */
import { setToken, delToken } from '@utils';
import { constantRoutes } from '@router';

export default {
  SET_TOKEN: (state, token) => {
    state.token = token;
    token ? setToken(token) : delToken();
  },
  SET_INFO(state, info) {
    state.info = info;
  },
  UP_INFO(state, info) {
    state.info = { ...state.info, ...info };
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles;
  },
  /**
   * 设置完整的routes
   * 将本地默认的路由连接
   * @param state
   * @param routes
   * @constructor
   */
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};
