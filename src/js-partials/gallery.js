
// import { getMoviesNowPlaying } from "./api";
import { setMoviesFunction } from "./pagination";
import { movieDescription, getMovies } from "./themoviedbAPI";

export function renderGallery(movieList,
    movieListHome = document.getElementById("movies-list-home"),
    emptyMessage = "No movies!") {

    if (!movieList || !movieListHome) return;
    const { results: movies } = movieList,
        empty = document.querySelector(".empty-library-message");

    // Check if there are any movies
    if (movies.length === 0 && empty) {
        empty.innerHTML = emptyMessage;
        return;
    }

    // Clear the empty message
    clearMovieList(movieListHome, empty);

    // Populate the movie list with fetched movies
    movieListHome.append(
        ...movies.map(movie => {
            const { title, poster_path } = movie;

            // Construct the poster URL
            const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : "https://placehold.co/342x513?text=No+poster";

            // Create a new list item element
            const liTemplate = document.createElement("li");
            liTemplate.classList.add("card-movie");
            liTemplate.dataset.movieId = movie.id;

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

            return liTemplate;
        })
    )
}

function clearMovieList(movieList, empty) {
    movieList.innerHTML = "";
    empty.innerHTML = "";
}

document.addEventListener("DOMContentLoaded", () => {
    let is1stTime = true;
    setMoviesFunction(async page => {
        if (page === undefined) {
            if (!is1stTime) return;
            is1stTime = false; page = 1;
        }
        const movies = await getMovies("", page);
        renderGallery(movies);
        return movies
    })
})
