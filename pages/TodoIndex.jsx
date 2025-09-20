import { TodoFilter } from "../cmps/TodoFilter.jsx";
import { TodoList } from "../cmps/TodoList.jsx";
import { DataTable } from "../cmps/data-table/DataTable.jsx";
import { todoService } from "../services/todo.service.js";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import {
  queryTodos,
  removeTodo,
  saveTodo,
} from "../store/actions/todo.action.js";
import { incrementUserBalance } from "../store/actions/user.action.js";
import { setFilterBy } from "../store/actions/filter.action.js";
import { setIsLoading } from "../store/actions/loading.action.js";

const { useSelector, useDispatch } = ReactRedux;
const { useState, useEffect } = React;
const { Link, useSearchParams } = ReactRouterDOM;

export function TodoIndex() {
  const todos = useSelector((state) => state.todoModule.todos);
  const isLoading = useSelector(state => state.loadingModule.loading);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const defaultFilter = todoService.getFilterFromSearchParams(searchParams);
    setFilterBy(defaultFilter);
  }, []);

  const filterBy = useSelector((state) => state.filterModule.filterBy);

  useEffect(() => {
    setSearchParams(filterBy);
    setIsLoading(true);
    queryTodos(filterBy);
    setIsLoading(false);
  }, [filterBy]);

  function onRemoveTodo(todoId) {
    if (!confirm(`delete todo with id: (${todoId})?`)) return;
    removeTodo(todoId);
  }

  async function onToggleTodo(todo) {
    if (!todo.isDone) incrementUserBalance();
    const todoToSave = { ...todo, isDone: !todo.isDone };
    saveTodo(todoToSave);
  }
  if (isLoading) {
    return (
      <div className="flex align-center justify-center max-h">
        <div className="loader"></div>
      </div>
    );
  }
  if (!todos) return <div>Loading</div>;
  return (
    <section className="todo-index">
      <TodoFilter filterBy={filterBy} onSetFilterBy={setFilterBy} />
      <button
        onClick={() => {
          incrementUserBalance();
        }}
      >
        increment
      </button>
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
