import { Dexie } from "dexie";
import { currentPage } from "./pagination";
import { SearchResult } from "./themoviedbAPI";

type Persistance = SearchResult["results"][0] & {
  isWatched: boolean;
  isQueued: boolean;
}
class Library extends Dexie {
  all!: Dexie.Table<MovieDetails, number>; // number = type of the primkey

  constructor() {
    super("Library");
    this.version(.1).stores({
      all: "++, id, watchedId, queuedId"
    })
  }
}

interface IMovie {
  id: number,
  watchedId: number,
  queuedId: number
}

const db = new Library()

export class MovieDetails implements Persistance, IMovie {
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

  get isWatched(): boolean {
    return this.watchedId > 0
  }
  set isWatched(value: boolean) {
    if (value == this.isWatched) return
    if (value) {
      if (!this.isQueued) {
        this.watchedId = ++MovieDetails.lastIds.watched
        db.all.put(this)
        dirty.All = true
      }
      else {
        db.all.where("id").equals(this.id).modify({ watchedId: ++MovieDetails.lastIds.watched })
      }
    }
    else {
      if (!this.isQueued) {
        db.all.where("id").equals(this.id).delete()
        dirty.All = true
      }
      else { db.all.where("id").equals(this.id).modify({ watchedId: 0 }) }
    }
    dirty.Watched = true

  }
  get isQueued(): boolean {
    return this.queuedId > 0
  }
  set isQueued(value: boolean) {
    if (value == this.isQueued) return
    if (value) {
      if (!this.isWatched) {
        this.queuedId = ++MovieDetails.lastIds.queued
        db.all.put(this)
        dirty.All = true
      }
      else {
        db.all.where("id").equals(this.id).modify({ queuedId: ++MovieDetails.lastIds.queued })
      }
    }
    else {
      if (!this.isWatched) {
        db.all.where("id").equals(this.id).delete()
        dirty.All = true
      }
      else { db.all.where("id").equals(this.id).modify({ queuedId: 0 }) }
    }
    dirty.Queued = true
  }
  watchedId: number
  queuedId: number

  constructor(movie: SearchResult["results"][0]) {
    Object.assign(this, movie)
    this.watchedId = 0
    this.queuedId = 0
  }
  static db = db
  static lastIds = {
    watched: 0,
    queued: 0
  }
  static {
    this.db.all.mapToClass(MovieDetails)
    db.all.orderBy("watchedId").last((m) => this.lastIds.watched = m?.watchedId ?? 0)
    db.all.orderBy("queuedId").last((m) => this.lastIds.queued = m?.queuedId ?? 0)
  }
}
type StoreResult = Omit<SearchResult, "results"> & { results: MovieDetails[] }
const currentPageMovieList = {} as { [key in "Watched" | "Queued" | "All"]?: StoreResult },
  dirty = {
    Watched: true,
    Queued: true,
    All: true
  }

let currentMovieList: StoreResult | null = null,
  lastListType: "Watched" | "Queued" | "All" | "none" = "none"
currentPage.subscribe(() => currentMovieList = null)

let storedMovie: MovieDetails | undefined | number
export async function getMovieDetails(movieId: number): Promise<Persistance> {
  currentMovieList ??= currentPage.movieList
  if (lastListType != "none") {
    return currentMovieList.results.find(m => m.id === movieId)!
  }
  storedMovie = await db.all.get({ id: movieId })
  if (storedMovie) { return storedMovie }
  storedMovie = movieId
  let crtMovie = currentMovieList.results.find(m => m.id === movieId)!
  return new MovieDetails(crtMovie)
}

export async function getMovieList(listType: "Watched" | "Queued" | "All", page?: number) {
  if (page == undefined) {
    page = currentPageMovieList[listType]?.page ?? 1
    if (listType != lastListType) {
      lastListType = listType
      if (!dirty[listType]) return currentPageMovieList[listType]
    } else if (!dirty[listType]) return
  }
  lastListType = listType

  let query = (listType == "All" ? db.all.orderBy(":id")
    : listType == "Watched" ? db.all.where("watchedId").above(0)
      : db.all.where("queuedId").above(0)),
    count: Promise<number> | number = await query.clone().count()
  const results = await query.reverse().offset(20 * (page - 1)).limit(20).toArray()
  // count = await count
  const list: StoreResult = {
    page,
    results,
    total_pages: (count + 19) / 20 | 0,
    total_results: count
  }
  currentPageMovieList[listType] = list
  dirty[listType] = false
  return list
}


