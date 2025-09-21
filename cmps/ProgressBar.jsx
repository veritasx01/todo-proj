const { useSelector } = ReactRedux;

export function ProgressBar() {
  const todoList = useSelector((state) => state.todoModule.todos);
  const doneTodos = todoList.filter((todo) => todo.isDone).length;
  const percentage = 100 * (doneTodos / todoList.length);
  let truncatedPercentage = Math.round(100 * percentage) / 100;
  let progValue;
  if (isNaN(truncatedPercentage)) {
    truncatedPercentage = String(NaN);
    progValue = String(NaN);
  } else {
    progValue = truncatedPercentage / 100
  }
  
  return (
    <div className="progress-container">
      <h1>progress: {truncatedPercentage}%</h1>
      <progress value={progValue}></progress>
    </div>
  );
}
