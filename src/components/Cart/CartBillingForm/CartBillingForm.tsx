import { ChangeEvent, FC, useEffect } from 'react';

import {
  INITIAL_BILLING_FORM_ERRORS,
  BILLING_FORM_VALIDATIONS,
  BILLING_FORM_INPUTS,
  BillingFormInputs,
  BillingFormInfo,
  ButtonVariants,
  ButtonSizes,
  TYPE_CHECKBOX,
} from '@constants';
import { FormInputEvent } from '@types';
import { useAddressAutocomplete, useValidations } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import {
  Checkbox,
  CustomButton,
  CustomInput,
  CustomTextarea,
} from '@components';

import { CartFieldset } from '../CartFieldset';

import style from './CartBillingForm.module.scss';

export const CartBillingForm: FC = () => {
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

  const getInputProps = (name: string) => {
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
      <CartFieldset
        legend={BillingFormInfo.BILLING_LEGEND}
        info={BillingFormInfo.BILLING_INFO}
      >
        <div className={style.form_grid}>
          {BILLING_FORM_INPUTS.map(({ name, type, label, placeholder }) => {
            const { value, error, autocomplete, readonly } =
              getInputProps(name);

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

      <CartFieldset
        legend={BillingFormInfo.INFORMATIONS_LEGEND}
        info={BillingFormInfo.INFORMATIONS_INFO}
      >
        <CustomTextarea
          label={BillingFormInfo.ORDER_NOTES_LABEL}
          error={errors.orderNotes}
          value={orderNotes as string}
          name={BillingFormInputs.ORDER_NOTES}
          placeholder={BillingFormInfo.ORDER_NOTES_PLACEHOLDER}
          onChange={onInputChange}
        />
      </CartFieldset>

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
              <span className={style.marketing}>
                {BillingFormInfo.AGREEMENT}
              </span>
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
      </CartFieldset>
    </form>
  );
};
