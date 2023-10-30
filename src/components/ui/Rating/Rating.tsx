import { FC } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Rating.module.scss';

interface RatingProps {
  rating: number;
}

const DEFAULT_RATING = 5;
const DEFAULT_STAR = 'rating_star';

export const Rating: FC<RatingProps> = ({ rating }) => {
  const ratingList = new Array(DEFAULT_RATING).fill(DEFAULT_STAR);

  return (
    <div className={style.container}>
      {ratingList.map((star, idx) => (
        <Icon
          key={`${star}_${idx + 1}_${Date.now()}`}
          iconName={idx + 1 <= rating ? IconsTypes.STAR : IconsTypes.STAR_EMPTY}
        />
      ))}
    </div>
  );
};
