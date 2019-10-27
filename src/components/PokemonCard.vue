
<template>
    <div class="card">
        <router-link :to="`/pokemon-cards/${id}`"><img :src="imageUrl" alt="This is the image of a Pokemon" class="img"></router-link>
        <p class="item-name">{{name}}</p>
        <div class="labels">
            <div class="badge-item">
                <span class="badge badge-primary">{{supertype}}</span>
                <small>supertype</small>
            </div>
            <div class="badge-item">
                <span class="badge badge-success">{{rarity ? rarity : 'N/A'}}</span>
                <small>rarity</small>
            </div>
            <div class="badge-item">
                <span class="badge badge-warning">{{set}}</span>
                <small>set</small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'PokemonCard',
  props: {
    imageUrl: String,
    name: String,
    set: String,
    supertype: String,
    rarity: String,
    id: String
  },
  data () {
    return {
      text: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.card{
    border: none;
    background-color: #f2f2f2;
    p {
        font-weight: 700;
        margin-left: 15px;
        margin-top: 10px;
        margin-bottom: none !important;
    }
    border-radius: 15px;
}

.card:hover{
    cursor: pointer;
    background-color: #adacac;
    .item-name{
        color: #fff;
    }
    small{
        color: #fff;
    }
}

.img{
    width: 100%;
    height: 100%;
    max-height: 350px;
}

.badge-item{
    display: flex;
    flex-direction: column;
}

.labels{
    display: flex;
    flex-direction: row;
    margin-left: 15px;
    margin-right: 15px;
    margin-bottom: 15px;
    justify-content: space-between;
}

.badge{
    margin-bottom: none;
}
</style>
