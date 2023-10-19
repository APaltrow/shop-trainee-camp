export enum NavigationPaths {
  HOME = '',
  ALL_PRODUCTS = 'all-products',
  CART = 'cart',
}

export const PATHS_TO_BREADCRUMBS = {
  [NavigationPaths.HOME]: 'Homepage',
  [NavigationPaths.ALL_PRODUCTS]: 'All products',
  [NavigationPaths.CART]: 'Cart',
};

export const NAV_LINKS = [
  { text: 'All products', path: NavigationPaths.ALL_PRODUCTS },
  { text: 'Single product', path: `${NavigationPaths.ALL_PRODUCTS}/1` },
  { text: 'Some other category 1', path: `#` },
  { text: 'Some other category 2', path: `#` },
  { text: 'Some other category 3', path: `#` },
];

export const CONTACT_LINKS = [
  { link: '#', text: 'Chat with us', id: 'link_chat' },
  { link: 'tel:+420336775664', text: '+420 336 775 664', id: 'link_tel' },
  {
    link: 'mailto:info@freshnesecom.com',
    text: 'info@freshnesecom.com',
    id: 'link_mail',
  },
];

export const INFO_LINKS = [
  { link: '#', text: 'Blog', id: 'link_blog' },
  { link: '#', text: 'About Us', id: 'link_about' },
  { link: '#', text: 'Careers', id: 'link_careers' },
];

export const GET_IN_TOUCH_LINKS = [
  { link: '#', text: 'Blog', id: 'link_blog' },
  { link: '#', text: 'About Us', id: 'link_about' },
  { link: '#', text: 'Press releases', id: 'link_press_releases' },
  { link: '#', text: 'Careers', id: 'link_careers' },
];

export const CONNECTIONS_LINKS = [
  { link: '#', text: 'Facebook', id: 'link_facebook' },
  { link: '#', text: 'Twitter', id: 'link_twitter' },
  { link: '#', text: 'Instagram', id: 'link_instagram' },
  { link: '#', text: 'Youtube', id: 'link_youtube' },
  { link: '#', text: 'Linkedin', id: 'link_linkedin' },
];

export const EARNINGS_LINKS = [
  { link: '#', text: 'Become an Affiliate', id: 'link_affiliate' },
  { link: '#', text: 'Advertise your product', id: 'link_advertisement' },
  { link: '#', text: 'Sell on Market', id: 'link_sell' },
];

export const ACCOUNT_LINKS = [
  { link: '#', text: 'Your account', id: 'link_your_account' },
  { link: '#', text: 'Returns Centre', id: 'link_returns_center' },
  {
    link: '#',
    text: '100 % purchase protection',
    id: 'link_purchaise_protection',
  },
  { link: '#', text: 'Chat with us', id: 'link_chat_with_us' },
  { link: '#', text: 'Help', id: 'link_help' },
];

export const FOOTER_LINKS = [
  { title: 'Get in touch', links: GET_IN_TOUCH_LINKS },
  { title: 'Connections', links: CONNECTIONS_LINKS },
  { title: 'Earnings', links: EARNINGS_LINKS },
  { title: 'Account', links: ACCOUNT_LINKS },
];
