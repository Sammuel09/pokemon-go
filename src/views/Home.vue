<template>
  <div class="container-fluid bg-image">
    <Header
    v-on:displayform="displayForm"/>
    <div v-if="showForm">
      <SignUp v-on:displayform="displayForm" />
    </div>
    <div v-else>
      <LogIn v-on:displayform="displayForm"/>
    </div>
  </div>
</template>

<script>
import SignUp from '@/components/SignUp'
import LogIn from '@/components/LogIn'
import Header from '@/components/Header'

export default {
  name: 'home',
  components: {
    SignUp,
    LogIn,
    Header
  },
  data () {
    return {
      showForm: true
    }
  },
  methods: {
    // the displayForm method is listening for an event
    // and it takes the value emitted
    // by the event to toggle the signup or login form
    displayForm ($event) {
      $event === 'signup' ? this.showForm = true : this.showForm = false
    }
  }
}
</script>

<style lang="scss" scoped>
.header{
  display: flex;
}

.logo{
  display: flex;
  margin-top: 20px;
  margin-left: 20px;
}
</style>
