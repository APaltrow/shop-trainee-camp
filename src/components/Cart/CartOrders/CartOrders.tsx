import { FC } from 'react';

import { useAppSelector } from '@redux';
import { ZERO_INDEX } from '@constants';

import { CartEmpty } from '../CartEmpty';

import { CartOrdersItem } from './CartOrdersItem';
import { CartOrdersSkeleton } from './CartOrdersSkeleton';

import style from './CartOrders.module.scss';

export const CartOrders: FC = () => {
  const { orders } = useAppSelector((state) => state.cart);
  const products = useAppSelector((state) => state.products.productsList);

  if (!orders.length) {
    return <CartEmpty />;
  }

  if (!products.length) {
    return <CartOrdersSkeleton />;
  }

  const getProductById = (id: string) => {
    return (
      products.find(({ productId }) => productId === id) || products[ZERO_INDEX]
    );
  };

  return (
    <ul className={style.list}>
      {orders.map((cartItem) => (
        <li key={cartItem.lotId}>
          <CartOrdersItem
            cartItem={cartItem}
            product={getProductById(cartItem.productId)}
          />
        </li>
      ))}
    </ul>
  );
};
