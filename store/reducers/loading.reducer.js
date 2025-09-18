export const SET_LOADING = "SET_LOADING";
export const FLIP_LOADING = "FLIP_LOADING";

const initState = {
  isLoading: false,
}

export function loadingReducer(state = initState, action) {
  switch(action.type) {
    case SET_LOADING:
      return {...state, isLoading: action.isLoading};
    case FLIP_LOADING:
      return {...state, isLoading: !state.isLoading};
    default:
      return state;
  }
}