# ToDo React Redux

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with yarn install
4. Use yarn dev or start (depends package.json) to run the app page

## Description

I made a web application that serves to save things to do. In addition we have a sidebar where you will find our default categories: My Day, Important and Tasks. There is a button to add a new custom category in which we can put the name we want and an emoji of our choice for that category. Within each category you will be able to create, edit and delete all of them. When marking an all as done it will change color. Each action of the user will show an alert.

## Technologies used

1. React JS
2. Typescript
3. CSS3
4. REDUX
5. REDUX-TOOLKIT

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/ToDo-React-Redux`](https://www.diegolibonati.com.ar/#/project/ToDo-React-Redux)

## Video

https://user-images.githubusercontent.com/99032604/199861233-0a2873d1-06fd-495c-a0d3-6ea432c885a5.mp4

## Documentation

### views/ToDoPresentation.tsx | views/ToDoView.tsx

These views will be those in which it is rendered on the same place depending on where the user is standing. At the beginning it is on the `ToDoPresentation.tsx` view since all the categories will be displayed. If the user clicks on a category, it will go to the view `ToDoView.tsx`.

### Store | globalSlice.ts and todosSlice.ts

Here we will find two types of slice that are saved in the store. We have the `globalSlice.ts` which will be in charge of containing the states and the reducers of global functions such as modals or alert operation etc. While the Slice of `todosSlice.ts` takes care of the main functionality of this application, saving the state of the ToDos and also its reducers to be able to handle them.

### hooks/useForm.tsx

The `useForm.tsx` we will use to handle all the forms of our application. In it you can save the value of the inputs, reset them to their default value and check if they are changing:

```
import { useState } from "react";
import { UseForm } from "../entities/entities";

export const useForm = <T,>(initialForm: T): UseForm<T> => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }: { target: HTMLInputElement }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onTextAreaChange = ({ target }: { target: HTMLTextAreaElement }) => {
    const { name, value } = target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  return {
    formState,
    onInputChange,
    onTextAreaChange,
    onResetForm,
  };
};
```

### hooks/useMatchMedia.tsx

We will use the `useMatchMedia.tsx` to check when a user changes from one resolution to another:

```
import { useEffect, useMemo, useState } from "react";
import { UseMatchMedia } from "../entities/entities";

export function useMediaQuery(mediaQueryString: string): UseMatchMedia {
  const queryString = removeReservedMediaKeyWord(mediaQueryString);
  const query = useMemo(() => window.matchMedia(queryString), [queryString]);
  const [matches, setMatches] = useState<boolean>(query.matches);

  useEffect(() => {
    const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
    query.addEventListener("change", (e) => listener(e));
    return () => query.removeEventListener("change", (e) => listener(e));
  }, [query]);
  return { matches };
}

function removeReservedMediaKeyWord(mediaQueryString: string): string {
  return mediaQueryString.replace("@media", "").trim();
}
```

### hooks/useTodo.tsx

We will use the `useTodo.tsx` to be able to save new categories of ToDos:

```
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import uuid from "react-uuid";
import { getTodosLocalStorage } from "../helpers/getTodosLocalStorage";
import { newCategoryTodo } from "../Store/Todos/todosSlice";
import { Todo, UseTodo } from "../entities/entities";

export const useTodo = (todos: Todo[] = getTodosLocalStorage()): UseTodo => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const setNewCategory: UseTodo["setNewCategory"] = (newCategory) => {
    const keys = [];

    for (const key of Object.keys(newCategory)) {
      keys.push(key);
    }

    if (Object.keys(newCategory).length === keys.length) {
      console.log(Object.keys(newCategory).length, keys.length);

      const object = {
        id: uuid(),
        category: newCategory["category"],
        todosCategory: [],
        icon: `${newCategory["emoji"]}`,
      };

      dispatch(newCategoryTodo(object));
    } else {
      return "Error";
    }
  };

  return {
    todosLocalStorage: todos,
    setNewCategory,
  };
};
```

### helpers/categoriesData.ts

In `categoriesData.ts` we are going to preload the categories that we want to come by default when a user never entered.

### helpers/getNamesTodoCategories.ts

`getNamesTodoCategories.ts` will allow us to obtain the name of each category along with its icon.

### helpers/getTodoCategories.ts

`getTodoCategories.ts` will allow us to obtain all the categories that exist.

### helpers/getTodoEdit.ts

`getTodoEdit.js` will allow us to get the todo that was modified.

### helpers/getTodosLocalStorage.ts

`getTodosLocalStorage.ts` will return the todos that we have stored in LocalStorage if we enter this application at some point and if not, it will preload the ToDos from `categoriesData.ts`.
