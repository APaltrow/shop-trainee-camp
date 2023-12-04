import { FC } from 'react';

import { usePromoCode } from '@hooks';
import { PROMO_CODES, PromoInput } from '@constants';
import { CustomButton, CustomInput } from '@components';

import style from './CartPromo.module.scss';

interface CartPromoProps {
  isPromoApplied: boolean;

  onPromoDiscount: (percent: number) => void;
}

export const CartPromo: FC<CartPromoProps> = ({
  isPromoApplied,

  onPromoDiscount,
}) => {
  const {
    promoCode,
    promoError,

    onPromoChange,
  } = usePromoCode(PROMO_CODES);

  const onPromoApply = () => {
    if (!promoCode) return;

    const discountPercent = PROMO_CODES[promoCode];

    onPromoDiscount(discountPercent);
  };

  return (
    <div className={style.container}>
      <CustomInput
        value={promoCode}
        error={promoError}
        name={PromoInput.NAME}
        isDisabled={isPromoApplied}
        placeholder={PromoInput.PLACEHOLDER}
        onChange={onPromoChange}
      />

      {!isPromoApplied && (
        <span className={style.btn}>
          <CustomButton
            isDisabled={!!promoError}
            onClick={onPromoApply}
          >
            Apply now
          </CustomButton>
        </span>
      )}
    </div>
  );
};
