const API_KEY = "2384348b5a6b3811901d3b50c7882207";
const BASE_PATH ="https://api.themoviedb.org/3"

export const getMovies = () => {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
        (response)=>response.json()
    )
}