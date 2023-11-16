import { ChangeEvent, useState } from 'react';

import { PRICE_DECIMALS, ZERO_INDEX } from '@constants';
import { getActualProductPrice } from '@helpers';
import { useAppSelector } from '@redux';

const DEFAULT_UNIT_AMOUNT = 1;

export const useProductToolbar = () => {
  const { product } = useAppSelector((state) => state.product);

  if (!product) return;

  const { buyBy, price } = product;

  const buyByOptions = Object.keys(buyBy);
  const defaultBuyBy = buyByOptions[ZERO_INDEX];

  const [buyByActiveOption, setBuyByActiveOption] = useState(defaultBuyBy);
  const [unitsAmount, setUnitsAmount] = useState(DEFAULT_UNIT_AMOUNT);

  const actualPrice = getActualProductPrice(price);
  const activeUnitsAmount = buyBy[buyByActiveOption];
  const productUnits = unitsAmount * (activeUnitsAmount || DEFAULT_UNIT_AMOUNT);
  const totalDueAmount = (actualPrice * productUnits).toFixed(PRICE_DECIMALS);
  const unitsInfo = `* There is ${activeUnitsAmount} units in 1 ${buyByActiveOption}`;
  const isUnitsInfoVisible = buyByActiveOption !== defaultBuyBy;

  const onActiveBuyByChange = (option: string) => {
    setBuyByActiveOption(option);
    setUnitsAmount(DEFAULT_UNIT_AMOUNT);
  };

  const onUnitsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const units = +e.target.value;

    setUnitsAmount(units);
  };

  return {
    price,
    unitsInfo,
    unitsAmount,
    buyByOptions,
    totalDueAmount,
    buyByActiveOption,
    isUnitsInfoVisible,

    onUnitsAmountChange,
    onActiveBuyByChange,
  };
};
