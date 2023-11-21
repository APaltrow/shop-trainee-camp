import { FC } from 'react';

import style from './Image.module.scss';

interface ImageProps {
  src: string;
  alt: string;
  fullSize?: boolean;
}

export const Image: FC<ImageProps> = ({ src, alt, fullSize = false }) => {
  return (
    <div
      className={`${style.container} ${
        fullSize ? style.fullSize : style.fixed
      }`}
    >
      <img
        className={style.img}
        src={src}
        alt={alt}
      />
    </div>
  );
};
