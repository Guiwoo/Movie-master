import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Price from "./routes/Price";

const Routers = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<Coins />} />
        <Route path={"/:id"} element={<Coin />}>
          <Route path={"price"} element={<Price />} />
          <Route path={"chart"} element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routers;
