import { RoutesPaths } from '@constants';
import {
  HomePage,
  ProductsPage,
  NotFoundPage,
  CartPage,
  ProductPage,
  WishlistPage,
  LoginPage,
  ProfilePage,
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
    path: RoutesPaths.WISHLIST,
    element: <WishlistPage />,
  },
  {
    path: RoutesPaths.LOGIN,
    element: <LoginPage />,
  },
  {
    path: RoutesPaths.PROFILE,
    element: <ProfilePage />,
  },
  {
    path: RoutesPaths.NOT_FOUND,
    element: <NotFoundPage />,
  },
];
