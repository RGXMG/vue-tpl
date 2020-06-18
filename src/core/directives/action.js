import Vue from 'vue';
import { isObject } from '@bf/util';

/**
 * Action 权限指令
 * ## 需要在$route.meta.permissions上储存当前用户在当前route下具有的权限
 * 指令用法：
 *  - 在需要控制 action 级别权限的组件上使用 v-action:[method],
 *  - 可以提供一个cb，该cb用于当前指令验证通过后触发，cb必须同步的返回一个Boolean，true代表验证通过，false验证失败：
 *  - 方式一：
 *    使用value,如果需要提供cb/statement，则使用对象方式，如：
 *    <i-button v-action="{ value: $permission.ADD, cb: () => do something }">提交审核</a-button>
 *    <i-button v-action="{ value: $permission.ADD, cb: statement  }">提交审核</a-button>
 *    反之不需要使用对象模式
 *    <i-button v-action="$permission.ADD">提交审核</a-button>
 *  - 方式二：
 *    使用arg，如果需要提供cb/statement，直接使用value作为cb，如
 *    <a v-action:[$permission.ADD]="() => do something" @click="edit(record)">修改</a>
 *    <a v-action:[$permission.ADD]="statement" @click="edit(record)">修改</a>
 *    反之不需要value
 *    <a v-action:[$permission.ADD] @click="edit(record)">修改</a>
 *  - 当前用户没有权限时，组件上使用了该指令则会被隐藏
 *  - 当后台权限跟 pro 提供的模式不同时，只需要针对这里的权限过滤进行修改即可
 */
const elsMapped = new WeakMap();
const action = Vue.directive('action', function(el, binding, vnode) {
  // 不存在el，则设置
  if (el && !elsMapped.has(el)) {
    elsMapped.set(el, el.style.display || '');
  }
  const { value, arg } = binding;
  if (!value && !arg) {
    throw new Error(
      `need action name! Like v-action="permissionConfig.LIST_REMOVE" or v-action="permissionConfig.LIST_REMOVE.key"`
    );
  }
  // 核算值
  let authValue = value;
  let cb = () => true;
  if (arg) {
    authValue = arg;
    if (value !== undefined) {
      cb = value;
    }
  } else if (isObject(value)) {
    authValue = value.value;
    if (value.cb !== undefined) {
      cb = value.cb;
    }
  }
  // 全局的权限还是局部权限
  const roles = vnode.context.$route.meta.permissions;
  const executeNone = el => (el.style.display = 'none');
  const executeVisible = el => {
    el.style.display = elsMapped.get(el);
  };
  // 执行判断
  let pass = false;
  if (roles.includes(authValue)) {
    pass = typeof cb === 'function' ? cb() : cb;
  }
  !pass ? executeNone(el) : executeVisible(el);
});

export default action;
