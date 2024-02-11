import { useRef } from "react";
import { useDispatch } from "react-redux";
import { setCategoryTodo } from "../Store/Todos/todosSlice";
import { ToDoPresentantionButtonProps } from "../entities/entities";

export const ToDoPresentantionButton = ({
  icon,
  category,
}: ToDoPresentantionButtonProps): JSX.Element => {
  const dispatch = useDispatch();

  const ref = useRef<HTMLButtonElement | null>(null);

  const onTodoClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    const nameCategoryClicked = ref.current?.textContent!.substring(2);

    dispatch(setCategoryTodo(nameCategoryClicked!));
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
