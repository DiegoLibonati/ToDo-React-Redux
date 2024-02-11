import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./Global/globalSlice";
import todosSlice from "./Todos/todosSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    global: globalSlice,
    todos: todosSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
