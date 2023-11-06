import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { Checkbox, Rating } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './SidebarRating.module.scss';

const DEFAULT_RATING = 5;
const RATING_NAME = 'rating';

export const SidebarRating: FC = () => {
  const ratingsList = new Array(DEFAULT_RATING).fill(RATING_NAME);
  const { activeRatings } = useAppSelector((state) => state.productsFilter);

  const { setActiveRatings } = useActions();

  const handleRatingSelect = (rating: number, isSelected: boolean) => {
    const updatedRatingsList = isSelected
      ? [...activeRatings, rating]
      : activeRatings.filter((activeRating) => activeRating !== rating);

    setActiveRatings(updatedRatingsList);
  };

  return (
    <SidebarBlock title="Rating">
      <ul className={style.list}>
        {ratingsList.map((ratingitem, idx) => {
          const ratingValue = ratingsList.length - idx;

          return (
            <li key={`${ratingitem}_${ratingValue}`}>
              <Checkbox
                id={`checkbox_${ratingValue}`}
                isChecked={activeRatings.includes(ratingValue)}
                onChange={(e) =>
                  handleRatingSelect(ratingValue, e.target.checked)
                }
              >
                <Rating
                  rating={ratingValue}
                  isActive
                />
              </Checkbox>
            </li>
          );
        })}
      </ul>
    </SidebarBlock>
  );
};
