import { shallowMount, createLocalVue } from '@vue/test-utils'
import LogIn from '@/components/LogIn.vue'
import Vuex from 'vuex'
import Vuelidate from 'vuelidate'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(Vuelidate)
const store = new Vuex.Store({
  modules: {
    LogInModule: {
      state: {
        error: ''
      },
      actions: {
        LogInUser: jest.fn()
      }
    }
  }
})

const wrapper = shallowMount(LogIn, {
  localVue,
  store
})

describe('LogIn Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('renders the correct markup', () => {
    expect(wrapper.contains('div')).toBe(true)
  })
  it('Calls the submit the signup form with correct data', () => {
    wrapper.setData({
      user: {
        username: 'samuel',
        password: 'samuel'
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
        username: '',
        password: 'samuel'
      }
    })
    const button = wrapper.find('button')
    const onSubmit = jest.spyOn(wrapper.vm, 'onSubmit')
    button.trigger('click')
    expect(onSubmit).toBeCalled()
  })
})
