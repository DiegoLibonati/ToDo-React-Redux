import { AiOutlineCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { resetAlert } from "../Store/Global/globalSlice";
import { RootState, useAppDispatch } from "../Store/store";
import "./Alert.css";

export const Alert = (): JSX.Element => {
  const { messageAlert, typeAlert } = useSelector(
    (state: RootState) => state.global
  );
  const dispatch = useAppDispatch();
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
