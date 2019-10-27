<template>
  <div>
    <Header />
    <div class="container">
      <div class="filter-group">
          <b-form inline class="filter-form" >
          <b-form-select
            plain
            autofocus
            class="filter-option"
            v-model="filterObject.selected"
            :options="options">
        </b-form-select>
        <div class="filter-search">
          <b-form-input
          autofocus
          v-model="filterObject.searchItem"
          description="Let us know your name."
          class="form-control"
          placeholder="Filter by name, types, set or rarity"
          type="text"
          name="search"
          id="search">
          </b-form-input>
        </div>
        <div class="filter-btn">
          <button
        @click.prevent="filterPokemon"
        class="btn btn-primary filter-btn"
        type="submit">
        Search
        </button>
        </div>
        </b-form>
      </div>
      <div>
        <div class="spinner-grow text-warning loader" style="width: 5rem; height: 5rem;" role="status" v-if="isloading">
          <span class="sr-only">Loading...</span>
        </div>
        <div class="error" v-else-if="error">
          <img src="@/assets/pikachu.png" alt="Image of a Pikachu" width="200px" height="200px">
          <p>There was an error getting your data from the database</p>
        </div>
        <div class="error" v-else-if="slicedPokemonData == 0">
          <img src="@/assets/pikachu.png" alt="Image of a Pikachu" width="200px" height="200px">
          <p>Please enter the correct search parameters</p>
        </div>
        <div v-else>
          <div class="grid-container">
              <div v-for="pokemon in slicedPokemonData" :key="pokemon.id">
                <PokemonCard
                :imageUrl="pokemon.imageUrl"
                :name="pokemon.name"
                :set="pokemon.set"
                :rarity="pokemon.rarity"
                :supertype="pokemon.supertype"
                :id="pokemon.id"
                />
              </div>
          </div>
          <div class="pagination-btn overflow-auto">
            <b-pagination-nav
            :link-gen="linkGen"
            :number-of-pages="100"
            first-text="First"
            prev-text="Prev"
            next-text="Next"
            last-text="Last"
            align="center"
            use-router></b-pagination-nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
import PokemonCard from '@/components/PokemonCard'
import { mapActions, mapState, mapGetters } from 'vuex'

export default {
  name: 'pokemon',
  components: {
    Header,
    PokemonCard
  },
  created () {
    // In the created() lifecycle mthod, the fetchPokemon action
    this.fetchPokemon()
  },
  data () {
    return {
      filterObject: {
        selected: '',
        searchItem: ''
      },
      options: [
        { value: '', text: 'Filter By' },
        { value: 'name', text: 'Name' },
        { value: 'rarity', text: 'Rarity' },
        { value: 'set', text: 'Set' },
        { value: 'types', text: 'Type' }
      ]
    }
  },
  methods: {
    ...mapActions([
      'fetchPokemon',
      'filteredPokemon'
    ]),
    // the linkGen method is listening for an event emitted by the
    // </b-pagination-nav> component. The event is emitted with a value
    // The value get passed into linkGen to determine the query params on the page route
    linkGen (pageNum) {
      return pageNum === 1 ? '/pokemon-cards?' : `/pokemon-cards?page=${pageNum}`
    },
    filterPokemon () {
      // the Action that makes an API call to filter the pokemon data
      this.filteredPokemon(this.filterObject)
    }
  },
  watch: {
    // the query params on the $route is being watched
    // so when ever the query params changes, the handler function is called
    '$route.query.page': {
      immediate: true,
      handler (page) {
        page = parseInt(page) || 1
        if (page) {
          this.fetchPokemon(this.$route.query.page)
        }
      }
    }
  },
  computed: {
    ...mapState({
      isloading: state => state.PokemonModule.isloading,
      error: state => state.PokemonModule.error
    }),
    ...mapGetters([
      'slicedPokemonData'
    ])
  }
}
</script>

<style lang="scss" scoped>
.container{
  margin-top: 50px;
}

.grid-container{
  display: grid;
  grid-column-gap: 30px;
  grid-row-gap: 30px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-top: 25px;
  margin-bottom: 15px;
}

.filter-form{
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-bottom: 30px;
}

.filter-option{
  margin-right: 10px;
}

.filter-search{
  margin-right: 10px;
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

.pagination-btn{
  margin-top: 40px;
  margin-bottom: 35px;
}

@media only screen and (max-width: 760px) {
  .grid-container {
    grid-template-columns: 100%;
    margin-left: 20px;
    margin-right: 20px;
  }
  .filter-group{
    margin-left: 20px;
    margin-right: 20px;
  }
  .filter-form{
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 20px;
    margin-right: 20px;
  }
  .filter-search{
    width: 100%;
    margin-top: 15px;
    margin-bottom: 15px;
  }
  .filter-btn{
    width: 100%;
    margin-right: 10px;
  }

  .error{
    margin: 20% auto;
  }
}

@media only screen and (min-width:768px) and (max-width: 1020px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
   .error{
    margin: 20% auto;
  }
}

@media only screen and (min-width: 1020px) and (max-width: 1025px) {
  .grid-container {
    grid-template-columns: 1fr 1fr;
  }
   .error{
    margin: 20% auto;
  }
}

</style>
