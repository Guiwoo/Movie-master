import {faHome, faPlay} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
  display: flex;
  align-items: center;
  padding: 0px 40px;
  padding-top: 50px;
`;
const MTitle = styled.h2`
  color: ${(props) => props.theme.white.lighter};
  padding: 10px;
  font-size: 35px;
  font-weight: 500;
  position: relative;
  top: -32px;
`;

const LinkToYoutube = styled.a`
  font-size: 20px;
  max-width: 20%;
  background-color: ${(props) => props.theme.black.lighter};
  text-align: center;
  border-radius: 7px;
  padding: 10px 6px;
  cursor: pointer;
`;

const GenreBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px 20px;
  position: relative;
  top: -32px;
`;

const Genre = styled.span`
  margin-right: 7px;
  opacity: 0.7;
`;

const BottomBox = styled.div`
  padding-left: 20px;
`;

const SeperateTitle = styled.h3`
  font-weight: 500;
  font-size: 16px;
`;

const MOverView = styled.p`
  padding-top: 10px;
  padding-left: 20px;
  color: ${(props) => props.theme.white.lighter};
`;

const GoHome = styled.a`
  margin-left: 6px;
  &:hover {
    color: orange;
  }
`;

const Imdb = styled.div`
  border-radius: 5px;
  padding: 2px 3px;
  color: black;
  font-weight: 500;
  font-size: 14px;
  background-color: #e2b617;
  &:hover {
    color: orange;
    background-color: transparent;
  }
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

  const {data} = useQuery(["detail", id], () => getMoviesDetail(Number(id)));
  const {data: videoData} = useQuery(["video", id], () =>
    movieVideo(Number(id))
  );
  useEffect(() => {
    setTimeout(() => {
      setShowPoster(true);
    }, 3000);
    return clearTimeout();
  }, []);

  console.log(data, videoData);
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
            >
              <LinkToYoutube
                style={{marginRight: "10px"}}
                href={`https://www.youtube-nocookie.com/embed/${videoData?.results[0].key}?&autoplay=1&mute=1`}
                target="_blank"
              >
                <FontAwesomeIcon icon={faPlay} style={{marginRight: "10px"}} />
                <span>재생</span>
              </LinkToYoutube>
            </MovieCover>
          ) : (
            <VideoBox videoId={videoData?.results[0].key} />
          )}
          <MTitle>{clickedMovie.title}</MTitle>
          <GenreBox>
            <div>
              {data?.genres?.map((g: any, index: number) => (
                <Genre>•{g.name}</Genre>
              ))}
            </div>
            <div style={{display: "flex", alignItems: "center"}}>
              <GoHome href={`${data?.homepage}`} target="_blank">
                <FontAwesomeIcon icon={faHome} />
              </GoHome>
              <GoHome href={`${data?.homepage}`} target="_blank">
                <Imdb>IMDb</Imdb>
              </GoHome>
            </div>
          </GenreBox>
          <BottomBox>
            <SeperateTitle>Overview</SeperateTitle>
            <MOverView>{clickedMovie.overview}</MOverView>
          </BottomBox>
        </>
      )}
    </MovieClick>
  );
};

export default ClickToShow;
