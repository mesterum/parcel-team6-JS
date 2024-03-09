import './js-partials/gallery_markup';
import './js-partials/localStorage';
import './js-partials/refs';
import './js-partials/api.js';

import {
  TMDBconfiguration,
  getMovies,
  movieDescription,
} from './js-partials/themoviedbAPI.ts';

getMovies().then(sr => {
  let cards = sr.results
    .map(movie => {
      return `
    <div class="card">
      <img src="${TMDBconfiguration.images.secure_base_url}w342${
        movie.poster_path
      }" alt="${movie.title}">
      <h3>${movie.title}</h3>
      <h4>${movieDescription(movie)}</h3 >
    </div >
  `;
    })
    .join('');
  console.log(sr.results);
  console.log(cards);
});
