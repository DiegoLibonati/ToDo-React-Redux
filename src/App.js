import { useSelector } from "react-redux";
import "./App.css";
import { Alert } from "./Components/Alert";
import { Sidebar } from "./Components/Sidebar";
import { ToDo } from "./Components/ToDo";
import "animate.css";

function App() {
  const { messageAlert } = useSelector((state) => state.global);

  return (
    <>
      <Sidebar></Sidebar>

      <ToDo></ToDo>

      {messageAlert && <Alert></Alert>}
    </>
  );
}

export default App;
