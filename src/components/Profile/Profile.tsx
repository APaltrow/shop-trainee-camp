import { FC } from 'react';

import { useAppSelector } from '@redux';
import { useFirebase } from '@hooks';
import {
  AVATAR_ALT,
  ButtonSizes,
  ButtonVariants,
  IconsTypes,
} from '@constants';
import { CustomButton, CustomImage, Icon } from '@components';

import defaultImg from '@assets/imgPlaceholder.png';

import style from './Profile.module.scss';

export const Profile: FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { onLogout } = useFirebase();

  if (!user) return null;

  const { photoURL, email, displayName } = user;

  return (
    <section className={style.container}>
      <h1 className={style.title}>Profile</h1>
      <article className={style.info}>
        <div className={style.avatar}>
          <CustomImage
            fullSize
            src={photoURL || defaultImg}
            alt={displayName || AVATAR_ALT}
          />
        </div>

        <h2>{displayName}</h2>
        <p className={style.text}>{email}</p>

        <CustomButton
          onClick={onLogout}
          size={ButtonSizes.MID}
          variant={ButtonVariants.SECONDARY}
        >
          <Icon iconName={IconsTypes.GOOGLE} />
          Logout
        </CustomButton>
      </article>
    </section>
  );
};
