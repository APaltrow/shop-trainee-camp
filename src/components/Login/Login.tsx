import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useFirebase } from '@hooks';
import { useAppSelector } from '@redux';
import {
  ButtonSizes,
  ButtonVariants,
  IconsTypes,
  NavigationPaths,
} from '@constants';
import { CustomButton, Icon } from '@components';

import style from './Login.module.scss';

export const Login: FC = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { onLogin } = useFirebase();

  const location = useLocation();

  if (isAuth) {
    return (
      <Navigate to={`../${location?.state?.prevUrl || NavigationPaths.HOME}`} />
    );
  }

  return (
    <article className={style.container}>
      <h1 className={style.title}>Login</h1>
      <div className={style.login_section}>
        <p className={style.text}>Please sign in to proceed</p>

        <CustomButton
          onClick={onLogin}
          size={ButtonSizes.MID}
          variant={ButtonVariants.SECONDARY}
        >
          <Icon iconName={IconsTypes.GOOGLE} />
          Login with Google
        </CustomButton>
      </div>
    </article>
  );
};
