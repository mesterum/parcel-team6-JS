import { getGenres, getInfoMovie as getMovieDetails } from "./api";
import { movieDescription } from "./themoviedbAPI"; // Assuming you have a separate file for movie description
import { API_URL } from './config';

// DOM elements
const posterMovie = document.querySelector("#film-img");
const movieTitleElement = document.getElementById("film-title");
const movieDescriptionElement = document.getElementById("description");
const movieVotesElement = document.getElementById("votes");
const moviePopularityElement = document.getElementById("popul");
const movieOrigTitleElement = document.getElementById("origTitle");
const movieGenreElement = document.getElementById("genre");
const movieAboutElement = document.getElementById("about");
const cardMovie = document.querySelector(".card-movie");

// Get movie list containers
const movieList = document.getElementById("movies-list");
const movieHomeList = document.getElementById("movies-list-home");

// Event listener for movie list click events
movieList?.addEventListener("click", handleMovieListClick);
movieHomeList?.addEventListener("click", handleMovieListClick);

// Function to handle movie list click events
async function handleMovieListClick(event) {
    if (event.target.tagName === "IMG") {
        const li = event.target.closest("li");

        // Extract movie data from the clicked list item
        const movieData = {
            title: li.querySelector(".movie-name").innerText.toUpperCase(),
            posterUrl: event.target.getAttribute("src"),
            genre: li.querySelector(".movie-genre-year").innerText,
            original_title: movieOrigTitleElement.innerText,
            popularity: moviePopularityElement.innerText,
            votes: movieVotesElement.innerText
        };

        // Populate the modal with the extracted movie data
        populateModal(movieData);

        // Show the modal
        const infoModal = document.getElementById("info-modal");
        infoModal.classList.remove("is-hidden");
    }
}

// Function to populate the modal with movie data
async function populateModal(movieData) {
    try {
        // Construct the poster URL
        const posterUrl = movieData.posterUrl ? `https://image.tmdb.org/t/p/w342${movieData.posterUrl}` : "";

        // Set the modal content
        movieTitleElement.textContent = movieData.title;
        const imgElement = document.getElementById("film-img");
        movieOrigTitleElement.textContent = movieData.original_title;
        movieGenreElement.textContent = movieData.genre;

        // Fetch detailed movie information using the movie ID
        const movieDetails = await getMovieDetails(movieData.id);
    
        // Check if the img element exists
        if (imgElement) {
            imgElement.setAttribute("src", posterUrl);
            movieVotesElement.textContent = ` ${movieData.votes}`;
            moviePopularityElement.textContent = ` ${movieData.popularity}`;
            movieAboutElement.textContent = `${movieDetails.overview}`;
        } else {
            console.error("Image element not found");
        }
    } catch (error) {
        console.error("Error populating modal:", error.message);
    }
}
