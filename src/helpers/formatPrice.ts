import { ARRAY_INDEX_DIFF } from '@constants';

const priceFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatPrice = (price: number, currency: string) => {
  const priceStr = priceFormatter
    .format(price)
    .slice(ARRAY_INDEX_DIFF, Infinity);

  return `${priceStr} ${currency}`;
};
