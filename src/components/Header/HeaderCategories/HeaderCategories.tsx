import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { NAV_LINKS } from '@constants';

import style from './HeaderCategories.module.scss';

export const HeaderCategories: FC = () => {
  return (
    <nav className={style.navbar}>
      {NAV_LINKS.map(({ text, path }) => (
        <NavLink
          key={`categories_link_${text}`}
          to={path}
        >
          {text}
        </NavLink>
      ))}
    </nav>
  );
};
