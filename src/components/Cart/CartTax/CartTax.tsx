import { FC } from 'react';

import { PRICE_DECIMALS } from '@constants';

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
    subtotal: `${subTotal.toFixed(PRICE_DECIMALS)} ${currency}`,
    promo: `${promoPercent}% ${promoAmount.toFixed(
      PRICE_DECIMALS,
    )} ${currency}`,
    tax: `${taxPercent}% ${taxAmount.toFixed(PRICE_DECIMALS)} ${currency}`,
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
