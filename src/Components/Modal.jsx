import "./Modal.css";
import { FaWindowClose } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {
  closeModalAddCategory,
  displayAlert,
} from "../Store/Global/globalSlice";
import Picker from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useTodo } from "../hooks/useTodo";

export const Modal = () => {
  const dispatch = useDispatch();
  const [chosenEmoji, setChosenEmoji] = useState("");

  const { setNewCategory } = useTodo();

  const { formState, onInputChange, onResetForm } = useForm({
    categoryName: "",
  });

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const emoji = chosenEmoji.emoji;
    const nameCategory = formState.categoryName;

    setNewCategory({
      category: nameCategory,
      emoji: emoji,
    });

    onResetForm();

    dispatch(
      displayAlert({
        message: `${emoji} ${nameCategory} was successfully added!`,
        type: "good-alert",
      })
    );
    dispatch(closeModalAddCategory());
  };

  return (
    <div className="modal_container">
      <FaWindowClose
        className="close_modal_addcategory"
        onClick={() => dispatch(closeModalAddCategory())}
      ></FaWindowClose>
      <form
        className="modal_form animate__animated animate__fadeIn"
        onSubmit={(e) => onSubmit(e)}
      >
        <Picker className="emoji_picker" onEmojiClick={onEmojiClick} />
        <input
          className="modal_input"
          placeholder="Category Name"
          onChange={onInputChange}
          name="categoryName"
          value={formState.categoryName}
        ></input>
        <button className="modal_button" type="submit">
          CREATE
        </button>
      </form>
    </div>
  );
};
