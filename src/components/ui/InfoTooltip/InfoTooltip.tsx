import { FC } from 'react';

import style from './InfoTooltip.module.scss';

interface InfoTooltipProps {
  info: string;
  isBig?: boolean;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ info, isBig = false }) => {
  return (
    <span className={`${style.container} ${isBig ? style.big : style.small}`}>
      {info}
    </span>
  );
};
