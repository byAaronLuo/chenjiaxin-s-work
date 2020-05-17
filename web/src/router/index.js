/*
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-14 20:20:41
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-17 11:01:11
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: { title: '登录' },
    component: () => import('../views/login.vue')
  },
  {
    path: '/back',
    name: 'HomePage',
    component: () => import('../views/back/homePage.vue'),
    redirect: '/back/hotelManage',
    children: [{
      path: 'workerManage',
      name: 'WorkManage',
      meta: { title: '员工管理', role: 0 },
      component: () => import('../views/back/workerManage/workerManage.vue')
    }, {
      path: 'personCenter',
      name: 'PersonCenter',
      component: () => import('../views/back/personCenter.vue')
    }, {
      path: 'hotelManage',
      name: 'HotelManage',
      meta: { title: '房间管理', role: 1 },
      component: () => import('../views/back/hotelManage/hotelManage.vue')
    }, {
      path: 'checkOrder',
      name: 'CheckOrder',
      meta: { title: '查看订单', role: 1 },
      component: () => import('../views/back/checkOrder/checkOrder.vue')
    }, {
      path: 'revenueInfo',
      name: 'RevenueInfo',
      meta: { title: '营收信息', role: 0 },
      component: () => import('../views/back/revenueInfo/revenueInfo.vue')
    }]
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    meta: { title: 'Forbidden' },
    component: () => import('../views/back/forbidden.vue')
  },
  {
    path: '/*',
    name: 'NotFound',
    meta: { title: 'NotFound' },
    component: () => import('../views/back/notFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch((err) => err)
}
router.beforeEach((to, from, next) => {
  const id = window.sessionStorage.getItem('key')
  const role = window.sessionStorage.getItem('roleType')
  if (to.meta.title) {
    document.title = to.meta.title
  }
  if (to.name !== 'Login') {
    if (id) {
      if (role > to.meta.role) {
        next('/forbidden')
      }
    } else {
      document.title = to.meta.title
      next('/login')
    }
    next()
  } else {
    if (id) {
      next('/back')
    }
    next()
  }
})

export default router
