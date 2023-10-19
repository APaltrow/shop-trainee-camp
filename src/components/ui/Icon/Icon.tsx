import { FC } from 'react';

import { IconsTypes } from '@constants';
import sprites from '@assets/sprites.svg';

import style from './Icon.module.scss';

interface IconProps {
  iconName: IconsTypes;
}

export const Icon: FC<IconProps> = ({ iconName }) => {
  return (
    <svg className={style.container}>
      <use href={`${sprites}#${iconName}`} />
    </svg>
  );
};
