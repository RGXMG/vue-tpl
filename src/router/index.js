import Vue from 'vue';
import VueRouter from 'vue-router';
import BasicLayout from '@layout/BasicLayout';

Vue.use(VueRouter);
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@views/redirect'),
    hidden: true,
  },
  {
    path: '/login',
    component: () => import('@views/login'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@views/error-page/401'),
    hidden: true,
  },
  {
    path: '/',
    component: BasicLayout,
    redirect: '/welcome',
    children: [
      {
        component: () => import('@views/welcome'),
        path: '/welcome',
        name: 'Welcome',
        meta: { title: '欢迎页', affix: true, icon: '' },
      },
    ],
  },
];

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/counter',
    component: BasicLayout,
    redirect: '/counter/index',
    name: 'Counter',
    meta: {
      title: '计算',
      icon: 'skill',
    },
    children: [
      {
        path: 'index',
        name: 'Counter',
        component: () => import('@views/counter'),
        meta: {
          title: 'Counter',
          icon: 'skill',
        },
      },
    ],
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
];

/**
 * 创建一个router
 * @returns {VueRouter}
 */
const createRouter = () =>
  new VueRouter({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes,
  });

/**
 * replace routes
 * Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 */
function resetRouter() {
  const newRouter = createRouter();
  // 替换matcher,即替换addRoutes、routes，达到replace替换router的效果
  router.matcher = newRouter.matcher;
}
const router = createRouter();

/**
 * After vueRouter3.1, it's using promiseAPI
 * causing every operation to deal with catch situations
 * Detail see: https://github.com/vuejs/vue-router/issues/2881
 * @type }
 */
const originalPush = VueRouter.prototype.push;
const originalReplace = VueRouter.prototype.replace;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject);
  return originalReplace.call(this, location).catch(err => err);
};

export { router as default, resetRouter };
