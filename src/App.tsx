import GlobalStyle from "./styles/GlobalStyle";
import { useRecoilValue } from "recoil";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
