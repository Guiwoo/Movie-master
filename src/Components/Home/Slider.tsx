import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { IGetMovieResult } from "../../api";
import { makeImgPath } from "../../utils";

const SSlider = styled(motion.div)`
  position: relative;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  position: absolute;
  width: 100%;
  padding: 0 20px;
`;

const Box = styled(motion.div)<{ $bgPhoto: string }>`
  height: 200px;
  cursor: pointer;
  background-image: url(${(props) => props.$bgPhoto});
  background-size: cover;
  background-position: center;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const rowVar = {
  hidden: {
    x: window.outerWidth,
  },
  visible: { x: 0 },
  exit: { x: -window.outerWidth },
};

const BoxVar = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "twin",
    },
  },
};
const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: 0;
  h4 {
    text-align: center;
    font-size: 14px;
    font-weight: 500;
  }
`;

const InfoVar = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.4,
      duration: 0.3,
      type: "twin",
    },
  },
};

type SliderProp = {
  toggleLeaving: () => void;
  index: number;
  offset: number;
  data: IGetMovieResult;
};

const Slider: React.FC<SliderProp> = ({
  data,
  toggleLeaving,
  index,
  offset,
}) => {
  const navigation = useNavigate();
  const onBoxClicked = (movieId: number) => {
    navigation(`/movies/${movieId}`);
  };
  return (
    <SSlider>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          variants={rowVar}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ type: "tween", duration: 1 }}
          key={index}
        >
          {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box
                transition={{
                  type: "twin",
                }}
                layoutId={movie.id + ""}
                variants={BoxVar}
                initial="normal"
                whileHover="hover"
                onClick={() => onBoxClicked(movie.id)}
                key={movie.id}
                $bgPhoto={makeImgPath(movie.backdrop_path, "w500")}
              >
                <Info variants={InfoVar}>
                  <h4>{movie.title}</h4>
                </Info>
              </Box>
            ))}
        </Row>
      </AnimatePresence>
    </SSlider>
  );
};

export default Slider;
