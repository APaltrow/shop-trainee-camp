import { FC } from 'react';

import { PRICE_DECIMALS } from '@constants';

import style from './CartTax.module.scss';

interface CartTaxProps {
  subTotal: number;
  taxAmount: number;
  taxPercent: number;
  promoPercent: number;
  promoAmount: number;
}

export const CartTax: FC<CartTaxProps> = ({
  subTotal,
  taxAmount,
  taxPercent,
  promoPercent,
  promoAmount,
}) => {
  const subTotalWithCurrency = `${subTotal.toFixed(PRICE_DECIMALS)} USD`;

  const taxAmountAndPercent = `${taxPercent}% ${taxAmount.toFixed(
    PRICE_DECIMALS,
  )} USD`;

  const promoAmountAndPercent = `${promoPercent}% ${promoAmount.toFixed(
    PRICE_DECIMALS,
  )} USD`;

  return (
    <div className={style.sub_total}>
      <p className={style.item}>
        <span>Subtotal</span>
        <span>{subTotalWithCurrency}</span>
      </p>
      {!!promoPercent && (
        <p className={style.item}>
          <span>Promo</span>
          <span>{promoAmountAndPercent}</span>
        </p>
      )}
      <p className={style.item}>
        <span>Tax</span>
        <span>{taxAmountAndPercent}</span>
      </p>
    </div>
  );
};
