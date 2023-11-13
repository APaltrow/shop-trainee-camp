import { IPrice } from '@types';

export const getActualProductPrice = (price: IPrice) => {
  const { discount, discountedAmount, amount } = price;

  return discount ? discountedAmount : amount;
};
