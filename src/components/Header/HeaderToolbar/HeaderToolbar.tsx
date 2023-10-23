import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IconsTypes, NavigationPaths } from '@constants';
import { BinarySection, CustomSelect, Icon, Search } from '@components';
import logo from '@assets/Freshnesecom.svg';

import style from './HeaderToolbar.module.scss';

export const HeaderToolbar: FC = () => {
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
              options={['electronics', 'food', 'clothes', 'toys', 'books']}
              onChange={(option) => {}}
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
