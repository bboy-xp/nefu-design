import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from "../views/Login.vue";
import EPDepartment from "../views/EPDepartment.vue";
import EDepartment from "../views/EDepartment.vue";

Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/ep-department',
      name: 'EPDepartment',
      component: EPDepartment
    },
    {
      path: '/e-department',
      name: 'EDepartment',
      component: EDepartment
    },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
