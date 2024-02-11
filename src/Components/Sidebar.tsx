import { useSelector } from "react-redux";
import { openModalAddCategory, openSidebar } from "../Store/Global/globalSlice";
import { setCategoryTodo } from "../Store/Todos/todosSlice";
import { FaPlus } from "react-icons/fa";
import { Modal } from "./Modal";
import { SidebarItem } from "./SidebarItem";
import { Loader } from "./Loader";
import { RootState, useAppDispatch } from "../Store/store";
import "./sidebar.css";

export const Sidebar = (): JSX.Element => {
  const { todos, isSaving } = useSelector((state: RootState) => state.todos);
  const { modalAddCategory } = useSelector((state: RootState) => state.global);
  const dispatch = useAppDispatch();

  const onOpenCategoryTodo: React.MouseEventHandler<HTMLHeadingElement> = (
    e
  ) => {
    const target = e.target as HTMLElement;

    const todoCategory = target.textContent!.substring(2);

    dispatch(openSidebar());
    dispatch(setCategoryTodo(todoCategory));
  };

  return (
    <header className="header_container">
      {isSaving ? (
        <Loader></Loader>
      ) : (
        <>
          <div className="sidebar_title">
            <h2>Die Redux ToDo</h2>
          </div>
          <nav className="sidebar_nav">
            <ul className="sidebar_nav_list">
              {todos.map((todo, index) => {
                const { id } = todo;

                return (
                  <SidebarItem
                    key={id}
                    onOpenCategoryTodo={onOpenCategoryTodo}
                    {...todo}
                    index={index}
                  ></SidebarItem>
                );
              })}
            </ul>
          </nav>
          {modalAddCategory && <Modal></Modal>}
          <FaPlus
            className="add-category"
            onClick={() => dispatch(openModalAddCategory())}
          ></FaPlus>
        </>
      )}
    </header>
  );
};
