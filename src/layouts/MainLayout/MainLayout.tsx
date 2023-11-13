import { FC, ReactNode, useEffect } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ErrorsMessages } from '@constants';
import { useActions } from '@redux';
import { Footer, Header, Error } from '@components';

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
    <ErrorBoundary
      fallback={<Error errorMessage={ErrorsMessages.CONTACT_SUPPORT} />}
    >
      <Header />
      <main className={style.container}>{children}</main>
      <Footer />
    </ErrorBoundary>
  );
};
