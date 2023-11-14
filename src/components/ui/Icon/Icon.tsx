import { FC } from 'react';

import { IconSizes, IconsTypes } from '@constants';
import sprites from '@assets/sprites.svg';

import style from './Icon.module.scss';

interface IconProps {
  iconName: IconsTypes;
  size?: IconSizes;
}

export const Icon: FC<IconProps> = ({ iconName, size = IconSizes.MID }) => {
  const classes = `${style.container} ${style[size]}`;

  return (
    <svg className={classes}>
      <use href={`${sprites}#${iconName}`} />
    </svg>
  );
};
