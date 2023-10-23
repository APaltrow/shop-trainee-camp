import { FC } from 'react';

import { FOOTER_LINKS } from '@constants';
import { Accordion, AccordionPositions } from '@components';

import style from './Footer.module.scss';

const DEFAULT_COUNT = 10;
const DEFAULT_NAME = 'Tag';

export const Footer: FC = () => {
  const tagsList = new Array(DEFAULT_COUNT).fill(DEFAULT_NAME);

  return (
    <footer className={style.container}>
      <section className={style.nav_container}>
        {FOOTER_LINKS.map(({ title, links }) => (
          <nav key={`footer_links_${title}`}>
            <Accordion
              title={title}
              position={AccordionPositions.RIGHT}
            >
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

      <section className={style.tags_container}>
        <h4>Product tags</h4>
        <ul className={style.tags_list}>
          {tagsList.map((tag, idx) => {
            const tagString = `${tag}_#${idx + 1}`;
            return (
              <li
                key={tagString}
                className={style.tag_item}
              >
                {tagString}
              </li>
            );
          })}
        </ul>
      </section>

      <p className={style.copyright}>© Reenbit - trainee camp™ 2023</p>
    </footer>
  );
};
