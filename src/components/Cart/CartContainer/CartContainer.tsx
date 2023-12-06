import { ChangeEvent, FC, useEffect, useState } from 'react';

import {
  ButtonSizes,
  ButtonVariants,
  TYPE_CHECKBOX,
  PRICE_DECIMALS,
  INITIAL_BILLING_FORM_ERRORS,
  BILLING_FORM_VALIDATIONS,
} from '@constants';
import { BillingInputProps, FormInputEvent } from '@types';
import { useAddressAutocomplete, useCartTotals, useValidations } from '@hooks';
import { getGuaranteedDeliveryDate } from '@helpers';
import { useActions, useAppSelector } from '@redux';
import { CustomButton } from '@components';

import { CartBillingInfo } from '../CartBillingInfo';
import { CartAdditionalInfo } from '../CartAdditionalInfo';
import { CartConfirmations } from '../CartConfirmations';

import { CartOrders } from '../CartOrders';
import { CartPromo } from '../CartPromo';
import { CartTax } from '../CartTax';
import { CartFormSubmitted } from '../CartFormSubmitted';

import style from './CartContainer.module.scss';

export const Cart: FC = () => {
  const { billingInfo, orders } = useAppSelector((state) => state.cart);
  const { setBillingInfo, resetBillingInfo, resetOrders } = useActions();
  const {
    currency,
    subTotal,
    taxAmount,
    taxPercent,
    totalAmount,
    promoDiscountPercent,
    promoDiscountAmount,
    addPromoDiscount,
  } = useCartTotals();

  const [isFormSubmitted, setFormSubmitted] = useState(false);

  const { termsOfUse, marketingAgreement, orderNotes, ...inputValues } =
    billingInfo;

  const { inputLists, errors: autocompleteErrors } = useAddressAutocomplete(
    billingInfo.stateOrCountry as string,
    billingInfo.townOrCity as string,
  );

  const {
    errors,

    validateInput,
  } = useValidations(INITIAL_BILLING_FORM_ERRORS);

  const onInputChange = (e: FormInputEvent) => {
    const { name, value, type } = e.target;

    if (type === TYPE_CHECKBOX) {
      const textAreaEvent = e as ChangeEvent<HTMLInputElement>;
      const { checked } = textAreaEvent.target;

      setBillingInfo([name, checked]);
      return;
    }

    const inputValidations = BILLING_FORM_VALIDATIONS[name];

    validateInput(name, value, inputValidations);

    setBillingInfo([name, value]);
  };

  const onAutocompleteSelect = (name: string, option: string) => {
    const inputValidations = BILLING_FORM_VALIDATIONS[name];

    validateInput(name, option, inputValidations);
    setBillingInfo([name, option]);
  };

  const getInputProps = (name: string): BillingInputProps => {
    const readonlyDTO: Record<string, boolean> = {
      townOrCity: !!autocompleteErrors.stateOrCountry,
      zipOrPostalCode: !!autocompleteErrors.townOrCity,
      address: !!autocompleteErrors.townOrCity,
    };

    const inputValue = inputValues[name] as string;
    const inputError = errors[name];
    const autocompleteError = autocompleteErrors[name];
    const inputOptions = inputLists[name];
    const isDisabled = readonlyDTO[name];

    return {
      value: inputValue,
      error: inputError || autocompleteError,
      autocomplete: inputOptions,
      readonly: isDisabled,
    };
  };

  const onFormSubmit = () => {
    resetBillingInfo();
    resetOrders();
    setFormSubmitted(true);
  };

  const isValidForm =
    !marketingAgreement ||
    !termsOfUse ||
    !orders.length ||
    !!Object.values(errors).find((error) => !!error) ||
    !!Object.values(autocompleteErrors).find((error) => !!error);

  const guaranteedDeliveryDate = getGuaranteedDeliveryDate(orders);

  const totalAmountWithCurrency = `${totalAmount.toFixed(
    PRICE_DECIMALS,
  )} ${currency}`;

  useEffect(() => {
    Object.entries({ ...inputValues, orderNotes }).forEach(([name, value]) => {
      validateInput(name, String(value), BILLING_FORM_VALIDATIONS[name]);
    });
  }, []);

  if (isFormSubmitted) {
    return <CartFormSubmitted />;
  }

  return (
    <form
      className={style.form}
      onSubmit={(e) => e.preventDefault()}
    >
      <div className={style.container}>
        <CartBillingInfo
          getInputProps={getInputProps}
          onInputChange={onInputChange}
          onSelect={onAutocompleteSelect}
        />

        <CartAdditionalInfo
          error={errors.orderNotes}
          value={orderNotes as string}
          onInputChange={onInputChange}
        />

        <CartConfirmations
          onInputChange={onInputChange}
          marketingAgreement={!!marketingAgreement}
          termsOfUse={!!termsOfUse}
        />

        <div className={style.submit}>
          <CustomButton
            isDisabled={isValidForm}
            onClick={onFormSubmit}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Complete order
          </CustomButton>
        </div>
      </div>

      <div>
        <section className={style.order}>
          <div className={style.order_header}>
            <h2 className={style.order_title}>Order summary</h2>
            <p className={style.order_text}>
              Price can change depending on shipping method and taxes of your
              state.
            </p>
          </div>

          <CartOrders />

          <div className={style.order_tax}>
            <CartTax
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              taxPercent={taxPercent}
              promoPercent={promoDiscountPercent}
              promoAmount={promoDiscountAmount}
            />

            <CartPromo
              isPromoApplied={!!promoDiscountPercent}
              onPromoDiscount={addPromoDiscount}
            />
          </div>

          <div className={style.order_total}>
            <div>
              <p className={style.order_total_title}>Total Order</p>
              {!!orders.length && (
                <p className={style.order_total_delivery}>
                  <span>Guaranteed delivery day:</span>
                  <span>{guaranteedDeliveryDate}</span>
                </p>
              )}
            </div>

            <p className={style.order_total_price}>{totalAmountWithCurrency}</p>
          </div>
        </section>
      </div>
    </form>
  );
};
