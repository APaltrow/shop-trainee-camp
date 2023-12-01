import { PRICE_DECIMALS, ONE_HUNDRED_PERCENT } from '@constants';
import { useAppSelector } from '@redux';
import { useState } from 'react';

const STATE_TAX_PERCENT = 17;
const INITIAL_SUB_TOTAL = 0;

export const useCartTotals = () => {
  const { orders } = useAppSelector((state) => state.cart);
  const [promoDiscountPercent, setPromoDiscountPercent] = useState<number>(0);

  const subTotal = orders.reduce((sum, orderItem) => {
    sum += orderItem.totalCost;

    return sum;
  }, INITIAL_SUB_TOTAL);

  const promoDiscountAmount = +(
    (subTotal / ONE_HUNDRED_PERCENT) *
    promoDiscountPercent
  ).toFixed(PRICE_DECIMALS);

  const subTotalWithPromoDiscount = subTotal - promoDiscountAmount;

  const taxAmount = +(
    (subTotalWithPromoDiscount / ONE_HUNDRED_PERCENT) *
    STATE_TAX_PERCENT
  ).toFixed(PRICE_DECIMALS);

  const totalAmount = subTotalWithPromoDiscount + taxAmount;

  const addPromoDiscount = (percent: number) => {
    setPromoDiscountPercent(percent);
  };

  return {
    subTotal,
    taxAmount,
    totalAmount,
    taxPercent: STATE_TAX_PERCENT,
    promoDiscountPercent,
    promoDiscountAmount,

    addPromoDiscount,
  };
};
