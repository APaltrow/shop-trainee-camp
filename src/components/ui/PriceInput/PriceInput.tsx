import { ChangeEvent, FC } from 'react';

import { SPECIAL_CHARACTERS } from '@constants';

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
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (SPECIAL_CHARACTERS.includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const numericValue = +e.target.value;

    onChange(numericValue);
  };

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
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={handleChange}
        step={step}
        value={value || ''}
      />
    </label>
  );
};
