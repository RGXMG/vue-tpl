/**
 * Created with JavaScript.
 * User: RGXMG
 * Email: rickgrimes9229@gmail.com/759237309@qq.com
 * Date: 2020/6/17
 * Time: 22:35
 *
 */
import { isObject, isFunction } from '@bf/util';

/**
 * 利用webpack的context加载文件
 * 适用于动态组装module
 * @param modulesFiles
 * @param def
 * @param opts 配置项，目前拥有：
 *    1. handleModuleName: 该方法用于处理多层嵌套去除多余路径使用，最后返回一个类似于./app.js格式
 * @returns {*}
 */
function getContextFiles(modulesFiles, def = {}, opts = {}) {
  const container = isObject(def) ? def : {};
  return modulesFiles.keys().reduce((modules, modulePath) => {
    // get file name
    // set './app.js' => 'app'
    const moduleName = isFunction(opts.handleModuleName)
      ? opts.handleModuleName(modulePath)
      : modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
    const value = modulesFiles(modulePath);
    modules[moduleName] = value.default;
    return modules;
  }, container);
}
export { getContextFiles };
