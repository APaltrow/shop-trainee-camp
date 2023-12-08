import { ChangeEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { IOrderItem, IProduct } from '@types';

import {
  AlertMessages,
  UnitsErrors,
  ONE_ITEM,
  ZERO_INDEX,
  ZERO_PRICE,
  PRICE_DECIMALS,
  UNITS_PER_PROP,
  DEFAULT_UNITS_AMOUNT,
} from '@constants';
import { getActualProductPrice, generateLotId, formatPrice } from '@helpers';
import { useActions } from '@redux';
import { useTotalPcs } from '@hooks';

export const useProductToolbar = (
  product: IProduct,
  units?: number,
  measure?: string,
) => {
  const { buyBy, price, stock } = product;

  const buyByOptions = Object.keys(buyBy);
  const defaultBuyBy = measure || buyByOptions[ZERO_INDEX];
  const defaultUnits = units || DEFAULT_UNITS_AMOUNT;

  const [buyByActiveOption, setBuyByActiveOption] = useState(defaultBuyBy);
  const [unitsAmount, setUnitsAmount] = useState(defaultUnits);
  const [unitsError, setUnitsError] = useState<UnitsErrors | string>(
    UnitsErrors.NO_ERROR,
  );
  const { addOrderItem, removeOrderItem, updateOrderItem } = useActions();
  const { getTotalsInCart, getTotalPcsInCart } = useTotalPcs(product.productId);

  const actualPrice = getActualProductPrice(price);
  const activeUnitsAmount = buyBy[buyByActiveOption];

  const productUnits =
    unitsAmount * (activeUnitsAmount || DEFAULT_UNITS_AMOUNT);
  const totalDueAmount = (actualPrice * productUnits).toFixed(PRICE_DECIMALS);
  const unitsInProp =
    buyByActiveOption !== buyByOptions[ZERO_INDEX]
      ? `${activeUnitsAmount} ${UNITS_PER_PROP} ${buyByActiveOption}`
      : null;
  const totalPCS = `${unitsAmount * activeUnitsAmount} pcs total`;
  const unitsInfo = unitsAmount > ONE_ITEM ? totalPCS : null;
  const unitsMax = stock.amount / activeUnitsAmount;
  const beforeDiscountTotal = (price.amount * productUnits).toFixed(
    PRICE_DECIMALS,
  );

  const duePrice = !unitsError ? +totalDueAmount : ZERO_PRICE;
  const totalDue = formatPrice(duePrice, price.currency);
  const beforeDiscountPrice = !unitsError ? +beforeDiscountTotal : ZERO_PRICE;
  const beforeDiscount = formatPrice(beforeDiscountPrice, price.currency);

  const totalBeforeDiscount = price.discount ? beforeDiscount : null;
  const isUnitsInfoVisible =
    buyByActiveOption !== buyByOptions[ZERO_INDEX] && !unitsError;
  const totalPcsInCart = measure
    ? getTotalPcsInCart(buyBy, buyByActiveOption)
    : getTotalPcsInCart(buyBy);

  const itemsInCartMsg = getTotalsInCart();
  const totalUnits = unitsAmount * activeUnitsAmount + totalPcsInCart;
  const isSoldOut = totalPcsInCart >= stock.amount;

  const checkIfAmountIsAvailable = (amountToCheck: number) => {
    const totalPCSWithCart = activeUnitsAmount * amountToCheck + totalPcsInCart;

    return totalPCSWithCart > stock.amount;
  };

  const getTotalCost = (itemsAmount: number, amountPerUnit: number) => {
    return +(actualPrice * itemsAmount * amountPerUnit).toFixed(PRICE_DECIMALS);
  };

  const onActiveBuyByChange = (option: string) => {
    setBuyByActiveOption(option);
    setUnitsAmount(DEFAULT_UNITS_AMOUNT);
  };

  const onUnitsAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let amount = Math.floor(+e.target.value);

    if (checkIfAmountIsAvailable(amount)) {
      amount = Math.trunc((stock.amount - totalPcsInCart) / activeUnitsAmount);
    }

    setUnitsAmount(amount);
  };

  const onUnitsAmountChangeInCart = (e: ChangeEvent<HTMLInputElement>) => {
    let amount = Math.floor(+e.target.value);
    setUnitsAmount(amount);

    if (!amount) return;

    if (checkIfAmountIsAvailable(amount)) {
      amount = Math.trunc((stock.amount - totalPcsInCart) / activeUnitsAmount);

      setUnitsAmount(amount);
    }

    const { productId } = product;
    const lotId = generateLotId([productId, buyByActiveOption]);
    const newTotalCost = getTotalCost(amount, activeUnitsAmount);

    updateOrderItem({
      lotId,
      totalQuantity: amount,
      totalCost: newTotalCost,
    } as IOrderItem);
  };

  const onUnitsInputBlur = () => {
    if (!unitsError) return;
    if (unitsAmount) return;

    const { productId } = product;
    const lotId = generateLotId([productId, buyByActiveOption]);
    const newTotalCost = getTotalCost(DEFAULT_UNITS_AMOUNT, activeUnitsAmount);

    updateOrderItem({
      lotId,
      totalQuantity: DEFAULT_UNITS_AMOUNT,
      totalCost: newTotalCost,
    } as IOrderItem);

    setUnitsAmount(DEFAULT_UNITS_AMOUNT);
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

  const mergeLotsInCart = (
    option: string,
    lotId: string,
    prevLotId: string,
  ) => {
    const totalPCSWithCart = buyBy[option] * unitsAmount + totalPcsInCart;

    if (!unitsAmount) {
      setUnitsError(UnitsErrors.INVALID_AMOUNT);
      return;
    }

    if (totalPCSWithCart > stock.amount) {
      setUnitsError(UnitsErrors.FAILED_MERGE);
      return;
    }

    const totalCost = getTotalCost(buyBy[option], unitsAmount);

    addOrderItem({
      lotId,
      totalCost,
      totalQuantity: unitsAmount,
    } as IOrderItem);

    removeOrderItem(prevLotId);
  };

  const swapLotsInCart = (option: string, prevLotId: string) => {
    const totalPCSWithCart = buyBy[option] * unitsAmount + totalPcsInCart;

    if (!unitsAmount) {
      setUnitsError(UnitsErrors.INVALID_AMOUNT);
      return;
    }

    if (totalPCSWithCart > stock.amount) {
      setUnitsError(UnitsErrors.FAILED_SWAP);
      return;
    }

    const { productId, delivery } = product;
    const lotId = generateLotId([productId, option]);
    const totalCost = getTotalCost(buyBy[option], unitsAmount);

    const swapItem = {
      productId,
      lotId,
      totalCost,
      totalQuantity: unitsAmount,
      measure: option,
      currency: price.currency,
      timeframe: delivery.timeframe,
    };

    addOrderItem(swapItem);
    removeOrderItem(prevLotId);
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

  useEffect(() => {
    if (measure) {
      setBuyByActiveOption(measure);
    }

    if (units) {
      setUnitsAmount(units);
    }
  }, [units, measure]);

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
    mergeLotsInCart,
    swapLotsInCart,
    onUnitsInputBlur,
    onUnitsAmountChangeInCart,
  };
};
