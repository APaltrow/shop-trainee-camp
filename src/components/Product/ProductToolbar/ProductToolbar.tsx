import { FC } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useAppSelector } from '@redux';
import {
  IconsTypes,
  ButtonSizes,
  ButtonVariants,
  UnitsErrors,
  WishlistTypes,
} from '@constants';

import { useProductToolbar, useWishlist } from '@hooks';
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

  const { onWishlistToggle, checkIsInWishlist } = useWishlist();

  const soldOutError = isSoldOut ? UnitsErrors.SOLD_OUT : null;
  const isDisabled = !!unitsError || isSoldOut;
  const error = soldOutError || unitsError;

  const isWishlisted = checkIsInWishlist(product.productId);

  const handleWishlist = () => onWishlistToggle(product.productId);

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

      <CustomButton onClick={handleWishlist}>
        <Icon
          iconName={isWishlisted ? IconsTypes.HEART_FULL : IconsTypes.HEART}
        />
        {isWishlisted ? WishlistTypes.ADDED : WishlistTypes.ADD}
      </CustomButton>

      <ToastContainer autoClose={1300} />
    </div>
  );
};
