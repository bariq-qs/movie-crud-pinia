interface Genre {
  title: string
}

interface RootState {
  movies: Movie[]
  genres: Genre[]
}

interface Movie {
  id: string
  title: string
  director: string
  summary: string
  genres: Genre[]
}

export type {
  RootState,
  Genre,
  Movie
}