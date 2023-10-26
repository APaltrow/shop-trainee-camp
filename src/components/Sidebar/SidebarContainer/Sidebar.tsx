import { FC } from 'react';

import { SidebarCategories } from '../SidebarCategories';
import { Brands } from '../Brands';
import { SidebarRating } from '../SidebarRating';

import style from './Sidebar.module.scss';

export const Sidebar: FC = () => {
  return (
    <aside className={style.container}>
      <SidebarCategories />
      <Brands />
      <SidebarRating />
    </aside>
  );
};
