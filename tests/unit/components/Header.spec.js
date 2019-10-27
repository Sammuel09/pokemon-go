import Database from '../../../src/utils/Storage'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import router from 'vue-router'
import Header from '@/components/Header.vue'
import Vuex from 'vuex'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(router)
const store = new Vuex.Store({
  modules: {
    SignUpModule: {
      actions: {
        LogOutUser: jest.fn()
      }
    }
  }
})

const authStatus = jest.fn()

const wrapper = shallowMount(Header, {
  localVue,
  store,
  Database,
  methods: {
    authStatus
  }
})

describe('Header Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('calls the LogOut Action', () => {
    wrapper.setData({
      isAuth: true
    })
    const button = wrapper.findAll('button')
    expect(button).toHaveLength(1)
    button.trigger('click')
  })
})
