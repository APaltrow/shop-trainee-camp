import { FC } from 'react';

import { ARRAY_INDEX_DIFF, SkeletonCounts, SkeletonNames } from '@constants';
import { generateArray } from '@helpers';
import { ImageSkeleton, RatingSkeleton } from '@components';

import style from './CartOrders.module.scss';

export const CartOrdersSkeleton: FC = () => {
  const skeletons = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.CART_ITEM,
  );
  return (
    <ul className={style.list}>
      {skeletons.map((skeleton, idx) => (
        <li
          key={`${skeleton}_${idx + ARRAY_INDEX_DIFF}`}
          className={style.container}
        >
          <div className={style.left}>
            <div className={style.img}>
              <ImageSkeleton />
            </div>
            <div className={style.btns}>
              <div className={style.button_skeleton} />
              <div className={style.button_skeleton} />
            </div>
          </div>

          <div className={style.right}>
            <div className={style.description}>
              <div className={style.title_skeleton} />

              <ul className={style.description_list}>
                <li className={style.description_item}>
                  <span className={style.desc_skeleton} />
                  <span className={style.desc_skeleton} />
                </li>
                <li className={style.description_item}>
                  <span className={style.desc_skeleton} />
                  <span className={style.desc_skeleton} />
                </li>
              </ul>

              <RatingSkeleton />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
