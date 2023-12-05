import { ChangeEvent, FC, useId, useState } from 'react';

import { useToggle } from '@hooks';
import { Dropdown, DropdownItem } from '@components';

import style from './CustomInput.module.scss';

interface CustomInputProps {
  name: string;
  value: string;
  placeholder: string;
  error: string;
  optionsList?: string[];
  isDisabled?: boolean;
  label?: string;
  type?: string;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  onSelect?: (option: string) => void;
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
  onFocus,
  onSelect,
}) => {
  const [isTouched, setTouched] = useState(false);
  const { isOpened, onClose, onOpen } = useToggle();
  const inputId = useId();

  const handleBlur = () => {
    if (isTouched) return;
    if (isDisabled) return;
    setTouched(true);
  };

  const handleFocus = () => {
    onOpen();

    if (!onFocus) return;
    onFocus();
  };

  const onOptionSelect = (option: string) => {
    if (!onSelect) return;

    onClose();
    onSelect(option);
  };

  return (
    <Dropdown
      isOpened={isOpened}
      onClose={onClose}
      anchor={
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
            onFocus={handleFocus}
            id={inputId}
            autoComplete="off"
            readOnly={isDisabled}
          />

          {!!error && isTouched && <span className={style.error}>{error}</span>}
        </div>
      }
    >
      {!!optionsList.length &&
        optionsList.map((option) => (
          <DropdownItem
            key={option}
            option={option}
            onSelect={() => onOptionSelect(option)}
          />
        ))}
    </Dropdown>
  );
};
