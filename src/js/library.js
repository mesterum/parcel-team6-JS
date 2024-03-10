import { fetchMovies, getGenres } from "../js-partials/api";

document.addEventListener("DOMContentLoaded", async function() {
    const movieList = document.getElementById("movies-list");
    const empty = document.querySelector(".empty-library-message");

    try {
        // Fetch movie data from your API
        const moviesData = await fetchMovies("popular", 1); 
        const movies = moviesData.results; 

        // Fetch genre data
        const genresData = await getGenres();
        const genresMap = new Map(genresData.genres.map(genre => [genre.id, genre.name]));

        // Check if there are any movies
        if (movies.length === 0) {
            empty.innerHTML = "Your movie library is empty!"; 
            return;
        }

        // Clear the empty message
        empty.innerHTML = "";

        // Populate the movie list with fetched movies
        movies.forEach(movie => {
            const { title, genre_ids, release_date, poster_path } = movie; 

            // Construct the poster URL
            const posterUrl = poster_path ? `https://image.tmdb.org/t/p/w342${poster_path}` : ""; 

            // Map genre IDs to genre names
            const genreNames = genre_ids.map(genreId => genresMap.get(genreId)).filter(Boolean);

            const releaseYear = release_date ? release_date.split("-")[0] : "Unknown Year";

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
                    <p class="movie-genre-year">${genreNames.join(", ")} | ${releaseYear}</p>
                </div>
            `;

            // Append the list item to the movie list
            movieList.appendChild(liTemplate);
        });
    } catch (error) {
        console.error("Error fetching and rendering movies:", error.message);
    }
});
