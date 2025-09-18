import { store } from '../store.js';
import { SET_FILTER, CLEAR_FILTER } from '../reducers/filter.reducer.js';

export function setFilterBy(filterBy) {
  store.dispatch({ type: SET_FILTER, filterBy });
}

export function clearFilterBy() {
  store.dispatch({ type: CLEAR_FILTER });
}
