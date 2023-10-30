import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IProduct } from '@types';
import { ButtonSizes, ButtonVariants, IconsTypes } from '@constants';
import { Accordion, CustomButton, Icon, Rating, Image } from '@components';

import style from './ProductsItem.module.scss';

interface ProductsItemProps {
  product: IProduct;
}

const FREE_SHIPPING = 'Free Shipping';
const PRICE_DESCIMALS = 2;

export const ProductsItem: FC<ProductsItemProps> = ({ product }) => {
  const {
    imgs,
    stock,
    price,
    brands,
    rating,
    delivery,
    productId,
    description,
    productTitle,
    originCountry,
  } = product;

  const productPrice = price.discount
    ? price.discountedAmount.toFixed(PRICE_DESCIMALS)
    : price.amount.toFixed(PRICE_DESCIMALS);

  const productOriginalPrice = price.amount.toFixed(PRICE_DESCIMALS);

  const deliveryCost = delivery.cost
    ? `${delivery.cost} ${price.currency}`
    : FREE_SHIPPING;

  const deliveryTime = `Delivery in ${delivery.timeframe} day${
    delivery.timeframe > 1 ? 's' : ''
  }`;

  const additionalInfoDTO = {
    origin: originCountry,
    brand: brands.join(', '),
    delivery: delivery.area.join(', '),
    stock: `${stock.amount} ${stock.measure}`,
  };

  const additionalInfoList = Object.entries(additionalInfoDTO);

  return (
    <article className={style.container}>
      <Image
        src={imgs[0]}
        alt={productTitle}
      />

      <div className={style.content}>
        <div className={style.info}>
          <div className={style.description}>
            <h2>{productTitle}</h2>
            <p>{description.short}</p>
            <Rating rating={rating} />
          </div>

          <div className={style.additional_info_container}>
            <ul className={style.additional_info}>
              {additionalInfoList.map(([infoTitle, info]) => (
                <li className={style.additional_info_item}>
                  <span>{infoTitle}</span>
                  <span>{info}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* <Accordion>
            <div className={style.additional_info_container}>
              <ul className={style.additional_info}>
                <li>Origin</li>
                <li>Brand</li>
                <li>Delivery</li>
                <li>Stock</li>
              </ul>
              <ul className={style.additional_info}>
                <li>{originCountry}</li>
                <li>{brands.join(', ')}</li>
                <li>{delivery.area.join(', ')}</li>
                <li>{`${stock.amount} ${stock.measure}`}</li>
              </ul>
            </div>
              </Accordion> */}
        </div>

        <div className={style.price_and_delivery_container}>
          <div className={style.price}>
            <p>{`${productPrice} ${price.currency}`}</p>

            {price.discount ? <span>{productOriginalPrice}</span> : null}
          </div>

          <div className={style.delivery_info}>
            <p>{deliveryCost}</p>
            <span>{deliveryTime}</span>
          </div>

          <div className={style.buttons}>
            <NavLink to={productId}>
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
              onClick={() => {}}
            >
              <Icon iconName={IconsTypes.HEART} />
              Add to wish list
            </CustomButton>
          </div>
        </div>
      </div>
    </article>
  );
};
