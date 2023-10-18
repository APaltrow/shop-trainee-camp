export enum NavigationPaths {
  HOME = '',
  ALL_PRODUCTS = 'all-products',
  PRODUCT = 'product',
  CART = 'cart',
}

export const NAV_LINKS = [
  { text: 'Home', path: '' },
  { text: 'All products', path: NavigationPaths.ALL_PRODUCTS },
  { text: 'Single product', path: `${NavigationPaths.PRODUCT}/1` },
  { text: 'Cart', path: NavigationPaths.CART },
];
