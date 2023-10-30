import { FC } from 'react';

import { IProduct } from '@types';

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
  if (isLoading) {
    return <ProductsSkeleton />;
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
