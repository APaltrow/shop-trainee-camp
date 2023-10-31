import { FC } from 'react';

import { Accordion, Checkbox, Rating } from '@components';

import style from './SidebarRating.module.scss';

interface SidebarRatingProps {}

export const SidebarRating: FC<SidebarRatingProps> = () => {
  const ratingsList = new Array(5).fill('rating');

  return (
    <Accordion title="Rating">
      <ul className={style.list}>
        {ratingsList.map((ratingitem, idx) => (
          <li key={`sidebar_rating_${ratingitem}_${idx + 1}`}>
            <Checkbox
              id={`sidebar_rating_checkbox_${idx + 1}`}
              isChecked={!!(idx % 2)}
              onChange={() => {}}
            />
            <Rating rating={ratingsList.length - idx} />
          </li>
        ))}
      </ul>
    </Accordion>
  );
};
