import { FC } from 'react';

import style from './Image.module.scss';

interface ImageProps {
  src: string;
  alt: string;
}

export const Image: FC<ImageProps> = ({ src, alt }) => {
  return (
    <div className={style.container}>
      <img
        className={style.img}
        src={src}
        alt={alt}
      />
    </div>
  );
};
