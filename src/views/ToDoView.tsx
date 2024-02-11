import { useMemo } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaPlus, FaRegPaperPlane } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Loader } from "../Components/Loader";
import { ModalAddTodo } from "../Components/ModalAddTodo";
import { ToDoItem } from "../Components/ToDoItem";
import { closeSidebar, openModalAddTodo } from "../Store/Global/globalSlice";
import { ToDoViewProps } from "../entities/entities";
import { RootState, useAppDispatch } from "../Store/store";

export const ToDoView = ({
  icon,
  category,
  todosCategory,
}: ToDoViewProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const { sidebarMobile, modalAddTodo } = useSelector(
    (state: RootState) => state.global
  );
  const { isSaving } = useSelector((state: RootState) => state.todos);

  const dateString = useMemo(() => {
    const newDate = new Date();
    return newDate.toUTCString();
    // eslint-disable-next-line
  }, [category]);

  return (
    <main
      className={
        sidebarMobile
          ? "main_container open-sidebar animate__animated animate__fadeIn"
          : "main_container animate__animated animate__fadeIn"
      }
    >
      {isSaving ? (
        <Loader></Loader>
      ) : (
        <>
          <section className="todo_title">
            <h2>
              {icon}
              {category.toUpperCase()}
            </h2>

            <h2 className="dateString-Date">{dateString}</h2>
            <AiOutlineCloseCircle
              className="todo-icon close-icon"
              onClick={() => dispatch(closeSidebar())}
            ></AiOutlineCloseCircle>
          </section>
          <hr className="hr-todo"></hr>

          {todosCategory?.length >= 1 && (
            <section className="todos_container">
              {todosCategory?.map((todo) => {
                const { id, content, done } = todo;

                return (
                  <ToDoItem
                    content={content}
                    category={category}
                    done={done}
                    id={id}
                    key={id}
                  ></ToDoItem>
                );
              })}
            </section>
          )}

          {modalAddTodo && (
            <ModalAddTodo
              category={category}
              icon={icon}
              todosCategory={todosCategory}
            ></ModalAddTodo>
          )}

          {todosCategory?.length >= 1 ? (
            <FaPlus
              className="add_todo"
              onClick={() => dispatch(openModalAddTodo())}
            ></FaPlus>
          ) : (
            <section className="add_first_todo_container">
              <h1>
                ADD YOUR FIRST TODO <br></br>IN {category.toUpperCase()}
              </h1>
              <FaRegPaperPlane
                className="plane-todo-icon"
                onClick={() => dispatch(openModalAddTodo())}
              ></FaRegPaperPlane>
            </section>
          )}
        </>
      )}
    </main>
  );
};
