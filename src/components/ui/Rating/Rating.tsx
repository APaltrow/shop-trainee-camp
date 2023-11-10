import { FC } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Rating.module.scss';

interface RatingProps {
  rating: number;

  isActive?: boolean;
}

const DEFAULT_RATING = 5;
const DEFAULT_STAR = 'rating_star';

export const Rating: FC<RatingProps> = ({ rating, isActive }) => {
  const ratingList = new Array(DEFAULT_RATING).fill(DEFAULT_STAR);

  return (
    <span className={`${style.container} ${isActive ? style.active : ''}`}>
      {ratingList.map((star, idx) => (
        <Icon
          key={`${star}_${idx + 1}`}
          iconName={idx + 1 <= rating ? IconsTypes.STAR : IconsTypes.STAR_EMPTY}
        />
      ))}
    </span>
  );
};
