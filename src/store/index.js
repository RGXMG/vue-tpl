/**
 * Created with JavaScript.
 * User: RGXMG
 * Email: rickgrimes9229@gmail.com/759237309@qq.com
 * Date: 2020/6/17
 * Time: 22:35
 *
 */
import Vue from 'vue';
import Vuex from 'vuex';
import getters from './getters';
import { getKeys, isObject } from '@bf/util';
import { getContextFiles } from './utils';
Vue.use(Vuex);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modulesFiles = require.context('./modules', false, /\.js$/);
// not include utils package
// you do not create utils modules in modules packages
const modules = getContextFiles(modulesFiles);

// not include utils package
// you do not create utils modules in modules packages
const pageModulesFiles = require.context('./modules', true, /\/(?!.*utils)[a-zA-Z/]*\/index\.js/);
const handleModuleName = path => path.replace(/^\.\/(.*)\/index\.js/, '$1');
const pageModules = getContextFiles(
  pageModulesFiles,
  {},
  {
    handleModuleName,
  }
);
const store = new Vuex.Store({
  modules: { ...modules, ...pageModules },
  getters,
});

/**
 * 动态取消注册
 * @param n
 */
const dynamicUnRegister = function dynamicUnRegister(n) {
  // 尝试卸载global module会导致Error
  // 但此处不作处理，让错误发生即可
  store.unregisterModule(n);
};
/**
 * 动态注册module
 * 注意：重复注册模块，如果不加{ preserveState: true }，那么会导致后续注册静默失败
 * @param m 模块 { name: value }, name就是命名空间
 * @param def {object} & ModuleOptions， repl: 如果模块已经存在，是否替换， 默认值false,
 */
const dynamicRegister = function dynamicRegister(m, def = {}) {
  const opts = { repl: false, ...(isObject(def) ? def : {}) };
  const namespaces = getKeys(m);
  let registerCount = 0;
  const existedModulesKeys = getKeys(store.state);
  for (const ns of namespaces) {
    if (existedModulesKeys.includes(ns)) {
      if (!opts.repl) return;
      else dynamicUnRegister(m[ns]);
    }
    registerCount++;
    store.registerModule(ns, m[ns], opts);
  }
  if (registerCount < namespaces.length) {
    throw new Error('dynamicRegister module fail, please check!');
  }
};
export { store as default, dynamicRegister, dynamicUnRegister, getContextFiles };
