import { getMovieDetails } from './api';

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
      )}`
      movieVotesTotal.textContent = `${movieDetails.vote_count} `;
      moviePopularityElement.textContent = ` ${movieDetails.popularity.toFixed(
        1
      )}`;
      movieAboutElement.textContent = `${movieDetails.overview}`;
      movieGenreElement.textContent = `${movieDetails.genres
        .map(name => name.name)
        .join(', ')}`;
      movieOrigTitleElement.textContent = `${movieDetails.original_title.toUpperCase()}`;
    } else {
      console.error('Image element not found');
    }
  } catch (error) {
    console.error('Error populating modal:', error.message);
  }
}


function removeActiveClass(clickedButton) {
  const allButtons = document.querySelectorAll('.add-to-watched-btn, .add-to-queue-btn');
  allButtons.forEach(button => {
    if (button !== clickedButton && button.classList.contains('active-btn')) {
      button.classList.remove('active-btn');
    } else {
      button.classList.add('active-btn');
    }
  });
}
  
  // Add event listener to the document
  document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const modal = document.getElementById('info-modal');
  
    // Check if the click occurred on one of the buttons
    if (clickedElement.classList.contains('add-to-watched-btn') || clickedElement.classList.contains('add-to-queue-btn')) {
      // Toggle active class on the clicked button
      clickedElement.classList.toggle('active-btn');
      // Remove active class from other buttons
      removeActiveClass(clickedElement);
    } else if (!modal.contains(clickedElement)) {
      // Remove active class from all buttons if click occurred outside buttons and modal
      const allButtons = document.querySelectorAll('.add-to-watched-btn, .add-to-queue-btn');
      allButtons.forEach(button => {
        button.classList.remove('active-btn');
      });
    }
  });


btnWatched.addEventListener('click', function() {
    this.textContent = (this.textContent === 'ADD TO WATCHED') ? 'REMOVE FROM WATCHED' : 'ADD TO WATCHED';
});

btnFAVORITE.addEventListener('click', function() {
    const span = this.querySelector('span');
    span.textContent = (span.textContent === 'ADD TO FAVORITE') ? 'REMOVE FROM FAVORITE' : 'ADD TO FAVORITE';
});

