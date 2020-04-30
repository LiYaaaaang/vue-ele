import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    children: [{
        path: '',
        redirect: '/home'
      },
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/Home.vue')
      },
      {
        path: "/order",
        name: "order",
        component: () => import("../views/Order.vue")
      },
      {
        path: "/me",
        name: "me",
        component: () => import("../views/Me.vue")
      },
      {
        path: "/address",
        name: "Address",
        component: () => import("../views/Address.vue")
      },
      {
        path: "/city",
        name: "City",
        component: () => import("../views/City.vue")
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/shop',
    name: 'Shop',
    redirect: '/goods',
    component: () => import('../views/Shops/Shop.vue'),
    children: [{
        path: '/goods',
        name: 'Goods',
        component: () => import('../views/Shops/Goods.vue')
      },
      {
        path: '/comments',
        name: 'Comments',
        component: () => import('../views/Shops/Comments.vue')
      },
      {
        path: '/seller',
        name: 'Seller',
        component: () => import('../views/Shops/Seller.vue')
      }
    ]
  },
  {
    path: '/myAddress',
    name: 'MyAddress',
    component: () => import('../views/Orders/MyAddress.vue')
  },
  {
    path: '/addAddress',
    name: 'AddAddress',
    component: () => import('../views/Orders/AddAddress.vue')
  },
  {
    path: '/settlement',
    name: 'Settlement',
    component: () => import('../views/Orders/Settlement.vue')
  },
  {
    path: '/remark',
    name: 'Remark',
    component: () => import('../views/Orders/Remark.vue')
  },
  {
    path: '/pay',
    name: 'Pay',
    component: () => import('../views/Orders/Pay.vue')
  },
  {
    path: '/orderInfo',
    name: 'OrderInfo',
    component: () => import('../views/Orders/OrderInfo.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active',
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.ele_login ? true : false
  if (to.path == '/login') {
    next()
  } else {
    //是否在登录状态下
    isLogin ? next() : next('/login')
  }
})
export default router