import { FC } from 'react';

import { useFirebase } from '@hooks';
import { ButtonSizes, ButtonVariants, IconsTypes } from '@constants';
import { CustomButton, Icon } from '@components';

import style from './Login.module.scss';

export const Login: FC = () => {
  const { onLogin } = useFirebase();

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
