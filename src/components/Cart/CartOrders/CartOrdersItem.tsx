import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import {
  AlertMessages,
  IconsTypes,
  PRICE_DECIMALS,
  RoutesPaths,
  SelectVariants,
  ZERO_INDEX,
} from '@constants';
import { useActions, useAppSelector } from '@redux';
import { IOrderItem } from '@types';
import { useAlert } from '@hooks';
import {
  BinarySection,
  CustomButton,
  CustomImage,
  CustomSelect,
  Icon,
  Rating,
  Alert,
} from '@components';

import style from './CartOrders.module.scss';

interface CartOrdersItemProps {
  cartItem: IOrderItem;
}

export const CartOrdersItem: FC<CartOrdersItemProps> = ({ cartItem }) => {
  const products = useAppSelector((state) => state.products.productsList);

  const { removeOrderItem } = useActions();
  const { alert, onAlertCall, onAlertCancel } = useAlert();

  const product = products.find(
    ({ productId }) => productId === cartItem.productId,
  );

  if (!product) return null;

  const { imgs, productTitle, category, brand, rating, buyBy } = product;

  const totalDueAmount = `${cartItem.totalCost.toFixed(PRICE_DECIMALS)} ${
    cartItem.currency
  }`;

  const navPath = `../${RoutesPaths.ALL_PRODUCTS}/${cartItem.productId}`;

  const handleRemoveItem = (lotId: string) => {
    onAlertCall({
      text: AlertMessages.REMOVE_PRODUCT,
      onConfirm: () => {
        removeOrderItem(lotId);
        onAlertCancel();
      },
    });
  };

  return (
    <article className={style.container}>
      <div className={style.left}>
        <NavLink to={navPath}>
          <div className={style.img}>
            <CustomImage
              fullSize
              src={imgs[ZERO_INDEX]}
              alt={productTitle}
            />
          </div>
        </NavLink>

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

      <div className={style.right}>
        <div className={style.description}>
          <NavLink to={navPath}>
            <h3 className={style.title}>{productTitle}</h3>
          </NavLink>

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
          <div>
            <BinarySection
              leftElement={
                <input
                  value={cartItem.totalQuantity}
                  className={style.input}
                />
              }
              rightElement={
                <CustomSelect
                  options={Object.keys(buyBy)}
                  selected={cartItem.measure}
                  variant={SelectVariants.DEFAULT}
                  onChange={() => {}}
                />
              }
            />
          </div>
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
