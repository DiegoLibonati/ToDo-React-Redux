import { FaWindowClose } from "react-icons/fa";
import { useSelector } from "react-redux";
import { closeModalAddTodo, displayAlert } from "../Store/Global/globalSlice";
import { useForm } from "../hooks/useForm";
import uuid from "react-uuid";
import "./ModalAddTodo.css";
import {
  addTodo,
  editTodo,
  inputTodoChangeReset,
} from "../Store/Todos/todosSlice";
import { useMemo } from "react";
import { getTodoEdit } from "../helpers/getTodoEdit";
import { ModalAddTodoProps } from "../entities/entities";
import { RootState, useAppDispatch } from "../Store/store";

export const ModalAddTodo = ({
  category,
  icon,
  todosCategory,
}: ModalAddTodoProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { todoEdit } = useSelector((state: RootState) => state.todos);

  const { onTextAreaChange, formState } = useForm<{ todo: string }>({
    todo: todoEdit,
  });

  const todo = useMemo(() => {
    return getTodoEdit(todosCategory, todoEdit);
  }, [todoEdit, todosCategory]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (!todoEdit) {
      const newTodo = {
        id: uuid(),
        content: formState.todo,
        done: false,
      };

      dispatch(addTodo({ newTodo, category }));

      dispatch(
        displayAlert({
          message: `${newTodo.id} was successfully added!`,
          type: "good-alert",
        })
      );
    } else {
      const todoEdited = {
        id: todo.id,
        content: formState.todo,
        done: todo.done,
      };

      dispatch(editTodo({ todoEdited, category }));

      dispatch(
        displayAlert({
          message: `${todo.id} was successfully edited!`,
          type: "good-alert",
        })
      );
    }

    dispatch(closeModalAddTodo());
    dispatch(inputTodoChangeReset());
  };

  const onCloseModal = () => {
    dispatch(closeModalAddTodo());
    dispatch(inputTodoChangeReset());
  };

  return (
    <div className="modal_addtodo_wrapper">
      <FaWindowClose
        className="close_modal_addtodo"
        onClick={() => onCloseModal()}
      ></FaWindowClose>
      <form
        className="modal_addtodo_container animate__animated animate__fadeIn"
        onSubmit={onSubmit}
      >
        <h2>
          {icon}
          {category}
        </h2>
        <textarea
          name="todo"
          onChange={onTextAreaChange}
          value={formState.todo}
        ></textarea>

        <button type="submit">{todoEdit ? "EDIT TODO" : "ADD TODO"}</button>
      </form>
    </div>
  );
};
