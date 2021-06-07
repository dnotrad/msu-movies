import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getMovieDataThunk } from "../../store/action-creators/movies";
import s from "./MoviePage.module.css";
import Img from "../Img/Img";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import emptyImg from "../../assets/img/empty.png";
import Loader from "../Loader/Loader";
import star from "../../assets/icons/star.svg";
import Comments from "./Comments";

interface IGenreProps {
  title: string;
}

const Genre: React.FC<IGenreProps> = ({ title }) => {
  return (
    <div className={s.genre}>
      <div className={s.genre_cicrle}></div>
      <div className={s.genre_title}>{title}</div>
    </div>
  );
};

interface RouteParams {
  id: string;
}
interface MyComponent extends RouteComponentProps<RouteParams> {}

const MoviePage: React.FC<MyComponent> = (props) => {
  const dispatch = useDispatch();
  const { currentMovie, isFetching } = useTypedSelector(
    (state) => state.moviesReducer
  );
  useEffect(() => {
    const filmId = props.match.params.id;
    dispatch(getMovieDataThunk(+filmId));
  }, []);

  return (
    <>
      {isFetching ? (
        <Loader />
      ) : (
        <div className={s.page}>
          <div className={"container"}>
            <div className={s.inner}>
              <div className={s.left}>
                <div className={s.img}>
                  <Img
                    img={currentMovie?.large_cover_image || ""}
                    preloader={emptyImg}
                  />
                  <div className={s.img_info}>
                    <div className={s.img_icon}>
                      <img src={star} alt="" />
                    </div>
                    {currentMovie?.rating.toFixed(1)}
                  </div>
                </div>
              </div>
              <div className={s.right}>
                <div className={s.title}>{currentMovie?.title}</div>
                <div className={s.year}>{currentMovie?.year}</div>
                <div className={s.genres}>
                  {currentMovie?.genres.map((genre, index) => (
                    <Genre key={index} title={genre} />
                  ))}
                </div>
                <div className={s.synopsis}>
                  <div className={s.synopsis_title}>Synopsis</div>
                  <div className={s.synopsis_description}>
                    {currentMovie?.description_full}
                  </div>
                </div>
                <Comments filmId={currentMovie?.id || 1}/>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviePage;
