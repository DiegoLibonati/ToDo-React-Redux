import React from "react";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getNamesTodoCategories } from "../helpers/getNamesTodoCategories";
import uuid from "react-uuid";
import { ToDoPresentantionButton } from "../Components/ToDoPresentantionButton";
import { useMediaQuery } from "../hooks/useMatchMedia";
import "../Components/todopresentation.css";

export const ToDoPresentation = () => {
  const { todos } = useSelector((state) => state.todos);

  const { matches } = useMediaQuery(
    "@media only screen and (min-width: 1024px)"
  );

  const nameCategories = useMemo(() => {
    return getNamesTodoCategories(todos);
  }, [todos]);

  if (matches) {
    return (
      <main className="main_container_presentation">
        <section className="ToDos_container">
          {nameCategories.map((nameCategory) => {
            return (
              <ToDoPresentantionButton
                key={uuid()}
                {...nameCategory}
              ></ToDoPresentantionButton>
            );
          })}
        </section>
      </main>
    );
  }
};
