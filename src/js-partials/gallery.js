// import {
//   getGenres,
//   getInfoMovie,
//   getNameFilm,
//   getTrending,
//   fetchMovies,
//   BASE_URL,
//   URL,
//   API_KEY,
// } from './api';

// import {
//   genres,
//   movieDescription,
//   getMovies,
//   TMDBconfiguration,
// } from './themoviedbAPI.ts';

// const gallery = document.querySelector('.gallery');
// const movies = document.querySelector('.movies');

// export default function renderFilmCard({
//   root,
//   base_url,
//   poster_size,
//   movie,
//   genresList,
//   page,
// }) {
//   const { id, title, poster_path, vote_average, release_date } = movie;
//   let src = '';
//   let date = '';
//   let genres = [];
//   if (poster_path) {
//     src = `
//     src="${base_url}w185${poster_path}"
//             srcset="
//               ${base_url}w185${poster_path}                     1x,
//               ${base_url}${poster_size}${poster_path}           2x
//             "
//     alt="${title}"
//     `;
//   } else {
//     src = '';
//   }

//   if (release_date) {
//     date = parseInt(release_date);
//   } else {
//     date = '';
//   }

//   if (genresList.length > 2) {
//     genres = genresList.slice(0, 2).join(', ') + ', Other';
//   } else {
//     genres = genresList;
//   }

//   root.insertAdjacentHTML(
//     'beforeend',
//     `
//     <div class="movie" data-id="${id}">
//       <img
//         class="movie__cover"
//         ${src}
//       />
//       <div class="movie-info">
//       <h2 class="movie-title">${title}</h2>
//       <div class="card-preview-info">
//         <p class="movie-date">${genres} | ${date}</p>
//         <span class="movie_average">${vote_average}</span>
//         </div>
//       </div>
//     </div>`
//   );
//   movie.append(root);
// }
import { getMoviesNowPlaying, getGenres } from "./api";

document.addEventListener("DOMContentLoaded", async function() {
    const movieListHome = document.getElementById("movies-list-home");
    const empty = document.querySelector(".empty-library-message");

    try {
        // Fetch movie data from your API
        const moviesData = await getMoviesNowPlaying("popular", 1); 
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
            movieListHome.appendChild(liTemplate);
        });
    } catch (error) {
        console.error("Error fetching and rendering movies:", error.message);
        empty.innerHTML = "An error occurred while fetching movies.";
    }
});
