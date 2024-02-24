import { createRouter, createWebHistory } from 'vue-router'

import DashboardView from '@/views/DashboardView.vue'
import LoginView from '@/views/LoginView.vue'

function isAuthenticated(to, from, next) {
  if (localStorage.getItem('quizz_token')) {
    next()
  } else {
    next('/login')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      beforeEnter: isAuthenticated,
      component: DashboardView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        layout: 'EmptyLayout'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
      meta: {
        layout: 'EmptyLayout'
      }
    },
    {
      path: '/test/:id',
      name: 'test',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/Test/TestView.vue')
    },
    {
      path: '/result/:id',
      name: 'result',
      beforeEnter: isAuthenticated,
      component: () => import('@/views/Test/ResultView.vue')
    }
  ]
})

export default router
