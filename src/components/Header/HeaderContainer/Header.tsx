import { FC } from 'react';

import { useAppSelector } from '@redux';

import { HeaderInfo } from '../HeaderInfo';
import { HeaderToolbar } from '../HeaderToolbar';
import { HeaderCategories } from '../HeaderCategories';
import { Breadcrumbs } from '../Breadcrumbs';

import style from './Header.module.scss';

export const Header: FC = () => {
  const { categories } = useAppSelector((state) => state.products);
  const categoriesList = categories ? Object.entries(categories) : [];

  return (
    <header className={style.container}>
      <HeaderInfo />
      <div className={style.overlay}>
        <div className={style.main_block}>
          <HeaderToolbar />
          <HeaderCategories categories={categoriesList} />
        </div>
        <Breadcrumbs />
        <div className={style.overlay_bg} />
      </div>
    </header>
  );
};
