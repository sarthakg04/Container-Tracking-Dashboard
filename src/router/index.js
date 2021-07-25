import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import { VCard } from 'vuetify/lib/components/VCard';
import { VCardText } from 'vuetify/lib/components/VCard';
import { VContainer } from 'vuetify/lib/components/VGrid';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/vessels',
    name: 'Vessels',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/vessels.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
