import { ChangeEvent, useEffect, useState } from 'react';

import { useActions, useAppSelector } from '@redux';
import { getPercentFromValue, getPriceGap } from '@helpers';
import { PRICE_DECIMALS } from '@constants';
import { useDebounce } from '@hooks';
import { IPriceRange } from '@types';

export const useSidebarPrice = () => {
  const { priceRange } = useAppSelector((state) => state.productsFilter);

  const { min: priceMin, max: priceMax } = priceRange;

  const { setActivePriceRange } = useActions();

  const [sliderPosition, setSliderPosition] = useState({
    min: 0,
    max: 0,
  });

  const [valueRange, setValueRange] = useState({
    min: priceMin,
    max: priceMax,
  });

  const [inputValue, setInputValue] = useState({
    min: priceMin,
    max: priceMax,
  });

  const [priceError, setPriceError] = useState('');

  const priceMinMaxDifference = +(priceMax - priceMin).toFixed(PRICE_DECIMALS);
  const priceGap = getPriceGap(priceMinMaxDifference);

  const handleActivePriceRange = useDebounce((range: IPriceRange) =>
    setActivePriceRange(range),
  );

  const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minValue = +e.target.value;

    setInputValue((prev) => ({ ...prev, min: minValue }));

    if (minValue >= valueRange.max - priceGap) {
      setPriceError(
        `Min price cannot exceed ${(valueRange.max - priceGap).toFixed(
          PRICE_DECIMALS,
        )}`,
      );
      return;
    }
    if (minValue < priceMin) {
      setPriceError(
        `Min price cannot be less than ${priceMin.toFixed(PRICE_DECIMALS)}`,
      );
      return;
    }

    const sliderMinPercent = getPercentFromValue(
      minValue - priceMin,
      priceMinMaxDifference,
    );

    setPriceError('');

    setSliderPosition((prev) => ({ ...prev, min: sliderMinPercent }));
    setValueRange((prev) => ({ ...prev, min: minValue }));
    handleActivePriceRange({ min: minValue } as IPriceRange);
  };

  const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxValue = +e.target.value;
    setInputValue((prev) => ({ ...prev, max: maxValue }));

    if (maxValue <= valueRange.min + priceGap) {
      setPriceError(
        `Max price cannot be less than ${(valueRange.min + priceGap).toFixed(
          PRICE_DECIMALS,
        )}`,
      );
      return;
    }
    if (maxValue > priceMax) {
      setPriceError(
        `Max price should not exceed ${priceMax.toFixed(PRICE_DECIMALS)}`,
      );
      return;
    }

    const sliderMaxPercent = getPercentFromValue(
      priceMax - maxValue,
      priceMinMaxDifference,
    );

    setSliderPosition((prev) => ({ ...prev, max: sliderMaxPercent }));
    setValueRange((prev) => ({ ...prev, max: maxValue }));
    setPriceError('');

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
