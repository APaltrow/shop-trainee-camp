import { useEffect, useState } from 'react';

import { useActions, useAppSelector } from '@redux';
import { getPercentFromValue } from '@helpers';
import {
  MIN_PRICE_GAP_USD,
  PRICE_DECIMALS,
  PriceErrors,
  ZERO_POSITION,
} from '@constants';
import { useDebounce } from '@hooks';
import { IPriceRange } from '@types';

export const useSidebarPrice = () => {
  const { priceRange } = useAppSelector((state) => state.productsFilter);

  const { min: priceMin, max: priceMax } = priceRange;

  const { setActivePriceRange } = useActions();

  const [sliderPosition, setSliderPosition] = useState({
    min: ZERO_POSITION,
    max: ZERO_POSITION,
  });

  const [valueRange, setValueRange] = useState({
    min: priceMin,
    max: priceMax,
  });

  const [inputValue, setInputValue] = useState({
    min: priceMin,
    max: priceMax,
  });

  const [priceError, setPriceError] = useState<PriceErrors | string>(
    PriceErrors.DEFAULT,
  );

  const priceMinMaxDifference = +(priceMax - priceMin).toFixed(PRICE_DECIMALS);

  const handleActivePriceRange = useDebounce((range: IPriceRange) =>
    setActivePriceRange(range),
  );

  const onMinChange = (value: number) => {
    const minValue = +value.toFixed(PRICE_DECIMALS);

    setInputValue((prev) => ({ ...prev, min: minValue }));

    const maxValueWithGap = valueRange.max - MIN_PRICE_GAP_USD;

    if (minValue >= maxValueWithGap) {
      setPriceError(`${PriceErrors.MIN_EXCEED} ${maxValueWithGap}`);
      return;
    }

    if (minValue < priceMin) {
      setPriceError(`${PriceErrors.MIN_BELOW} ${priceMin}`);
      return;
    }

    const sliderMinPercent = getPercentFromValue(
      minValue - priceMin,
      priceMinMaxDifference,
    );

    setPriceError(PriceErrors.DEFAULT);

    setSliderPosition((prev) => ({ ...prev, min: sliderMinPercent }));
    setValueRange((prev) => ({ ...prev, min: minValue }));
    handleActivePriceRange({ min: minValue } as IPriceRange);
  };

  const onMaxChange = (value: number) => {
    const maxValue = +value.toFixed(PRICE_DECIMALS);

    setInputValue((prev) => ({ ...prev, max: maxValue }));

    const minValueWithGap = valueRange.min + MIN_PRICE_GAP_USD;

    if (maxValue <= minValueWithGap) {
      setPriceError(`${PriceErrors.MAX_BELOW} ${minValueWithGap}`);
      return;
    }

    if (maxValue > priceMax) {
      setPriceError(`${PriceErrors.MAX_EXCEED} ${priceMax}`);
      return;
    }

    const sliderMaxPercent = getPercentFromValue(
      priceMax - maxValue,
      priceMinMaxDifference,
    );

    setSliderPosition((prev) => ({ ...prev, max: sliderMaxPercent }));
    setValueRange((prev) => ({ ...prev, max: maxValue }));
    setPriceError(PriceErrors.DEFAULT);

    handleActivePriceRange({ max: maxValue } as IPriceRange);
  };

  useEffect(() => {
    setValueRange({
      min: priceMin,
      max: priceMax,
    });

    setInputValue({
      min: priceMin,
      max: priceMax,
    });

    setSliderPosition({
      min: ZERO_POSITION,
      max: ZERO_POSITION,
    });

    setPriceError(PriceErrors.DEFAULT);
  }, [priceMin, priceMax]);

  const isDisabled = priceMin === priceMax;

  return {
    priceMin,
    priceMax,
    isDisabled,
    sliderPosition,
    valueRange,
    inputValue,
    priceError,

    onMinChange,
    onMaxChange,
  };
};
