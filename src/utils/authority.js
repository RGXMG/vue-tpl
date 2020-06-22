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
 * @param args {any} 设置cookie的参数
 * @returns {string}
 */
function setToken(...args) {
  cookie.setCookie(TOKEN_KEY_OF_COOKIE, ...args);
}

function delToken() {
  cookie.delCookie(TOKEN_KEY_OF_COOKIE);
}
export { getToken, setToken, delToken };
