import { useEffect } from "react";
import { useState } from "react";
import s from "./Comments.module.css";
import arrowImg from "../../assets/icons/arrow.svg";
interface ICommentProps {
  date: string;
  value: string;
  author: string;
  id: number;
  fn: (id: number) => void;
}

const Comment: React.FC<ICommentProps> = ({ date, value, author, id, fn }) => {
  return (
    <div className={s.comment}>
      <div className={s.comment_body}>
        <div className={s.comment_info}>
          <div className={s.comment_author}>{author}</div>
          <div className={s.comment_date}>{date}</div>
        </div>
        <div className={s.comment_value}>{value}</div>
        <div className={s.delete_button} onClick={() => fn(id)}></div>
      </div>
    </div>
  );
};

interface ICommentsProps {
  filmId: number;
}

interface ICommentInLocalStore {
  filmId: number;
  comments: {
    id: number;
    date: string;
    author: string;
    value: string;
  }[];
}

const Comments: React.FC<ICommentsProps> = ({ filmId }) => {
  function getComments(filmId: number) {
    // массив всех комментариев по фильмам
    let localStorageComments = localStorage.getItem("comments") || "[]";
    let commentsDB: ICommentInLocalStore[] =
      JSON.parse(localStorageComments) || [];

    // комментарии к текущему фильму
    let currentMovieComments: ICommentInLocalStore = commentsDB.find(
      (comment) => comment.filmId === filmId
    ) || { filmId: filmId, comments: [] };

    return { commentsDB, currentMovieComments };
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (comment.trim()) {
      let { commentsDB, currentMovieComments } = getComments(filmId);
      // формирование нового комментария
      let date = new Date();
      date.toLocaleDateString();
      let newComment = {
        id: currentMovieComments.comments[0]?.id + 1 || 1,
        date: date.toLocaleDateString(),
        author: "You",
        value: comment,
      };

      // добавляем новый комменатрий
      currentMovieComments.comments = [
        newComment,
        ...currentMovieComments.comments,
      ];

      // записываем в LS новое значение
      let newDB;
      if (commentsDB.some((comments) => comments.filmId === filmId)) {
        newDB = [
          ...commentsDB.map((comments) =>
            comments.filmId === filmId ? currentMovieComments : comments
          ),
        ];
      } else {
        newDB = [...commentsDB, currentMovieComments];
      }
      localStorage.setItem("comments", JSON.stringify(newDB));

      setComments(currentMovieComments);
      setComment("");
    }
  }
  function deleteComment(id: number) {
    let { commentsDB, currentMovieComments } = getComments(filmId);
    currentMovieComments.comments = [
      ...currentMovieComments.comments.filter((comment) => comment.id !== id),
    ];
    let newDB = [
      ...commentsDB.map((comments) =>
        comments.filmId === filmId ? currentMovieComments : comments
      ),
    ];
    localStorage.setItem("comments", JSON.stringify(newDB));

    setComments(currentMovieComments);
  }
  let [comment, setComment] = useState("");
  let [comments, setComments] = useState<ICommentInLocalStore | null>(null);

  useEffect(() => {
    let { commentsDB, currentMovieComments } = getComments(filmId);
    setComments(currentMovieComments || null);
  }, []);

  return (
    <div className={s.comments}>
      <div className={s.title}>Comments</div>
      <div className={s.comments_body}>
        {comments?.comments.length
          ? comments.comments.map((comment) => (
              <Comment
                date={comment.date}
                author={comment.author}
                value={comment.value}
                id={comment.id}
                fn={deleteComment}
              />
            ))
          : "No comments"}
      </div>

      <div className={s.comments_textarea}>
        <form
          action=""
          onSubmit={(e) => handleSubmit(e)}
          onKeyDown={(e) => {
            if (e.code === "Enter") {
              handleSubmit(e);
            }
          }}
        >
          <div className={s.form_inner}>
            <div className={s.textarea}>
              <textarea
                name="new_comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </div>
            <div className={s.button}>
              <button type="submit"><img src={arrowImg} alt="arrowImg" /></button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
