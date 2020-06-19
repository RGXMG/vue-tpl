/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 11:09
 *
 */
import { createAPI } from '@bf/request';

// 当前实例的baseApi
const baseApi = process.env.VUE_APP_BASE_API;

export default createAPI(baseApi);
