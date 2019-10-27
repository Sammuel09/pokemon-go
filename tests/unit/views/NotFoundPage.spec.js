import { shallowMount, createLocalVue } from '@vue/test-utils'
import NotFoundPage from '@/views/NotFoundPage.vue'
import VueRouter from 'vue-router'
const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()
const wrapper = shallowMount(NotFoundPage, {
  localVue,
  router
})

describe('SignUp Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('Calls the redirect method', () => {
    const redirectMethod = jest.spyOn(wrapper.vm, 'redirect')
    redirectMethod()
    expect(redirectMethod).toBeCalled()
  })
})
