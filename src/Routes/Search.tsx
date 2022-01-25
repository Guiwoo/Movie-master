import { useLocation } from "react-router";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  return <h1>Search</h1>;
};

export default Search;
