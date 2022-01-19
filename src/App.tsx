import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { useRef } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Bigger = styled.div`
  width: 600px;
  height: 600px;
  background-color: rgba(200, 150, 200, 0.5);
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

const BoxVar: Variants = {
  hover: { scale: 1.5, rotateZ: 180 },
  click: { scale: 1, borderRadius: "50%" },
  drag: {},
};

function App() {
  const biggerBoxRef = useRef<HTMLDivElement>(null);
  return (
    <Wrapper>
      <Bigger ref={biggerBoxRef}>
        {/**Connect ref to dragConstraints  */}
        <Box
          drag
          dragElastic={0} // Following mouse
          dragSnapToOrigin // Mouse move to center
          dragConstraints={biggerBoxRef} // Limit Movement
          variants={BoxVar}
          whileHover="hover"
          whileTap="click"
          whileDrag="drag"
        />
      </Bigger>
    </Wrapper>
  );
}

export default App;
