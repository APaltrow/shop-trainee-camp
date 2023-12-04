import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { DEFAULT_RATING_COUNT, RATING_NAME } from '@constants';
import { generateArray } from '@helpers';
import { Checkbox, Rating } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './SidebarRating.module.scss';

export const SidebarRating: FC = () => {
  const ratingsList = generateArray(DEFAULT_RATING_COUNT, RATING_NAME);
  const { activeRatings } = useAppSelector((state) => state.productsFilter);

  const { setActiveRatings } = useActions();

  const handleRatingSelect = (rating: number, isSelected: boolean) => {
    const updatedRatingsList = isSelected
      ? [...activeRatings, rating]
      : activeRatings.filter((activeRating) => activeRating !== rating);

    setActiveRatings(updatedRatingsList);
  };

  const checkIfRatingSelected = (ratingValue: number) => {
    return activeRatings.includes(ratingValue);
  };

  return (
    <SidebarBlock title="Rating">
      <ul className={style.list}>
        {ratingsList.map((ratingitem, idx) => {
          const ratingValue = ratingsList.length - idx;

          return (
            <li key={`${ratingitem}_${ratingValue}`}>
              <Checkbox
                isChecked={checkIfRatingSelected(ratingValue)}
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
