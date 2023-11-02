import { FC } from 'react';

import { PRICE_STEP } from '@constants';
import { useSidebarPrice } from '@hooks';

import { PriceInput, Slider } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './SidebarPrice.module.scss';

export const SidebarPrice: FC = () => {
  const {
    priceMin,
    priceMax,
    isDisabled,
    sliderPosition,
    valueRange,
    inputValue,
    priceError,

    onMinChange,
    onMaxChange,
  } = useSidebarPrice();

  return (
    <SidebarBlock title="Price">
      <div className={style.container}>
        <Slider
          sliderMin={sliderPosition.min}
          sliderMax={sliderPosition.max}
          priceMin={priceMin}
          priceMax={priceMax}
          step={PRICE_STEP}
          minValue={valueRange.min}
          maxValue={valueRange.max}
          isDisabled={isDisabled}
          onMinChange={onMinChange}
          onMaxChange={onMaxChange}
        />

        <div>
          <div className={style.min_max_container}>
            <PriceInput
              title="Min"
              id="price_min"
              min={priceMin}
              max={priceMax}
              value={inputValue.min}
              step={PRICE_STEP}
              onChange={onMinChange}
              isDisabled={isDisabled}
            />

            <PriceInput
              title="Max"
              id="price_max"
              min={priceMin}
              max={priceMax}
              value={inputValue.max}
              step={PRICE_STEP}
              onChange={onMaxChange}
              isDisabled={isDisabled}
            />
          </div>
          <p className={style.error}>{priceError}</p>
        </div>
      </div>
    </SidebarBlock>
  );
};
