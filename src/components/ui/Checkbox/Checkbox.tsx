import { ChangeEvent, FC, ReactNode } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Checkbox.module.scss';

interface CheckboxProps {
  id: string;
  isChecked: boolean;
  children?: ReactNode;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({
  id,
  isChecked,
  children,

  onChange,
}) => {
  return (
    <div className={style.container}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        checked={isChecked}
        className={style.input}
      />
      <label
        htmlFor={id}
        className={style.label}
      >
        <span className={style.content}>{children}</span>
      </label>

      {isChecked ? (
        <span className={style.checkmark}>
          <Icon iconName={IconsTypes.CHECK_MARK} />
        </span>
      ) : null}
    </div>
  );
};
