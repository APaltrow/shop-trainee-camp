import { FC } from 'react';

import style from './WishlistPage.module.scss';

export const WishlistPage: FC = () => {
  return (
    <div className={style.container}>
      <article className={style.header}>
        <h1 className={style.title}>Wish list</h1>
        <p className={style.text}>Here are products you like</p>
      </article>
      {/* LIST HERE */}
    </div>
  );
};
