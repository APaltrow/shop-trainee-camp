import {
  MIN_GAP_PERCENT,
  ONE_HUNDRED_PERCENT,
  PRICE_DECIMALS,
  ZERO_GAP,
} from '@constants';

export const getPriceGap = (price: number) => {
  if (!price) return ZERO_GAP;

  const priceGap = (price / ONE_HUNDRED_PERCENT) * MIN_GAP_PERCENT;

  return +priceGap.toFixed(PRICE_DECIMALS);
};
