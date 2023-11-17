import { ChangeEvent, useEffect, useState } from 'react';

import { DEFAULT_UNIT_AMOUNT, PRICE_DECIMALS, ZERO_INDEX } from '@constants';
import { getActualProductPrice } from '@helpers';
import { useAppSelector } from '@redux';

export const useProductToolbar = () => {
  const { product } = useAppSelector((state) => state.product);

  if (!product) return;

  const { buyBy, price, stock } = product;

  const buyByOptions = Object.keys(buyBy);
  const defaultBuyBy = buyByOptions[ZERO_INDEX];

  const [buyByActiveOption, setBuyByActiveOption] = useState(defaultBuyBy);
  const [unitsAmount, setUnitsAmount] = useState(DEFAULT_UNIT_AMOUNT);
  const [unitsError, setUnitsError] = useState('');

  const actualPrice = getActualProductPrice(price);
  const activeUnitsAmount = buyBy[buyByActiveOption];
  const productUnits = unitsAmount * (activeUnitsAmount || DEFAULT_UNIT_AMOUNT);
  const totalDueAmount = (actualPrice * productUnits).toFixed(PRICE_DECIMALS);
  const unitsInfo = `* ${activeUnitsAmount} units in 1 ${buyByActiveOption}`;
  const unitsMax = stock.amount / activeUnitsAmount;

  const isUnitsInfoVisible = buyByActiveOption !== defaultBuyBy && !unitsError;

  const onActiveBuyByChange = (option: string) => {
    setBuyByActiveOption(option);
    setUnitsAmount(DEFAULT_UNIT_AMOUNT);
  };

  const onUnitsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const units = +e.target.value;

    setUnitsAmount(units);
  };

  useEffect(() => {
    const totalUnits = unitsAmount * activeUnitsAmount;

    if (!unitsAmount) {
      setUnitsError('Invalid units amount');
      return;
    }

    if (totalUnits > stock.amount) {
      setUnitsError(`Should not exceed ${stock.amount} pcs`);
      return;
    }

    setUnitsError('');
  }, [unitsAmount, buyByActiveOption]);

  return {
    price,
    unitsMax,
    unitsInfo,
    unitsError,
    unitsAmount,
    buyByOptions,
    totalDueAmount,
    buyByActiveOption,
    isUnitsInfoVisible,

    onUnitsAmountChange,
    onActiveBuyByChange,
  };
};
