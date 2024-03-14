import { getInfoMovie } from './api';
//NEED A MOVIE ID....

const movieId = movie_id.data;
// Function to check if a movie is in the watched list
function isMovieInWatched(movieId) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  return watchedMovies.includes(movieId);
}

// Function to add a movie to the watched list
function addMovieToWatched(movieId) {
  const watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  watchedMovies.push(movieId);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}

// Function to remove a movie from the watched list
function removeMovieFromWatched(movieId) {
  let watchedMovies = JSON.parse(localStorage.getItem('watchedMovies')) || [];
  watchedMovies = watchedMovies.filter(id => id !== movieId);
  localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));
}

function handleWatchedButtonClick(details) {
  const watchedButton = document.getElementById('add-to-watched-btn');
  const isCurrentlyWatched = isMovieInWatched(details.id);

  if (isCurrentlyWatched) {
    // Remove from watched list
    removeMovieFromWatched(details.id);
    watchedButton.textContent = 'ADD TO WATCHED';
  } else {
    // Add to watched list
    addMovieToWatched(details.id);
    watchedButton.textContent = 'REMOVE FROM WATCHED';
  }
}

function isMovieInQueue(movieId) {
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  return queuedMovies.includes(movieId);
}

// Function to add a movie to the queue list
function addMovieToQueue(movieId) {
  const queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  queuedMovies.push(movieId);
  localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
}

// Function to remove a movie from the queue list
function removeMovieFromQueue(movieId) {
  let queuedMovies = JSON.parse(localStorage.getItem('queuedMovies')) || [];
  queuedMovies = queuedMovies.filter(id => id !== movieId);
  localStorage.setItem('queuedMovies', JSON.stringify(queuedMovies));
}

// Function to handle queue button click
function handleQueueButtonClick(details) {
  const queueButton = document.getElementById('add-to-queue-btn');
  const isCurrentlyQueued = isMovieInQueue(details.id);

  if (isCurrentlyQueued) {
    // Remove from queue list
    removeMovieFromQueue(details.id);
    queueButton.textContent = 'ADD TO QUEUE';
  } else {
    // Add to queue list
    addMovieToQueue(details.id);
    queueButton.textContent = 'REMOVE FROM QUEUE';
  }
}

/*export const setToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error.messege);
  }
};
export const getFromStorage = key => {
  try {
    const serialisedState = localStorage.getItem(key);
    return serialisedState === null ? undefined : JSON.parse(serialisedState);
  } catch (error) {
    console.log(error.messege);
  }
};

export const localStorageKeys = {
  WATCHED: 'watched',
  QUEUE: 'queue',
};*/
