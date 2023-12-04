import { ChangeEvent, FC, useEffect } from 'react';

import {
  INITIAL_BILLING_FORM_ERRORS,
  BILLING_FORM_VALIDATIONS,
  ButtonVariants,
  ButtonSizes,
  TYPE_CHECKBOX,
} from '@constants';
import { BillingInputProps, FormInputEvent } from '@types';
import { useAddressAutocomplete, useValidations } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import { CustomButton } from '@components';

import { CartBillingInfo } from '../CartBillingInfo';
import { CartAdditionalInfo } from '../CartAdditionalInfo';
import { CartConfirmations } from '../CartConfirmations';

import style from './CartContainer.module.scss';

export const Cart: FC = () => {
  const { billingInfo } = useAppSelector((state) => state.cart);
  const { setBillingInfo } = useActions();

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
    window.alert('Form has been submitted successfully!!!');
  };

  const isValidForm =
    !marketingAgreement ||
    !termsOfUse ||
    !!Object.values(errors).find((error) => !!error) ||
    !!Object.values(autocompleteErrors).find((error) => !!error);

  useEffect(() => {
    Object.entries({ ...inputValues, orderNotes }).forEach(([name, value]) => {
      validateInput(name, String(value), BILLING_FORM_VALIDATIONS[name]);
    });
  }, []);

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

      <section className={style.order}>
        <h2>Cart lots here</h2>
      </section>
    </form>
  );
};
