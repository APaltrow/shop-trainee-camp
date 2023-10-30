import { RoutesPaths } from '@constants';
import { HomePage, ProductsPage } from '@pages';

export const AppRoutes = [
  {
    path: RoutesPaths.MAIN,
    element: <HomePage />,
  },
  {
    path: RoutesPaths.ALL_PRODUCTS,
    element: <ProductsPage />,
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
