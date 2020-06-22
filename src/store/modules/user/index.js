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
  avatar:
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=4191860886,3162585370&fm=26&gp=0.jpg',
  introduction: '',
  routes: [],
  roles: [],
};
const modulesFiles = require.context('.', false, /\.js$/);
const modules = getContextFiles(modulesFiles, { namespaced: true, state: INITIAL_STATE });
export default modules;
