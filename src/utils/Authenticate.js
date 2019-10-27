import Database from './Storage'
import bcrypt from 'bcryptjs'

/**
 * This method checks if the user previously signed up
 * If not, the user is signed up.
 * @param {*} user - Object
 */
export function signUpUser (user) {
  let users = Database.get('users')
  if (Database.findUser(users, user)) {
    const error = new Error('The user already exists. Please log in')
    throw error
  } else {
    const { password } = user
    var hashedPassword = bcrypt.hashSync(password, 10)
    const newUser = { ...user, password: hashedPassword }
    users = users ? users.concat(newUser) : [newUser]
    Database.add('users', users)
    Database.setAuth(true)
    return users
  }
}

/**
 * This method checks if the user is in the DB
 * If so, it compares and makes sure the password matches
 * @param {*} user - Object
 */
export function logInUser (user) {
  // check if the details are present
  const users = Database.get('users')
  if (
    users &&
    users.find(
      u =>
        u.username === user.username &&
        bcrypt.compareSync(user.password, u.password)
    )
  ) {
    Database.setAuth(true)
    return user
  } else {
    const error = Error('Invalid Credentials')
    throw error
  }
}

/**
 * This method clears the local storage
 * @param {*} user - Object
 */
export function logOutUser () {
  Database.setAuth(false)
}
