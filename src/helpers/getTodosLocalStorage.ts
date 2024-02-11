import { Todo } from "../entities/entities";
import { categoriesData } from "./categoriesData";

export const getTodosLocalStorage = (): Todo[] => {
  const todosLocalStorage = JSON.parse(localStorage.getItem("todos")!);

  if (!todosLocalStorage) {
    return categoriesData;
  }

  return todosLocalStorage;
};
