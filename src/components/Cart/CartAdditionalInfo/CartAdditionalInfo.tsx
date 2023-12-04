import { FC } from 'react';

import { FormInputEvent } from '@types';
import { BillingFormInfo, BillingFormInputs } from '@constants';
import { CustomTextarea } from '@components';

import { CartFieldset } from '../CartFieldset';

interface CartAdditionalInfoProps {
  error: string;
  value: string;
  onInputChange: (e: FormInputEvent) => void;
}

export const CartAdditionalInfo: FC<CartAdditionalInfoProps> = ({
  onInputChange,
  value,
  error,
}) => {
  return (
    <CartFieldset
      legend={BillingFormInfo.INFORMATIONS_LEGEND}
      info={BillingFormInfo.INFORMATIONS_INFO}
    >
      <CustomTextarea
        label={BillingFormInfo.ORDER_NOTES_LABEL}
        error={error}
        value={value}
        name={BillingFormInputs.ORDER_NOTES}
        placeholder={BillingFormInfo.ORDER_NOTES_PLACEHOLDER}
        onChange={onInputChange}
      />
    </CartFieldset>
  );
};
