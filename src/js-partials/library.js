import { getMovies as getMovieList } from "./themoviedbAPI";
import { fetchMovies } from "./api"
import { renderGallery } from "./gallery";

const movieList = document.getElementById("movies-list");
const watchedBtn = document.querySelector(".watched-tab-btn");
const queueBtn = document.querySelector(".queue-tab-btn");

if (movieList) document.addEventListener("DOMContentLoaded", async function () {
    try {
        // Fetch movie data from your API
        const moviesData = await getMovieList();
        renderGallery(moviesData, movieList, "Your movie library is empty!");

    } catch (error) {
        console.error("Error fetching and rendering movies:", error.message);
    }
});

//Buttons


watchedBtn?.addEventListener("click", async function () {
    try {
        // Fetch watched movies data from your API
        const watchedMoviesData = await fetchMovies("watched", 1);
        renderGallery(watchedMoviesData, movieList, "You haven't watched any movies yet!");
    } catch (error) {
        console.error("Error fetching and rendering watched movies:", error.message);
    }
});

queueBtn?.addEventListener("click", async function () {
    try {
        // Fetch movie queue data from your API
        const queueMoviesData = await fetchMovies("que", 1);
        renderGallery(queueMoviesData, movieList, "Your movie queue is empty!");
    } catch (error) {
        console.error("Error fetching and rendering queued movies:", error.message);
    }
});
