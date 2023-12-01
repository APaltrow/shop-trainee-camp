import { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, NavigationPaths } from '@constants';
import { CustomButton } from '@components';

import style from './CartEmpty.module.scss';

export const CartEmpty: FC = () => {
  return (
    <article className={style.empty_cart}>
      <h3>Your cart is empty !</h3>
      <p>Looks like you have not ordered anyting yet...</p>
      <NavLink to={`../${NavigationPaths.ALL_PRODUCTS}`}>
        <CustomButton
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
          onClick={() => {}}
        >
          Go shopping !
        </CustomButton>
      </NavLink>
    </article>
  );
};
