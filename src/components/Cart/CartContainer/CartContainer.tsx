import { ChangeEvent, FC, useEffect } from 'react';

import {
  INITIAL_BILLING_FORM_ERRORS,
  BILLING_FORM_VALIDATIONS,
  ButtonVariants,
  ButtonSizes,
  TYPE_CHECKBOX,
  IconsTypes,
} from '@constants';
import { BillingInputProps, FormInputEvent } from '@types';
import { useAddressAutocomplete, useValidations } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import {
  CustomButton,
  CustomImage,
  CustomInput,
  Icon,
  Rating,
} from '@components';

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
        <div>
          <h2 className={style.order_title}>Order summary</h2>
          <p className={style.order_text}>
            Price can change depending on shipping method and taxes of your
            state.
          </p>
        </div>
        <ul className={style.order_list}>
          {[...new Array(3)].map((_, idx) => (
            <li key={idx}>
              <article className={style.order_item}>
                <div className={style.order_item_left}>
                  <div className={style.order_item_img}>
                    <CustomImage
                      fullSize
                      src="https://images.pexels.com/photos/15469650/pexels-photo-15469650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    />
                  </div>

                  <CustomButton>
                    <span className={style.order_item_icon_heart}>
                      <Icon iconName={IconsTypes.HEART} />
                    </span>

                    <span className={style.order_item_btn}>Wishlist</span>
                  </CustomButton>

                  <CustomButton>
                    <Icon iconName={IconsTypes.CLOSE} />
                    <span className={style.order_item_btn}>Remove</span>
                  </CustomButton>
                </div>
                <div className={style.order_item_right}>
                  <div className={style.order_item_description}>
                    <h3 className={style.order_item_title}>Product Title</h3>
                    <ul className={style.order_item_list}>
                      <li>
                        <span>Farm: </span>
                        <span>Tharamis Farm</span>
                      </li>
                      <li>
                        <span>Freshness: </span>
                        <span>1 day old</span>
                      </li>
                    </ul>
                    <Rating
                      rating={4}
                      isActive
                    />
                  </div>

                  <div className={style.order_item_price_section}>
                    <p className={style.order_item_price}>36.99 USD</p>
                    <span>SELECT here</span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className={style.order_tax}>
          <div className={style.order_sub_total}>
            <p className={style.order_sub_total_item}>
              <span>Subtotal</span>
              <span>73.98 USD</span>
            </p>
            <p className={style.order_sub_total_item}>
              <span>Tax</span>
              <span>17% 16.53 USD</span>
            </p>
          </div>

          <div className={style.promo_code}>
            <CustomInput placeholder="Apply promo code" />

            <span className={style.apply_btn}>
              <CustomButton onClick={() => {}}>Apply now</CustomButton>
            </span>
          </div>
        </div>

        <div className={style.order_total}>
          <div>
            <p className={style.order_total_title}>Total Order</p>
            <p className={style.order_total_delivery}>
              Guaranteed delivery day: June 12, 2020
            </p>
          </div>

          <p className={style.order_total_price}>89.84 USD</p>
        </div>
      </section>
    </form>
  );
};
