import {
  FaTrash,
  FaEdit,
  FaStar,
  FaCalendar,
  FaCalendarCheck,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  doneTodo,
  goToImportantTodo,
  inputTodoChange,
  removeTodo,
} from "../Store/Todos/todosSlice";
import { displayAlert, openModalAddTodo } from "../Store/Global/globalSlice";

export const ToDoItem = ({ id, content, category, done }) => {
  const dispatch = useDispatch();

  const todo = {
    id: id,
    content: content,
    done: done,
  };

  const onEdit = () => {
    dispatch(inputTodoChange(content));
    dispatch(openModalAddTodo());
  };

  const onMoveToImportant = () => {
    dispatch(
      displayAlert({
        message: `${todo.id} was successfully moved to Important!`,
        type: "good-alert",
      })
    );
    dispatch(goToImportantTodo({ todo, category }));
  };

  const onRemoveTodo = () => {
    dispatch(removeTodo({ id, category }));
    dispatch(
      displayAlert({
        message: `${todo.id} was successfully removed from ${category}!`,
        type: "bad-alert",
      })
    );
  };
  return (
    <article
      className={
        done
          ? "todo_container done animate__animated animate__fadeIn"
          : "todo_container animate__animated animate__fadeIn"
      }
    >
      <div className="todo_header">
        {done && (
          <FaCalendarCheck
            className="check-calendar"
            onClick={() => dispatch(doneTodo({ id, category }))}
          ></FaCalendarCheck>
        )}
        {!done && (
          <FaCalendar
            className="calendar"
            onClick={() => dispatch(doneTodo({ id, category }))}
          ></FaCalendar>
        )}
        <h3 className={done ? "todo_content_done" : "todo_content"}>
          {content}
        </h3>
      </div>

      <div className="todo_options">
        <FaTrash
          className={done ? "todo-icon todo-icon-done" : "todo-icon"}
          onClick={onRemoveTodo}
        ></FaTrash>
        {!done && <FaEdit className="todo-icon" onClick={onEdit}></FaEdit>}
        {category !== "Important" && !done && (
          <FaStar className="todo-icon" onClick={onMoveToImportant}></FaStar>
        )}
      </div>
    </article>
  );
};
