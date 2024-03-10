import axios from 'axios';

const API_KEY = '9899002b9b51fd4dfe6aea31ec85120f';
const URL = 'https://api.themoviedb.org/3';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';

export async function getTrending(page = 1) {
  const url = `${URL}/trending/all/day?api_key=${API_KEY}&language=en-US&page=${page}`;
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function fetchMovies(query, page) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        query: query,
        page: page,
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function getInfoMovie(movie_id) {
  const url = `${URL}/movie/${movie_id}/??api_key=${API_KEY}&language=en-US`;
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getNameFilm(query) {
  const url = `${URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export async function getGenres() {
  const url = `${URL}/genre/movie/list?api_key=${API_KEY}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
}

export {
  getGenres,
  getInfoMovie,
  getNameFilm,
  getTrending,
  fetchMovies,
  URL,
  BASE_URL,
  API_KEY,
};
