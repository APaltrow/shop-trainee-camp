import { FC } from 'react';

import { HeaderInfo } from '../HeaderInfo';
import { HeaderToolbar } from '../HeaderToolbar';
import { HeaderCategories } from '../HeaderCategories';
import { Breadcrumbs } from '../Breadcrumbs';

import style from './Header.module.scss';

export const Header: FC = () => {
  return (
    <header className={style.container}>
      <HeaderInfo />
      <div className={style.overlay}>
        <div className={style.main_block}>
          <HeaderToolbar />
          <HeaderCategories />
        </div>
        <Breadcrumbs />
      </div>
    </header>
  );
};
