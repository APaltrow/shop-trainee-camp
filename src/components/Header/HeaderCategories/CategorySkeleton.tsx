import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  CATEGORY_SKELETON_NAME,
  DEFAULT_SKELETONS_COUNT,
} from '@constants';
import { generateArray } from '@helpers';

import style from './HeaderCategories.module.scss';

export const CategorySkeleton: FC = () => {
  const skeletons = generateArray(
    DEFAULT_SKELETONS_COUNT,
    CATEGORY_SKELETON_NAME,
  );

  return (
    <ul className={style.navbar}>
      {skeletons.map((skel, idx) => {
        return (
          <li
            className={style.skeleton}
            key={`${skel}_${idx + ARRAY_INDEX_DIFF}`}
          />
        );
      })}
    </ul>
  );
};
