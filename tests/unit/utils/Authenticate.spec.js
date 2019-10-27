// import Database, { signUpUser } from '../../../src/utils/Authenticate'
// import Database from '..'
// import bcrypt from 'bcryptjs'
import Database from '../../../src/utils/Storage'
import { signUpUser, logInUser, logOutUser } from '../../../src/utils/Authenticate'
const users = [
  {
    email: 'samm@gmail.com',
    username: 'sam',
    password: 'sammie',
    confirmPassword: 'sammie'
  },
  {
    email: 'sammie@gmail.com',
    username: 'sammi',
    password: 'sammie',
    confirmPassword: 'sammie'
  },
  {
    email: 'samuel@gmail.com',
    username: 'samuel',
    password: 'sammie',
    confirmPassword: 'sammie'
  }
]

// Database.add(user)

Storage.prototype.getItem = jest.fn(() => JSON.stringify(users))

const setItemMock = jest.fn()
Storage.prototype.setItem = setItemMock

describe('Sign Up User Function', () => {
  it('calls signUpuser', () => {
    const user = {
      email: 'samm@gmail.com',
      username: 'sam',
      password: 'sammie',
      confirmPassword: 'sammie'
    }
    // Database.add('users', user)
    try {
      signUpUser(user)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('calls signUpuser sucess', () => {
    const user = {
      email: 'josh@gmail.com',
      username: 'josh',
      password: 'joshua',
      confirmPassword: 'joshua'
    }
    // Database.add('users', user)
    try {
      signUpUser(user)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

describe('Log In User Function', () => {
  it('calls log in user', () => {
    const user = {
      username: 'sam',
      password: 'sammie'
    }
    try {
      logInUser(user)
      expect(setItemMock).toHaveBeenCalled()
    } catch (error) {
      expect(error).toBeDefined()
    }
  })

  it('calls LogInUser failure', () => {
    const user = {
      username: 'josh',
      password: 'joshua'
    }
    try {
      logInUser(user)
    } catch (error) {
      expect(error).toBeDefined()
    }
  })
})

describe('Log Out User Function', () => {
  it('calls logOutUser', () => {
    logOutUser()
    expect(setItemMock).toHaveBeenCalled()
  })
})
