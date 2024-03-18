import { getMovieDetails } from "./persistance";
import { TMDBconfiguration } from "./themoviedbAPI";

// DOM elements

const movieTitleElement = document.getElementById('film-title');
const movieVotesElement = document.getElementById('votes');
const movieVotesTotal = document.getElementById('votes-total');
const moviePopularityElement = document.getElementById('popul');
const movieOrigTitleElement = document.getElementById('origTitle');
const movieGenreElement = document.getElementById('genre');
const movieAboutElement = document.getElementById('about');
const btnWatched = document.querySelector(".add-to-watched-btn");
const btnFAVORITE = document.querySelector(".add-to-queue-btn");

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
      // title: li.querySelector('.movie-name').innerText.toUpperCase(),
      // posterUrl: event.target.getAttribute('src'),
      // genre: movieGenreElement.innerText,
      // original_title: movieOrigTitleElement.innerText,
      // popularity: moviePopularityElement.innerText,
      // votes: movieVotesElement.innerText,
    };

    // Populate the modal with the extracted movie data
    populateModal(movieData);

    // Show the modal
    const infoModal = document.getElementById('info-modal');
    infoModal.classList.remove('is-hidden');
  }
}

let movieDetails;
// Function to populate the modal with movie data
async function populateModal(movieData) {
  try {
    // Fetch detailed movie information using the movie ID
    movieDetails = await getMovieDetails(+movieData.id);

    // Construct the poster URL
    const posterUrl = movieDetails.poster_path
      ? `https://image.tmdb.org/t/p/w342/${movieDetails.poster_path}`
      : "https://placehold.co/342x513?text=No+poster";

    // Set the modal content
    movieTitleElement.textContent = movieDetails.title;
    const imgElement = document.getElementById('film-img');
    // movieGenreElement.textContent = movieDetails.genre;

    // Check if the img element exists
    if (imgElement) {
      imgElement.setAttribute('src', posterUrl);
      movieVotesElement.textContent = ` ${movieDetails.vote_average.toFixed(
        1
      )}`
      movieVotesTotal.textContent = `${movieDetails.vote_count} `;
      moviePopularityElement.textContent = ` ${movieDetails.popularity.toFixed(
        1
      )}`;
      movieAboutElement.textContent = `${movieDetails.overview}`;
      movieGenreElement.textContent = `${movieDetails.genre_ids
        .map(id => TMDBconfiguration.genres.get(id))
        .join(', ')}`;
      movieOrigTitleElement.textContent = `${movieDetails.original_title.toUpperCase()}`;
    } else {
      console.error('Image element not found');
    }
    if (movieDetails.isWatched) {
      btnWatched.classList.add('active-btn');
      btnWatched.textContent = 'REMOVE FROM WATCHED';
    } else {
      btnWatched.classList.remove('active-btn');
      btnWatched.textContent = 'ADD TO WATCHED';
    }

    if (movieDetails.isQueued) {
      btnFAVORITE.classList.add('active-btn');
      btnFAVORITE.textContent = 'REMOVE FROM FAVORITE';
    } else {
      btnFAVORITE.classList.remove('active-btn');
      btnFAVORITE.textContent = 'ADD TO FAVORITE';
    }
  } catch (error) {
    console.error('Error populating modal:', error.message);
  }

}


btnWatched.addEventListener('click', function () {
  movieDetails.isWatched = !movieDetails.isWatched;
  this.classList.toggle('active-btn');
  this.textContent = this.classList.contains('active-btn') ? 'REMOVE FROM WATCHED' : 'ADD TO WATCHED';
});

btnFAVORITE.addEventListener('click', function () {
  movieDetails.isQueued = !movieDetails.isQueued;
  this.classList.toggle('active-btn');
  this.textContent = this.classList.contains('active-btn') ? 'REMOVE FROM FAVORITE' : 'ADD TO FAVORITE';
});

