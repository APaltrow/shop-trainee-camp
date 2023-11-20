import { ChangeEvent, useEffect, useState } from 'react';

import {
  DEFAULT_UNITS_AMOUNT,
  ONE_ITEM,
  PRICE_DECIMALS,
  UNITS_PER_PROP,
  UnitsErrors,
  ZERO_INDEX,
} from '@constants';
import { getActualProductPrice } from '@helpers';
import { useAppSelector } from '@redux';

export const useProductToolbar = () => {
  const { product } = useAppSelector((state) => state.product);

  if (!product) return null;

  const { buyBy, price, stock } = product;

  const buyByOptions = Object.keys(buyBy);
  const defaultBuyBy = buyByOptions[ZERO_INDEX];

  const [buyByActiveOption, setBuyByActiveOption] = useState(defaultBuyBy);
  const [unitsAmount, setUnitsAmount] = useState(DEFAULT_UNITS_AMOUNT);
  const [unitsError, setUnitsError] = useState<UnitsErrors | string>(
    UnitsErrors.NO_ERROR,
  );

  const actualPrice = getActualProductPrice(price);
  const activeUnitsAmount = buyBy[buyByActiveOption];
  const productUnits =
    unitsAmount * (activeUnitsAmount || DEFAULT_UNITS_AMOUNT);
  const totalDueAmount = (actualPrice * productUnits).toFixed(PRICE_DECIMALS);
  const unitsInProp = `${activeUnitsAmount} ${UNITS_PER_PROP} ${buyByActiveOption}`;
  const totalPCS = `${unitsAmount * activeUnitsAmount} ${defaultBuyBy} total`;
  const unitsInfo = unitsAmount > ONE_ITEM ? totalPCS : unitsInProp;
  const unitsMax = stock.amount / activeUnitsAmount;
  const beforeDiscount = (price.amount * productUnits).toFixed(PRICE_DECIMALS);

  const totalDue = `${totalDueAmount} ${price.currency}`;
  const totalBeforeDiscount = price.discount
    ? `${beforeDiscount} ${price.currency}`
    : null;

  const isUnitsInfoVisible = buyByActiveOption !== defaultBuyBy && !unitsError;

  const onActiveBuyByChange = (option: string) => {
    setBuyByActiveOption(option);
    setUnitsAmount(DEFAULT_UNITS_AMOUNT);
  };

  const onUnitsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const units = +e.target.value;

    setUnitsAmount(units);
  };

  useEffect(() => {
    const totalUnits = unitsAmount * activeUnitsAmount;

    if (!unitsAmount) {
      setUnitsError(UnitsErrors.INVALID_AMOUNT);
      return;
    }

    if (totalUnits > stock.amount) {
      setUnitsError(
        `${UnitsErrors.TOTAL_EXCEED} ${stock.amount} ${stock.measure}`,
      );
      return;
    }

    setUnitsError(UnitsErrors.NO_ERROR);
  }, [unitsAmount, buyByActiveOption]);

  return {
    unitsMax,
    totalDue,
    unitsInfo,
    unitsError,
    unitsAmount,
    buyByOptions,
    totalBeforeDiscount,
    buyByActiveOption,
    isUnitsInfoVisible,

    onUnitsAmountChange,
    onActiveBuyByChange,
  };
};
