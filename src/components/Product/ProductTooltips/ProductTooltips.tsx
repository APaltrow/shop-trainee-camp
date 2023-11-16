import { FC } from 'react';

import { InfoTooltip } from '@components';
import { FREE_SHIPPING } from '@constants';

import style from './ProductTooltips.module.scss';

interface ProductTooltipsProps {
  discount: number;
  isFreeDelivery: boolean;
}

export const ProductTooltips: FC<ProductTooltipsProps> = ({
  discount,
  isFreeDelivery,
}) => {
  if (!discount && !isFreeDelivery) return null;

  const discountInfo = `- ${discount} %`;

  return (
    <div className={style.info_tags}>
      {!!discount && (
        <InfoTooltip
          info={discountInfo}
          isBig
        />
      )}

      {isFreeDelivery && (
        <InfoTooltip
          info={FREE_SHIPPING}
          isBig
        />
      )}
    </div>
  );
};
