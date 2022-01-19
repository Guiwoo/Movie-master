import styled from "styled-components";
import {
  motion,
  useMotionValue,
  useTransform,
  useViewportScroll,
} from "framer-motion";
import { useEffect } from "react";

const Wrapper = styled(motion.div)`
  height: 200vh;
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
`;

function App() {
  const x = useMotionValue(0);
  const scale = useTransform(x, [-300, 0, 300], [2.5, 1, 0.5]); // Interpolation value
  const gradient = useTransform(
    x,
    [-300, 0, 300],
    [
      `linear-gradient(to right, #b929b9, #cb6dfa, #ffffff)`,
      `linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)`,
      `linear-gradient(to right, #b9aa29, #d0fa6d, #ffffff)`,
    ]
  );
  const { scrollYProgress } = useViewportScroll();
  const scale2 = useTransform(scrollYProgress, [0, 1], [1, 5]);
  return (
    <Wrapper style={{ background: gradient }}>
      <Box
        style={{ x, scale: scale2 }}
        drag="x"
        dragSnapToOrigin // Mouse move to center
      />
    </Wrapper>
  );
}

export default App;
