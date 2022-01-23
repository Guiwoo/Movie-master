import { useQuery } from "react-query";
import { getMovies } from "../api";

const Home = () => {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovies);
  console.log(data, isLoading);
  return <h1 style={{ height: "200vh" }}>Home</h1>;
};

export default Home;
