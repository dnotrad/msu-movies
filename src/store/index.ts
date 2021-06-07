import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { moviesReducer } from "./reducers/movies";
import thunk from "redux-thunk";

let rootReducer = combineReducers({
  moviesReducer: moviesReducer,
});
export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
