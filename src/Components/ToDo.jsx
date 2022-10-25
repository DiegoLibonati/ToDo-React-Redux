import "./todo.css";
import { useSelector } from "react-redux";
import { useTodo } from "../hooks/useTodo";
import { getTodoCategories } from "../helpers/getTodoCategories";
import { useMemo } from "react";
import { ToDoView } from "../views/ToDoView";
import { ToDoPresentation } from "../views/ToDoPresentation";

export const ToDo = () => {
  const { todos, categoryTodo } = useSelector((state) => state.todos);

  const { todosLocalStorage } = useTodo(todos);

  const todoInformation = useMemo(() => {
    return getTodoCategories(todosLocalStorage, categoryTodo);
  }, [categoryTodo, todosLocalStorage]);

  const {
    category = "",
    todosCategory = [],
    icon = "",
  } = todoInformation[0] || [];

  if (categoryTodo) {
    return (
      <ToDoView
        icon={icon}
        category={category}
        todosCategory={todosCategory}
      ></ToDoView>
    );
  } else {
    return <ToDoPresentation></ToDoPresentation>;
  }
};
