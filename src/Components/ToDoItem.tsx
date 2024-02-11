import {
  FaTrash,
  FaEdit,
  FaStar,
  FaCalendar,
  FaCalendarCheck,
} from "react-icons/fa";
import {
  doneTodo,
  goToImportantTodo,
  inputTodoChange,
  removeTodo,
} from "../Store/Todos/todosSlice";
import { displayAlert, openModalAddTodo } from "../Store/Global/globalSlice";
import { ToDoItemProps } from "../entities/entities";
import { useAppDispatch } from "../Store/store";

export const ToDoItem = ({
  id,
  content,
  category,
  done,
}: ToDoItemProps): JSX.Element => {
  const dispatch = useAppDispatch();

  const todo = {
    id: id,
    content: content,
    done: done,
  };

  const onEdit: React.MouseEventHandler<SVGElement> = () => {
    dispatch(inputTodoChange(content));
    dispatch(openModalAddTodo());
  };

  const onMoveToImportant: React.MouseEventHandler<SVGElement> = () => {
    dispatch(
      displayAlert({
        message: `${todo.id} was successfully moved to Important!`,
        type: "good-alert",
      })
    );
    dispatch(goToImportantTodo({ todo, category }));
  };

  const onRemoveTodo: React.MouseEventHandler<SVGElement> = () => {
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
