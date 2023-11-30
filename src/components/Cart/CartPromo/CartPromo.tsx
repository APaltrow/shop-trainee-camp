import { FC } from 'react';

import { CustomButton, CustomInput } from '@components';

import style from './CartPromo.module.scss';

export const CartPromo: FC = () => {
  return (
    <div className={style.container}>
      <CustomInput placeholder="Apply promo code" />

      <span className={style.btn}>
        <CustomButton onClick={() => {}}>Apply now</CustomButton>
      </span>
    </div>
  );
};
