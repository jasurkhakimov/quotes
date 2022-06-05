import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'quotes',
    redirect: { name: 'quotes-home' },
    component: () => import('@/layout/BaseLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'quotes-home',
        component: () => import('@/views/quotes-home/QuotesHomePage.vue')
      },
      {
        path: '/create',
        name: 'quotes-create',
        component: () => import('@/views/quotes-crud/QuotesCRUDPage.vue')
      },
      {
        path: '/categories',
        name: 'quotes-categories',
        component: () => import('@/views/quotes-categories/QuotesCategoriesPage.vue')
      },
      {
        path: '/quote/:id',
        name: 'quote-show',
        component: () => import('@/views/AboutView.vue')
      },

    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
