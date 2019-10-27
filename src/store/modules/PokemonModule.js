import PokemonRequest from '../../utils/ApiRequest'

export default {
  state: {
    isloading: false,
    pokemonData: [],
    error: ''
  },
  getters: {
    slicedPokemonData: state => {
      return state.pokemonData.slice(0, 20)
    }
  },
  mutations: {
    FETCH_POKEMON_LOADING (state) {
      state.isloading = true
    },
    FETCH_POKEMON_SUCCESS (state, payload) {
      state.pokemonData = payload
      state.isloading = false
    },
    FETCH_POKEMON_ERROR (state, payload) {
      state.error = payload
      state.isloading = false
    },
    FILTER_POKEMON_LOADING (state) {
      state.isloading = true
    },
    FILTER_POKEMON_SUCCESS (state, payload) {
      state.pokemonData = payload
      state.isloading = false
    },
    FILTER_POKEMON_ERROR (state, payload) {
      state.error = payload
      state.isloading = false
    }
  },
  actions: {
    fetchPokemon: async ({ commit }, page) => {
      commit('FETCH_POKEMON_LOADING')
      try {
        const pokemonData = await PokemonRequest(`?page=${page}`)
        commit('FETCH_POKEMON_SUCCESS', pokemonData.data.cards)
      } catch (error) {
        commit('FETCH_POKEMON_ERROR', error)
      }
    },
    filteredPokemon: async ({ commit }, filterObject) => {
      commit('FILTER_POKEMON_LOADING')
      try {
        const filteredPokemonData = await PokemonRequest(
          `?${filterObject.selected}=${filterObject.searchItem}`
        )
        commit('FILTER_POKEMON_SUCCESS', filteredPokemonData.data.cards)
      } catch (error) {
        commit('FETCH_POKEMON_ERROR', error)
      }
    },
    fetchSinglePokemon: async ({ commit }, id) => {
      commit('FETCH_POKEMON_LOADING')
      try {
        const pokemonData = await PokemonRequest(`?id=${id}`)
        commit('FETCH_POKEMON_SUCCESS', pokemonData.data.cards)
      } catch (error) {
        commit('FETCH_POKEMON_ERROR', error)
      }
    }
  }
}
