import {motion, MotionValue, useViewportScroll} from "framer-motion";
import {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {PathMatch} from "react-router";
import styled from "styled-components";
import {getMoviesDetail, IMovie, movieVideo} from "../api";
import {makeImgPath} from "../utils";
import VideoBox from "./VideoBox";

const MovieClick = styled(motion.div)<{scrolly: MotionValue<number>}>`
  position: absolute;
  width: 60vw;
  height: 99vh;
  right: 0;
  left: 0;
  margin: 0 auto;
  top: ${(props) => props.scrolly.get() + 100}px;
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

type ClickToShowProp = {
  movieMatch: PathMatch<"movieId"> | null;
  clickedMovie: "" | IMovie | undefined;
  id: string | undefined;
};

const ClickToShow: React.FC<ClickToShowProp> = ({
  movieMatch,
  clickedMovie,
  id,
}) => {
  const {scrollY: scrolly} = useViewportScroll();
  const [showPoster, setShowPoster] = useState(false);

  const {data, isLoading} = useQuery(["detail", id], () =>
    getMoviesDetail(Number(id))
  );
  const {data: videoData, isLoading: videoLoading} = useQuery(
    ["video", id],
    () => movieVideo(Number(id))
  );
  useEffect(() => {
    setTimeout(() => {
      setShowPoster(true);
    }, 5000);
    return clearTimeout();
  }, []);

  return (
    <MovieClick scrolly={scrolly} layoutId={movieMatch?.params.movieId + ""}>
      {clickedMovie && (
        <>
          {showPoster ? (
            <MovieCover
              style={{
                backgroundImage: `linear-gradient(to top,black, transparent), url(${makeImgPath(
                  clickedMovie.backdrop_path,
                  "w500"
                )})`,
              }}
            ></MovieCover>
          ) : (
            <VideoBox videoId={videoData?.results[0].key} />
          )}
          <MTitle>{clickedMovie.title}</MTitle>
          <MOverView>{clickedMovie.overview}</MOverView>
        </>
      )}
    </MovieClick>
  );
};

export default ClickToShow;
