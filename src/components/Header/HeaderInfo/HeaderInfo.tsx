import { FC } from 'react';

import { CONTACT_LINKS, INFO_LINKS } from '@constants';

import style from './HeaderInfo.module.scss';

export const HeaderInfo: FC = () => {
  return (
    <nav className={style.container}>
      <ul className={style.list}>
        {CONTACT_LINKS.map(({ id, link, text }) => (
          <li key={id}>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
      <ul className={style.list}>
        {INFO_LINKS.map(({ id, text, link }) => (
          <li key={id}>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
