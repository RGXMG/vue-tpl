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
  token: void 0,
  info: {
    name: void 0,
    avatar: void 0,
  },
  introduction: void 0,
  roles: [],
};
const modulesFiles = require.context('.', false, /\.js$/);
const modules = getContextFiles(modulesFiles, { namespaced: true, state: INITIAL_STATE });
export default modules;
