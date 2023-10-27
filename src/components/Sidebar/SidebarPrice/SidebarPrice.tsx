import { ChangeEvent, FC, useState } from 'react';

import style from './SidebarPrice.module.scss';

interface SidebarPriceProps {
  priceMin: number;
  priceMax: number;
}

const STEP = 0.01;
const MIN_GAP_PERCENT = 10;
const ONE_HUNDRED_PERCENT = 100;

export const SidebarPrice: FC<SidebarPriceProps> = ({
  priceMin = 24.99,
  priceMax = 58.99,
}) => {
  const [sliderMin, setSliderMin] = useState(0);
  const [sliderMax, setSliderMax] = useState(0);
  const [min, setMin] = useState(priceMin);
  const [max, setMax] = useState(priceMax);

  const [minInput, setMinInput] = useState(priceMin);
  const [maxInput, setMaxInput] = useState(priceMax);

  const [priceError, setPriceError] = useState('');

  const differenceIndex = priceMax - priceMin; // as 100 %
  const priceGap = (differenceIndex / ONE_HUNDRED_PERCENT) * MIN_GAP_PERCENT;

  const onMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const minValue = +e.target.value;
    setMinInput(minValue);

    if (minValue >= max - priceGap) {
      setPriceError(`Min price cannot exceed ${(max - priceGap).toFixed(2)}`);
      return;
    }
    if (minValue < priceMin) {
      setPriceError(`Min price cannot be less than ${priceMin.toFixed(2)}`);
      return;
    }

    const difference = minValue - priceMin;
    const valueToPercentage = Math.floor(
      (difference / differenceIndex) * ONE_HUNDRED_PERCENT,
    );
    //  console.log('min_val: ', minValue);
    setPriceError('');
    setSliderMin(valueToPercentage);
    setMin(minValue);
  };

  const onMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const maxValue = +e.target.value;

    setMaxInput(maxValue);

    if (maxValue <= min + priceGap) {
      setPriceError(
        `Max price cannot be less than ${(min + priceGap).toFixed(2)}`,
      );
      return;
    }

    if (maxValue > priceMax) {
      setPriceError(`Max price should not exceed ${priceMax.toFixed(2)}`);
      return;
    }

    const difference = priceMax - maxValue;
    const valueToPercentage = Math.floor(
      (difference / differenceIndex) * ONE_HUNDRED_PERCENT,
    );
    //  console.log('max_val: ', maxValue);

    setSliderMax(valueToPercentage);
    setMax(maxValue);
    setPriceError('');
  };

  return (
    <section className={style.container}>
      <h4>Price</h4>

      <div className={style.slider_container}>
        <span
          className={style.slider_track}
          style={{
            left: `${sliderMin}%`,
            right: `${sliderMax}%`,
          }}
        />
        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step={STEP}
          value={min}
          onChange={onMinChange}
        />
        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step={STEP}
          value={max}
          onChange={onMaxChange}
        />
      </div>

      <div>
        <div className={style.min_max_container}>
          <label
            htmlFor="price_min"
            className={style.label}
          >
            <span>Min</span>

            <input
              id="price_min"
              type="number"
              className={style.input}
              min={priceMin}
              max={priceMax}
              onChange={onMinChange}
              step={STEP}
              value={minInput}
            />
          </label>

          <label
            htmlFor="price_max"
            className={style.label}
          >
            <span>Max</span>

            <input
              id="price_max"
              min={priceMin}
              max={priceMax}
              onChange={onMaxChange}
              step={STEP}
              type="number"
              className={style.input}
              value={maxInput}
            />
          </label>
        </div>
        <p className={style.error}>{priceError}</p>
      </div>
    </section>
  );
};
