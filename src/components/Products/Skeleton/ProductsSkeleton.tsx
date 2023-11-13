import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  PRODUCT_SKELETONS_COUNT,
  PRODUCT_SKELETON_NAME,
} from '@constants';
import { generateArray } from '@helpers';

import listStyle from '../ProductsList/ProductsList.module.scss';
import styleimg from '../../ui/Image/Image.module.scss';
import style from '../ProductsItem/ProductsItem.module.scss';

import skeletonStyle from './ProductsSkeleton.module.scss';

export const ProductsSkeleton: FC = () => {
  const skeletons = generateArray(
    PRODUCT_SKELETONS_COUNT,
    PRODUCT_SKELETON_NAME,
  );

  return (
    <div className={listStyle.container}>
      <ul className={listStyle.list}>
        {skeletons.map((element, idx) => (
          <li key={`${element}_${idx + ARRAY_INDEX_DIFF} `}>
            <div className={style.container}>
              <div
                className={`${styleimg.img_container} ${skeletonStyle.skeleton}`}
              />

              <div className={style.content}>
                <div className={style.info}>
                  <div className={style.description}>
                    <p
                      className={`${skeletonStyle.skeleton_title} ${skeletonStyle.skeleton}`}
                    />
                  </div>
                  <div className={style.additional_info_container}>
                    <ul className={style.additional_info}>
                      <p
                        className={`${skeletonStyle.skeleton_item} ${skeletonStyle.skeleton}`}
                      />
                      <p
                        className={`${skeletonStyle.skeleton_item} ${skeletonStyle.skeleton}`}
                      />
                      <p
                        className={`${skeletonStyle.skeleton_item} ${skeletonStyle.skeleton}`}
                      />
                      <p
                        className={`${skeletonStyle.skeleton_item} ${skeletonStyle.skeleton}`}
                      />
                    </ul>
                  </div>
                </div>

                <div className={style.price_and_delivery_container}>
                  <div className={style.price}>
                    <p
                      className={`${skeletonStyle.skeleton_button} ${skeletonStyle.skeleton}`}
                    />
                  </div>

                  <div className={style.delivery_info}>
                    <p
                      className={`${skeletonStyle.skeleton_item} ${skeletonStyle.skeleton}`}
                    />
                  </div>
                  <div className={style.buttons}>
                    <p
                      className={`${skeletonStyle.skeleton_button} ${skeletonStyle.skeleton}`}
                    />
                    <p
                      className={`${skeletonStyle.skeleton_button} ${skeletonStyle.skeleton}`}
                    />
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
