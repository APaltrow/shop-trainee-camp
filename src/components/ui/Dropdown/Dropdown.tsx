import { FC, ReactNode } from 'react';

import { useClickOutside } from '@hooks';

import style from './Dropdown.module.scss';

interface DropdownProps {
  children: ReactNode;
  anchor: JSX.Element;

  onClose: () => void;
}

export const Dropdown: FC<DropdownProps> = ({ anchor, children, onClose }) => {
  const dropdownRef = useClickOutside(() => onClose());

  return (
    <div
      className={style.container}
      ref={dropdownRef}
    >
      {anchor}
      {children ? <ul className={style.options_list}>{children}</ul> : null}
    </div>
  );
};
