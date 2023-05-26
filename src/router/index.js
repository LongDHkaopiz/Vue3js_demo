import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Dashboard.vue')
  },
  {
    path: '/admin/',
    name: 'admin.admin-page',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/Adminpage.vue')
  },
  {
    path: '/admin/sign-in',
    name: 'admin.sign-in',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Login.vue')
  },
    {
    path: '/sign-up',
    name: 'admin.sign-up',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/SignUp.vue')
  },
  {
    path: '/forgot-password',
    name: 'admin.reset-pass',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/ForgotPassword.vue')
  },
  {
    path: '/products',
    name: 'product.list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/List.vue')
  },
  {
    path: '/products/create-new',
    name: 'product.create-new',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/Form.vue')
  },
  {
    path: '/products/update-product/:id',
    name: 'product.update-product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/Form.vue')
  },
  {
    path: '/users',
    name: 'user.list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/Listuser.vue')
  },
  {
    path: '/users/create-new',
    name: 'user.create-new',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/Formuser.vue')
  },
  {
    path: '/users/update-user/:id',
    name: 'user.update-user',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/Formuser.vue')
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
