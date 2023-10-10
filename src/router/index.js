import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
// import { keepAlive } from 'vue-router'
// import FinanceView from '../views/FinancialView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/finance',
      name: 'finance',
      // component: FinanceView
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FinanceView.vue')
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('../views/ContactView.vue')
    },
    {
      path: '/collectibles',
      name: 'collectibles',
      component: () => import('../views/CollectiblesView.vue')
    },
    {
      path: '/shop',
      name: 'shop',
      component: () => import('../views/ShopView.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    // Scroll to the top of the page when navigating to a new route
    return { top: 0 }
  },
})

export default router
