import { FC } from 'react';

import { useAppSelector } from '@redux';
import { ProductsSkeleton } from '@components';

import { WishlistProducts } from '../WishlistProducts';

import style from './Wishlist.module.scss';

export const Wishlist: FC = () => {
  const { productsList, isLoading } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const wishlistedProducts = productsList.filter(({ productId }) =>
    wishlist.includes(productId),
  );

  return (
    <div className={style.container}>
      <article className={style.header}>
        <h1 className={style.title}>Wish list</h1>
        <p className={style.text}>Here are products you like</p>
      </article>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <WishlistProducts list={wishlistedProducts} />
      )}
    </div>
  );
};
