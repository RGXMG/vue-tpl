/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:07
 *
 */
import { cookie } from '@bf/util';
import { TOKEN_KEY_OF_COOKIE } from '@constants';

export default {
  SET_TOKEN: (state, token) => {
    state.token = token;
    token ? cookie.setCookie(TOKEN_KEY_OF_COOKIE, token) : cookie.delCookie(TOKEN_KEY_OF_COOKIE);
  },
  SET_INFO(state, info) {
    state.info = info;
  },
  UP_INFO(state, info) {
    state.info = { ...state.info, ...info };
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction;
  },
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = constantRoutes.concat(routes);
  },
};
