import { shallowMount, createLocalVue } from '@vue/test-utils'
import Home from '@/views/Home.vue'
import Header from '@/components/Header.vue'
const localVue = createLocalVue()
const wrapper = shallowMount(Home, {
  localVue
})

describe('SignUp Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('Calls the display form method when custom event is emitted', () => {
    wrapper.find(Header).vm.$emit('displayform')
  })
})
