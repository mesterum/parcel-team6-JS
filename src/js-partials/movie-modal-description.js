import { getGenres, getInfoMovie } from "./api";
import { movieDescription, getMovies as getMovieList } from "./themoviedbAPI";


const posterMovie = document.querySelector("#film-img");
const movieTitleElement = document.getElementById("film-title");
const movieDescriptionElement = document.getElementById("description");
const movieVotesElement = document.getElementById("votes");
const moviePopularityElement = document.getElementById("popul");
const movieOrigTitleElement = document.getElementById("origTitle");
const movieGenreElement = document.getElementById("genre");
const movieAboutElement = document.getElementById("about");
const cardMovie = document.querySelector(".card-movie");


const movieList = document.getElementById("movies-list");
const movieHomeList = document.getElementById("movies-list-home")


document.addEventListener("DOMContentLoaded", function () {
    // Your code here
});

function handleMovieListClick(event, movies) {
    const target = event.target;
    if (target.tagName === "IMG") {
        const li = target.closest("li");
        const movieName = li.querySelector(".movie-name").innerText.toUpperCase();
        const movie = movies.find(movie => movie.title.toUpperCase() === movieName);
        if (movie) {
            const movieData = {
                title: movie.title,
                original_title: movie.title,
                posterUrl: movie.poster_path
            };
            populateModal(movieData);
        } else {
            console.error("Movie not found");
        }
    }
}

// Add event listener to the movie list container
movieList?.addEventListener("click", async function (event) {
    // Check if the clicked element is an image within a list item
    if (event.target.tagName === "IMG") {

        const li = event.target.closest("li");

        // Extract movie data from the clicked list item
        const movieData = {
            title: li.querySelector(".movie-name").innerText.toUpperCase(),
            posterUrl: event.target.getAttribute("src"),
            original_title: li.querySelector(".movie-name").innerText

        };

        // Populate the modal with the extracted movie data
        populateModal(movieData);

        // Show the modal
        const infoModal = document.getElementById("info-modal");
        infoModal.classList.remove("is-hidden");
    }
});

movieHomeList?.addEventListener("click", async function (event) {
    // Check if the clicked element is an image within a list item
    if (event.target.tagName === "IMG") {

        const li = event.target.closest("li");

        // Extract movie data from the clicked list item
        const movieData = {
            title: li.querySelector(".movie-name").innerText.toUpperCase(),
            posterUrl: event.target.getAttribute("src"),
            original_title: li.querySelector(".movie-name").innerText

        };

        // Populate the modal with the extracted movie data
        populateModal(movieData);

        // Show the modal
        const infoModal = document.getElementById("info-modal");
        infoModal.classList.remove("is-hidden");
    }
});


// Function to populate the modal with movie data


async function populateModal(movieData) {
    try {
        // Construct the poster URL
        const posterUrl = movieData.posterUrl ? `https://image.tmdb.org/t/p/w342${movieData.posterUrl}` : "";

        // Set the modal content
        movieTitleElement.textContent = movieData.title;
        const imgElement = document.getElementById("film-img");
        
        // Check if the img element exists
        if (imgElement) {
            imgElement.setAttribute("src", posterUrl);
            movieOrigTitleElement.textContent = movieData.original_title;
        } else {
            console.error("Image element not found");
        }

        // Show the modal
        const infoModal = document.getElementById("info-modal");
        infoModal.classList.remove("is-hidden");
    } catch (error) {
        console.error("Error populating modal:", error.message);
    }
}


