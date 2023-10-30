import { FC } from 'react';

import { CONTACT_LINKS, INFO_LINKS } from '@constants';
import { Accordion } from '@components';

import style from './HeaderInfo.module.scss';

export const HeaderInfo: FC = () => {
  return (
    // <Accordion>
    <nav className={style.container}>
      <ul>
        {CONTACT_LINKS.map(({ id, link, text }) => (
          <li key={id}>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
      <ul>
        {INFO_LINKS.map(({ id, text, link }) => (
          <li key={id}>
            <a href={link}>{text}</a>
          </li>
        ))}
      </ul>
    </nav>
    //   </Accordion>
  );
};
