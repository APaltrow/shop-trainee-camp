import { FC } from 'react';

import { PRODUCT_TAGS } from '@constants';

import style from './TagsList.module.scss';

export const TagsList: FC = () => {
  return (
    <section className={style.container}>
      <h4>Product tags</h4>
      <ul className={style.list}>
        {PRODUCT_TAGS.map((tag) => {
          return (
            <li
              key={tag}
              className={style.item}
            >
              {tag}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
