import { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useAppSelector } from '@redux';
import {
  IconsTypes,
  ButtonSizes,
  ButtonVariants,
  UnitsErrors,
} from '@constants';

import { useProductToolbar } from '@hooks';
import { CustomButton, Icon, UnitsSelect } from '@components';

import style from './ProductToolbar.module.scss';

export const ProductToolbar: FC = () => {
  const { product } = useAppSelector((state) => state.product);

  if (!product) return null;

  const {
    unitsMax,
    unitsInfo,
    unitsError,
    unitsAmount,
    buyByOptions,
    unitsInProp,
    itemsInCartMsg,
    totalDue,
    totalBeforeDiscount,
    buyByActiveOption,

    isUnitsInfoVisible,
    isSoldOut,

    onUnitsAmountChange,
    onActiveBuyByChange,
    onAddToCart,
  } = useProductToolbar(product);

  const soldOutError = isSoldOut ? UnitsErrors.SOLD_OUT : null;
  const isDisabled = !!unitsError || isSoldOut;
  const error = soldOutError || unitsError;

  return (
    <div className={style.container}>
      {!!itemsInCartMsg && (
        <span
          className={style.cart_msg}
        >{`* In the cart: ${itemsInCartMsg}`}</span>
      )}
      <div className={style.toolbar}>
        <div className={style.prices}>
          <p className={style.due_amount}>{totalDue}</p>

          {!!totalBeforeDiscount && (
            <p className={style.discount}>{totalBeforeDiscount}</p>
          )}
        </div>

        <UnitsSelect
          unitsMax={unitsMax}
          error={error}
          unitsInProp={unitsInProp || ''}
          unitsAmount={unitsAmount}
          unitsInfo={unitsInfo || ''}
          isUnitsInfoVisible={isUnitsInfoVisible}
          options={buyByOptions}
          selected={buyByActiveOption}
          isDisabled={!!soldOutError}
          onUnitsAmountChange={onUnitsAmountChange}
          onSelect={onActiveBuyByChange}
        />

        <CustomButton
          isDisabled={isDisabled}
          onClick={onAddToCart}
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
        >
          <span className={style.add_icon}>
            <Icon iconName={IconsTypes.PLUS} />
          </span>
          Add to cart
        </CustomButton>
      </div>

      <CustomButton onClick={() => {}}>
        <Icon iconName={IconsTypes.HEART} />
        Add to my wishlist
      </CustomButton>

      <ToastContainer autoClose={1300} />
    </div>
  );
};
