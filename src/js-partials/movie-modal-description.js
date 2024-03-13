import { getInfoMovie } from "./api";

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
function populateModal(movieData) {

    movieTitleElement.textContent = movieData.title;
    posterMovie.setAttribute("src", movieData.posterUrl);
    movieOrigTitleElement.textContent = movieData.original_title;


}
