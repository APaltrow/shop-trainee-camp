import { FC } from 'react';

import { generateArray } from '@helpers';
import { ARRAY_INDEX_DIFF, SkeletonCounts, SkeletonNames } from '@constants';

import tabsStyle from '../../ui/Tabs/Tabs.module.scss';

import skeletonStyle from './ProductSkeleton.module.scss';

export const TabsSkeleton: FC = () => {
  const tabsSkeleton = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.TABS,
  );

  return (
    <div className={tabsStyle.container}>
      <div className={tabsStyle.tabs}>
        <ul className={`${tabsStyle.tabs_list} ${skeletonStyle.with_padding}`}>
          {tabsSkeleton.map((item, idx) => (
            <li
              className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`}
              key={`${item}_${idx + ARRAY_INDEX_DIFF}`}
            />
          ))}
        </ul>
      </div>

      <div>
        <div
          className={`${skeletonStyle.item} ${skeletonStyle.skeleton} ${skeletonStyle.with_margin_bottom}`}
        />
        <div
          className={`${skeletonStyle.description} ${skeletonStyle.skeleton}`}
        />
      </div>
      <div>
        <div
          className={`${skeletonStyle.item} ${skeletonStyle.skeleton} ${skeletonStyle.with_margin_bottom}`}
        />
        <div
          className={`${skeletonStyle.description} ${skeletonStyle.skeleton}`}
        />
      </div>
    </div>
  );
};
