import { useQuery } from "react-query";
import { getMovies, IGetMovieResult } from "../api";
import styled from "styled-components";
import { makeImgPath } from "../utils";
import {
  motion,
  AnimatePresence,
  useViewportScroll,
  MotionValue,
} from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router";
import Banner from "../Components/Home/Banner";

const Wrapper = styled(motion.div)``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
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

const offset = 6;

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

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const MovieClick = styled(motion.div)<{ scrollY: MotionValue<number> }>`
  position: absolute;
  width: 40vw;
  height: 80vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: ${(props) => props.scrollY.get() + 150}px;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  overflow: hidden;
`;

const MovieCover = styled.div`
  width: 100%;
  height: 40%;
  background-size: cover;
  background-position: center center;
`;
const MTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 35px;
  font-weight: 500;
  position: relative;
  top: -32px;
`;

const MOverView = styled.p`
  padding: 20px;
  color: ${(props) => props.theme.white.lighter};
  position: relative;
  top: -32px;
`;

const Home = () => {
  const navigation = useNavigate();
  const { data, isLoading } = useQuery<IGetMovieResult>(
    ["movies", "nowPlaying"],
    getMovies
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increase = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset);
      setIndex((prev) => (prev === maxIndex - 1 ? 0 : prev + 1));
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (movieId: number) => {
    navigation(`/movies/${movieId}`);
  };
  const movieMatch = useMatch("/movies/:movieId");
  const onClickOverLay = () => navigation("/");
  const { scrollY } = useViewportScroll();
  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );
  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        data && (
          <>
            <Banner
              title={data?.results[0].title}
              overview={data?.results[0].overview}
              id={data?.results[0].id}
              bgPhoto={makeImgPath(data?.results[0].backdrop_path || "")}
            />
            <Slider>
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
            </Slider>
            <AnimatePresence>
              {movieMatch ? (
                <>
                  <Overlay
                    onClick={onClickOverLay}
                    exit={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  />
                  <MovieClick
                    scrollY={scrollY}
                    layoutId={movieMatch.params.movieId + ""}
                  >
                    {clickedMovie && (
                      <>
                        <MovieCover
                          style={{
                            backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImgPath(
                              clickedMovie.backdrop_path,
                              "w500"
                            )})`,
                          }}
                        ></MovieCover>
                        <MTitle>{clickedMovie.title}</MTitle>
                        <MOverView>{clickedMovie.overview}</MOverView>
                      </>
                    )}
                  </MovieClick>
                </>
              ) : null}
            </AnimatePresence>
          </>
        )
      )}
    </Wrapper>
  );
};

export default Home;
