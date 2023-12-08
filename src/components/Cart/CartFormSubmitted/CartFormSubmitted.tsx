import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, RoutesPaths } from '@constants';
import { CustomButton } from '@components';

import style from './CartFormSubmitted.module.scss';

export const CartFormSubmitted: FC = () => {
  const navPath = `../${RoutesPaths.ALL_PRODUCTS}`;

  return (
    <article className={style.container}>
      <h1>Thank you for your order!</h1>
      <p>
        Your order has been successfully submitted, one of our managers will get
        in touch with you shortly!
      </p>

      <NavLink to={navPath}>
        <CustomButton
          onClick={() => {}}
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
        >
          Go back to products
        </CustomButton>
      </NavLink>
    </article>
  );
};
