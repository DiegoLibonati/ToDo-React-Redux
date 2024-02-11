// Types

export type TodosState = {
  todos: Todo[];
  categoryTodo: string;
  isSaving: boolean;
  isEditing: boolean;
  todoEdit: string;
};

export type GlobalState = {
  sidebarMobile: boolean;
  modalAddCategory: boolean;
  modalAddTodo: boolean;
  messageAlert: string;
  typeAlert: string;
};

export type Todo = {
  id: string;
  category: string;
  todosCategory: {
    id: string;
    content: string;
    done: boolean;
  }[];
  icon: string;
};

export type UseTodo = {
  todosLocalStorage: Todo[];
  setNewCategory: ({
    category,
    emoji,
  }: {
    category: string;
    emoji: string;
  }) => void;
};

export type UseForm<T> = {
  formState: T;
  onInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onResetForm: () => void;
};

export type UseMatchMedia = {
  matches: boolean;
};

export type Category = { category: string; icon: string };

// Interfaces
export interface SidebarItemProps {
  onOpenCategoryTodo: React.MouseEventHandler<HTMLHeadingElement>;
  icon: string;
  category: string;
  todosCategory: Todo["todosCategory"];
  index: number;
}

export interface ToDoPresentantionButtonProps {
  category: string;
  icon: string;
}

export interface ToDoViewProps {
  icon: string;
  category: string;
  todosCategory: Todo["todosCategory"];
}

export interface ToDoItemProps {
  id: string;
  content: string;
  category: string;
  done: boolean;
}

export interface ModalAddTodoProps {
  icon: string;
  category: string;
  todosCategory: Todo["todosCategory"];
}

export interface PayloadGlobal {
  displayAlert: {
    message: string;
    type: string;
  };
}

export interface PayloadTodos {
  setCategoryTodo: string;
  newCategoryTodo: Todo;
  addTodo: {
    category: string;
    newTodo: Todo["todosCategory"][0];
  };
  removeTodo: { category: string; id: string };
  doneTodo: { category: string; id: string };
  goToImportantTodo: { category: string; todo: Todo["todosCategory"][0] };
  inputTodoChange: string;
  editTodo: { category: string; todoEdited: Todo["todosCategory"][0] };
}
