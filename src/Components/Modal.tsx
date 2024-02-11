import "./Modal.css";
import { FaWindowClose } from "react-icons/fa";
import {
  closeModalAddCategory,
  displayAlert,
} from "../Store/Global/globalSlice";
import Picker, { IEmojiData } from "emoji-picker-react";
import { useState } from "react";
import { useForm } from "../hooks/useForm";
import { useTodo } from "../hooks/useTodo";
import { useAppDispatch } from "../Store/store";

export const Modal = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData | null>(null);

  const { setNewCategory } = useTodo();

  const { formState, onInputChange, onResetForm } = useForm<{
    categoryName: string;
  }>({
    categoryName: "",
  });

  const onEmojiClick: (
    event: React.MouseEvent<Element, MouseEvent>,
    data: IEmojiData
  ) => void = (_, emojiObject) => {
    setChosenEmoji(emojiObject);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const emoji = chosenEmoji?.emoji;
    const nameCategory = formState.categoryName;

    setNewCategory({
      category: nameCategory,
      emoji: emoji!,
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
        <Picker onEmojiClick={onEmojiClick} />
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
