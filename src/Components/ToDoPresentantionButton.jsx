import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setCategoryTodo } from "../Store/Todos/todosSlice";

export const ToDoPresentantionButton = ({ icon, category }) => {
  const dispatch = useDispatch();

  const ref = useRef();

  const onTodoClick = (e) => {
    const nameCategoryClicked = ref.current.textContent.substring(2);

    dispatch(setCategoryTodo(nameCategoryClicked));
  };

  return (
    <article className="ToDoButton_container">
      <button className="ToDoButton" onClick={(e) => onTodoClick(e)} ref={ref}>
        {icon}
        {category}
      </button>
    </article>
  );
};
