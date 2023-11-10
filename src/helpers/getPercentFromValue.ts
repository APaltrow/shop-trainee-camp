import { ONE_HUNDRED_PERCENT } from '@constants';

export const getPercentFromValue = (amount: number, totalAmount: number) => {
  return Math.floor((amount / totalAmount) * ONE_HUNDRED_PERCENT);
};
