import { FC } from 'react';

import style from './HeaderCategories.module.scss';

const DEFAULT_SKELETONS = 5;
const SKELETON_NAME = 'category_skeleton';

export const CategorySkeleton: FC = () => {
  const skeletons = new Array(DEFAULT_SKELETONS).fill(SKELETON_NAME);

  return (
    <ul className={style.navbar}>
      {skeletons.map((skel, idx) => {
        return (
          <li
            className={style.skeleton}
            key={`${skel}_${idx + 1}`}
          />
        );
      })}
    </ul>
  );
};
