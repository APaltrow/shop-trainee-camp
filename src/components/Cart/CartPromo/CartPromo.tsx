import { ChangeEvent, FC, useState } from 'react';

import { CustomButton, CustomInput } from '@components';

import style from './CartPromo.module.scss';

const PROMO_CODES: Record<string, number> = {
  'XYZ-000': 5,
  'XYZ-111': 8,
  'XYZ-222': 10,
};

const PROMO_ERROR = 'Invalid promo code';
const NO_ERROR = '';
const PROMO_PLACEHOLDER = 'Apply promo code';

interface CartPromoProps {
  isPromoApplied: boolean;

  onPromoDiscount: (percent: number) => void;
}

export const CartPromo: FC<CartPromoProps> = ({
  isPromoApplied,

  onPromoDiscount,
}) => {
  const [promoCode, setPromocode] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string>(PROMO_ERROR);

  const onPromoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromocode(value);

    const isPromoCodeValid = value in PROMO_CODES;

    if (isPromoCodeValid) {
      setPromoError(NO_ERROR);
    } else {
      setPromoError(PROMO_ERROR);
    }
  };

  const onPromoApply = () => {
    if (!promoCode) return;

    const discountPercent = PROMO_CODES[promoCode];

    onPromoDiscount(discountPercent);
  };

  return (
    <div className={style.container}>
      <CustomInput
        name="promo"
        isDisabled={isPromoApplied}
        value={promoCode || ''}
        type="text"
        error={promoError}
        placeholder={PROMO_PLACEHOLDER}
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
