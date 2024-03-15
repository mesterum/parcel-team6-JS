import { getMovieDetails } from './api';

// DOM elements

const movieTitleElement = document.getElementById('film-title');
const movieVotesElement = document.getElementById('votes');
const moviePopularityElement = document.getElementById('popul');
const movieOrigTitleElement = document.getElementById('origTitle');
const movieGenreElement = document.getElementById('genre');
const movieAboutElement = document.getElementById('about');

// Get movie list containers
const movieList = document.getElementById('movies-list');
const movieHomeList = document.getElementById('movies-list-home');

// Event listener for movie list click events
movieList?.addEventListener('click', handleMovieListClick);
movieHomeList?.addEventListener('click', handleMovieListClick);

// Function to handle movie list click events
async function handleMovieListClick(event) {
  if (event.target.tagName === 'IMG') {
    const li = event.target.closest('li');

    // Extract movie data from the clicked list item
    const movieData = {
      id: li.dataset.movieId,
      title: li.querySelector('.movie-name').innerText.toUpperCase(),
      posterUrl: event.target.getAttribute('src'),
      genre: movieGenreElement.innerText,
      original_title: movieOrigTitleElement.innerText,
      popularity: moviePopularityElement.innerText,
      votes: movieVotesElement.innerText,
    };

    // Populate the modal with the extracted movie data
    populateModal(movieData);

    // Show the modal
    const infoModal = document.getElementById('info-modal');
    infoModal.classList.remove('is-hidden');
  }
}

// Function to populate the modal with movie data
async function populateModal(movieData) {
  try {
    // Construct the poster URL
    const posterUrl = movieData.posterUrl
      ? `https://image.tmdb.org/t/p/w342${movieData.posterUrl}`
      : '';

    // Set the modal content
    movieTitleElement.textContent = movieData.title;
    const imgElement = document.getElementById('film-img');
    movieGenreElement.textContent = movieData.genre;

    // Fetch detailed movie information using the movie ID
    const movieDetails = await getMovieDetails(movieData.id);

    // Check if the img element exists
    if (imgElement) {
      imgElement.setAttribute('src', posterUrl);
      movieVotesElement.textContent = ` ${movieDetails.vote_average.toFixed(
        1
      )} / ${movieDetails.vote_count} `;
      moviePopularityElement.textContent = ` ${movieDetails.popularity.toFixed(
        1
      )}`;
      movieAboutElement.textContent = `${movieDetails.overview}`;
      movieGenreElement.textContent = `${movieDetails.genres
        .map(name => name.name)
        .join(', ')}`;
      movieOrigTitleElement.textContent = `${movieDetails.original_title}`;
    } else {
      console.error('Image element not found');
    }
  } catch (error) {
    console.error('Error populating modal:', error.message);
  }
}
