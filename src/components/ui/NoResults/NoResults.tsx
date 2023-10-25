import { FC } from 'react';
import { useAppSelector } from '@redux';

import style from './NoResults.module.scss';

export const NoResults: FC = () => {
  const { searchValue } = useAppSelector((state) => state.productsFilter);

  return (
    <article className={style.container}>
      <h3>No Results Found</h3>
      <p>
        Could not find a match for
        <span className={style.search_text}>{` '${searchValue}'`}</span>
      </p>
    </article>
  );
};
