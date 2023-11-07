import { FC } from 'react';

import { IconsTypes } from '@constants';
import { useActions } from '@redux';
import { scrollToTop } from '@helpers';
import { CustomButton, Icon } from '@components';

import { SidebarCategories } from '../SidebarCategories';
import { Brands } from '../Brands';
import { SidebarRating } from '../SidebarRating';
import { SidebarPrice } from '../SidebarPrice';

import style from './Sidebar.module.scss';

interface SidebarProps {
  isOpened?: boolean;

  onClose?: () => void;
}

export const Sidebar: FC<SidebarProps> = ({
  isOpened,

  onClose = () => {},
}) => {
  const { resetFilters } = useActions();

  const handleResetFilters = () => {
    resetFilters();
    scrollToTop();
  };

  return (
    <aside className={`${style.container} ${isOpened ? style.opened : ''}`}>
      <div className={style.header}>
        <CustomButton onClick={onClose}>
          <Icon iconName={IconsTypes.CLOSE} />
        </CustomButton>
      </div>

      <div className={style.content}>
        <SidebarCategories />
        <Brands />
        <SidebarRating />
        <SidebarPrice />
        <CustomButton onClick={handleResetFilters}>Reset filters</CustomButton>
      </div>
    </aside>
  );
};
