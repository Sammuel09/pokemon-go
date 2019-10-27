import PokemonModule from '../../../../src/store/modules/PokemonModule'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

describe('Fetch Pokemon from the API', () => {
  beforeEach(() => {
    mock.reset()
  })
  it('adds a loading state to the state with FETCH_POKEMON_LOADING mutation ', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    PokemonModule.mutations.FETCH_POKEMON_LOADING(state)
    expect(state).toEqual({
      isloading: true,
      pokemonData: [],
      error: ''
    })
  })

  it('adds a pokemon data to the state with FETCH_POKEMON_SUCCESS mutation', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    const payload = [{
      id: 'pop9-17',
      imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
      name: 'Turtwig'
    }]

    PokemonModule.mutations.FETCH_POKEMON_SUCCESS(state, payload)

    expect(state).toEqual({
      isloading: false,
      pokemonData: payload,
      error: ''
    })
  })

  it('adds an error state to the state FETCH_POKEMON_ERROR mutation', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    const payload = 'Cannot read property status of undefined'
    PokemonModule.mutations.FETCH_POKEMON_ERROR(state, payload)
    expect(state).toEqual({
      isloading: false,
      pokemonData: [],
      error: payload
    })
  })

  it('adds a loading state to the state with FILTER_POKEMON_LOADING mutation ', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    PokemonModule.mutations.FILTER_POKEMON_LOADING(state)
    expect(state).toEqual({
      isloading: true,
      pokemonData: [],
      error: ''
    })
  })

  it('adds a pokemon data to the state with FILTER_POKEMON_SUCCESS mutation', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    const payload = [
      {
        id: 'pop9-17',
        imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
        name: 'Turtwig'
      }
    ]

    PokemonModule.mutations.FILTER_POKEMON_SUCCESS(state, payload)

    expect(state).toEqual({
      isloading: false,
      pokemonData: payload,
      error: ''
    })
  })

  it('adds an error state to the state FILTER_POKEMON_ERROR mutation', () => {
    const state = {
      isloading: false,
      pokemonData: [],
      error: ''
    }
    const payload = 'Cannot read property status of undefined'
    PokemonModule.mutations.FILTER_POKEMON_ERROR(state, payload)
    expect(state).toEqual({
      isloading: false,
      pokemonData: [],
      error: payload
    })
  })

  it('calls the fetchPokemon action', () => {
    const commit = jest.fn()
    const page = 1
    mock.onGet(`https://api.pokemontcg.io/v1/cards/?page=${page}`).reply(200, {
      cards: [
        {
          id: 'pop9-17',
          imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
          name: 'Turtwig'
        }
      ]
    })
    PokemonModule.actions.fetchPokemon({ commit }, page).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })

  it('calls the SlicedPokemon getters', () => {
    const state = {
      isloading: false,
      pokemonData: [...Array(30).keys()],
      error: ''
    }

    const slicedData = PokemonModule.getters.slicedPokemonData(state)
    expect(slicedData).toHaveLength(20)
  })

  it('throws error when calling the fetchPokemon action', () => {
    const commit = jest.fn()
    const page = 1
    mock.onGet(`https://api.pokemontcg.io/v1/cards?page=${page}`).reply(404,
      new Error('Network Error')
    )
    PokemonModule.actions.fetchPokemon({ commit }, page).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })

  it('calls the filteredPokemon action', () => {
    const commit = jest.fn()
    const filterObject = {
      selected: 'name',
      searchItem: 'cubone'
    }
    mock
      .onGet(
        `https://api.pokemontcg.io/v1/cards?name=cubone`
      )
      .reply(200, {
        cards: [
          {
            id: 'pop9-17',
            imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
            name: 'Turtwig'
          },
          {
            id: 'pop9-17',
            imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
            name: 'Turtwig'
          }
        ]
      })
    PokemonModule.actions.filteredPokemon({ commit }, filterObject).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })

  it('throws error when calling the filteredPokemon action', () => {
    const commit = jest.fn()
    const filterObject = {
      selected: 'name',
      searchItem: 'cubone'
    }
    mock
      .onGet(`https://api.pokemontcg.io/v1/cards?name=cubone`)
      .reply(404, new Error('Network Error'))
    PokemonModule.actions.filteredPokemon({ commit }, filterObject).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })

  it('calls the fetchSinglePokemon action', () => {
    const commit = jest.fn()
    const id = 'dp6-90'
    mock.onGet(`https://api.pokemontcg.io/v1/cards?id=${id}`).reply(200, {
      cards: [
        {
          id: 'pop9-17',
          imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
          name: 'Turtwig'
        }
      ]
    })
    PokemonModule.actions.fetchSinglePokemon({ commit }, id).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })

  it('throws error when calling the fetchSinglePokemon action', () => {
    const commit = jest.fn()
    const id = 'dp6-90'
    mock
      .onGet(`https://api.pokemontcg.io/v1/cards?id=${id}`)
      .reply(404, new Error('Network Error'))
    PokemonModule.actions.fetchSinglePokemon({ commit }, id).then(() => {
      expect(commit).toHaveBeenCalledTimes(2)
    })
  })
})
