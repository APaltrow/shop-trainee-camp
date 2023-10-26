import { FC } from 'react';

import { useAppSelector } from '@redux';
import { useProductsFilter } from '@hooks';
import { InfoTooltip, Error, Sidebar } from '@components';

import { ProductsList } from '../ProductsList';

import style from './Products.module.scss';

export const Products: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const { products, totalProducts, totalFilteredProducts } =
    useProductsFilter();

  if (error) {
    return <Error errorMessage={error} />;
  }

  return (
    <div>
      <div className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={totalFilteredProducts} />
          <span>Products</span>
        </div>
      </div>
      <div className={style.main}>
        <Sidebar />
        <ProductsList
          productsList={products}
          isLoading={isLoading}
        />
      </div>

      <div className={style.footer}>
        <div className={style.totals}>
          <InfoTooltip info={totalProducts} />
          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
