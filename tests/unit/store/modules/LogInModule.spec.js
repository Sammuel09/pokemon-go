import LogInModule from '../../../../src/store/modules/LogInModule'
import { signUpUser, logOutUser } from '../../../../src/utils/Authenticate'

describe('Log in a user', () => {
  it('adds a loading state to the state with LOGIN_USER_LOADING mutation ', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    LogInModule.mutations.LOGIN_USER_LOADING(state)

    expect(state).toEqual({
      isloading: true,
      user: {},
      error: ''
    })
  })

  it('adds a user object to the state with LOGIN_USER_SUCCESS mutation', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    const payload = {
      username: 'sam',
      password: 'sammie'
    }
    LogInModule.mutations.LOGIN_USER_SUCCESS(state, payload)

    expect(state).toEqual({
      isloading: false,
      user: payload,
      error: ''
    })
  })

  it('adds an error state to the state LOGIN_USER_ERROR mutation', () => {
    const state = {
      isloading: false,
      user: {},
      error: ''
    }
    const payload = 'This user already exists. Please log in'
    LogInModule.mutations.LOGIN_USER_ERROR(state, payload)
    expect(state).toEqual({
      isloading: false,
      user: {},
      error: payload
    })
  })

  it('calls the LogInUser action', () => {
    const commit = jest.fn()
    const user = {
      username: 'james',
      password: 'jamesbond'
    }
    LogInModule.actions.LogInUser({ commit }, user)
    expect(commit).toHaveBeenCalledTimes(2)
  })

  it('tests the error condition on the LogInUser action', () => {
    const commit = jest.fn()
    const user = {
      username: 'james',
      password: 'jamesbo'
    }
    LogInModule.actions.LogInUser({ commit }, user)
    expect(commit).toHaveBeenCalledTimes(2)
  })
})
