import React, { useEffect } from "react";
import Header from "./components/Header/Header";
import Movies from "./components/Movies/Movies";
import { useDispatch } from "react-redux";
import { getMoviesListThunk } from "./store/action-creators/movies";
import { useTypedSelector } from "./hooks/useTypedSelector";
import Loader from "./components/Loader/Loader";
import { Redirect, Route, Switch } from "react-router";
import MoviePage from "./components/MoviePage/MoviePage";

function App() {
  const dispatch = useDispatch();
  const { isFetching } = useTypedSelector((state) => state.moviesReducer);

  useEffect(() => {
    dispatch(getMoviesListThunk());
  }, []);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          {isFetching ? <Loader /> : <Movies />}
        </Route>
        <Route path={`/movie/:id`} component={MoviePage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
