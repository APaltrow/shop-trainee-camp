import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IProduct } from '@types';

import {
  AlertMessages,
  DEFAULT_UNITS_AMOUNT,
  ONE_ITEM,
  PRICE_DECIMALS,
  UNITS_PER_PROP,
  UnitsErrors,
  ZERO_INDEX,
  ZERO_PRICE,
} from '@constants';
import { getActualProductPrice, generateLotId } from '@helpers';
import { useActions } from '@redux';
import { useTotalPcs } from '@hooks';

export const useProductToolbar = (product: IProduct) => {
  const { buyBy, price, stock } = product;

  const buyByOptions = Object.keys(buyBy);
  const defaultBuyBy = buyByOptions[ZERO_INDEX];

  const [buyByActiveOption, setBuyByActiveOption] = useState(defaultBuyBy);
  const [unitsAmount, setUnitsAmount] = useState(DEFAULT_UNITS_AMOUNT);
  const [unitsError, setUnitsError] = useState<UnitsErrors | string>(
    UnitsErrors.NO_ERROR,
  );
  const { addOrderItem } = useActions();
  const { getTotalsInCart, getTotalPcsInCart } = useTotalPcs(product.productId);

  const actualPrice = getActualProductPrice(price);
  const activeUnitsAmount = buyBy[buyByActiveOption];

  const productUnits =
    unitsAmount * (activeUnitsAmount || DEFAULT_UNITS_AMOUNT);
  const totalDueAmount = (actualPrice * productUnits).toFixed(PRICE_DECIMALS);
  const unitsInProp =
    buyByActiveOption !== defaultBuyBy
      ? `${activeUnitsAmount} ${UNITS_PER_PROP} ${buyByActiveOption}`
      : null;
  const totalPCS = `${unitsAmount * activeUnitsAmount} ${defaultBuyBy} total`;
  const unitsInfo = unitsAmount > ONE_ITEM ? totalPCS : null;
  const unitsMax = stock.amount / activeUnitsAmount;
  const beforeDiscountTotal = (price.amount * productUnits).toFixed(
    PRICE_DECIMALS,
  );
  const totalDue = `${!unitsError ? totalDueAmount : ZERO_PRICE} ${
    price.currency
  }`;
  const beforeDiscount = `${!unitsError ? beforeDiscountTotal : ZERO_PRICE} ${
    price.currency
  }`;
  const totalBeforeDiscount = price.discount ? beforeDiscount : null;
  const isUnitsInfoVisible = buyByActiveOption !== defaultBuyBy && !unitsError;
  const totalPcsInCart = getTotalPcsInCart(buyBy);
  const itemsInCartMsg = getTotalsInCart();
  const totalUnits = unitsAmount * activeUnitsAmount + totalPcsInCart;
  const isSoldOut = totalPcsInCart >= stock.amount;

  const onActiveBuyByChange = (option: string) => {
    setBuyByActiveOption(option);
    setUnitsAmount(DEFAULT_UNITS_AMOUNT);
  };

  const onUnitsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const units = Math.floor(+e.target.value);

    setUnitsAmount(units);
  };

  const onAddToCart = () => {
    const { productId, delivery } = product;
    const lotId = generateLotId([productId, buyByActiveOption]);

    const orderItem = {
      productId,
      lotId,
      totalQuantity: unitsAmount,
      totalCost: +totalDueAmount,
      measure: buyByActiveOption,
      currency: price.currency,
      timeframe: delivery.timeframe,
    };

    addOrderItem(orderItem);
    setUnitsAmount(DEFAULT_UNITS_AMOUNT);
    toast.success(AlertMessages.PRODUCT_ADDED);
  };

  useEffect(() => {
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
  }, [unitsAmount, buyByActiveOption, totalPcsInCart]);

  return {
    unitsMax,
    totalDue,
    unitsInfo,
    unitsInProp,
    unitsError,
    unitsAmount,
    itemsInCartMsg,
    buyByOptions,
    totalBeforeDiscount,
    buyByActiveOption,
    isUnitsInfoVisible,
    isSoldOut,

    onUnitsAmountChange,
    onActiveBuyByChange,
    onAddToCart,
  };
};
