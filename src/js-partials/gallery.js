import {
  getGenres,
  getInfoMovie,
  getNameFilm,
  getTrending,
  fetchMovies,
  BASE_URL,
  URL,
  API_KEY,
} from './api';

import {
  genres,
  movieDescription,
  getMovies,
  TMDBconfiguration,
} from './themoviedbAPI.ts';

const gallery = document.querySelector('.gallery');
const movies = document.querySelector('.movies');

export default function renderFilmCard({
  root,
  base_url,
  poster_size,
  movie,
  genresList,
  page,
}) {
  const { id, title, poster_path, vote_average, release_date } = movie;
  let src = '';
  let date = '';
  let genres = [];
  if (poster_path) {
    src = `
    src="${base_url}w185${poster_path}"
            srcset="
              ${base_url}w185${poster_path}                     1x,
              ${base_url}${poster_size}${poster_path}           2x
            "
    alt="${title}"
    `;
  } else {
    src = '';
  }

  if (release_date) {
    date = parseInt(release_date);
  } else {
    date = '';
  }

  if (genresList.length > 2) {
    genres = genresList.slice(0, 2).join(', ') + ', Other';
  } else {
    genres = genresList;
  }

  root.insertAdjacentHTML(
    'beforeend',
    `
    <div class="movie" data-id="${id}">
      <img
        class="movie__cover"
        ${src}
      />
      <div class="movie-info">
      <h2 class="movie-title">${title}</h2>
      <div class="card-preview-info">
        <p class="movie-date">${genres} | ${date}</p>
        <span class="movie_average">${vote_average}</span>
        </div>
      </div>
    </div>`
  );
  movie.append(root);
}
