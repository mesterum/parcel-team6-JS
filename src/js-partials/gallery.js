
import { getMoviesNowPlaying } from "./api";
import { movieDescription } from "./themoviedbAPI";


document.addEventListener("DOMContentLoaded", async function () {
    const movieListHome = document.getElementById("movies-list-home");
    const empty = document.querySelector(".empty-library-message");


    if (!movieListHome) return;
    try {
        // Fetch movie data from your API
        const moviesData = await getMoviesNowPlaying("popular", 1);
        const movies = moviesData.results;

        // Check if there are any movies
        if (movies.length === 0) {
            empty.innerHTML = "Your movie library is empty!";
            return;
        }

        // Clear the empty message
        clearMovieList(movieListHome, empty);

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
            movieListHome.appendChild(liTemplate);
        });
    } catch (error) {
        console.error("Error fetching and rendering movies:", error.message);
        empty.innerHTML = "An error occurred while fetching movies.";
    }
});


function clearMovieList(movieList, empty) {
    movieList.innerHTML = "";
    empty.innerHTML = "";
}