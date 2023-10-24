import { FC } from 'react';

import { FOOTER_LINKS } from '@constants';
import { Accordion } from '@components';

import { TagsList } from '../TagsList';

import style from './Footer.module.scss';

export const Footer: FC = () => {
  return (
    <footer className={style.container}>
      <section className={style.nav_container}>
        {FOOTER_LINKS.map(({ title, links }) => (
          <nav key={`footer_links_${title}`}>
            <Accordion title={title}>
              <ul className={style.nav_list}>
                {links.map(({ id, link, text }) => (
                  <li key={id}>
                    <a href={link}>{text}</a>
                  </li>
                ))}
              </ul>
            </Accordion>
          </nav>
        ))}
      </section>

      <TagsList />

      <p className={style.copyright}>© Reenbit - trainee camp™ 2023</p>
    </footer>
  );
};
