import { FC, ReactNode } from 'react';

import style from './SidebarBlock.module.scss';

interface SidebarBlockProps {
  title: string;
  children: ReactNode;
}

export const SidebarBlock: FC<SidebarBlockProps> = ({ title, children }) => {
  return (
    <div className={style.container}>
      <h4 className={style.title}>{title}</h4>
      {children}
    </div>
  );
};
