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

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background-color: rgba(245, 245, 245, 0.3);
  border-radius: 15px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 22px;
  position: absolute;
`;

const BoxVar = {
  invisible: {
    x: 100,
    opacity: 0,
    scale: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: {
    x: -300,
    opacity: 0,
    scale: 0,
  },
};

const Num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function App() {
  const [visible, setVisible] = useState(0);

  const thing = () => {
    setTimeout(() => {
      setVisible((prev) => prev + 1);
    }, 2000);
    return () => clearInterval();
  };
  useEffect(() => {
    thing();
  }, [visible]);
  return (
    <Wrapper>
      <AnimatePresence>
        {Num.map((i) =>
          i === visible % 10 ? (
            <Box
              variants={BoxVar}
              initial="invisible"
              animate="visible"
              exit="exit"
              key={i}
            >
              {i}
            </Box>
          ) : null
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

export default App;
