import { FC } from 'react';

import { CartOrdersItem } from './CartOrdersItem';

import style from './CartOrders.module.scss';

export const CartOrders: FC = () => {
  return (
    <ul className={style.list}>
      {[...new Array(10)].map((_, idx) => (
        <li key={idx}>
          <CartOrdersItem />
        </li>
      ))}
    </ul>
  );
};
