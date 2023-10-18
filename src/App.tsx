import { FC } from 'react';
import { Outlet } from 'react-router-dom';

import style from '@style/App.module.scss';

export const App: FC = () => {
  return (
    <div className={style.app}>
      <div>All is up and running</div>
      <Outlet />
    </div>
  );
};
