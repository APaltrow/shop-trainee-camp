import { FC } from 'react';

import { useAppSelector } from '@redux';
import { InfoTooltip, Error } from '@components';

import { ProductsList } from '../ProductsList';

import style from './Products.module.scss';

export const Products: FC = () => {
  const { productsList, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div>
      <div className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={`${productsList.length}`} />
          <span>Products</span>
        </div>
      </div>

      <ProductsList
        productsList={productsList}
        isLoading={isLoading}
      />

      <div className={style.footer}>
        <div className={style.totals}>
          <InfoTooltip info={productsList.length} />
          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
