import s from "./Movie.module.css";
import star from "../../assets/icons/star.svg";
import { Link } from "react-router-dom";
import emptyImg from "./../../assets/img/empty.png";
import Img from "../Img/Img";

interface IMovieProps {
  title: string;
  bg: string;
  rating: number;
  genres: string[];
  year: number;
  id: number;
}

const Movie: React.FC<IMovieProps> = ({
  title,
  bg,
  rating,
  genres,
  year,
  id,
}) => {
  let fixedGenres = genres?.slice(0, 3);
  return (
    <>
      <div className={s.movie}>
        <Link to={`/movie/${id}`}>
          <div className={s.inner}>
            <div className={s.backgroung}>
              <div className={s.img}>
                <div className={s.info}>
                  <div className={s.info_img}>
                    <img src={star} alt="star" />
                    <span>
                      {rating === 0 ? "No ratings" : rating.toFixed(1)}
                    </span>
                  </div>
                  <div className={s.genres}>
                    {fixedGenres?.map((genre) => (
                      <div key={genre} className={s.genre}>
                        {genre}
                      </div>
                    ))}
                  </div>
                  <div className={s.button}>More</div>
                </div>
                <Img img={bg} preloader={emptyImg} />
              </div>
            </div>
          </div>
          <div className={s.subtitle}>
            <div className={s.title}>{title}</div>
            <div className={s.year}>{year}</div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Movie;
