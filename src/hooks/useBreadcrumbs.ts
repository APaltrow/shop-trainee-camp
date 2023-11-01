import { useLocation, useParams } from 'react-router-dom';

import { useAppSelector } from '@redux';
import {
  ErrorsMessages,
  NavigationPaths,
  PATHS_TO_BREADCRUMBS,
} from '@constants';

export const useBreadcrumbs = () => {
  const productsList = useAppSelector((state) => state.products.productsList);
  const { pathname } = useLocation();
  const { id } = useParams();

  const paths = pathname.split('/').filter((path) => !!path);

  const productTitle = productsList.find(({ productId }) => productId === id)
    ?.productTitle;

  const getBreadcrumb = (path: string) => {
    const breadcrumb = PATHS_TO_BREADCRUMBS[path as NavigationPaths];

    return breadcrumb || productTitle || ErrorsMessages.NOT_FOUND;
  };

  return {
    paths,
    getBreadcrumb,
  };
};
