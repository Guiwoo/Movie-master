import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import GuiFlix from "./Components/GuiFlix";
import Header from "./Components/Header";
import Home from "./Routes/Home";
import Movie from "./Routes/Movie";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

const BlackScreen = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled(motion.div)`
  background-color: black;
`;

const App = function App() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
    return clearTimeout();
  }, []);
  return (
    <BrowserRouter>
      {show ? (
        <Wrapper
          initial={{ scaleX: 0 }}
          animate={{
            scaleX: 1,
            transition: {
              type: "tween",
              duration: 1,
            },
          }}
        >
          <Header />
          <Routes>
            <Route path={"/"} element={<Home />}>
              <Route path={"movies/:id"} element={<Home />} />
            </Route>
            <Route path="/movie" element={<Movie />}></Route>
            <Route path="/tv" element={<Tv />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Wrapper>
      ) : (
        <BlackScreen>
          <GuiFlix />
        </BlackScreen>
      )}
    </BrowserRouter>
  );
};

export default App;
