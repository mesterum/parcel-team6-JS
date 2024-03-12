// import { fetchMovies} from "./api";
import { movieDescription, getMovies as getMovieList } from "./themoviedbAPI";
import { fetchMovies } from "./api"

const movieList = document.getElementById("movies-list");
const empty = document.querySelector(".empty-library-message");
const watchedBtn = document.querySelector(".watched-tab-btn");
const queueBtn = document.querySelector(".queue-tab-btn");

if (movieList) document.addEventListener("DOMContentLoaded", async function () {


    try {
        // Fetch movie data from your API
        const moviesData = await getMovieList();
        const movies = moviesData.results;



        // Check if there are any movies
        if (movies.length === 0) {
            empty.innerHTML = "Your movie library is empty!";
            return;
        }

        // Clear the empty message
        empty.innerHTML = "";

        // Populate the movie list with fetched movies
        movies.forEach(movie => {
            const { title, poster_path } = movie;

            // Construct the poster URL
            const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : "";

            // Create a new list item element
            const liTemplate = document.createElement("li");
            liTemplate.classList.add("card-movie");

            // Populate the inner HTML of the list item
            liTemplate.innerHTML = `
                <div class="movie-poster">
                    <img src="${posterUrl}" alt="${title}">
                </div>
                <div class="movie-name-container">
                    <p class="movie-name">${title.toUpperCase()}</p>
                    <p class="movie-genre-year">${movieDescription(movie)}</p>
                </div>
            `;

            // Append the list item to the movie list
            movieList.appendChild(liTemplate);
        });
    } catch (error) {
        console.error("Error fetching and rendering movies:", error.message);

    }
});

//Buttons


watchedBtn?.addEventListener("click", async function () {
    try {
        // Clear the movie list
        movieList.innerHTML = "";

        // Fetch watched movies data from your API
        const watchedMoviesData = await fetchMovies("watched", 1);
        const watchedMovies = watchedMoviesData.results;

        // Check if there are any watched movies
        if (watchedMovies.length === 0) {
            empty.innerHTML = "You haven't watched any movies yet!";
            return;
        }

        // Clear the empty message
        empty.innerHTML = "";

        // Populate the movie list with fetched watched movies
        watchedMovies.forEach(movie => {
            renderMovie(movie);
        });
    } catch (error) {
        console.error("Error fetching and rendering watched movies:", error.message);
    }
});

queueBtn?.addEventListener("click", async function () {
    try {
        // Clear the movie list
        movieList.innerHTML = "";

        // Fetch movie queue data from your API
        const queueMoviesData = await fetchMovies("que", 1);
        const queueMovies = queueMoviesData.results;

        // Check if there are any movies in the queue
        if (queueMovies.length === 0) {
            empty.innerHTML = "Your movie queue is empty!";
            return;
        }

        // Clear the empty message
        empty.innerHTML = "";

        // Populate the movie list with fetched queue movies
        queueMovies.forEach(movie => {
            renderMovie(movie);
        });
    } catch (error) {
        console.error("Error fetching and rendering queued movies:", error.message);
    }
});

function renderMovie(movie) {
    const { title, poster_path } = movie;

    // Construct the poster URL
    const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : "";

    // Create a new list item element
    const liTemplate = document.createElement("li");
    liTemplate.classList.add("card-movie");

    // Populate the inner HTML of the list item
    liTemplate.innerHTML = `
        <div class="movie-poster">
            <img src="${posterUrl}" alt="${title}">
        </div>
        <div class="movie-name-container">
            <p class="movie-name">${title.toUpperCase()}</p>
            <p class="movie-genre-year">${movieDescription(movie)}</p>
        </div>
    `;

    // Append the list item to the movie list
    movieList.appendChild(liTemplate);
};
