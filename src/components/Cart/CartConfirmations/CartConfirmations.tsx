import { FC } from 'react';

import { BillingFormInfo, BillingFormInputs } from '@constants';
import { FormInputEvent } from '@types';
import { Checkbox } from '@components';

import { CartFieldset } from '../CartFieldset';

import style from './CartConfirmations.module.scss';

interface CartConfirmationsProps {
  onInputChange: (e: FormInputEvent) => void;
  marketingAgreement: boolean;
  termsOfUse: boolean;
}

export const CartConfirmations: FC<CartConfirmationsProps> = ({
  onInputChange,
  marketingAgreement,
  termsOfUse,
}) => {
  return (
    <CartFieldset
      legend={BillingFormInfo.CONFIRMATION_LEGEND}
      info={BillingFormInfo.CONFIRMATION_INFO}
    >
      <div className={style.checkboxes}>
        <div className={style.checkbox}>
          <Checkbox
            isChecked={marketingAgreement as boolean}
            name={BillingFormInputs.MARKETING_AGREEMENT}
            onChange={onInputChange}
          >
            <span className={style.marketing}>{BillingFormInfo.AGREEMENT}</span>
          </Checkbox>
        </div>

        <div className={style.checkbox}>
          <Checkbox
            isChecked={termsOfUse as boolean}
            name={BillingFormInputs.TERMS_OF_USE}
            onChange={onInputChange}
          >
            <span className={style.agreement}>
              I agree with our
              <a
                href="#"
                className={style.agreement_links}
              >
                terms and conditions
              </a>
              and
              <a
                href="#"
                className={style.agreement_links}
              >
                privacy policy.
              </a>
            </span>
          </Checkbox>
        </div>
      </div>
    </CartFieldset>
  );
};
