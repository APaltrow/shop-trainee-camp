import { FC } from 'react';

import { ARRAY_INDEX_DIFF, SkeletonCounts, SkeletonNames } from '@constants';
import { generateArray } from '@helpers';

import containerStyle from '../SidebarBlock/SidebarBlock.module.scss';

import style from './SidebarSkeleton.module.scss';

export const SidebarSkeleton: FC = () => {
  const skeletonsList = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.SIDEBAR,
  );

  return (
    <ul className={containerStyle.container}>
      {skeletonsList.map((skeleton, idx) => (
        <li
          className={style.item}
          key={`${skeleton}_${idx + ARRAY_INDEX_DIFF}`}
        />
      ))}
    </ul>
  );
};
