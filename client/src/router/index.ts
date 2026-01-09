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
      path: '/products',
      name: 'products',
      // 懒加载产品页面
      component: () => import('../views/Products.vue')
    },
    {
      path: '/about',
      name: 'about',
      // 懒加载关于我们页面
      component: () => import('../views/About.vue')
    },
    {
      path: '/downloads',
      name: 'downloads',
      component: () => import('../views/Downloads.vue')
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