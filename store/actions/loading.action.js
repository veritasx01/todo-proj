import { store } from '../store.js';
import { SET_LOADING, FLIP_LOADING } from '../reducers/loading.reducer.js';

export function setIsLoading(isLoading) {
  store.dispatch({ type: SET_LOADING, isLoading });
}

export function flipIsLoading() {
  store.dispatch({ type: FLIP_LOADING });
}
