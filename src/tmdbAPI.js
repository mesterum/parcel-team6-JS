export const API_KEY = '9899002b9b51fd4dfe6aea31ec85120f';

// popular movies
const trendMovie = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODk5MDAyYjliNTFmZDRkZmU2YWVhMzFlYzg1MTIwZiIsInN1YiI6IjY1ZWEwYWJjMzg5ZGExMDE4MGQ4MmIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.angMo5jW-tFQIJO4UtJWUK_cTOEioz4-1xtjJUpSmpg',
  },
};

export const popularMovies = fetch(
  'https://api.themoviedb.org/3/trending/all/day?language=en-US',
  trendMovie
)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

// search key word
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODk5MDAyYjliNTFmZDRkZmU2YWVhMzFlYzg1MTIwZiIsInN1YiI6IjY1ZWEwYWJjMzg5ZGExMDE4MGQ4MmIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.angMo5jW-tFQIJO4UtJWUK_cTOEioz4-1xtjJUpSmpg',
  },
};

export const searchMovies = fetch(
  'https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1',
  options
)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));

//info complet movies
const movieInfo = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODk5MDAyYjliNTFmZDRkZmU2YWVhMzFlYzg1MTIwZiIsInN1YiI6IjY1ZWEwYWJjMzg5ZGExMDE4MGQ4MmIxYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.angMo5jW-tFQIJO4UtJWUK_cTOEioz4-1xtjJUpSmpg',
  },
};

export const infoMovies = fetch('https://api.themoviedb.org/3/movie/movie_id?language=en-US', movieInfo)
  .then(response => response.json())
  .then(response => console.log(response))
  .catch(err => console.error(err));
