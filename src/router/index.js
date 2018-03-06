import Vue from 'vue'
import Router from 'vue-router'

// Containers
import Full from '@/containers/Full'

// Views
import Dashboard from '@/views/Dashboard'
import Product from '@/views/Product'
import Category from '@/views/Category'
import Brand from '@/views/Brand'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  linkActiveClass: 'open active',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
      name: 'Home',
      component: Full,
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard
        },
        {
          path: 'product',
          name: 'Product',
          component: Product
        },
        {
          path: 'category',
          name: 'Category',
          component: Category
        },
        {
          path: 'brand',
          name: 'Brand',
          component: Brand
        }
      ]
    }
  ]
})
