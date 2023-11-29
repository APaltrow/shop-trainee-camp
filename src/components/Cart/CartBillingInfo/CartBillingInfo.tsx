import { FC } from 'react';

import { BILLING_FORM_INPUTS, BillingFormInfo } from '@constants';
import { BillingInputProps, FormInputEvent } from '@types';
import { CustomInput } from '@components';

import { CartFieldset } from '../CartFieldset';

import style from './CartBillingInfo.module.scss';

interface CartBillingInfoProps {
  getInputProps: (name: string) => BillingInputProps;
  onInputChange: (e: FormInputEvent) => void;
}

export const CartBillingInfo: FC<CartBillingInfoProps> = ({
  getInputProps,
  onInputChange,
}) => {
  return (
    <CartFieldset
      legend={BillingFormInfo.BILLING_LEGEND}
      info={BillingFormInfo.BILLING_INFO}
    >
      <div className={style.form_grid}>
        {BILLING_FORM_INPUTS.map(({ name, type, label, placeholder }) => {
          const { value, error, autocomplete, readonly } = getInputProps(name);

          return (
            <CustomInput
              key={name}
              label={label}
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              error={error}
              isDisabled={readonly}
              optionsList={autocomplete}
              onChange={onInputChange}
            />
          );
        })}
      </div>
    </CartFieldset>
  );
};
