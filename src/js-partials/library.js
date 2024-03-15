import { getMovies as getMovieList } from "./themoviedbAPI";
import { fetchMovies } from "./api"
import { renderGallery } from "./gallery";
import { setMoviesFunction } from "./pagination"

const movieList = document.getElementById("movies-list");
const empty = document.querySelector(".empty-library-message");
const watchedBtn = document.querySelector(".watched-tab-btn");
const queueBtn = document.querySelector(".queue-tab-btn");

if (movieList) document.addEventListener("DOMContentLoaded", async function () {
    setMoviesFunction(async page => {
        // Fetch movie data from your API
        const moviesData = await fetchMovies("libra", page);
        renderGallery(moviesData, movieList, "Your movie library is empty!");
        return moviesData
    })
});

//Buttons


watchedBtn?.addEventListener("click", async function () {
    setMoviesFunction(async page => {
        // Fetch watched movies data from your API
        const watchedMoviesData = await fetchMovies("watched", page);
        renderGallery(watchedMoviesData, movieList, "You haven't watched any movies yet!");
        return watchedMoviesData
    })
});

queueBtn?.addEventListener("click", () =>
    setMoviesFunction(async page => {
        // Fetch movie queue data from your API
        const queueMoviesData = await fetchMovies("que", page);
        renderGallery(queueMoviesData, movieList, "Your movie queue is empty!");
        return queueMoviesData
    })
);
