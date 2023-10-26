import { FC } from 'react';

import { Checkbox, Rating } from '@components';

import style from './SidebarRating.module.scss';

interface SidebarRatingProps {}

export const SidebarRating: FC<SidebarRatingProps> = () => {
  const ratingsList = new Array(5).fill('rating');

  return (
    <section className={style.container}>
      <h4>Rating</h4>
      <ul className={style.list}>
        {ratingsList.map((ratingitem, idx) => (
          <li key={`sidebar_rating_${ratingitem}_${idx + 1}`}>
            <Checkbox isChecked={idx % 2} />
            <Rating rating={ratingsList.length - idx} />
          </li>
        ))}
      </ul>
    </section>
  );
};
