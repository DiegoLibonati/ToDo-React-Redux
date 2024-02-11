import { Category, Todo } from "../entities/entities";

export const getNamesTodoCategories = (todos: Todo[]): Category[] => {
  const namesCategories: Category[] = [];

  todos.map((todo) => {
    const { category, icon } = todo;

    return namesCategories.push({ category, icon });
  });

  return namesCategories;
};
