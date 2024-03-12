//import './library';
//import { getInfoMovie, getNameFilm, fetchMovies } from './api';
//import { getFromStorage, setToLocalStorage } from './localStorage';
//import Notiflix from 'notiflix';
//import { getMovies } from './themoviedbAPI';
import { API_KEY } from './config';
const URL = 'https://api.themoviedb.org/3';

const refs = {
  searchFilmForm: document.querySelector('.header-search'),
  movieName: document.querySelector('.movie-name'),
  movieCard: document.querySelector('.card-movie'),
  searchFilmInput: document.querySelector('.header-input'),
  searchContainer: document.querySelector('.header-search-container'),
};
refs.searchFilmForm.addEventListener('submit', e => {
  e.preventDefault();
  let query = refs.searchFilmInput.value;
  console.log(query);
  getNameFilmAPI(query);
});

async function getNameFilmAPI(query) {
  const req = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=714c3120d8fef346bdc59740f67d43e6&query=${query}`
  );

  const movies = await req.json();

  makeImages(movies);
}

function makeImages(movies) {
  for (let movie of movies) {
    let src = movie.show.image.medium;
    const img = document.createElement('img');
    img.src = src;
    searchContainer.appendChild(img);
  }
}

/*

// search films by name
const filterCountryByName = (name, films, setResults) => {
  // clear search result if the search field is empty
  if (name === '') {
    setResults([]);
  }

  // discontinue if there is no search yet
  if (name === null || name === '' || films === []) return;

  // empty the previous search array if any
  const searchResult = [];
  const data = name.toLowerCase();

  // loop through all countries
  for (const film of films) {
    const filmName = film.filmName.toLowerCase();

    // check if the search word or character matches
    if (
      [...filmName].includes(data) ||
      filmName === data ||
      filmName.split(' ').includes(data)
    ) {
      searchResult.push(films);
    }
  }

  setResults(searchResult);
};

{
  filterByNameResults && filterByNameResults.length
    ? filterByNameResults.map(films => (films = { movieName }))
    : filterByName && !filterByNameResults.length
    ? 'No Result Found!'
    : hatchLoading === 'processing'
    ? 'Fetching Data...'
    : hatchLoading === 'found' && hatches && hatches.length
    ? hatches.map(films => (films = { movieName }))
    : 'No country Found! Check your Internet Connection!';
}

/*
let inputValue = '';
let pageNumber = 1;

function fetchFilms() {
  fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=714c3120d8fef346bdc59740f67d43e6&language=en-US&page=${pageNumber}&include_adult=false&query=${inputValue}`
  )
    .then(data => data.json())
    .then(res => {
      if (res.results.length === 0) {
        alert(
          'Search result not successful. Enter the correct movie name and try again.'
        );
      }
      if (res.results.length > 1) {
        moviesList.innerHTML = '';
      }
      res.results.forEach(movie => {
        moviesList.insertAdjacentElement(
          'beforeend',
          createCardFunc(movie.backdrop_path, movie.title, movie.id)
        );
      });
      renderFilms = res.results;
      return renderFilms;
    })
    .catch(err => console.log(err));
}

function serchFilm(event) {
  event.preventDefault();
  inputValue = searchFilmInput.value.toLowerCase();
  searchFilmForm.reset();
  fetchFilms();
}

searchFilmForm.addEventListener('input', serchFilm);*/
