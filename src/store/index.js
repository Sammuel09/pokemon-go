import Vue from 'vue'
import Vuex from 'vuex'
import SignUpModule from './modules/SignUpModule'
import LogInModule from './modules/LogInModule'
import PokemonModule from './modules/PokemonModule'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    SignUpModule,
    LogInModule,
    PokemonModule
  }
})
