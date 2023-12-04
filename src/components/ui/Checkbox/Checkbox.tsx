import { ChangeEvent, FC, ReactNode, useId } from 'react';

import { IconSizes, IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Checkbox.module.scss';

interface CheckboxProps {
  isChecked: boolean;
  name?: string;
  children?: ReactNode;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  isChecked,
  children,
  name,

  onChange,
}) => {
  const checkboxID = useId();

  return (
    <div className={style.container}>
      <input
        type="checkbox"
        id={checkboxID}
        name={name}
        onChange={onChange}
        checked={isChecked}
        className={style.input}
      />
      <label
        htmlFor={checkboxID}
        className={style.label}
      >
        <span className={style.content}>{children}</span>
      </label>

      {isChecked && (
        <span className={style.checkmark}>
          <Icon
            iconName={IconsTypes.CHECK_MARK}
            size={IconSizes.LARGE}
          />
        </span>
      )}
    </div>
  );
};
