import { motion, MotionValue, useViewportScroll } from "framer-motion";
import { PathMatch } from "react-router";
import styled from "styled-components";
import { IMovie } from "../api";
import { makeImgPath } from "../utils";

const MovieClick = styled(motion.div)<{ scrollY: MotionValue<number> }>`
  position: absolute;
  width: 60vw;
  height: 99vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: ${(props) => props.scrollY.get() + 100}px;
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

const VideoMovie = styled.iframe``;

type ClickToShowProp = {
  movieMatch: PathMatch<"movieId"> | null;
  clickedMovie: "" | IMovie | undefined;
};

const ClickToShow: React.FC<ClickToShowProp> = ({
  movieMatch,
  clickedMovie,
}) => {
  const { scrollY: scrolly } = useViewportScroll();
  return (
    <MovieClick scrollY={scrolly} layoutId={movieMatch?.params.movieId + ""}>
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
  );
};

export default ClickToShow;
