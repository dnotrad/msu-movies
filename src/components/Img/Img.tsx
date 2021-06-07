import React, { useState } from "react";

interface IProps {
  preloader: string;
  img: string;
}

const Img: React.FC<IProps> = ({ preloader, img }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  let bg = new Image();
  bg.src = img;
  bg.onload = () => {
    setIsLoaded(true);
  };

  return isLoaded ? <img src={img}></img> : <img src={preloader}></img>;
};

export default Img;
