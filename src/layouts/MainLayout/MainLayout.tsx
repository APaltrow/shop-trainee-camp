import { FC, ReactNode } from 'react';

import { Footer, Header } from '@components';

import style from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={style.container}>{children}</main>
      <Footer />
    </>
  );
};
