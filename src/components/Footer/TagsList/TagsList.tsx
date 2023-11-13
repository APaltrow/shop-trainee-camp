import { FC } from 'react';

import {
  ARRAY_INDEX_DIFF,
  DEFAULT_TAGS_COUNT,
  DEFAULT_TAG_NAME,
} from '@constants';
import { generateArray } from '@helpers';

import style from './TagsList.module.scss';

export const TagsList: FC = () => {
  const tagsList = generateArray(DEFAULT_TAGS_COUNT, DEFAULT_TAG_NAME);

  return (
    <section className={style.container}>
      <h4>Product tags</h4>
      <ul className={style.list}>
        {tagsList.map((tag, idx) => {
          const tagString = `${tag}_#${idx + ARRAY_INDEX_DIFF}`;

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
