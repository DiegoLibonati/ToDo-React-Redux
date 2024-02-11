import { useSelector } from "react-redux";
import { useTodo } from "../hooks/useTodo";
import { getTodoCategories } from "../helpers/getTodoCategories";
import { useMemo } from "react";
import { ToDoView } from "../views/ToDoView";
import { ToDoPresentation } from "../views/ToDoPresentation";
import { RootState } from "../Store/store";
import { Todo } from "../entities/entities";
import "./todo.css";

export const ToDo = (): JSX.Element => {
  const { todos, categoryTodo } = useSelector(
    (state: RootState) => state.todos
  );

  const { todosLocalStorage } = useTodo(todos);

  const todoInformation: Todo[] = useMemo(() => {
    return getTodoCategories(todosLocalStorage, categoryTodo);
  }, [categoryTodo, todosLocalStorage]);

  if (categoryTodo) {
    return (
      <ToDoView
        icon={todoInformation[0].icon}
        category={todoInformation[0].category}
        todosCategory={todoInformation[0].todosCategory}
      ></ToDoView>
    );
  }

  return <ToDoPresentation></ToDoPresentation>;
};
