import { Todo } from "../entities/entities";

export const getTodoEdit = (
  todosCategory: Todo["todosCategory"],
  todoEdit: string
): Todo["todosCategory"][0] => {
  const todo = todosCategory.filter(
    (todoCategory) => todoCategory.content === todoEdit
  );

  return todo[0];
};
