import { FC } from 'react';

import { generateArray } from '@helpers';
import { ARRAY_INDEX_DIFF, SkeletonCounts, SkeletonNames } from '@constants';

import suggestionsStyle from '../ProductSuggestions/ProductSuggestions.module.scss';

import skeletonStyle from './ProductSkeleton.module.scss';

export const SuggestionsSkeleton: FC = () => {
  const suggestionsSkeletons = generateArray(
    SkeletonCounts.DEFAULT,
    SkeletonNames.SUGGESTIONS,
  );

  return (
    <div className={suggestionsStyle.container}>
      <div className={skeletonStyle.item} />

      <ul className={skeletonStyle.suggestions_container}>
        {suggestionsSkeletons.map((item, idx) => (
          <li
            className={skeletonStyle.suggestions_item}
            key={`${item}_${idx + ARRAY_INDEX_DIFF}`}
          >
            <div className={skeletonStyle.suggestions_img} />
            <div className={skeletonStyle.text}>
              <div className={skeletonStyle.item} />
              <div className={skeletonStyle.item} />
            </div>

            <div className={skeletonStyle.prices}>
              <div className={skeletonStyle.text}>
                <div className={skeletonStyle.price} />
                <div className={skeletonStyle.price} />
              </div>

              <div className={skeletonStyle.btn} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
