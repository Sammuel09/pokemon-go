<template>
  <div class="container-fluid">
    <header class="header">
      <div class="logo">
        <router-link :to="`/`"><img src="@/assets/pokemon-logo.png" alt="Pokemon Logo" class="logo-img"></router-link>
      </div>
      <div class="reg-btn">
        <div v-if="!isAuth">
          <button class="btn btn-primary btn-sm sign-up" type="submit" @click="$emit('displayform', 'signup')">Sign Up</button>
          <button class="btn btn-secondary btn-sm log-in" type="submit" @click="$emit('displayform', 'login')">Log In</button>
        </div>
        <div class="loggedIn" v-else>
          <button class="btn btn-danger btn-sm sign-up" type="submit" @click="logOut">Log Out</button>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Database from '../utils/Storage'

export default {
  name: 'Header',
  data () {
    return {
      isAuth: ''
    }
  },
  mounted () {
    this.isAuth = JSON.parse(Database.authStatus())
  },
  methods: {
    logOut () {
      this.LogOutUser()
    },
    ...mapActions([
      'LogOutUser'
    ])
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
  justify-content: space-between;
  margin-top: 3%;
}

.logo{
  display: flex;
  margin-left: 20px;
  .logo-img{
    width: 200px;
  }
}

.loggedIn{
  display: flex;
}

.header-text {
  font-size: 16px;
}

.reg-btn{
  margin-right: 40px;
  .sign-up{
    margin-left: 10px;
  }
  .log-in{
    margin-left: 10px;
  }
}

@media only screen and (max-width: 760px) {
  .header{
    display: flex;
    justify-content: space-between;
    margin-top: 15%;
  }
  .logo{
    .logo-img{
      width: 100px;
    }
  }
}
</style>
