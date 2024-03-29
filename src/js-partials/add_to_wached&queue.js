import {
  getFromStorage,
  localStorageKeys,
  setToLocalStorage,
} from './localStorage';

import { refs } from './refs';

import { renderGallery } from './gallery_markup';

export const state = {
  currentPage: 1,
  totalPages: 0,
  activeFilm: null,
  query: null,
  whatPaginated: null,
  whatchedOrQueue: null,
};

export const onBtnAddToLibrary = evt => {
  const watchedFilmsArray = getFromStorage(localStorageKeys.WATCHED) || [];
  const queueFilmsArray = getFromStorage(localStorageKeys.QUEUE) || [];

  if (evt.target.innerText === 'ADD TO WATCHED') {
    saveToStorageFilm(
      watchedFilmsArray,
      localStorageKeys.WATCHED,
      'WATCHED',
      evt
    );
  } else if (evt.target.innerText === 'REMOVE FROM WATCHED') {
    deleteFromStorageFilm(
      watchedFilmsArray,
      localStorageKeys.WATCHED,
      'WATCHED',
      evt
    );
  } else if (evt.target.innerText === 'ADD TO QUEUE') {
    saveToStorageFilm(queueFilmsArray, localStorageKeys.QUEUE, 'QUEUE', evt);
  } else if (evt.target.innerText === 'REMOVE FROM QUEUE') {
    deleteFromStorageFilm(
      queueFilmsArray,
      localStorageKeys.QUEUE,
      'QUEUE',
      evt
    );
  }
};

function saveToStorageFilm(array, key, keyValue, evt) {
  array.push(state.activeFilm);
  setToLocalStorage(key, array);
  evt.target.innerText = `REMOVE FROM ${keyValue}`;
}
function deleteFromStorageFilm(array, key, keyValue, evt) {
  const filteredFilms = array.filter(film => film.id !== state.activeFilm.id);
  setToLocalStorage(key, filteredFilms);
  evt.target.innerText = `ADD TO ${keyValue}`;
}

export function updateMarkupLibrary(evt) {
  if (evt.target.innerText === 'ADD TO WATCHED') {
    deleteFromWatchedMarkup();
  } else if (evt.target.innerText === 'REMOVE FROM WATCHED') {
    deleteFromWatchedMarkup();
  } else if (evt.target.innerText === 'ADD TO QUEUE') {
    deleteFromQueueMarkup();
  } else if (evt.target.innerText === 'REMOVE FROM QUEUE') {
    deleteFromQueueMarkup();
  }
}
async function deleteFromWatchedMarkup() {
  resetCurrentPage();
  const watchedFilmsinLocalStorage =
    getFromStorage(localStorageKeys.WATCHED) || [];
  const films = localPaginate(watchedFilmsinLocalStorage, state.currentPage);
  updateLibRender(films);
  changeBtnActiveStatus(refs.addToWachedButton, refs.addToQueueButton);
}

async function deleteFromQueueMarkup() {
  resetCurrentPage();
  const queueFilmsinLocalStorage = getFromStorage(localStorageKeys.QUEUE) || [];
  const films = localPaginate(queueFilmsinLocalStorage, state.currentPage);
  updateLibRender(films);
  changeBtnActiveStatus(refs.addToQueueButton, refs.addToWachedButton);
}

function changeBtnActiveStatus(elFirst, elSecond) {
  elFirst.classList.add('active');
  elSecond.classList.remove('active');
}
