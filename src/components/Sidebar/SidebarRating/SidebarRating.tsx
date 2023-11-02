import { ChangeEvent, FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { Checkbox, Rating } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './SidebarRating.module.scss';

interface SidebarRatingProps {}

export const SidebarRating: FC<SidebarRatingProps> = () => {
  const ratingsList = new Array(5).fill('rating');
  const { activeRatings } = useAppSelector((state) => state.productsFilter);

  const { setActiveRatings } = useActions();

  const handleRatingSelect = (
    rating: number,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const isSelected = e.target.checked;

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
            <li key={`sidebar_rating_${ratingitem}_${ratingValue}`}>
              <Checkbox
                id={`sidebar_rating_checkbox_${ratingValue}`}
                isChecked={activeRatings.includes(ratingValue)}
                onChange={(e) => handleRatingSelect(ratingValue, e)}
              />
              <Rating rating={ratingValue} />
            </li>
          );
        })}
      </ul>
    </SidebarBlock>
  );
};
