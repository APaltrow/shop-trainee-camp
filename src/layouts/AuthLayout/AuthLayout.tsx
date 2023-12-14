import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { NavigationPaths } from '@constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  if (!isAuth) return <Navigate to={`../${NavigationPaths.LOGIN}`} />;

  return children;
};
