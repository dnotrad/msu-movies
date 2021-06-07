import { useDispatch } from "react-redux";
import s from "./Pagination.module.css";
import { getMoviesListThunk } from "./../../store/action-creators/movies";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Pagination: React.FC = () => {
  const dispatch = useDispatch();
  const currentPage = useTypedSelector((state) => state.moviesReducer.page);
  function changePage(page: number) {
    dispatch(getMoviesListThunk(page));
  }
  return (
    <div className={s.pagination}>
      {currentPage - 1 > 0 && (
        <div className={s.button} onClick={(e) => changePage(currentPage - 1)}>
          {currentPage - 1}
        </div>
      )}
      <div className={`${s.button} ${s.current}`}>{currentPage}</div>
      <div className={s.button} onClick={(e) => changePage(currentPage + 1)}>
        {currentPage + 1}
      </div>
    </div>
  );
};

export default Pagination;
