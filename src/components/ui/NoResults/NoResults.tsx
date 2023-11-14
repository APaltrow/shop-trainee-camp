import { FC } from 'react';
import { useAppSelector } from '@redux';

import style from './NoResults.module.scss';

export const NoResults: FC = () => {
  const { searchValue } = useAppSelector((state) => state.productsFilter);

  return (
    <article className={style.container}>
      <h3 className={style.title}>No Results Found</h3>
      <p>
        Could not find a match
        {!!searchValue && (
          <span className={style.search_text}>{` for '${searchValue}'`}</span>
        )}
      </p>
    </article>
  );
};
