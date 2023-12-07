import { FC } from 'react';

import { formatPrice } from '@helpers';

import style from './CartTax.module.scss';

interface CartTaxProps {
  subTotal: number;
  taxAmount: number;
  taxPercent: number;
  promoPercent: number;
  promoAmount: number;
  currency: string;
}

export const CartTax: FC<CartTaxProps> = ({
  subTotal,
  taxAmount,
  taxPercent,
  promoPercent,
  promoAmount,
  currency,
}) => {
  const taxInfo = Object.entries({
    subtotal: formatPrice(subTotal, currency),
    promo: `${promoPercent}% ${formatPrice(promoAmount, currency)}`,
    tax: `${taxPercent}% ${formatPrice(taxAmount, currency)}`,
  });

  return (
    <ul className={style.sub_total}>
      {taxInfo.map(([title, info]) => (
        <li
          key={title}
          className={style.item}
        >
          <span className={style.title}>{title}</span>
          <span>{info}</span>
        </li>
      ))}
    </ul>
  );
};
