import { FC } from 'react';

import style from './CartTax.module.scss';

export const CartTax: FC = () => {
  return (
    <div className={style.sub_total}>
      <p className={style.item}>
        <span>Subtotal</span>
        <span>73.98 USD</span>
      </p>
      <p className={style.item}>
        <span>Tax</span>
        <span>17% 16.53 USD</span>
      </p>
    </div>
  );
};
