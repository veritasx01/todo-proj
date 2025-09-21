import { todoReducer } from "./reducers/todo.reducer.js";
import { loadingReducer } from "./reducers/loading.reducer.js";
import { userReducer } from "./reducers/user.reducer.js";
import { filterReducer } from "./reducers/filter.reducer.js";

const { createStore, combineReducers, compose } = Redux;
const rootReducer = combineReducers({
  todoModule: todoReducer,
  loadingModule: loadingReducer,
  userModule: userReducer,
  filterModule: filterReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers());
window.gStore = store;
