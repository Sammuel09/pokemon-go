/**
 * This class contains a series of methods that
 * serves as a wrapper around Local Stoarge methods.
 * @param {*} user - Object
 */
class DBStorage {
  add (key, Item) {
    localStorage.setItem(key, JSON.stringify(Item))
  }
  get (key) {
    return JSON.parse(localStorage.getItem(key))
  }
  findUser (users, user) {
    return users &&
      users.find(u => u.email === user.email || u.username === user.username)
  }
  setAuth (key) {
    localStorage.setItem('isAuth', key)
  }
  authStatus () {
    return localStorage.getItem('isAuth')
  }
}

const Database = new DBStorage()
export default Database
