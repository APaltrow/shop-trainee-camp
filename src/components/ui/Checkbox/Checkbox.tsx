import { ChangeEvent, FC } from 'react';

import { IconsTypes } from '@constants';
import { Icon } from '@components';

import style from './Checkbox.module.scss';

interface CheckboxProps {
  id: string;
  isChecked: boolean;

  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ id, isChecked, onChange }) => {
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
        <Icon iconName={IconsTypes.CHECK_MARK} />
      </label>
    </div>
  );
};
