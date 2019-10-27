import axios from 'axios'
import PokemonRequest from '../../../src/utils/ApiRequest'
import MockAdapter from 'axios-mock-adapter'

const mock = new MockAdapter(axios)

// jest.mock('axios')
it('calls the api successfully', () => {
  mock.onGet('https://api.pokemontcg.io/v1/cards/').reply(200, {
    cards: [{ id: 'pop9-17', imageUrl: 'https://images.pokemontcg.io/pop9/17.png', name: 'Turtwig' }]
  })
  PokemonRequest('https://api.pokemontcg.io/v1/cards/').then(response => {
    expect(response.data.cards).toEqual([
      {
        id: 'pop9-17',
        imageUrl: 'https://images.pokemontcg.io/pop9/17.png',
        name: 'Turtwig'
      }
    ])
  })
})

it('throws an error when there is an error', () => {
  mock
    .onGet('https://api.pokemontcg.io/v1/cards/')
    .reply(404, new Error('Network Error'))

  PokemonRequest('https://api.pokemontcg.io/v1/cards/').catch(response => {
    expect(response).toEqual(Error({ errorStatus: response.status }))
  })
})
