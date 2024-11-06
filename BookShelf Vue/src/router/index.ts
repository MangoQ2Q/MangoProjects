import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/list',
      name: 'list',
      component: () => import('../views/ListView.vue')
    },
    {
      path: '/discover',
      name: 'discover',
      component: () => import('../views/DiscoverView.vue'),
    }
  ]
})

export default router
