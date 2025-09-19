import { userService } from '../../services/user.service.js';

export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const INCREMENT_USER_BALANCE = 'INCREMENT_USER_BALANCE';

const initState = userService.getEmptyCredentials();

export function userReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case CLEAR_USER:
      return { ...state, user: null };
    case INCREMENT_USER_BALANCE:
      if (!state.user) {
        return state;
      }
      return {
        ...state,
        user: { ...state.user, balance: state.user.balance + action.amount },
      };
    default:
      return state;
  }
}
