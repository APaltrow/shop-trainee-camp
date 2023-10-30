import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { NavigationPaths, ButtonSizes, ButtonVariants } from '@constants';
import { CustomButton } from '@components';

import style from './HomePage.module.scss';

export const HomePage: FC = () => {
  return (
    <section className={style.container}>
      <article className={style.content}>
        <h1 className={style.title}>
          Welcome to <span className={style.logo}>Freshnesecom</span> !
        </h1>

        <p>Try the taste of shopping with pleasure !</p>

        <NavLink
          to={NavigationPaths.ALL_PRODUCTS}
          className={style.cta}
        >
          <CustomButton
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
            onClick={() => {}}
          >
            Start shopping
          </CustomButton>
        </NavLink>
      </article>
    </section>
  );
};
