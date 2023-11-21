import { FC } from 'react';

import style from '../ProductContainer/Product.module.scss';

import infoStyle from '../ProductInfo/ProductInfo.module.scss';

import toolbarStyle from '../ProductToolbar/ProductToolbar.module.scss';

import galleryStyle from '../ProductGallery/ProductGallery.module.scss';

import { TabsSkeleton } from './TabsSkeleton';
import skeletonStyle from './ProductSkeleton.module.scss';

export const ProductSkeleton: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.left_section}>
          <div className={skeletonStyle.tooltip_container}>
            <div className={skeletonStyle.tooltip} />
            <div className={skeletonStyle.tooltip} />
          </div>

          <div className={galleryStyle.container}>
            <div
              data-imgs="0"
              className={skeletonStyle.skeleton}
            />
            <div
              data-imgs="1"
              className={skeletonStyle.skeleton}
            />
            <div
              data-imgs="2"
              className={skeletonStyle.skeleton}
            />
          </div>
        </div>

        <div className={style.right_section}>
          <article className={style.info_wrapper}>
            <div className={style.info_header}>
              <div
                className={`${skeletonStyle.title} ${skeletonStyle.skeleton}`}
              />

              <div className={style.reviews}>
                <div className={skeletonStyle.stars}>
                  <div className={skeletonStyle.star} />
                  <div className={skeletonStyle.star} />
                  <div className={skeletonStyle.star} />
                  <div className={skeletonStyle.star} />
                  <div className={skeletonStyle.star} />
                </div>

                <div
                  className={`${skeletonStyle.review} ${skeletonStyle.skeleton}`}
                />
              </div>
            </div>

            <p
              className={`${skeletonStyle.description} ${skeletonStyle.skeleton}`}
            />

            <div className={style.additional_info}>
              <div className={infoStyle.list}>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
              </div>

              <div className={infoStyle.list}>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
                <div className={infoStyle.item}>
                  <div
                    className={`${infoStyle.title} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                  <div
                    className={`${infoStyle.text} ${skeletonStyle.skeleton} ${skeletonStyle.item}`}
                  />
                </div>
              </div>
            </div>

            <div className={toolbarStyle.container}>
              <div
                className={toolbarStyle.toolbar}
                style={{ border: 'none' }}
              >
                <div className={toolbarStyle.prices}>
                  <div
                    className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`}
                    style={{ marginBottom: '5px' }}
                  />
                  <div
                    className={`${skeletonStyle.item} ${skeletonStyle.skeleton}`}
                  />
                </div>

                <div className={skeletonStyle.select} />
                <div className={skeletonStyle.select} />
              </div>
            </div>
          </article>

          <TabsSkeleton />
        </div>
      </div>
    </div>
  );
};
