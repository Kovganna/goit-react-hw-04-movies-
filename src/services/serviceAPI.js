import axios from 'axios';

const MY_KEY = 'c28bccb7a73e096e2348fe6cf8316f71';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

//список самых популярных фильмов

const getTrendingMovies = async () => {
  try {
    const {
      data: { results },
    } = await axios.get(`trending/movie/day?api_key=${MY_KEY}`);
    return results;
  } catch (error) {
    console.log(error.message);
  }
};

//поиск кинофильма по ключевому слову

const getSearchMovie = async searchQuery => {
  try {
    const {
      data: { results },
    } = await axios.get(
      `search/movie?api_key=${MY_KEY}&query=${searchQuery}&language=en-US&include_adult=false`,
    );

    return results;
  } catch (error) {
    console.log(error.message);
  }
};

// запрос полной информации о фильме

const getIdMovies = async movieId => {
  try {
    const response = await axios.get(
      `/movie/${movieId}?api_key=${MY_KEY}&language=en-US`,
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

// запрос полной информации о фильме

const getCastsMovies = async movieId => {
  try {
    const results = await axios.get(
      `/movie/${movieId}/credits?api_key=${MY_KEY}&language=en-US`,
    );

    return results.data.cast;
  } catch (error) {
    console.log(error.message);
  }
};

//запрос обзоров для страницы кинофильма

const getReviewsMovies = async movieId => {
  try {
    const { data } = await axios.get(
      `movie/${movieId}/reviews?api_key=${MY_KEY}&language=en-US`,
    );

    return data.results;
  } catch (error) {
    console.log(error.message);
  }
};

const MovieAPI = {
  getTrendingMovies,
  getSearchMovie,
  getIdMovies,
  getCastsMovies,
  getReviewsMovies,
};

export const profileBaseUrl = 'http://image.tmdb.org/t/p/w185';
export const castBaseUrl = 'https://image.tmdb.org/t/p/w92';
export default MovieAPI;
