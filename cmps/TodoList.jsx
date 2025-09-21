import { TodoPreview } from "./TodoPreview.jsx";
const { Link } = ReactRouterDOM;

export function TodoList({ todos, onRemoveTodo, onToggleTodo }) {
  const getDynamicStyle = (isDone) => {
    if (isDone) {
      return {background: "#84f080ff"};
    }
    return {background: "#f78282ff"};
  }
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo._id} className="todo-card" style={getDynamicStyle(todo.isDone)}>
          <input type="checkbox" className="todo-checkbox" checked={todo.isDone} onChange={() => onToggleTodo(todo)}></input>
          <TodoPreview todo={todo} onToggleTodo={() => onToggleTodo(todo)} />
          <section>
            <button onClick={() => onRemoveTodo(todo._id)}>Remove</button>
            <button>
              <Link to={`/todo/${todo._id}`}>Details</Link>
            </button>
            <button>
              <Link to={`/todo/edit/${todo._id}`}>Edit</Link>
            </button>
          </section>
        </li>
      ))}
    </ul>
  );
}
