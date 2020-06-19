/**
 * Created with JavaScript.
 * User: rgxmg
 * Email: rgxmg@foxmail.com
 * Date: 2020/6/19
 * Time: 16:56
 *
 */
import { changeKeyUseProVal, vToArray } from '@bf/util';

const userTypeObj = {
  NORMAL: { label: '普通用户', key: 1, flag: 'normal' },
  ADMIN: { label: '管理员', key: 2, flag: 'admin' },
};
/**
 * filter by key
 * @param key
 * @returns Object<{label: string, key: key: string, flag: string}>
 */
const userTypeFilter = key => changeKeyUseProVal(userTypeObj)?.[key] || {};

/**
 * 获取label
 * @param key
 * @returns {*}
 */
const getUserTypeLabel = key => userTypeFilter(key - 0).label;
/**
 * enum
 * @returns {*}
 */
const userTypeEnum = () => vToArray(userTypeObj);
export { getUserTypeLabel, userTypeFilter, userTypeEnum };
