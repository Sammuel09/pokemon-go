import SignUpModule from '../../../../src/store/modules/SignUpModule'
import { signUpUser, logOutUser } from '../../../../src/utils/Authenticate'
import 'jest'

describe('Sign up a user', () => {
  it('adds a loading state to the state with SIGNUP_USER_LOADING mutation ', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    SignUpModule.mutations.SIGNUP_USER_LOADING(state)

    expect(state).toEqual({
      isloading: true,
      user: {},
      error: ''
    })
  })

  it('adds a user object to the state with SIGNUP_USER_SUCCESS mutation', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    const payload = {
      email: 'sam@gmail.com',
      username: 'sam',
      password: 'sammie',
      confirmPassword: 'sammie'
    }
    SignUpModule.mutations.SIGNUP_USER_SUCCESS(state, payload)

    expect(state).toEqual({
      isloading: false,
      user: payload,
      error: ''
    })
  })

  it('adds an error state to the state SIGNUP_USER_ERROR mutation', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    const payload = 'This user already exists. Please log in'
    SignUpModule.mutations.SIGNUP_USER_ERROR(state, payload)
    expect(state).toEqual({
      isloading: false,
      user: {},
      error: payload
    })
  })

  it('calls the SignUpUser action', () => {
    const commit = jest.fn()
    const user1 = {
      email: 'james@gmail.com',
      username: 'james',
      password: 'jamesbond',
      confirmPassword: 'jamesbond'
    }
    SignUpModule.actions.SignUpUser({ commit }, user1)
    expect(commit).toHaveBeenCalledTimes(2)
  })

  it('tests the error condition on the SignUpUser action', () => {
    const commit = jest.fn()
    const error = jest.fn()
    const user1 = {
      email: 'james@gmail.com',
      username: 'james',
      password: 'jamesbo',
      confirmPassword: 'jamesbond'
    }
    SignUpModule.actions.SignUpUser({ commit }, user1)
    expect(commit).toHaveBeenCalledTimes(2)
  })

  it('tests the LogOut action', () => {
    const commit = jest.fn()
    SignUpModule.actions.LogOutUser({ commit })
    expect(commit).toHaveBeenCalled()
  })
})
