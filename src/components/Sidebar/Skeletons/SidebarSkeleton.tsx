import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  DEFAULT_SKELETONS_COUNT,
  SIDEBAR_SKELETON_NAME,
} from '@constants';
import { generateArray } from '@helpers';

import containerStyle from '../SidebarBlock/SidebarBlock.module.scss';

import style from './SidebarSkeleton.module.scss';

export const SidebarSkeleton: FC = () => {
  const skeletonsList = generateArray(
    DEFAULT_SKELETONS_COUNT,
    SIDEBAR_SKELETON_NAME,
  );

  return (
    <ul className={containerStyle.container}>
      {skeletonsList.map((skeleton, idx) => (
        <li
          key={`${skeleton}_${idx + ARRAY_INDEX_DIFF}`}
          className={style.item}
        />
      ))}
    </ul>
  );
};
