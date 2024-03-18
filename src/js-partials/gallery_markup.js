import axios, { AxiosError } from 'axios';
import { API_KEY } from './config';

import {
  getTrending,
  fetchMovies,
  getInfoMovie,
  getNameFilm,
  getGenres,
} from './api';

const NO_POSTER = `../static/images/nothin.jpg`;

export async function renderGallery(movies) {
  const genres = await getGenres();
  return movies
    .map(
      ({
        id,
        poster_path,
        title,
        release_date,
        genre_ids,
        original_title,
        vote_average,
        popularity,
        vote_count,
        overview,
      } = movies) => {
        return `
      <li class='movie_list_item' data-id="${id}" >
      <div href="" class='movie_list_link link' id=${id}>
      <div class="movie__cover"
        data-id="${id}"
        data-poster_path="${poster_path}"
        data-title="${title}"
        data-genre_ids="${checkGenres}"
        data-original_title="${original_title}"
        data-vote_average="${vote_average}"
        data-popularity="${popularity}"
        data-vote_count="${vote_count}"
        data-overview="${overview}"
        data-release_date="${release_date}"
      ></div>
        <img class="movie_list_image" src=${poster} alt='Poster ${original_title}' loading='lazy' />
        <div class='movie-info'>
            <p class='movie-title'>
              <b>${title.toUpperCase()}</b>
            </p>
            <p class='movie-date'>
              <span>${checkGenres} | ${releaseYear}</span>
            </p>
            <div class="movie__average movie__average--${getClassByRate(
              vote_average
            )}">${Number(vote_average).toFixed(1)}</div>
        </div>
        </div>
      </li>
      `;
      }
    )
    .join('');
}

export async function renderGallery2(movies) {
  const genres = await getGenres();
  return movies.map(({ id, poster_path, title, release_date }) => {
      const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : NO_POSTER;
      return {
          id,
          posterUrl,
          title,
          release_date
      };
  });
}