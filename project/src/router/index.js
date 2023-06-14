import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../main'

const requireAuth = (to, from, next) => {
  if (store.getters.isLogin) {
    next()
  } else {
    next({
      name:'admin.sign-in'
    })
  }
} 

const routes = [
  {
    path: '/:role',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin/dashboard',
    name: 'admin.dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Dashboard.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/admin/dashboard/weather',
    name: 'admin.dashboard.weather',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Weather.vue')
  },
  {
    path: '/admin/dashboard/country',
    name: 'admin.dashboard.country',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Country.vue')
  },
  {
    path: '/admin/dashboard/anime-image',
    name: 'admin.dashboard.anime',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Anime.vue')
  },
  {
    path: '/admin/dashboard/search-by-google',
    name: 'admin.dashboard.googlesearch',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Search.vue')
  },
  {
    path: '/update-password/:id',
    name: 'admin.update-password',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/UpdatePassword.vue')
  },
  {
    path: '/admin/sign-in',
    name: 'admin.sign-in',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Login.vue')
  },
  {
    path: '/admin/dashboard/profile/:id',
    name: 'admin.profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/authors/Profile.vue')
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
    path: '/admin/products',
    name: 'product.list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/List.vue')
  },
  {
    path: '/admin/products/create-new',
    name: 'product.create-new',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/Form.vue')
  },
  {
    path: '/admin/products/update-product/:id',
    name: 'product.update-product',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/products/Form.vue')
  },
  {
    path: '/admin/users',
    name: 'user.list',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/Listuser.vue')
  },
  {
    path: '/admin/users/create-new',
    name: 'user.create-new',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/admin/users/Formuser.vue')
  },
  {
    path: '/admin/users/update-user/:id',
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
router.beforeEach((to, from,next) => {
  if (to.meta.requireAuth && !store.getters.isLogin) {
    next({
      name:'admin.sign-up'
    })
  } else {
    next()
  }
})
export default router
