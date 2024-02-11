import { useEffect } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { getTodosLocalStorage } from "../helpers/getTodosLocalStorage";
import { newCategoryTodo } from "../Store/Todos/todosSlice";
import { Todo, UseTodo } from "../entities/entities";

export const useTodo = (todos: Todo[] = getTodosLocalStorage()): UseTodo => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const setNewCategory: UseTodo["setNewCategory"] = (newCategory) => {
    const keys = [];

    for (const key of Object.keys(newCategory)) {
      keys.push(key);
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
