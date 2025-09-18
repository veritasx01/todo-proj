import { userService } from '../../services/user.service.js';
export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';

const initState = userService.getEmptyCredentials();

export function userReducer(state = initState, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.user };
    case CLEAR_USER:
      return { ...state, user: null};
    default:
      return state;
  }
}
