import axios from 'axios';

const API_KEY = '714c3120d8fef346bdc59740f67d43e6';
const URL = 'https://api.themoviedb.org/3';
const BASE_URL = 'https://api.themoviedb.org/3/search/movie';


// export async function getMovies() {
//   const apiKey = API_KEY;
//   const apiUrl = `${URL}/account/21063120/rated/movies?language=en-US&page=1&sort_by=created_at.asc`
//   try {
//     const response = await axios.get(BASE_URL, {
//       params: {
//         query: query,
//         page: page,
//         api_key: API_KEY,
//       },
//     });
//     return response.data;
//   } catch (err) {
//     throw new Error(err.message);
//   }
// }




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

