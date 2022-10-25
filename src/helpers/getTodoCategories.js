export const getTodoCategories = (todos, todoCategory) => {
  const category = todos.filter(
    (typeTodo) => typeTodo.category === todoCategory
  );

  return category;
};
