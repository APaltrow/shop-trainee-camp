import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IProduct } from '@types';
import {
  formatPrice,
  getActualProductPrice,
  getAdditionalInfo,
  getDeliveryCost,
  getDeliveryTime,
} from '@helpers';
import { useWishlist } from '@hooks';
import {
  ButtonSizes,
  ButtonVariants,
  IconsTypes,
  LIST_DIVIDER,
  NavigationPaths,
  WishlistTypes,
  ZERO_INDEX,
} from '@constants';
import { CustomButton, Icon, Rating, CustomImage } from '@components';

import style from './ProductsItem.module.scss';

interface ProductsItemProps {
  product: IProduct;
}

export const ProductsItem: FC<ProductsItemProps> = ({ product }) => {
  const {
    imgs,
    stock,
    price,
    brand,
    rating,
    delivery,
    productId,
    description,
    productTitle,
    originCountry,
  } = product;

  const { onWishlistToggle, checkIsInWishlist } = useWishlist();

  const productOriginalPrice = formatPrice(price.amount, price.currency);
  const productPrice = formatPrice(
    getActualProductPrice(price),
    price.currency,
  );
  const deliveryCost = getDeliveryCost(delivery.cost, price.currency);
  const deliveryTime = getDeliveryTime(delivery.timeframe);
  const additionalInfoList = getAdditionalInfo(
    originCountry,
    brand,
    delivery.area.join(LIST_DIVIDER),
    stock,
  );

  const navPath = `../${NavigationPaths.ALL_PRODUCTS}/${productId}`;

  const isWishlisted = checkIsInWishlist(productId);

  const handleWishlist = () => onWishlistToggle(productId);

  return (
    <article className={style.container}>
      <NavLink to={navPath}>
        <CustomImage
          src={imgs[ZERO_INDEX]}
          alt={productTitle}
        />
      </NavLink>

      <div className={style.content}>
        <div className={style.info}>
          <div className={style.description}>
            <h2 className={style.title}>
              <NavLink to={navPath}>{productTitle}</NavLink>
            </h2>

            <p className={style.description_short}>{description.short}</p>
            <Rating rating={rating} />
          </div>

          <ul className={style.additional_info}>
            {additionalInfoList.map(([infoTitle, info]) => (
              <li
                className={style.additional_info_item}
                key={`info_${infoTitle}`}
              >
                <span>{infoTitle}</span>
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={style.price_and_delivery_container}>
          <div className={style.price}>
            <p>{productPrice}</p>

            {!!price.discount && (
              <p className={style.old_price}>{productOriginalPrice}</p>
            )}
          </div>

          <div className={style.delivery_info}>
            <p>{deliveryCost}</p>
            <p>{deliveryTime}</p>
          </div>

          <div className={style.buttons}>
            <NavLink to={navPath}>
              <span className={style.arrow}>
                <CustomButton
                  variant={ButtonVariants.PRIMARY}
                  size={ButtonSizes.MID}
                  onClick={() => {}}
                >
                  Product details
                  <Icon iconName={IconsTypes.ARROW_DOWN} />
                </CustomButton>
              </span>
            </NavLink>

            <CustomButton
              variant={ButtonVariants.SECONDARY}
              size={ButtonSizes.MID}
              onClick={handleWishlist}
            >
              <Icon
                iconName={
                  isWishlisted ? IconsTypes.HEART_FULL : IconsTypes.HEART
                }
              />
              {isWishlisted ? WishlistTypes.ADDED : WishlistTypes.ADD}
            </CustomButton>
          </div>
        </div>
      </div>
    </article>
  );
};
