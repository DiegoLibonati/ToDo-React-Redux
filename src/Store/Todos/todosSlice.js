import { createSlice } from "@reduxjs/toolkit";
import { getTodosLocalStorage } from "../../helpers/getTodosLocalStorage";

const initialState = {
  todos: getTodosLocalStorage(),
  categoryTodo: null,
  isSaving: false,
  isEditing: false,
  todoEdit: "",
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setCategoryTodo: (state, action) => {
      state.categoryTodo = action.payload;
    },
    newCategoryTodo: (state, action) => {
      state.isSaving = true;
      state.todos.push(action.payload);
      state.isSaving = false;
    },
    addTodo: (state, action) => {
      state.isSaving = true;
      state.todos.map((todo) => {
        if (todo.category === action.payload.category) {
          return todo.todosCategory.push(action.payload.newTodo);
        }
        return todo;
      });
      state.isSaving = false;
    },
    removeTodo: (state, action) => {
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
    doneTodo: (state, action) => {
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

    goToImportantTodo: (state, action) => {
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

    inputTodoChange: (state, action) => {
      state.isSaving = true;
      state.todoEdit = action.payload;
      state.isSaving = false;
    },

    inputTodoChangeReset: (state) => {
      state.todoEdit = "";
    },

    editTodo: (state, action) => {
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
