import { shallowMount, createLocalVue } from '@vue/test-utils'
import Pokemon from '@/views/Pokemon.vue'
import PokemonCard from '@/components/PokemonCard.vue'
import Header from '@/components/Header.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
const localVue = createLocalVue()
localVue.use(Vuex)
localVue.use(VueRouter)
localVue.use(BootstrapVue)
const router = new VueRouter()

const mockFilteredPokemon = jest.fn()
const store = new Vuex.Store({
  modules: {
    PokemonModule: {
      state: {
        isloading: false,
        pokemonData: [],
        error: ''
      },
      getters: {
        slicedPokemonData: jest.fn(),
        singlePokemon: jest.fn()
      },
      actions: {
        fetchPokemon: jest.fn(),
        filteredPokemon: mockFilteredPokemon,
        fetchSinglePokemon: jest.fn()
      }
    }
  }
})

const mockFetchPokemon = jest.fn()

const wrapper = shallowMount(Pokemon, {
  PokemonCard,
  Header,
  localVue,
  store,
  router,
  methods: {
    fetchPokemon: mockFetchPokemon
  }
})

describe('SignUp Component renders', () => {
  it('is a Vue Instance', () => {
    expect(wrapper.isVueInstance).toBeTruthy()
  })
  it('Calls the Fetch Pokemon action on the created hook', () => {
    expect(mockFetchPokemon).toBeCalled()
  })
  it('Calls the linkGen function to make pagination calls for first page', () => {
    const linkGen = jest.spyOn(wrapper.vm, 'linkGen')
    const result = linkGen(1)
    expect(result).toBe('/pokemon-cards?')
  })
  it('Calls the linkGen function to make pagination calls for other pages', () => {
    const linkGen = jest.spyOn(wrapper.vm, 'linkGen')
    const result = linkGen(2)
    expect(result).toBe('/pokemon-cards?page=2')
  })
  it('Calls the filterPokemon Method to make API calls to filter the pokemon', () => {
    const filterPokemon = jest.spyOn(wrapper.vm, 'filterPokemon')
    const filterObject = {
      selected: 'name',
      searchItem: 'cubone'
    }
    wrapper.setData({
      filterObject
    })
    filterPokemon()
    expect(mockFilteredPokemon).toBeCalled()
  })
})
