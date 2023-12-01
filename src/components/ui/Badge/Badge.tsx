import { FC, ReactNode } from 'react';

import style from './Badge.module.scss';

interface BadgeProps {
  info: number;
  children: ReactNode;
}

export const Badge: FC<BadgeProps> = ({ info, children }) => {
  return (
    <span className={style.wrapper}>
      {!!info && <span className={style.info}>{info}</span>}
      {children}
    </span>
  );
};
