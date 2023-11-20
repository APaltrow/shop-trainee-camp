import { FC, useState } from 'react';

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
  const [imgList, setImgList] = useState(imgs);

  const onImgClick = (imgIndex: number) => {
    if (!imgIndex) return;

    setImgList((prevList) => {
      const [firstImg, ...restImgs] = prevList;
      const newFirstImg = prevList[imgIndex];

      const newList = [newFirstImg, ...restImgs];

      newList[imgIndex] = firstImg;

      return newList;
    });
  };

  return (
    <div className={style.container}>
      {imgList.map((imgUrl, idx) => (
        <div
          onClick={() => onImgClick(idx)}
          key={`img_${idx + ARRAY_INDEX_DIFF}`}
          data-imgs={`${idx}`}
          className={style.item}
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
