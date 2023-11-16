import { FC } from 'react';

import { Image } from '@components';

import style from './ProductGallery.module.scss';

interface ProductGalleryProps {
  imgs: string[];
  alt: string;
}

const DEFAULT_ALT = 'Product image';

export const ProductGallery: FC<ProductGalleryProps> = ({
  imgs,
  alt = DEFAULT_ALT,
}) => {
  const [firstImg, secondImg, thirdImg] = imgs;

  return (
    <div className={style.container}>
      <div className={style.main_picture}>
        <Image
          src={firstImg}
          alt={alt}
          fullSize
        />
      </div>
      <div className={style.sub_container}>
        <div className={style.picture_secondary}>
          <Image
            src={secondImg}
            alt={alt}
            fullSize
          />
        </div>
        <div className={style.picture_secondary}>
          <Image
            src={thirdImg}
            alt={alt}
            fullSize
          />
        </div>
      </div>
    </div>
  );
};
