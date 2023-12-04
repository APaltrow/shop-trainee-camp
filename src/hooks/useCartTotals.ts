import { useState } from 'react';

import { getValueFromPercent } from '@helpers';
import { useAppSelector } from '@redux';
import {
  DEFAULT_CURRENCY,
  INITIAL_ZERO,
  STATE_TAX_PERCENT,
  ZERO_INDEX,
} from '@constants';

export const useCartTotals = () => {
  const { orders } = useAppSelector((state) => state.cart);
  const [promoDiscountPercent, setPromoDiscountPercent] =
    useState<number>(INITIAL_ZERO);

  const subTotal = orders.reduce((sum, orderItem) => {
    sum += orderItem.totalCost;

    return sum;
  }, INITIAL_ZERO);

  const promoDiscountAmount = getValueFromPercent(
    subTotal,
    promoDiscountPercent,
  );

  const subTotalWithPromoDiscount = subTotal - promoDiscountAmount;

  const taxAmount = getValueFromPercent(
    subTotalWithPromoDiscount,
    STATE_TAX_PERCENT,
  );

  const totalAmount = subTotalWithPromoDiscount + taxAmount;

  const currency = orders[ZERO_INDEX]?.currency || DEFAULT_CURRENCY;

  const addPromoDiscount = (percent: number) => {
    setPromoDiscountPercent(percent);
  };

  return {
    currency,
    subTotal,
    taxAmount,
    totalAmount,
    taxPercent: STATE_TAX_PERCENT,
    promoDiscountPercent,
    promoDiscountAmount,

    addPromoDiscount,
  };
};
