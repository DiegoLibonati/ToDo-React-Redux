import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./Global/globalSlice";
import todosSlice from "./Todos/todosSlice";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    todos: todosSlice,
  },
});
