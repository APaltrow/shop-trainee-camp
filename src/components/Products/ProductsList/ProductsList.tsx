import { FC } from 'react';

import { IProduct } from '@types';
import { NoResults } from '@components';

import { ProductsItem } from '../ProductsItem';
import { ProductsSkeleton } from '../Skeleton';

import style from './ProductsList.module.scss';

interface ProductsListProps {
  productsList: IProduct[];
  isLoading: boolean;
}

export const ProductsList: FC<ProductsListProps> = ({
  productsList,
  isLoading,
}) => {
  //isLoading
  if (true) {
    return <ProductsSkeleton />;
  }

  if (!productsList.length) {
    return <NoResults />;
  }

  return (
    <section className={style.container}>
      <ul className={style.list}>
        {productsList.map((product) => (
          <li key={product.productId}>
            <ProductsItem product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
};
