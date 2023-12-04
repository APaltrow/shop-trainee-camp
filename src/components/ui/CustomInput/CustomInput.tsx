import { ChangeEvent, FC, useId, useState } from 'react';

import style from './CustomInput.module.scss';

interface CustomInputProps {
  label?: string;
  type?: string;
  name: string;
  value: string;
  placeholder: string;
  error: string;
  optionsList?: string[];
  isDisabled?: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const CustomInput: FC<CustomInputProps> = ({
  label,
  name,
  value = '',
  type = 'text',
  placeholder = '',
  error = '',
  optionsList = [],
  isDisabled = false,

  onChange,
}) => {
  const [isTouched, setTouched] = useState(false);
  const inputId = useId();
  const listId = useId();

  const handleBlur = () => {
    if (isTouched) return;
    if (isDisabled) return;
    setTouched(true);
  };

  return (
    <div className={style.container}>
      {!!label && (
        <label
          htmlFor={inputId}
          className={style.label}
        >
          {label}
        </label>
      )}

      <input
        className={style.input}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={handleBlur}
        id={inputId}
        autoComplete="off"
        list={listId}
        readOnly={isDisabled}
      />

      {!!error && isTouched && <span className={style.error}>{error}</span>}

      {!!optionsList.length && (
        <datalist id={listId}>
          {optionsList.map((option) => (
            <option
              value={option}
              key={option}
            />
          ))}
        </datalist>
      )}
    </div>
  );
};
