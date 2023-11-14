import { RoutesPaths } from '@constants';
import {
  HomePage,
  ProductsPage,
  NotFoundPage,
  CartPage,
  ProductPage,
} from '@pages';

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
    element: <ProductPage />,
  },
  {
    path: RoutesPaths.CART,
    element: <CartPage />,
  },
  {
    path: RoutesPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
