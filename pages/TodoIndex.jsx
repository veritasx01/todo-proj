import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
//import { queryTodos, removeTodo, saveTodo} from "../store/actions/todo.action.js";
import {
  queryTodos,
  removeTodo,
  saveTodo,
} from "../store/actions/todo.action.js";

const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;

export function TodoIndex() {
  //const [todos, setTodos] = useState(null);
  const todos = useSelector((state) => state.todoModule.todos);
  // Special hook for accessing search-params:
  const [searchParams, setSearchParams] = useSearchParams();

  const defaultFilter = todoService.getFilterFromSearchParams(searchParams);

  const [filterBy, setFilterBy] = useState(defaultFilter);

  useEffect(() => {
    setSearchParams(filterBy);
    queryTodos(filterBy);
  }, [filterBy]);

  function onRemoveTodo(todoId) {
    if (!confirm(`delete todo with id: (${todoId})?`)) return;
    removeTodo(todoId);
  }

  function onToggleTodo(todo) {
    const todoToSave = { ...todo, isDone: !todo.isDone };
    saveTodo(todoToSave);
  }

  if (!todos) return <div>Loading...</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <div>
        <Link to="/todo/edit" className="btn">
          Add Todo
        </Link>
      </div>
      <h2>Todos List</h2>
      <TodoList
        todos={todos}
        onRemoveTodo={onRemoveTodo}
        onToggleTodo={onToggleTodo}
      />
      <hr />
      <h2>Todos Table</h2>
      <div style={{ width: "60%", margin: "auto" }}>
        <DataTable todos={todos} onRemoveTodo={onRemoveTodo} />
      </div>
    </section>
  );
}
