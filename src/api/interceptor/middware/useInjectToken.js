/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 12:04
 *
 */
import { Api_user_author_obj_func } from '@common/api/login';

/**
 * 注入headers token的中间件
 * @param next
 * @returns {Function}
 */
export default next => req => {
  if (!req.headers) {
    req.headers = {};
  }
  Object.assign(req.headers, Api_user_author_obj_func()), next(req);
};
