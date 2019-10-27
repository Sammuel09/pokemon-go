<template>
  <div>
    <Header />
    <div class="container">
      <router-link to="/pokemon-cards">
        <button
          class="btn btn-primary"
        >
        <font-awesome-icon icon='angle-left'></font-awesome-icon>
        View All Pokemon Cards
        </button>
      </router-link>
      <div class="spinner-grow text-warning loader" style="width: 5rem; height: 5rem;" role="status" v-if="isloading">
        <span class="sr-only">Loading...</span>
      </div>
      <div class="error" v-else-if="error">
        <img src="@/assets/pikachu.png" alt="Image of a Pikachu" width="200px" height="200px">
        <p>There was an error getting your data from the database</p>
      </div>
      <div class="grid-container" v-else-if="pokemon">
        <div class="single-pokemon-image">
          <img :src="pokemon.imageUrlHiRes" alt="This is the image of a Pokemon" class="img">
        </div>
        <div class="single-pokemon-info card">
          <div class="pokemon-info-row">
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Name
              </div>
              <span class="pokemon-info-value">
                {{pokemon.name}}
              </span>
            </div>
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                National Pokedex Number
              </div>
              <span class="pokemon-info-value">
                {{pokemon.nationalPokedexNumber ? pokemon.nationalPokedexNumber : 'N/A'}}
              </span>
            </div>
          </div>

          <div class="pokemon-info-row">
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                SuperType
              </div>
              <span class="pokemon-info-value">
                {{pokemon.supertype}}
              </span>
            </div>
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                SubType
              </div>
              <span class="pokemon-info-value">
                {{pokemon.subtype}}
              </span>
            </div>
          </div>

           <div class="pokemon-info-row">
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                HP
              </div>
              <span class="pokemon-info-value">
                {{pokemon.hp}}
              </span>
            </div>
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Set Code
              </div>
              <span class="pokemon-info-value">
                {{pokemon.setCode}}
              </span>
            </div>
          </div>

          <div class="pokemon-info-row">
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Artist
              </div>
              <span class="pokemon-info-value">
                {{pokemon.artist}}
              </span>
            </div>
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Series
              </div>
              <span class="pokemon-info-value">
                {{pokemon.series}}
              </span>
            </div>
          </div>

          <div class="pokemon-info-row">
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Attack
              </div>
              <span class="pokemon-info-value">
                {{pokemon.attacks ? pokemon.attacks[0].name : 'N/A'}}
              </span>
            </div>
            <div class="pokemon-info">
              <div class="pokemon-info-key">
                Weakness
              </div>
              <span class="pokemon-info-value">
                {{pokemon.weaknesses ? pokemon.weaknesses[0].type : 'N/A'}}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import Header from '@/components/Header'
export default {
  name: 'SinglePokemon',
  components: {
    Header
  },
  created () {
    // In the created() lifecycle mthod, the fetchSinglePokemon action
    // is being called with the value of the id property
    // of the query parameters of the page route
    this.fetchSinglePokemon(this.$route.params.id)
  },
  methods: {
    ...mapActions([
      'fetchSinglePokemon'
    ])
  },
  computed: {
    ...mapState({
      pokemon: state => state.PokemonModule.pokemonData[0],
      isloading: state => state.PokemonModule.isloading,
      error: state => state.PokemonModule.error
    })
  }
}
</script>
<style scoped lang="scss">
.container{
  margin-top: 30px;
}
.grid-container{
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 50px;
  margin-top: 30px;
  margin-bottom: 50px;
  justify-items: center;
}

.single-pokemon-image{
  .img{
    width: 100%;
    height: 100%;
  }
}

.single-pokemon-info{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: 100%;
  background-color: #ffDE00
}

.pokemon-info-row{
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  .pokemon-info{
    display: flex;
    flex-direction: column;
    width: 50%;
    align-items: center;
  }
}

.pokemon-info-key{
  color: #000;
  font-weight: 800;
  font-size: 18px;
}

.pokemon-info-value{
  color: #3B4CCA;
  font-size: 18px;
}

.loader{
  margin: 20% auto;
  display: flex;
  justify-self: center;
  font-size: 24%
}

.error{
  margin: 10% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    font-weight: bold;
    margin-top: 10px;
  }
}

@media only screen and (max-width: 760px) {
  .grid-container {
    grid-template-columns: 100%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .single-pokemon-image{
    .img{
      width: 100%;
      height: 100%;
    }
  }
  .single-pokemon-info{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 100%;
    background-color: #ffDE00;
    margin-top: 30px;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .pokemon-info-row{
    margin-top: 10px;
  }

  .pokemon-info-key{
    color: #000;
    font-weight: 800;
    font-size: 18px;
  }

  .pokemon-info-value{
    color: #3B4CCA;
    font-size: 18px;
  }

  .btn{
    margin-left: 30px;
  }
}
</style>
