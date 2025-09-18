import { SET_USER, CLEAR_USER } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export function setCurrentUser(user) {
  store.dispatch({type: SET_USER, user});
}

export function clearCurrentUser() {
  store.dispatch({type: CLEAR_USER});
}