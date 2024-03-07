import axios, { AxiosError } from "axios"
import { API_KEY } from "./config"

const themoviedb = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: API_KEY,
  },
})

export async function getMovies(searchTerm = "", page = 1): Promise<SearchResult> {
  const response = await (searchTerm ? themoviedb.get(
    "search/movie", { params: { page, query: searchTerm } }) : themoviedb.get(
      "trending/movie/week", { params: { page } }))
    .catch((error: AxiosError) => { throw error.toJSON() })
  return response.data as SearchResult
}

export function movieDescription(movie: SearchResult["results"][0]) {
  return [...genres(movie.genre_ids)].join(", ") + ' | ' + movie.release_date.substring(0, 4)
}
function* genres(genre_ids: number[]) {
  for (let i = 0; i <= 2 && i < genre_ids.length; i++) {
    yield i < 2 ? TMDBconfiguration.genres.get(genre_ids[i]) : "Other"
  }
}

type SearchResult = {
  page: number;
  results: {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }[];
  total_pages: number;
  total_results: number;
}


export const TMDBconfiguration = {
  "images": {
    "base_url": "http://image.tmdb.org/t/p/",
    "secure_base_url": "https://image.tmdb.org/t/p/",
    "backdrop_sizes": [
      "w300",
      "w780",
      "w1280",
      "original"
    ],
    "poster_sizes": [
      "w92",
      "w154",
      "w185",
      "w342",
      "w500",
      "w780",
      "original"
    ]
  } as const,
  "genres": new Map<number, string>([
    [
      28,
      "Action"
    ],
    [
      12,
      "Adventure"
    ],
    [
      16,
      "Animation"
    ],
    [
      35,
      "Comedy"
    ],
    [
      80,
      "Crime"
    ],
    [
      99,
      "Documentary"
    ],
    [
      18,
      "Drama"
    ],
    [
      10751,
      "Family"
    ],
    [
      14,
      "Fantasy"
    ],
    [
      36,
      "History"
    ],
    [
      27,
      "Horror"
    ],
    [
      10402,
      "Music"
    ],
    [
      9648,
      "Mystery"
    ],
    [
      10749,
      "Romance"
    ],
    [
      878,
      "Science Fiction"
    ],
    [
      10770,
      "TV Movie"
    ],
    [
      53,
      "Thriller"
    ],
    [
      10752,
      "War"
    ],
    [
      37,
      "Western"
    ]
  ])
}