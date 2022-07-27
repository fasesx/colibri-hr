import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Candidates from '@/views/Candidates.vue'
import Statistics from '@/views/Statistics.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/candidates',
    name: 'Candidates',
    component: Candidates
  },
  {
    path: '/statistics',
    name: 'Statistics',
    component: Statistics
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
