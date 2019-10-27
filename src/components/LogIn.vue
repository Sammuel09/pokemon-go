<template>
  <div class="container">
    <div class="form-section">
      <form>
        <div class="form-group">
            <label  class="input-label" for="username">Username</label>
            <input
            v-model="user.username"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.username.$error }"
            type="text"
            name="username"
            id="username"
            placeholder="Username">
            <div v-if="submitted && !$v.user.username.required" class="invalid-feedback">Username is required</div>
        </div>
        <div class="form-group">
            <label class="input-label" for="password">Password</label>
            <input
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            v-model="user.password"
            type="password"
            name="password"
            placeholder="Password"
            id="password">
            <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
              <span v-if="!$v.user.password.required">Password is required</span>
              <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
            </div>
        </div>
        <button
        class="btn btn-primary"
        type="submit"
        @click.prevent="onSubmit">Log in</button>
        <div v-if="error" class="error-feedback">
          <span>Invalid credentials</span>
        </div>
      </form>
      <div class="extra-login-info">
        <p class="login-text">Don't have an account?</p>
        <p class="login-link" @click="$emit('displayform', 'signup')">Sign Up</p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'LogIn',
  data () {
    return {
      user: {
        username: '',
        password: ''
      },
      submitted: false
    }
  },
  validations: {
    user: {
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    onSubmit (event) {
      this.submitted = true
      // if form is invalid the method stops here
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.LogInUser(this.user)
    },
    ...mapActions([
      'LogInUser'
    ])
  },
  computed: {
    ...mapState({
      error: state => state.LogInModule.error
    })
  }
}
</script>

<style lang="scss" scoped>
.form-section{
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40%;
  margin: 7% auto;
}

.input-label{
  font-weight: bold;
}

.extra-login-info{
  margin-top: 15px;
  display: flex;
  font-size: 16px;
  .login-text{
    margin-right: 7px;
  }
  .login-link{
    color: blue;
    cursor: pointer;
  }
}

.error-feedback{
  width: 100%;
  margin-top: 0.25rem;
  font-size: 80%;
  color: #dc3545;
  margin-top: 5px;
}

@media only screen and (max-width: 415px) {
  .form-section{
    width: 80%;
    margin: 30% auto;
  }
}

@media only screen and (min-width: 767px) and (max-width: 1025px) {
  .form-section{
    width: 60%;
    margin: 30% auto;
    font-size: 28px;
  }
}

</style>
