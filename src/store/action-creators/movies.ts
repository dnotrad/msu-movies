import {
  actionsTypes,
  ISetIsFetching,
  moviesActions,
  IMovie,
  ISetMoviesListAC,
  ISetCurrentPage,
  ISetCurrentMovie,
} from "./../types/movies";
import { moviesApi } from "./../../api/index";
import { Dispatch } from "react";

const setIsFetching = (isFetch: boolean): ISetIsFetching => {
  return {
    type: actionsTypes.SET_IS_FETCHING,
    payload: isFetch,
  };
};

const setMoviesList = (films: IMovie[]): ISetMoviesListAC => {
  return {
    type: actionsTypes.SET_MOVIES_LIST,
    payload: films,
  };
};

const setCurrentPage = (page: number): ISetCurrentPage => {
  return {
    type: actionsTypes.SET_CURRENT_PAGE,
    payload: page,
  };
};

export const setCurrentMovie = (data: IMovie | null): ISetCurrentMovie => {
  return {
    type: actionsTypes.SET_CURRENT_MOVIE,
    payload: data,
  };
};

export const getMoviesListThunk = (page?: number, limit?: number) => {
  return (dispatch: Dispatch<moviesActions>) => {
    dispatch(setIsFetching(true));
    moviesApi
      .getMoviesList(page, limit)
      .then((res) => {
        dispatch(setMoviesList(res.data.data.movies));
        dispatch(setCurrentPage(res.data.data.page_number));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};

export const getMovieDataThunk = (movieId: number) => {
  return (dispatch: Dispatch<moviesActions>) => {
    dispatch(setIsFetching(true));
    moviesApi
      .getMovieData(movieId)
      .then((res) => {
        dispatch(setCurrentMovie(res.data.data.movie));
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch(setIsFetching(false));
      });
  };
};
