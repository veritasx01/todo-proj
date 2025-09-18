import { todoService } from '../../services/todo.service.js';
import {
  SET_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
} from '../reducers/todo.reducer.js';
import { store } from '../store.js';

export function queryTodos(filterBy) {
  return todoService
    .query(filterBy)
    .then((todos) => store.dispatch({ type: SET_TODOS, todos }))
    .catch((error) => {
      console.log('cannot load todos, error: ', error);
      throw error;
    });
}

export function removeTodo(todoId) {
  return todoService
    .remove(todoId)
    .then(() => store.dispatch({ type: REMOVE_TODO, todoId }))
    .catch((error) => {
      console.log(`error removing todo (id: ${todoId}), error: ${error}`);
      throw error;
    });
}

export function saveTodo(todo) {
  const type = todo._id ? UPDATE_TODO : ADD_TODO;
  return todoService
    .save(todo)
    .then((savedTodo) => {
      store.dispatch({ type: type, todo });
      return savedTodo;
    })
    .catch((error) => {
      console.log('error saving todo, error: ', error);
      throw error;
    });
}
