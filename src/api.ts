const API_KEY = "2384348b5a6b3811901d3b50c7882207";
const BASE_PATH = "https://api.themoviedb.org/3"

export interface IMovie {
    backdrop_path: string,
    id: number,
    overview: string,
    poster_path: string,
    title: string,
}

export interface IGetMovieResult {
    dates: {
        maximum: string,
        minimum: string
    }
    page: number,
    results: IMovie[],
    total_pages: number,
    total_results: number,
}

export const getMovies = () => {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=kr`).then(
        (response) => response.json()
    )
}

export const getMoviesDetail = (id: number) => {
    return fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}&language=en-US`).then(
        (response) => response.json()
    )
}

export const movieVideo = (id: number) => {
    return fetch(`${BASE_PATH}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(
        (response) => response.json()
    )
}