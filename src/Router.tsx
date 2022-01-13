import { BrowserRouter, Route, Routes } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Coins />} />
        <Route path={":id"} element={<Coin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
