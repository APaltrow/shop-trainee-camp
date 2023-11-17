import { FC } from 'react';

import { ARRAY_INDEX_DIFF, DEFAULT_ALT } from '@constants';
import { Image } from '@components';

import style from './ProductGallery.module.scss';

interface ProductGalleryProps {
  imgs: string[];
  alt: string;
}

export const ProductGallery: FC<ProductGalleryProps> = ({
  imgs,
  alt = DEFAULT_ALT,
}) => {
  return (
    <div className={style.container}>
      {imgs.map((imgUrl, idx) => (
        <div
          data-imgs={`${idx}`}
          key={`img_${idx + ARRAY_INDEX_DIFF}`}
        >
          <Image
            src={imgUrl}
            alt={alt}
            fullSize
          />
        </div>
      ))}
    </div>
  );
};
