import { ChangeEvent, FC } from 'react';

import { getSliderPosition } from '@helpers';

import style from './Slider.module.scss';

interface SliderProps {
  sliderMin: number;
  sliderMax: number;

  priceMin: number;
  priceMax: number;
  step: number;

  minValue: number;
  maxValue: number;

  isDisabled: boolean;

  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
}

export const Slider: FC<SliderProps> = ({
  sliderMin,
  sliderMax,

  priceMin,
  priceMax,
  step,

  minValue,
  maxValue,

  isDisabled,

  onMinChange,
  onMaxChange,
}) => {
  const positionLeft = getSliderPosition(sliderMin, isDisabled);

  const positionRight = getSliderPosition(sliderMax, isDisabled);

  const handleMinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = +e.target.value;

    onMinChange(numericValue);
  };

  const handleMaxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = +e.target.value;

    onMaxChange(numericValue);
  };

  return (
    <div className={style.container}>
      <div className={style.slider}>
        <span
          className={style.slider_track}
          style={{
            left: `${positionLeft}%`,
            right: `${positionRight}%`,
          }}
        />
        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step={step}
          value={minValue}
          onChange={handleMinChange}
          className={`${style.min} ${isDisabled ? style.disabled : ''}`}
        />
        <input
          type="range"
          min={priceMin}
          max={priceMax}
          step={step}
          value={maxValue}
          onChange={handleMaxChange}
          className={`${style.max} ${isDisabled ? style.disabled : ''}`}
        />
      </div>
    </div>
  );
};
