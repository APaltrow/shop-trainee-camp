import { FC } from 'react';

import style from './Dropdown.module.scss';

interface DropdownItemProps {
  option: string;
  isDisabled?: boolean;

  onSelect?: () => void;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  option,
  isDisabled = false,

  onSelect,
}) => {
  return (
    <li className={style.wrapper}>
      <button
        className={style.item}
        type="button"
        disabled={isDisabled}
        onClick={onSelect}
      >
        {option}
      </button>
    </li>
  );
};
