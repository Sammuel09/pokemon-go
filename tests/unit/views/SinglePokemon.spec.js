import { shallowMount, createLocalVue } from '@vue/test-utils'
import SinglePokemon from '@/views/SinglePokemon.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)
const router = new VueRouter()
localVue.component('font-awesome-icon', FontAwesomeIcon)

const store = new Vuex.Store({
  modules: {
    PokemonModule: {
      state: {
        isloading: false,
        pokemonData: [],
        error: ''
      },
      getters: {
        slicedPokemonData: jest.fn()
      },
      actions: {
        fetchPokemon: jest.fn(),
        filteredPokemon: jest.fn(),
        fetchSinglePokemon: jest.fn()
      }
    }
  }
})

const mockFetchSinglePokemon = jest.fn()
const wrapper = shallowMount(SinglePokemon, {
  localVue,
  store,
  router,
  methods: {
    fetchSinglePokemon: mockFetchSinglePokemon
  }
})

describe('SignUp Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('Calls the Fetch Pokemon action on the created hook', () => {
    expect(mockFetchSinglePokemon).toBeCalled()
  })
})
