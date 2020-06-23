/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/22
 * Time: 15:15
 *
 */
import { cookie } from '@bf/util';
import { TOKEN_KEY_OF_COOKIE } from '@constants';

/**
 * 获取当前存在cookie中的用户token
 * @returns {string}
 */
function getToken() {
  return cookie.getCookie(TOKEN_KEY_OF_COOKIE);
}

/**
 * 设置cookie
 * @param token {string} token
 * @returns {string}
 */
function setToken(token) {
  cookie.setCookie(TOKEN_KEY_OF_COOKIE, token, { path: '/' });
}

function delToken() {
  cookie.delCookie(TOKEN_KEY_OF_COOKIE, { path: '/' });
}
export { getToken, setToken, delToken };
