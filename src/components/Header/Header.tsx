import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { setCurrentMovie } from "../../store/action-creators/movies";
import Pagination from "../Pagination/Pagination";
import s from "./Header.module.css";
const Header: React.FC = () => {
  const currentMovie = useTypedSelector(
    (state) => state.moviesReducer.currentMovie
  );
  const dispatch = useDispatch();

  const setCurrentMovieNull = () => {
    dispatch(setCurrentMovie(null));
  };

  return (
    <div className={s.header}>
      <div className={"container"}>
        <div className={s.inner}>
          <NavLink to="/" className={s.title} onClick={setCurrentMovieNull}>
            {currentMovie ? currentMovie.title : "Movies"}
          </NavLink>
          {currentMovie ? (
            <NavLink to="/" onClick={setCurrentMovieNull}>
              Back
            </NavLink>
          ) : (
            <Pagination />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
