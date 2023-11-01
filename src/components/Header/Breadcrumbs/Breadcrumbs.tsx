import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { useBreadcrumbs } from '@hooks';
import { LAST_ELEMENT_INDEX, NavigationPaths } from '@constants';

import style from './Breadcrumbs.module.scss';

export const Breadcrumbs: FC = () => {
  const { paths, getBreadcrumb } = useBreadcrumbs();

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
            const breadcrumb = getBreadcrumb(path);
            const isActive = path === paths.at(LAST_ELEMENT_INDEX);

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
