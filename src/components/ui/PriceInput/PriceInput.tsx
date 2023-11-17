import { ChangeEvent, FC } from 'react';

import { PRICE_PLACEHOLDER } from '@constants';
import { handleKeyDown } from '@helpers';

import style from './PriceInput.module.scss';

interface PriceInputProps {
  title: string;
  id: string;

  min: number;
  max: number;
  value: number;
  step: number;

  isDisabled: boolean;

  onChange: (e: number) => void;
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
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = +e.target.value;

    onChange(numericValue);
  };

  return (
    <label
      htmlFor={id}
      className={style.label}
    >
      <span className={style.title}>{title}</span>

      <input
        readOnly={isDisabled}
        id={id}
        type="number"
        className={style.input}
        min={min}
        max={max}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleChange}
        step={step}
        value={value || ''}
        placeholder={PRICE_PLACEHOLDER}
      />
    </label>
  );
};
