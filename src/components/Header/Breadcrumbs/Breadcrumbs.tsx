import { FC } from 'react';
import { useLocation, NavLink, useParams } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { NavigationPaths, PATHS_TO_BREADCRUMBS } from '@constants';

import style from './Breadcrumbs.module.scss';

const NOT_FOUND = 'Not found';

export const Breadcrumbs: FC = () => {
  const productsList = useAppSelector((state) => state.products.productsList);
  const { pathname } = useLocation();
  const { id } = useParams();

  const paths = pathname.split('/').filter((path) => !!path);

  const productTitle = productsList.find(({ productId }) => productId === id)
    ?.productTitle;

  const getBreadcrumb = (path: string) => {
    const breadcrumb = PATHS_TO_BREADCRUMBS[path as NavigationPaths];

    return breadcrumb || productTitle || NOT_FOUND;
  };

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
            const isActive = path === paths.at(-1);

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
