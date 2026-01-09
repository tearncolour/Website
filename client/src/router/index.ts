import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/services',
      name: 'services',
      // 懒加载服务页面
      component: () => import('../views/Services.vue')
    },
    {
      path: '/about',
      name: 'about',
      // 懒加载关于我们页面
      component: () => import('../views/About.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      // 懒加载联系我们页面
      component: () => import('../views/Contact.vue')
    },
    {
      path: '/documentation',
      name: 'documentation',
      // 懒加载文档页面
      component: () => import('../views/Docs.vue')
    }
  ]
})

export default router