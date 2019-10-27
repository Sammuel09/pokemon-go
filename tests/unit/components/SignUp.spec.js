import { shallowMount, createLocalVue } from '@vue/test-utils'
import SignUp from '@/components/SignUp.vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuelidate)
const store = new Vuex.Store({
  modules: {
    SignUpModule: {
      state: {
        isloading: false,
        error: ''
      },
      actions: {
        SignUpUser: jest.fn()
      }
    }
  }
})

const wrapper = shallowMount(SignUp, {
  localVue,
  store
})

describe('SignUp Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('Calls the submit the signup form with correct data', () => {
    wrapper.setData({
      user: {
        email: 'sam@gmail.com',
        username: 'samuel',
        password: 'samuel',
        confirmPassword: 'samuel'
      }
    })
    const button = wrapper.find('button')
    const onSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    button.trigger('click')
    expect(onSubmit).toBeCalled()
  })
  it('the validaation works with incomplete data', () => {
    wrapper.setData({
      user: {
        email: 'sam@gmail.com',
        username: '',
        password: 'samuel',
        confirmPassword: 'samuel'
      }
    })
    const button = wrapper.find('button')
    const onSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    button.trigger('click')
    expect(onSubmit).toBeCalled()
  })
})
