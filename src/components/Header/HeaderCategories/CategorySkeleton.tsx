import { FC } from 'react';

import { ARRAY_INDEX_DIFF, SkeletonNames, SkeletonCounts } from '@constants';
import { generateArray } from '@helpers';

import style from './HeaderCategories.module.scss';

export const CategorySkeleton: FC = () => {
  const skeletons = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.CATEGORY,
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
