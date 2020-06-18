import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import BasicLayout from '../layout/BasicLayout';
import RouteView from '../layout/RouteView';

Vue.use(VueRouter);

const routes = [
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

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
