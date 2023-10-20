import { FC } from 'react';
import { useLocation, NavLink } from 'react-router-dom';

import { NavigationPaths, PATHS_TO_BREADCRUMBS } from '@constants';

import style from './Breadcrumbs.module.scss';

const PRODUCT_NAME = 'Carrots from Tomissy Farm';

export const Breadcrumbs: FC = () => {
  const { pathname } = useLocation();

  const paths = pathname.split('/').filter((path) => !!path);

  return (
    <nav className={style.breadcrumbs}>
      <NavLink
        to={NavigationPaths.HOME}
        className={!paths.length ? style.active : style.not_active}
      >
        Homepage
      </NavLink>
      {paths.length
        ? paths.map((path) => {
            const breadcrumb =
              PATHS_TO_BREADCRUMBS[path as NavigationPaths] || PRODUCT_NAME;
            const isActive = path === paths[paths.length - 1];

            return (
              <NavLink
                to={path}
                key={`breadcrumbs_link_${path}`}
                className={isActive ? style.active : style.not_active}
              >
                {breadcrumb}
              </NavLink>
            );
          })
        : null}
    </nav>
  );
};
