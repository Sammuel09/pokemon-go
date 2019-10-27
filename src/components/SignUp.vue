<template>
  <div class="container">
    <div class="form-section">
      <form>
        <div class="form-group">
            <label class="input-label" for="email">Email:</label>
            <input
            v-model="user.email"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.email.$error }"
            type="email"
            name="email"
            id="email"
            placeholder="john@email.com">
            <div v-if="submitted && $v.user.email.$error" class="invalid-feedback">
              <span v-if="!$v.user.email.required">Email is required</span>
              <span v-if="!$v.user.email.email">Email is invalid</span>
            </div>
        </div>
        <div class="form-group">
            <label class="input-label" for="username">Username:</label>
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
            <label class="input-label" for="password">Password:</label>
            <input
            v-model="user.password"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.password.$error }"
            type="password"
            name="password"
            placeholder="Password"
            id="password">
            <div v-if="submitted && $v.user.password.$error" class="invalid-feedback">
              <span v-if="!$v.user.password.required">Password is required</span>
              <span v-if="!$v.user.password.minLength">Password must be at least 6 characters</span>
            </div>
        </div>
        <div class="form-group">
            <label class="input-label" for="confirmpassword">Confirm Password:</label>
            <input
            v-model="user.confirmPassword"
            class="form-control"
            :class="{ 'is-invalid': submitted && $v.user.confirmPassword.$error }"
            type="password"
            name="confirmpassword"
            placeholder="Confirm Password"
            id="confirmpassword">
            <div v-if="submitted && $v.user.confirmPassword.$error" class="invalid-feedback">
              <span v-if="!$v.user.confirmPassword.required">Confirm Password is required</span>
              <span v-else-if="!$v.user.confirmPassword.sameAsPassword">Passwords must match</span>
            </div>
        </div>
        <button
        class="btn btn-primary btn-sm"
        type="submit"
        @click.prevent="onSubmit">
        <span
        role="status" aria-hidden="true"></span>
        Sign Up
        </button>
        <div v-if="error" class="error-feedback">
          <span>This user already exists. Please log in</span>
        </div>
      </form>
      <div class="extra-signup-info">
        <p class="signup-text">Already have an account?</p>
        <p class="signup-link" @click="$emit('displayform', 'login')">Login</p>
      </div>
    </div>
  </div>
</template>

<script>
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex'

export default {
  name: 'SignUp',
  data () {
    return {
      user: {
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
      },
      submitted: false
    }
  },
  validations: {
    user: {
      email: {
        required,
        email
      },
      username: {
        required
      },
      password: {
        required,
        minLength: minLength(6)
      },
      confirmPassword: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  methods: {
    onSubmit (event) {
      this.submitted = true
      //  // if form is invalid the method stops here
      this.$v.$touch()
      if (this.$v.$invalid) {
        return
      }
      this.SignUpUser(this.user)
    },
    ...mapActions([
      'SignUpUser'
    ])
  },
  computed: {
    ...mapState({
      error: state => state.SignUpModule.error
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

.extra-signup-info{
  margin-top: 10px;
  display: flex;
  font-size: 16px;
  .signup-text{
    margin-right: 7px;
  }
  .signup-link{
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
