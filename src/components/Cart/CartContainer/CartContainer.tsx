import { FC } from 'react';

import { CartBillingForm } from '../CartBillingForm';

import style from './CartContainer.module.scss';

export const Cart: FC = () => {
  return (
    <div className={style.container}>
      <CartBillingForm />
      <section className={style.order}>
        <h2>Cart lots here</h2>
      </section>
    </div>
  );
};
