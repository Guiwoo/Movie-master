import Routers from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";

function App() {
  return (
    <>
      <Routers />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
