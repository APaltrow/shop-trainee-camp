import { FC } from 'react';
import { useAppSelector } from '@redux';

import { CartEmpty } from '../CartEmpty';

import { CartOrdersItem } from './CartOrdersItem';

import style from './CartOrders.module.scss';

export const CartOrders: FC = () => {
  const { orders } = useAppSelector((state) => state.cart);

  if (!orders.length) {
    return <CartEmpty />;
  }

  return (
    <ul className={style.list}>
      {orders.map((cartItem) => (
        <li key={cartItem.lotId}>
          <CartOrdersItem cartItem={cartItem} />
        </li>
      ))}
    </ul>
  );
};
