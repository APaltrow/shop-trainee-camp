import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { IconsTypes, NavigationPaths } from '@constants';
import { BinarySection, CustomSelect, Icon, Search } from '@components';
import logo from '@assets/Freshnesecom.svg';

import style from './HeaderToolbar.module.scss';

export const HeaderToolbar: FC = () => {
  const categories = useAppSelector((state) => state.products.categories);

  const categoriesList = categories ? Object.keys(categories) : [];

  return (
    <div className={style.container}>
      <NavLink
        className={style.logo}
        to={NavigationPaths.HOME}
      >
        <img
          src={logo}
          alt="Freshnesecom logo"
        />
      </NavLink>

      <div className={style.search_bar}>
        <BinarySection
          leftElement={
            <CustomSelect
              defaultValue="All categories"
              options={categoriesList}
              onChange={() => {}}
            />
          }
          rightElement={
            <Search
              placeholder="Search products..."
              onChange={() => {}}
            />
          }
        />
      </div>
      <div className={style.buttons}>
        <Icon iconName={IconsTypes.PROFILE} />

        <NavLink to={NavigationPaths.CART}>
          <Icon iconName={IconsTypes.CART} />
        </NavLink>
      </div>
    </div>
  );
};
