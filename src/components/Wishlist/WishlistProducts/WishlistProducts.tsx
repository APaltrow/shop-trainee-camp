import { FC } from 'react';

import { IProduct } from '@types';
import { ProductsItem } from '@components';

import { EmptyWishlist } from '../EmptyWishlist';

import style from './WishlistProducts.module.scss';

interface WishlistProductsProps {
  list: IProduct[];
}

export const WishlistProducts: FC<WishlistProductsProps> = ({ list }) => {
  if (!list.length) return <EmptyWishlist />;

  return (
    <ul className={style.wishlist_container}>
      {list.map((product) => (
        <li key={product.productId}>
          <ProductsItem product={product} />
        </li>
      ))}
    </ul>
  );
};
