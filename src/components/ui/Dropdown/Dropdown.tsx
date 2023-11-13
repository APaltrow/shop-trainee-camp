import { FC, ReactNode } from 'react';

import { useClickOutside } from '@hooks';

import style from './Dropdown.module.scss';

interface DropdownProps {
  children: ReactNode;
  anchor: JSX.Element;
  isOpened: boolean;

  onClose: () => void;
}

export const Dropdown: FC<DropdownProps> = ({
  anchor,
  children,
  isOpened,

  onClose,
}) => {
  const dropdownRef = useClickOutside(() => onClose());

  const isVisible = children && isOpened;

  return (
    <div
      className={style.container}
      ref={dropdownRef}
    >
      {anchor}
      {!!isVisible && <ul className={style.options_list}>{children}</ul>}
    </div>
  );
};
