import { RoutesPaths } from '@constants';

export const AppRoutes = [
  {
    path: RoutesPaths.MAIN,
    element: <div>Home page</div>,
  },
  {
    path: RoutesPaths.ALL_PRODUCTS,
    element: <div>All products page</div>,
  },
  {
    path: RoutesPaths.PRODUCT,
    element: <div>Product page</div>,
  },
  {
    path: RoutesPaths.CART,
    element: <div>Cart page</div>,
  },
  {
    path: RoutesPaths.NOT_FOUND,
    element: <div>Not found: 404</div>,
  },
];
