import { FC } from 'react';

import { FOOTER_LINKS } from '@constants';
import { Accordion } from '@components';

import style from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={style.container}>
      <nav className={style.nav_container}>
        {FOOTER_LINKS.map(({ title, links }) => (
          <div key={`footer_links_${title}`}>
            <h4 className={style.nav_title}>{title}</h4>
            <Accordion>
              <ul className={style.nav_list}>
                {links.map(({ id, link, text }) => (
                  <li key={id}>
                    <a href={link}>{text}</a>
                  </li>
                ))}
              </ul>
            </Accordion>
          </div>
        ))}
      </nav>
    </footer>
  );
};
