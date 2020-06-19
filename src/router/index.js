import Vue from 'vue';
import VueRouter from 'vue-router';
import BasicLayout from '../layout/BasicLayout';

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "login"*/ '../views/login'),
  },
  {
    path: '/',
    name: 'Home',
    component: BasicLayout,
    children: [
      {
        path: '/mall',
        component: RouteView,
        redirect: '/mall/list',
        children: [
          {
            path: '/mall',
            component: RouteView,
          },
        ],
      },
    ],
  },
];

/**
 * 创建一个router
 * @returns {VueRouter}
 */
const createRouter = () =>
  new VueRouter({
    mode: 'history', // require service support
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

export { router as default, resetRouter };
