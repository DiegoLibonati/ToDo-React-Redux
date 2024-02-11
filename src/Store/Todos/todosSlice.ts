import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getTodosLocalStorage } from "../../helpers/getTodosLocalStorage";
import { PayloadTodos, TodosState } from "../../entities/entities";

const initialState: TodosState = {
  todos: getTodosLocalStorage(),
  categoryTodo: "",
  isSaving: false,
  isEditing: false,
  todoEdit: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCategoryTodo: (
      state,
      action: PayloadAction<PayloadTodos["setCategoryTodo"]>
    ) => {
      state.categoryTodo = action.payload;
    },
    newCategoryTodo: (
      state,
      action: PayloadAction<PayloadTodos["newCategoryTodo"]>
    ) => {
      state.isSaving = true;
      state.todos.push(action.payload);
      state.isSaving = false;
    },
    addTodo: (state, action: PayloadAction<PayloadTodos["addTodo"]>) => {
      state.isSaving = true;
      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          return todo.todosCategory.push(action.payload.newTodo);
        }
        return todo;
      });
      state.isSaving = false;
    },
    removeTodo: (state, action: PayloadAction<PayloadTodos["removeTodo"]>) => {
      state.isSaving = true;
      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          todo.todosCategory = todo.todosCategory.filter(
            (todoCategory) => todoCategory.id !== action.payload.id
          );
        }
        return todo;
      });
      state.isSaving = false;
    },
    doneTodo: (state, action: PayloadAction<PayloadTodos["doneTodo"]>) => {
      state.isSaving = true;
      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          todo.todosCategory.map((todoCategory) => {
            if (todoCategory.id === action.payload.id) {
              todoCategory.done = !todoCategory.done;
            }
            return todoCategory;
          });
        }
        return todo;
      });
      state.isSaving = false;
    },

    goToImportantTodo: (
      state,
      action: PayloadAction<PayloadTodos["goToImportantTodo"]>
    ) => {
      state.isSaving = true;
      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          return (todo.todosCategory = todo.todosCategory.filter(
            (todoCategory) => todoCategory.id !== action.payload.todo.id
          ));
        }

        if (todo.category === "Important") {
          return todo.todosCategory.push(action.payload.todo);
        }
        return todo;
      });
      state.isSaving = false;
    },

    inputTodoChange: (
      state,
      action: PayloadAction<PayloadTodos["inputTodoChange"]>
    ) => {
      state.isSaving = true;
      state.todoEdit = action.payload;
      state.isSaving = false;
    },

    inputTodoChangeReset: (state) => {
      state.todoEdit = "";
    },

    editTodo: (state, action: PayloadAction<PayloadTodos["editTodo"]>) => {
      state.isSaving = true;

      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          todo.todosCategory.map((todoCategory) => {
            if (todoCategory.id === action.payload.todoEdited.id) {
              return (todoCategory.content = action.payload.todoEdited.content);
            }
            return todoCategory;
          });
        }
        return todo;
      });

      state.isSaving = false;
    },
  },
});

export const {
  setCategoryTodo,
  newCategoryTodo,
  addTodo,
  removeTodo,
  doneTodo,
  goToImportantTodo,
  inputTodoChange,
  inputTodoChangeReset,
  editTodo,
} = todosSlice.actions;

export default todosSlice.reducer;
