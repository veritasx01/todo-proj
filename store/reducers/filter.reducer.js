import { todoService } from '../../services/todo.service.js';

export const SET_FILTER = 'SET_FILTER';
export const CLEAR_FILTER = 'CLEAR_FILTER';

const initState = { filterBy: todoService.getDefaultFilter() };

export function filterReducer(state = initState, action) {
  switch (action.type) {
    case SET_FILTER:
      return { ...state, filterBy: action.filterBy };
    case CLEAR_FILTER:
      return { ...state, filterBy: initState };
    default:
      return state;
  }
}
