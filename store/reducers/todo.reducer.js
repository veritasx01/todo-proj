export const SET_TODOS = 'SET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

const initState = {
  todos: [],
};

export function todoReducer(state = initState, action) {
  switch (action.type) {
    case SET_TODOS:
      return {...state, todos: action.todos };
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.todo] };
    case REMOVE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo._id !== action.todoId),
      };
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo._id === action.todoId ? action.todo : todo
        ),
      };
    default:
      return state;
  }
};
