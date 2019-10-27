import { shallowMount, createLocalVue } from '@vue/test-utils'
import router from 'vue-router'
import PokemonCard from '@/components/PokemonCard.vue'
const localVue = createLocalVue()
localVue.use(router)
const wrapper = shallowMount(PokemonCard, {
  localVue
})

describe('Pokemon Card Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })

  it('contains the badges', () => {
    const badges = wrapper.findAll('.labels > .badge-item')
    expect(badges).toHaveLength(3)
  })
})
