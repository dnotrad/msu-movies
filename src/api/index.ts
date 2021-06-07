import axios from "axios";
import { IMovie } from "../store/types/movies";

const baseApi = axios.create({
  baseURL: "https://yts.mx/api/v2/",
});

interface moviesResponse {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: IMovie[];
}

export const moviesApi = {
  getMoviesList(page = 1, limit = 8) {
    return baseApi.get<{ data: moviesResponse }>(
      `/list_movies.json?page=${page}`
    );
  },

  getMovieData(id: number) {
    return baseApi.get<{ data: { movie: IMovie } }>(
      `/movie_details.json?movie_id=${id}`
    );
  },
};
