import { FC } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

import { NAV_LINKS } from '@constants';

import style from '@style/App.module.scss';

export const App: FC = () => {
  const { pathname } = useLocation();
  const currentPath = pathname.split('/')[1];

  return (
    <div className={style.app}>
      <nav className={style.navbar}>
        {NAV_LINKS.map(({ text, path }) => (
          <NavLink
            key={`navlink_${text}`}
            to={path}
            className={
              currentPath && path.startsWith(currentPath) ? style.active : ''
            }
          >
            {text}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </div>
  );
};
