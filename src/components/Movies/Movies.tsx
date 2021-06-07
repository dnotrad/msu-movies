import s from "./Movies.module.css";
import Movie from "./../Movie/Movie";
import { useTypedSelector } from "../../hooks/useTypedSelector";

const Movies: React.FC = () => {
  const { movies } = useTypedSelector((state) => state.moviesReducer);

  return (
    <div className={s.movies}>
      <div className={"container"}>
        <div className={s.inner}>
          {movies.map((movie) => (
            <Movie
              key={movie.id}
              title={movie.title}
              bg={movie.large_cover_image}
              rating={movie.rating}
              genres={movie.genres}
              year={movie.year}
              id={movie.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Movies;
