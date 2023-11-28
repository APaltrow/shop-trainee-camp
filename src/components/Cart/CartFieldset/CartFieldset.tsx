import { FC, ReactNode } from 'react';

import style from './CartFieldset.module.scss';

interface CartFieldsetProps {
  children: ReactNode;
  legend: string;
  info: string;
}

export const CartFieldset: FC<CartFieldsetProps> = ({
  children,
  legend,
  info,
}) => {
  return (
    <fieldset className={style.container}>
      <div>
        <legend className={style.legend}>{legend}</legend>
        <p className={style.info}>{info}</p>
      </div>
      {children}
    </fieldset>
  );
};
