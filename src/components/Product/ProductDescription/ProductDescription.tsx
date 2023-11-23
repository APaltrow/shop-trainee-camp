import { FC } from 'react';

import style from './ProductDescription.module.scss';

interface DescriptionProps {
  description: [string, string][];
}

export const ProductDescription: FC<DescriptionProps> = ({
  description = [],
}) => {
  return (
    <ul className={style.container}>
      {description.map(([title, text]) => (
        <li key={title}>
          <article className={style.section}>
            <h4 className={style.title}>{title}</h4>
            <p className={style.text}>{text}</p>
          </article>
        </li>
      ))}
    </ul>
  );
};
