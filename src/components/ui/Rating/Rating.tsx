import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  DEFAULT_RATING_COUNT,
  STAR_NAME,
  IconsTypes,
} from '@constants';
import { generateArray } from '@helpers';
import { Icon } from '@components';

import style from './Rating.module.scss';

interface RatingProps {
  rating: number;

  isActive?: boolean;
}

export const Rating: FC<RatingProps> = ({ rating, isActive }) => {
  const ratingList = generateArray(DEFAULT_RATING_COUNT, STAR_NAME);

  return (
    <ul className={`${style.container} ${isActive ? style.active : ''}`}>
      {ratingList.map((star, idx) => {
        const starNumber = idx + ARRAY_INDEX_DIFF;
        const isFilledStar = starNumber <= rating;

        return (
          <li key={`${star}_${starNumber}`}>
            <Icon
              iconName={isFilledStar ? IconsTypes.STAR : IconsTypes.STAR_EMPTY}
            />
          </li>
        );
      })}
    </ul>
  );
};
