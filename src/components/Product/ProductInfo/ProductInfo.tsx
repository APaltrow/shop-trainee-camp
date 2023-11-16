import { FC } from 'react';

import style from './ProductInfo.module.scss';

interface ProductInfoProps {
  infoList: string[][];
}

export const ProductInfo: FC<ProductInfoProps> = ({ infoList }) => {
  return (
    <ul className={style.list}>
      {infoList.map(([title, text]) => (
        <li
          key={title}
          className={style.item}
        >
          <span className={style.title}>{title}:</span>
          <span className={style.text}>{text}</span>
        </li>
      ))}
    </ul>
  );
};
