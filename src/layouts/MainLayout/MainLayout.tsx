import { FC, ReactNode, useEffect } from 'react';

import { useActions } from '@redux';
import { Footer, Header } from '@components';

import style from './MainLayout.module.scss';

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  const { fetchProductsThunk } = useActions();

  useEffect(() => {
    fetchProductsThunk();
  }, []);

  return (
    <>
      <Header />
      <main className={style.container}>{children}</main>
      <Footer />
    </>
  );
};
