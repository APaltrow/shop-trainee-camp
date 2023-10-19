import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import { MainLayout } from '@layouts';

import style from '@style/App.module.scss';

export const App: FC = () => {
  return (
    <div className={style.app}>
      <MainLayout>
        <Outlet />
      </MainLayout>
    </div>
  );
};
