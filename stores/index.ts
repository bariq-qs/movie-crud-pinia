import { defineStore } from 'pinia'
import type { RootState, Genre, Movie } from './model'
import { v4 as uuidv4 } from 'uuid'

const listGenre = [{
  title: 'Action'
},
{
  title: 'Animation'
},
{
  title: 'Drama'
},
{
  title: 'Sci-Fi'
}]

export const useRootStore = defineStore('root', {
  persist: {
    key: 'root-store',
    paths: ['movies'],
    storage: localStorage
  },
  state: (): RootState => ({
    movies: [],
    genres: listGenre
  }),
  actions: {
    saveMovie(data: Movie) {
      const movieTemp = this.movies
      if (data.id) {
        const findIndex = movieTemp.findIndex((v) => v.id === data.id)
        movieTemp[findIndex] = {
          ...data
        }
      } else {
        const newData = {
          ...data,
          id: uuidv4()
        }
        movieTemp.unshift(newData)
      }
      this.$patch({
        movies: movieTemp
      })
    },
    deleteMovie(id: string) {
      const movieTemp = this.movies
      const findIndex = movieTemp.findIndex((v) => v.id === id)
      movieTemp.splice(findIndex, 1)
      this.$patch({
        movies: movieTemp
      })
    }
  },
  getters: {
    listMovie(state): Movie[] {
      return state.movies
    },
    listGenre(state): Genre[] {
      return state.genres
    }
  }
})