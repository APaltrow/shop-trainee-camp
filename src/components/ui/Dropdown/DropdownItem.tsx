import { FC } from 'react';

import style from './Dropdown.module.scss';

interface DropdownItemProps {
  option: string;

  onSelect: () => void;
}

export const DropdownItem: FC<DropdownItemProps> = ({
  option,

  onSelect,
}) => {
  return (
    <li className={style.wrapper}>
      <button
        className={style.item}
        type="button"
        onClick={onSelect}
      >
        {option}
      </button>
    </li>
  );
};
