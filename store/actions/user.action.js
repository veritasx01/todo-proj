import { SET_USER, CLEAR_USER, INCREMENT_USER_BALANCE } from "../reducers/user.reducer.js";
import { store } from "../store.js";

export function setCurrentUser(user) {
  store.dispatch({type: SET_USER, user});
}

export function clearCurrentUser() {
  store.dispatch({type: CLEAR_USER});
}

export function incrementUserBalance(amount = 10) {
  amount = Math.abs(amount);
  store.dispatch({type: INCREMENT_USER_BALANCE, amount: amount});
}