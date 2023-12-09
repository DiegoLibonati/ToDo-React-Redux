# ToDo-Redux-App-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install node_modules with npm install
4. Use npm start to run the app page

## Description

I made a web application that serves to save things to do. In addition we have a sidebar where you will find our default categories: My Day, Important and Tasks. There is a button to add a new custom category in which we can put the name we want and an emoji of our choice for that category. Within each category you will be able to create, edit and delete all of them. When marking an all as done it will change color. Each action of the user will show an alert.

## Technologies used

1. React JS
2. CSS3
3. REDUX
4. REDUX-TOOLKIT

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/12`](https://www.diegolibonati.com.ar/#/project/12)

## Video

https://user-images.githubusercontent.com/99032604/199861233-0a2873d1-06fd-495c-a0d3-6ea432c885a5.mp4

## Documentation

### views/ToDoPresentation.jsx | views/ToDoView.jsx

These views will be those in which it is rendered on the same place depending on where the user is standing. At the beginning it is on the `ToDoPresentation.jsx` view since all the categories will be displayed. If the user clicks on a category, it will go to the view `ToDoView.jsx`.

### Store | globalSlice.js and todosSlice.js

Here we will find two types of slice that are saved in the store. We have the `globalSlice.js` which will be in charge of containing the states and the reducers of global functions such as modals or alert operation etc. While the Slice of `todosSlice.js` takes care of the main functionality of this application, saving the state of the ToDos and also its reducers to be able to handle them.

### hooks/useForm.js

The `useForm.js` we will use to handle all the forms of our application. In it you can save the value of the inputs, reset them to their default value and check if they are changing:

```
export const useForm = (initialForm = {}) => {
  const [formState, setFormState] = useState(initialForm);

  const onInputChange = ({ target }) => {
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
    onResetForm,
  };
};
```

### hooks/useMatchMedia.js

We will use the `useMatchMedia.js` to check when a user changes from one resolution to another:

```
export function useMediaQuery(mediaQueryString) {
  const queryString = removeReservedMediaKeyWord(mediaQueryString);
  const query = useMemo(() => window.matchMedia(queryString), [queryString]);
  const [matches, setMatches] = useState(query.matches);

  useEffect(() => {
    const listener = (e) => setMatches(e.matches);
    query.addEventListener("change", listener);
    return () => query.removeEventListener("change", listener);
  }, [query]);
  return { matches };
}

function removeReservedMediaKeyWord(mediaQueryString) {
  return mediaQueryString.replace("@media", "").trim();
}
```

### hooks/useTodo.js

We will use the `useTodo.js` to be able to save new categories of ToDos:

```
export const useTodo = (todos = getTodosLocalStorage()) => {
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const setNewCategory = (newCategory) => {
    const keys = [];

    for (const key of Object.keys(newCategory)) {
      if (newCategory[key]) {
        keys.push(key);
      }
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

### helpers/categoriesData.js

In `categoriesData.js` we are going to preload the categories that we want to come by default when a user never entered.

### helpers/getNamesTodoCategories.js

`getNamesTodoCategories.js` will allow us to obtain the name of each category along with its icon.

### helpers/getTodoCategories.js

`getTodoCategories.js` will allow us to obtain all the categories that exist.

### helpers/getTodoEdit.js

`getTodoEdit.js` will allow us to get the todo that was modified.

### helpers/getTodosLocalStorage.js

`getTodosLocalStorage.js` will return the todos that we have stored in LocalStorage if we enter this application at some point and if not, it will preload the ToDos from `categoriesData.js`.
