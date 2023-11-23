import { FC } from 'react';

import tabsStyle from '../../ui/Tabs/Tabs.module.scss';

import skeletonStyle from './ProductSkeleton.module.scss';

export const TabsSkeleton: FC = () => {
  return (
    <div className={tabsStyle.container}>
      <div className={tabsStyle.tabs}>
        <div className={`${tabsStyle.tabs_list} ${skeletonStyle.with_padding}`}>
          <div className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`} />
          <div className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`} />
          <div className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`} />
        </div>
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
