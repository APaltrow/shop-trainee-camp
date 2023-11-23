import { FC } from 'react';

import { Icon } from '@components';
import { IconsTypes } from '@constants';

import style from './Image.module.scss';

export const ImageSkeleton: FC = () => {
  return (
    <div className={style.img_skeleton}>
      <Icon iconName={IconsTypes.CAMERA} />
    </div>
  );
};
