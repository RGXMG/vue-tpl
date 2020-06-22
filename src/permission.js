import router from './router';
import store from './store';
import { Message } from 'element-ui';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getToken } from '@utils';
import { getPageTitle } from '@config/settings.helper';

// NProgress Configuration
NProgress.configure({ showSpinner: false });

const whiteList = ['/login', '/auth-redirect']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start();

  // set page title
  document.title = getPageTitle(to.meta.title);

  // determine whether the user has logged in
  const hasToken = getToken();

  // 1. 没有token支撑
  if (!hasToken) {
    // 1.1 当前路径存在于白名单内,直接放行
    if (~whiteList.indexOf(to.path)) {
      return next();
    }
    // 1.2 非白名单内路径，重定向去登录
    next(`/login?redirect=${to.path}`);
    return NProgress.done();
  }

  // 2. 存在token
  // 2.1 处在login路径，直接重定向/
  if (to.path === '/login') {
    next({ path: '/' });
    // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    return NProgress.done();
  }

  // 2.2 已经获取了roles信息，放行
  if (store.getters.hasRoles) {
    return next();
  }

  // 2.3 没有获取到role信息，调用接口获取roles等信息
  try {
    // get user info
    // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
    const { roles } = await store.dispatch('user/getInfo');

    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('user/generateRoutes', roles);

    // dynamically add accessible routes
    router.addRoutes(accessRoutes);

    // hack method to ensure that addRoutes is complete
    // set the replace: true, so the navigation will not leave a history record
    next({ ...to, replace: true });
  } catch (e) {
    // remove token and go to login page to re-login
    await store.dispatch('user/resetToken');
    Message.error(e.message || 'Has Error');
    next(`/login?redirect=${to.path}`);
    NProgress.done();
  }
});

router.afterEach(() => {
  // finish progress bar
  NProgress.done();
});
