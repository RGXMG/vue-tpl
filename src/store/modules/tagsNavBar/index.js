/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:07
 *
 */
import { getContextFiles } from '../../utils';
const INITIAL_STATE = {
  // 存放访问过的views
  visitedViews: [],
  // 存在被缓存过的views
  cachedViews: [],
};
const moduleFiles = require.context('.', false, /\.js/);
export default getContextFiles(moduleFiles, {
  namespaced: true,
  state: INITIAL_STATE,
});
