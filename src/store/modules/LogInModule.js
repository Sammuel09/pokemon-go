import { logInUser } from '../../utils/Authenticate'
import router from '../../router/index'

export default {
  state: {
    isloading: false,
    user: {},
    error: ''
  },
  getters: {},
  mutations: {
    LOGIN_USER_LOADING (state) {
      state.isloading = true
    },
    LOGIN_USER_SUCCESS (state, payload) {
      state.user = payload
      state.isloading = false
    },
    LOGIN_USER_ERROR (state, payload) {
      state.error = payload
      state.isloading = false
    }
  },
  actions: {
    LogInUser: ({ commit }, user) => {
      commit('LOGIN_USER_LOADING')
      try {
        const userDetails = logInUser(user)
        commit('LOGIN_USER_SUCCESS', userDetails)
        router.push({ path: '/pokemon-cards' })
      } catch (error) {
        commit('LOGIN_USER_ERROR', error)
      }
    }
  }
}
