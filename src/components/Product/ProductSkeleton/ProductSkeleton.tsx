import { FC } from 'react';

import { generateArray } from '@helpers';
import { ARRAY_INDEX_DIFF, SkeletonCounts, SkeletonNames } from '@constants';
import { ImageSkeleton, RatingSkeleton } from '@components';

import style from '../ProductContainer/Product.module.scss';

import infoStyle from '../ProductInfo/ProductInfo.module.scss';

import toolbarStyle from '../ProductToolbar/ProductToolbar.module.scss';

import galleryStyle from '../ProductGallery/ProductGallery.module.scss';

import { TabsSkeleton } from './TabsSkeleton';
import { SuggestionsSkeleton } from './SuggestionsSkeleton';

import skeletonStyle from './ProductSkeleton.module.scss';

export const ProductSkeleton: FC = () => {
  const descriptionSkeletons = generateArray(
    SkeletonCounts.DESCRIPTION,
    SkeletonNames.DESCRIPTION,
  );

  const imgSkeletons = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.IMGS,
  );

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.left_section}>
          <div className={skeletonStyle.tooltip_container}>
            <div className={skeletonStyle.tooltip} />
            <div className={skeletonStyle.tooltip} />
          </div>

          <ul className={galleryStyle.container}>
            {imgSkeletons.map((item, idx) => (
              <li
                key={`${item}_${idx + ARRAY_INDEX_DIFF}`}
                data-imgs={`${idx}`}
                className={skeletonStyle.skeleton}
              >
                <ImageSkeleton />
              </li>
            ))}
          </ul>
        </div>

        <div className={style.right_section}>
          <article className={style.info_wrapper}>
            <div className={style.info_header}>
              <div className={skeletonStyle.title} />

              <div className={style.reviews}>
                <RatingSkeleton />

                <div className={skeletonStyle.review} />
              </div>
            </div>

            <p className={skeletonStyle.description} />

            <div className={style.additional_info}>
              <ul className={infoStyle.list}>
                {descriptionSkeletons.map((item, idx) => (
                  <li
                    className={infoStyle.item}
                    key={`${item}_${idx + ARRAY_INDEX_DIFF}`}
                  >
                    <div
                      className={`${infoStyle.title} ${skeletonStyle.item}`}
                    />
                    <div
                      className={`${infoStyle.text} ${skeletonStyle.item}`}
                    />
                  </li>
                ))}
              </ul>
            </div>

            <div className={toolbarStyle.container}>
              <div
                className={`${toolbarStyle.toolbar} ${skeletonStyle.no_border}`}
              >
                <div className={toolbarStyle.prices}>
                  <div
                    className={`${skeletonStyle.item} ${skeletonStyle.with_margin}`}
                  />
                  <div className={`${skeletonStyle.item}`} />
                </div>

                <div className={skeletonStyle.select} />
                <div className={skeletonStyle.select} />
              </div>
            </div>
          </article>

          <TabsSkeleton />
        </div>
      </div>
      <SuggestionsSkeleton />
    </div>
  );
};
