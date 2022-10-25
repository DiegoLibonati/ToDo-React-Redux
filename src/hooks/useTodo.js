import { useEffect } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { getTodosLocalStorage } from "../helpers/getTodosLocalStorage";
import { newCategoryTodo } from "../Store/Todos/todosSlice";

export const useTodo = (todos = getTodosLocalStorage()) => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const setNewCategory = (newCategory) => {
    const keys = [];

    for (const key of Object.keys(newCategory)) {
      if (newCategory[key]) {
        keys.push(key);
      }
    }

    if (Object.keys(newCategory).length === keys.length) {
      console.log(Object.keys(newCategory).length, keys.length);

      const object = {
        id: uuid(),
        category: newCategory["category"],
        todosCategory: [],
        icon: `${newCategory["emoji"]}`,
      };

      dispatch(newCategoryTodo(object));
    } else {
      return "Error";
    }
  };

  return {
    todosLocalStorage: todos,
    setNewCategory,
  };
};
