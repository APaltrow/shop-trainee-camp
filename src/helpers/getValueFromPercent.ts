import { ONE_HUNDRED_PERCENT, PRICE_DECIMALS } from '@constants';

export const getValueFromPercent = (amount: number, percent: number) => {
  return +((amount / ONE_HUNDRED_PERCENT) * percent).toFixed(PRICE_DECIMALS);
};
