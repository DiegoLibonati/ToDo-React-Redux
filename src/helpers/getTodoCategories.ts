import { Todo } from "../entities/entities";

export const getTodoCategories = (
  todos: Todo[],
  todoCategory: string
): Todo[] => {
  const category = todos.filter(
    (typeTodo) => typeTodo.category === todoCategory
  );

  return category;
};
