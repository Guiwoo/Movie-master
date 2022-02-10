import {useQuery} from "react-query";
import {getMovies, IGetMovieResult} from "../api";
import styled from "styled-components";
import {makeImgPath} from "../utils";
import {motion, AnimatePresence} from "framer-motion";
import {useState} from "react";
import {useMatch, useNavigate} from "react-router";
import Banner from "../Components/Home/Banner";
import {StatusBox} from "../Components/shared";
import {TitleBox} from "../Components/Home/TitleBox";
import Slider from "../Components/Home/Slider";
import ClickToShow from "../Components/ClickToShow";

const Wrapper = styled(motion.div)``;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const offset = 6;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

const Home = () => {
  const navigation = useNavigate();
  const {data, isLoading} = useQuery<IGetMovieResult>(
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
  const onClickOverLay = () => navigation("/");
  const movieMatch = useMatch("/movies/:movieId");
  const clickedMovie =
    movieMatch?.params.movieId &&
    data?.results.find(
      (movie) => String(movie.id) === movieMatch.params.movieId
    );
  const onBoxClicked = (movieId: number) => {
    navigation(`/movies/${movieId}`);
  };
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
              onBoxClicked={onBoxClicked}
            />
            <TitleBox increase={increase} header={"Trending Movie"} />
            <StatusBox
              maxIndex={Math.floor((data.results.length - 1) / 6)}
              index={index}
            />
            <Slider
              data={data}
              offset={offset}
              toggleLeaving={toggleLeaving}
              index={index}
              onBoxClicked={onBoxClicked}
            />
            <AnimatePresence>
              {movieMatch ? (
                <>
                  <Overlay
                    onClick={onClickOverLay}
                    exit={{opacity: 0}}
                    animate={{opacity: 1}}
                  />
                  <ClickToShow
                    id={movieMatch.params.movieId}
                    movieMatch={movieMatch}
                    clickedMovie={clickedMovie}
                  />
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
