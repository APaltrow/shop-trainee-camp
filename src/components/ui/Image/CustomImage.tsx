import { FC } from 'react';

import { useImage } from '@hooks';

import style from './CustomImage.module.scss';

interface ImageProps {
  src: string;
  alt: string;
  fullSize?: boolean;
}

export const CustomImage: FC<ImageProps> = ({ src, alt, fullSize = false }) => {
  const { imageSrc, isLoading } = useImage(src);

  const imgClasses = `${style.container} 
  ${fullSize ? style.fullSize : style.fixed} 
  ${isLoading ? style.loading : style.loaded}`;

  return (
    <div className={imgClasses}>
      <img
        className={style.img}
        src={imageSrc}
        alt={alt}
      />
    </div>
  );
};
