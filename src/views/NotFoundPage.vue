
<template>
  <div>
    <Header />
    <div class="error">
        <img src="@/assets/pikachu.png" alt="Image of a Pikachu" width="200px" height="200px">
        <p>Hello. Seems the page you are looking for does not exist</p>
          <button
          @click="redirect"
          class="btn btn-success">
            Go back
          </button>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'
export default {
  name: 'NotFoundPage',
  components: {
    Header
  },
  methods: {
    redirect () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.error{
  margin: 8% auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  img {
    justify-self: center;
  }
  p {
    font-weight: bold;
    font-size: 30px;
    margin-top: 10px;
    text-align: center;
  }
}

@media only screen and (max-width: 415px) {
  .error{
    margin: 30% auto;
  }
}

@media only screen and (min-width: 767px) and (max-width: 1025px) {
  .error{
    margin: 30% auto;
  }
}
</style>
