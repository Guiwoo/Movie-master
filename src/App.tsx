import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Gird = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 50%;
  gap: 20px;
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  background-color: rgba(245, 245, 245, 0.3);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  const [clickId, setClickId] = useState<null | string>(null);

  return (
    <Wrapper>
      <Gird>
        {["1", "2", "3", "4"].map((n) => (
          <Box onClick={() => setClickId(n)} key={n} layoutId={n} />
        ))}
      </Gird>
      <AnimatePresence>
        {clickId ? (
          <Overlay
            onClick={() => setClickId(null)}
            initial={{ backgroundColor: "rgba(0,0,0,0)" }}
            animate={{ backgroundColor: "rgba(0,0,0,0.9)" }}
            exit={{ backgroundColor: "rgba(0,0,0,0)" }}
          >
            <Box
              layoutId={clickId}
              style={{
                width: 200,
                height: 200,
                backgroundColor: "rgba(255,255,255,0.8)",
              }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
