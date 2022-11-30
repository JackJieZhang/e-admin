import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { websiteTitle } from '@/config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    component: () => import('@/views/home.vue'),
    children: [
      {
        path: '/table',
        component: () => import('@/views/table.vue'),
        children: [],
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    children: [],
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    children: [],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.afterEach((to) => {
  const { title } = to.meta
  document.title = title ? `${title} - ${websiteTitle}` : websiteTitle
})

export default router
