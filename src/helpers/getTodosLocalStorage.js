import { categoriesData } from "./categoriesData";

export const getTodosLocalStorage = () => {
  const todosLocalStorage = JSON.parse(localStorage.getItem("todos"));

  if (todosLocalStorage) {
    return todosLocalStorage;
  } else {
    return categoriesData;
  }
};
