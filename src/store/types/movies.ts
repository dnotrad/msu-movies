// movieType
export interface IMovie {
  id: number;
  title: string;
  year: number;
  rating: number;
  genres: string[];
  synopsis: string;
  large_cover_image: string;
  description_full: string;
}

// initialState type
export interface IState {
  isFetching: boolean;
  page: number;
  limit: number;
  movies: IMovie[];
  currentMovie: null | IMovie;
}

// actionsTypes
export enum actionsTypes {
  SET_MOVIES_LIST = "GET_MOVIES_LIST",
  SET_IS_FETCHING = "SET_IS_FETCHING",
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_CURRENT_MOVIE = "SET_CURRENT_MOVIE",
}

// actions
export interface ISetMoviesListAC {
  type: actionsTypes.SET_MOVIES_LIST;
  payload: IMovie[];
}

export interface ISetIsFetching {
  type: actionsTypes.SET_IS_FETCHING;
  payload: boolean;
}

export interface ISetCurrentPage {
  type: actionsTypes.SET_CURRENT_PAGE;
  payload: number;
}

export interface ISetCurrentMovie {
  type: actionsTypes.SET_CURRENT_MOVIE;
  payload: IMovie | null;
}

// all actions
export type moviesActions =
  | ISetMoviesListAC
  | ISetIsFetching
  | ISetCurrentPage
  | ISetCurrentMovie;
