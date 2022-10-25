import React from "react";
import "./Alert.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { resetAlert } from "../Store/Global/globalSlice";

export const Alert = () => {
  const { messageAlert, typeAlert } = useSelector((state) => state.global);
  const dispatch = useDispatch();
  return (
    <div
      className={
        messageAlert ? `alert_container ${typeAlert}` : "alert_container"
      }
    >
      <h2>{messageAlert}</h2>
      <AiOutlineCloseCircle
        className="alert-close"
        onClick={() => dispatch(resetAlert())}
      ></AiOutlineCloseCircle>
    </div>
  );
};
