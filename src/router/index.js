import { createRouter, createWebHistory } from 'vue-router'
import test from '@/components/test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/main.vue'),
    },
    {
      path: '/project',
      name: 'project',
      component: () => import('@/views/project.vue'),
      children: [
        {
          path: 'demo0',
          name: 'demo0',
          component: () => import('@/components/demo0.vue')
        },
        {
          path: 'demo1',
          name: 'demo1',
          component: () => import('@/components/demo1.vue')
        },
        {
          path: 'demo2',
          name: 'demo2',
          component: () => import('@/components/demo2.vue')
        },
      ]
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
  ]
})
export default router
