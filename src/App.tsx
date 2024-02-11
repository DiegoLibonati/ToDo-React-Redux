import { useSelector } from "react-redux";
import { Alert } from "./Components/Alert";
import { Sidebar } from "./Components/Sidebar";
import { ToDo } from "./Components/ToDo";
import "./App.css";
import "animate.css";
import { RootState } from "./Store/store";

function App(): JSX.Element {
  const { messageAlert } = useSelector((state: RootState) => state.global);

  return (
    <>
      <Sidebar></Sidebar>

      <ToDo></ToDo>

      {messageAlert && <Alert></Alert>}
    </>
  );
}

export default App;
