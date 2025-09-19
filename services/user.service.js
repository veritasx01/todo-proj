import { storageService } from './async-storage.service.js';

export const userService = {
  getLoggedinUser,
  login,
  logout,
  signup,
  saveUser,
  getById,
  query,
  getEmptyCredentials,
};
const STORAGE_KEY_LOGGEDIN = 'user';
const STORAGE_KEY = 'userDB';

function query() {
  return storageService.query(STORAGE_KEY);
}

async function getById(userId) {
  let temp = await storageService.get(STORAGE_KEY, userId);
  return temp;
}

function login({ username, password }) {
  return storageService.query(STORAGE_KEY).then((users) => {
    const user = users.find((user) => user.username === username);
    if (user) return _setLoggedinUser(user);
    else return Promise.reject('Invalid login');
  });
}

function signup({ username, password, fullname }) {
  const user = { username, password, fullname };
  user.createdAt = user.updatedAt = Date.now();
  user.balance = 10000;
  user.activities = []; // activities: [{txt: 'Added a Todo', at: 1523873242735}]
  user.prefs = {
    color: '#000000',
    bgColor: '#ffffff',
  };

  return storageService.post(STORAGE_KEY, user).then(_setLoggedinUser);
}

function saveUser(user) {
  if (user._id) {
    return storageService.put(STORAGE_KEY, user);
  }
  return storageService.post(STORAGE_KEY, user);
}

function logout() {
  sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN);
  return Promise.resolve();
}

function getLoggedinUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN));
}

function _setLoggedinUser(user) {
  const userToSave = { ...user };
  sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave));
  return userToSave;
}

function getEmptyCredentials() {
  return {
    fullname: '',
    username: '',
    password: '',
    balance: 10000,
  };
}

// signup({username: 'muki', password: 'muki1', fullname: 'Muki Ja'})
// login({username: 'muki', password: 'muki1'})

// Data Model:
// const user = {
//     _id: "KAtTl",
//     username: "muki",
//     password: "muki1",
//     fullname: "Muki Ja",
//     createdAt: 1711490430252,
//     updatedAt: 1711490430999
// }
