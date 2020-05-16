/*
 * @Description:
 * @Version: 1.0
 * @Autor: AaronLuo
 * @Date: 2020-05-14 20:20:41
 * @LastEditors: AaronLuo
 * @LastEditTime: 2020-05-15 20:44:50
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
    component: () => import('../views/login.vue')
  },
  {
    path: '/back',
    name: 'HomePage',
    component: () => import('../views/back/homePage.vue'),
    redirect: '/back/workerManage',
    children: [{
      path: 'workerManage',
      name: 'WorkManage',
      component: () => import('../views/back/workerManage/workerManage.vue')
    }, {
      path: 'personCenter',
      name: 'PersonCenter',
      component: () => import('../views/back/personCenter.vue')
    }, {
      path: 'hotelManage',
      name: 'HotelManage',
      component: () => import('../views/back/hotelManage/hotelManage.vue')
    }, {
      path: 'checkOrder',
      name: 'CheckOrder',
      component: () => import('../views/back/checkOrder/checkOrder.vue')
    }]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
