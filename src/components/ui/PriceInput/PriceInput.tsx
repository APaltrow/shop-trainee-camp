import { ChangeEvent, FC } from 'react';

import style from './PriceInput.module.scss';

interface PriceInputProps {
  title: string;
  id: string;

  min: number;
  max: number;
  value: number;
  step: number;

  isDisabled: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const PriceInput: FC<PriceInputProps> = ({
  title,
  id,

  min,
  max,
  value,
  step,
  isDisabled,

  onChange,
}) => {
  return (
    <label
      htmlFor={id}
      className={style.label}
    >
      <span>{title}</span>

      <input
        readOnly={isDisabled}
        id={id}
        type="number"
        className={style.input}
        min={min}
        max={max}
        onChange={onChange}
        step={step}
        value={value}
      />
    </label>
  );
};
