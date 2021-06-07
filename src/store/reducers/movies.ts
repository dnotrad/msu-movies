import { IState, moviesActions, actionsTypes, IMovie } from "../types/movies";

const initialState: IState = {
  isFetching: false,
  page: 1,
  limit: 8,
  movies: [],
  currentMovie: null,
};

export const moviesReducer = (
  state = initialState,
  action: moviesActions
): IState => {
  switch (action.type) {
    case actionsTypes.SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: action.payload,
      };
    }
    case actionsTypes.SET_MOVIES_LIST: {
      return {
        ...state,
        movies: action.payload,
      };
    }
    case actionsTypes.SET_CURRENT_PAGE: {
      return {
        ...state,
        page: action.payload,
      };
    }
    case actionsTypes.SET_CURRENT_MOVIE: {
      return {
        ...state,
        currentMovie: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};
