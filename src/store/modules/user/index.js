/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:07
 *
 */
import { getContextFiles } from '../../utils';
import { getToken } from '@utils/authority';

const INITIAL_STATE = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
};
const modulesFiles = require.context('.', false, /\.js$/);
const modules = getContextFiles(modulesFiles, { namespaced: true, state: INITIAL_STATE });
export default modules;
