import request from './instance';

/**
 * 用户登录
 * @param data
 * @returns {Promise<any>}
 * @constructor
 */
function Api_user_login_post(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    opts: { data },
  });
}
/**
 * 用户登录
 * @param token
 * @returns {Promise<any>}
 * @constructor
 */
function Api_user_getInfo_get(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    opts: {
      params: { token },
    },
  });
}
/**
 * 用户登录
 * @param data
 * @returns {Promise<any>}
 * @constructor
 */
function Api_user_logout_post(data) {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post',
  });
}
export { Api_user_login_post, Api_user_getInfo_get, Api_user_logout_post };
