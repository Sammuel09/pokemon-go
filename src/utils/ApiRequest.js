import axios from 'axios'

const PokemonRequest = async (path) => {
  try {
    return await axios(`https://api.pokemontcg.io/v1/cards${path}`)
  } catch ({ response }) {
    return Error({ errorStatus: response.status })
  }
}

export default PokemonRequest
