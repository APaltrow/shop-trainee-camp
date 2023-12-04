import { ChangeEvent, useState } from 'react';

import { PromoErrors } from '@constants';

export const usePromoCode = (promoCodes: Record<string, number>) => {
  const [promoCode, setPromocode] = useState<string>('');
  const [promoError, setPromoError] = useState<string>(
    PromoErrors.INVALID_PROMO,
  );

  const onPromoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPromocode(value);

    const isPromoCodeValid = value in promoCodes;

    if (isPromoCodeValid) {
      setPromoError(PromoErrors.NO_ERROR);
    } else {
      setPromoError(PromoErrors.INVALID_PROMO);
    }
  };

  return {
    promoCode,
    promoError,

    onPromoChange,
  };
};
