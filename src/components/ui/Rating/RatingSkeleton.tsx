import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  DEFAULT_RATING_COUNT,
  IconsTypes,
  STAR_NAME,
} from '@constants';
import { generateArray } from '@helpers';
import { Icon } from '@components';

import style from './Rating.module.scss';

export const RatingSkeleton: FC = () => {
  const ratingList = generateArray(DEFAULT_RATING_COUNT, STAR_NAME);

  return (
    <ul className={style.container}>
      {ratingList.map((item, idx) => (
        <li
          key={`${item} ${idx + ARRAY_INDEX_DIFF}`}
          className={style.skeleton_item}
        >
          <Icon iconName={IconsTypes.STAR} />
        </li>
      ))}
    </ul>
  );
};
