import { FC } from 'react';

import containerStyle from '../SidebarBlock/SidebarBlock.module.scss';

import style from './SidebarSkeleton.module.scss';

const DEFAULT_SKELETONS = 3;
const SKELETON_NAME = 'sidebar_skeleton';

export const SidebarSkeleton: FC = () => {
  const skeletonsList = new Array(DEFAULT_SKELETONS).fill(SKELETON_NAME);

  return (
    <ul className={containerStyle.container}>
      {skeletonsList.map((skeleton, idx) => (
        <li
          key={`${skeleton}_${idx + 1}`}
          className={style.item}
        />
      ))}
    </ul>
  );
};
