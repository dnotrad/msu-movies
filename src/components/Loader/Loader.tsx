import React from "react";
import s from "./Loader.module.css";

let Loader: React.FC = () => {
  return (
    <div className={s.loader}>
      <div className={s.lds_ellipsis}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
