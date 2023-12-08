import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { ButtonSizes, ButtonVariants, NavigationPaths } from '@constants';
import { CustomButton } from '@components';

import style from './EmptyWishlist.module.scss';

export const EmptyWishlist: FC = () => {
  const navPath = `../${NavigationPaths.ALL_PRODUCTS}`;

  return (
    <article className={style.container}>
      <h3 className={style.title}>Your wish list is empty</h3>
      <p>Explore more and shortlist some items !</p>

      <NavLink to={navPath}>
        <CustomButton
          onClick={() => {}}
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
        >
          Start shopping !
        </CustomButton>
      </NavLink>
    </article>
  );
};
