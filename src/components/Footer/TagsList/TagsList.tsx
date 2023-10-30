import { FC } from 'react';

import style from './TagsList.module.scss';

const DEFAULT_COUNT = 10;
const DEFAULT_NAME = 'Tag';

export const TagsList: FC = () => {
  const tagsList = new Array(DEFAULT_COUNT).fill(DEFAULT_NAME);
  return (
    <section className={style.container}>
      <h4>Product tags</h4>
      <ul className={style.list}>
        {tagsList.map((tag, idx) => {
          const tagString = `${tag}_#${idx + 1}`;
          return (
            <li
              key={tagString}
              className={style.item}
            >
              {tagString}
            </li>
          );
        })}
      </ul>
    </section>
  );
};
