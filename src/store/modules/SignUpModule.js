import { signUpUser, logOutUser } from '../../utils/Authenticate'
import router from '../../router/index'

export default {
  state: {
    isloading: false,
    user: {},
    error: ''
  },
  getters: {
  },
  mutations: {
    SIGNUP_USER_LOADING (state) {
      state.isloading = true
    },
    SIGNUP_USER_SUCCESS (state, payload) {
      state.user = payload
      state.isloading = false
    },
    SIGNUP_USER_ERROR (state, payload) {
      state.error = payload
      state.isloading = false
    }
  },
  actions: {
    SignUpUser: ({ commit }, user) => {
      commit('SIGNUP_USER_LOADING')
      try {
        const userDetails = signUpUser(user)
        commit('SIGNUP_USER_SUCCESS', userDetails)
        router.push({ path: '/pokemon-cards' })
      } catch (error) {
        commit('SIGNUP_USER_ERROR', error)
      }
    },
    LogOutUser: ({ commit }) => {
      commit('LOGOUT_USER')
      logOutUser()
      router.push('/')
    }
  }
}
