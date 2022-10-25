import { FaWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
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

export const ModalAddTodo = ({ category, icon, todosCategory }) => {
  const dispatch = useDispatch();
  const { todoEdit } = useSelector((state) => state.todos);

  const { onInputChange, formState } = useForm({
    todo: todoEdit,
  });

  const todo = useMemo(() => {
    return getTodoEdit(todosCategory, todoEdit);
  }, [todoEdit, todosCategory]);

  const onSubmit = (e) => {
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
          type="text"
          name="todo"
          onChange={onInputChange}
          value={formState.todo}
        ></textarea>

        <button type="submit">{todoEdit ? "EDIT TODO" : "ADD TODO"}</button>
      </form>
    </div>
  );
};
