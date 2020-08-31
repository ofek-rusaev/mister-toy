import Vue from 'vue'
import VueRouter from 'vue-router'
import homePage from '../views/home-page.vue'
import userProfile from '../views/user-profile.vue'
import toyApp from '../views/toy-app.vue'
import toyEdit from '../views/toy-edit.vue'
import toyDetails from '../views/toy-details.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: homePage
  },
  {
    path: '/user-profile',
    name: 'user-profile',
    component: userProfile
  },
  {
    path: '/toys',
    name: 'Toys',
    component: toyApp
  },
  {
    path: '/toy/add/:id?',
    name: 'Edit',
    component: toyDetails
  },
  {
    path: '/toy/:id',
    name: 'Details',
    component: toyDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
