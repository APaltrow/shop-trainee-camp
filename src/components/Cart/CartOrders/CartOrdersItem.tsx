import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { AlertMessages, IconsTypes, RoutesPaths, ZERO_INDEX } from '@constants';
import { useActions, useAppSelector } from '@redux';
import { IOrderItem, IProduct } from '@types';
import { formatPrice, generateLotId } from '@helpers';
import { useAlert, useProductToolbar } from '@hooks';
import {
  CustomButton,
  CustomImage,
  Icon,
  Rating,
  Alert,
  InfoTooltip,
  UnitsSelect,
} from '@components';

import style from './CartOrders.module.scss';

interface CartOrdersItemProps {
  cartItem: IOrderItem;
  product: IProduct;
}

export const CartOrdersItem: FC<CartOrdersItemProps> = ({
  cartItem,
  product,
}) => {
  const { orders } = useAppSelector((state) => state.cart);

  const { removeOrderItem } = useActions();
  const { alert, onAlertCall, onAlertCancel } = useAlert();

  const {
    unitsMax,
    unitsError,
    unitsAmount,
    buyByOptions,
    buyByActiveOption,

    mergeLotsInCart,
    swapLotsInCart,
    onUnitsAmountChangeInCart,
    onUnitsInputBlur,
  } = useProductToolbar(product, cartItem.totalQuantity, cartItem.measure);

  const { imgs, productTitle, category, brand, rating, price } = product;
  const totalDueAmount = formatPrice(cartItem.totalCost, cartItem.currency);

  const imgUrl = imgs[ZERO_INDEX];
  const navPath = `../${RoutesPaths.ALL_PRODUCTS}/${cartItem.productId}`;
  const discount = price.discount ? `- ${price.discount} %` : null;

  const handleRemoveItem = (lotId: string) => {
    onAlertCall({
      text: AlertMessages.REMOVE_PRODUCT,
      onConfirm: () => {
        removeOrderItem(lotId);
        onAlertCancel();
      },
    });
  };

  const handleMeasureChange = (option: string) => {
    const lotIdToSearch = generateLotId([product.productId, option]);
    const isInCart = orders.find(({ lotId }) => lotId === lotIdToSearch);

    if (isInCart) {
      onAlertCall({
        text: `You already have ${isInCart.totalQuantity} ${isInCart.measure}, would you like to merge?`,
        onConfirm: () => {
          mergeLotsInCart(option, lotIdToSearch, cartItem.lotId);
          onAlertCancel();
        },
      });
    } else {
      swapLotsInCart(option, cartItem.lotId);
    }
  };

  return (
    <article className={style.container}>
      <div className={style.left}>
        <NavLink to={navPath}>
          <div className={style.img}>
            <CustomImage
              fullSize
              src={imgUrl}
              alt={productTitle}
            />
            {!!discount && (
              <span className={style.discount}>
                <InfoTooltip info={discount} />
              </span>
            )}
          </div>
        </NavLink>

        <div className={style.btns}>
          <CustomButton onClick={() => {}}>
            <span className={style.icon_heart}>
              <Icon iconName={IconsTypes.HEART} />
            </span>

            <span className={style.btn}>Wishlist</span>
          </CustomButton>

          <CustomButton onClick={() => handleRemoveItem(cartItem.lotId)}>
            <Icon iconName={IconsTypes.CLOSE} />
            <span className={style.btn}>Remove</span>
          </CustomButton>
        </div>
      </div>

      <div className={style.right}>
        <div className={style.description}>
          <h3 className={style.title}>
            <NavLink to={navPath}>{productTitle}</NavLink>
          </h3>

          <ul className={style.description_list}>
            <li className={style.description_item}>
              <span className={style.description_title}>Brand: </span>
              <span className={style.description_text}>{brand}</span>
            </li>
            <li className={style.description_item}>
              <span className={style.description_title}>Category: </span>
              <span className={style.description_text}>{category}</span>
            </li>
          </ul>
          <Rating
            rating={rating}
            isActive
          />
        </div>

        <div className={style.price_section}>
          <p className={style.price}>{totalDueAmount}</p>
          <UnitsSelect
            unitsMax={unitsMax}
            unitsAmount={unitsAmount}
            error={unitsError}
            options={buyByOptions}
            selected={buyByActiveOption}
            onUnitsAmountChange={onUnitsAmountChangeInCart}
            onSelect={handleMeasureChange}
            onBlur={onUnitsInputBlur}
          />
        </div>
      </div>

      {!!alert && (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      )}
    </article>
  );
};
