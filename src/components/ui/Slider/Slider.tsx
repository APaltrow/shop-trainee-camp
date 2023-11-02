import { ChangeEvent, FC } from 'react';

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

  onMinChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: ChangeEvent<HTMLInputElement>) => void;
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
  return (
    <div className={style.slider_container}>
      <span
        className={style.slider_track}
        style={{
          left: `${!isDisabled ? sliderMin : 0}%`,
          right: `${!isDisabled ? sliderMax : 0}%`,
        }}
      />
      <input
        type="range"
        min={priceMin}
        max={priceMax}
        step={step}
        value={minValue}
        onChange={onMinChange}
        className={isDisabled ? style.disabled : ''}
      />
      <input
        type="range"
        min={priceMin}
        max={priceMax}
        step={step}
        value={maxValue}
        onChange={onMaxChange}
        className={isDisabled ? style.disabled : ''}
      />
    </div>
  );
};
