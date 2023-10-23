import { FC } from 'react';

import style from './InfoTooltip.module.scss';

interface InfoTooltipProps {
  info: string | number;
}

export const InfoTooltip: FC<InfoTooltipProps> = ({ info }) => {
  return <span className={style.container}>{info}</span>;
};
