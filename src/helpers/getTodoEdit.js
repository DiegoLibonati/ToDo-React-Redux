export const getTodoEdit = (todosCategory, todoEdit) => {
  const todo = todosCategory.filter(
    (todoCategory) => todoCategory.content === todoEdit
  );

  return todo[0];
};
