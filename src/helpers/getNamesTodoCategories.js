export const getNamesTodoCategories = (todos) => {
  const namesCategories = [];

  todos.map((todo) => {
    const { category, icon } = todo;

    return namesCategories.push({ category, icon });
  });

  return namesCategories;
};
