import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SinglePokemon from '../views/SinglePokemon.vue'
import NotFoundPage from '../views/NotFoundPage.vue'
import Database from '../utils/Storage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter: (to, from, next) => {
      const auth = JSON.parse(Database.authStatus())
      if (auth) {
        next({
          name: 'pokemon-cards'
        })
      } else {
        next()
      }
    }
  },
  {
    path: '/pokemon-cards',
    name: 'pokemon-cards',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Pokemon.vue'),
    beforeEnter: (to, from, next) => {
      const auth = JSON.parse(Database.authStatus())
      if (auth) {
        next()
      } else {
        next({
          name: 'home'
        })
      }
    }
  },
  {
    path: '/pokemon-cards/:id',
    name: 'SinglePokemon',
    component: SinglePokemon,
    beforeEnter: (to, from, next) => {
      const auth = JSON.parse(Database.authStatus())
      if (auth) {
        next()
      } else {
        next({
          name: 'home'
        })
      }
    }
  },
  {
    path: '*',
    name: 'NotFoundPage',
    component: NotFoundPage,
    beforeEnter: (to, from, next) => {
      const auth = JSON.parse(Database.authStatus())
      if (auth) {
        next()
      } else {
        next({
          name: 'home'
        })
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
