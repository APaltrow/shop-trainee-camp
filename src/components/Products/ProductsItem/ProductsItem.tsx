import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IProduct } from '@types';
import { ButtonSizes, ButtonVariants, IconsTypes } from '@constants';
import { calculateDiscount } from '@helpers';
import {
  Accordion,
  AccordionPositions,
  CustomButton,
  Icon,
  Rating,
  Image,
} from '@components';

import style from './ProductsItem.module.scss';

interface ProductsItemProps {
  product: IProduct;
}

const FREE_SHIPPING = 'Free Shipping';

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

  const actualPrice = price.discount
    ? calculateDiscount(price.amount, price.discount)
    : price.amount;

  const productPrice = price.discount ? actualPrice : price.amount;

  const deliveryCost = delivery.cost
    ? `${delivery.cost} ${price.currency}`
    : FREE_SHIPPING;

  const deliveryTime = `Delivery in ${delivery.timeframe} day${
    delivery.timeframe > 1 ? 's' : ''
  }`;

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
          <Accordion position={AccordionPositions.RIGHT}>
            <div className={style.additional_info_container}>
              <ul className={style.additional_info}>
                <li>Origin</li>
                <li>Brand</li>
                <li>Delivery</li>
                <li>Stock</li>
              </ul>
              <ul className={style.additional_info}>
                <li>{originCountry}</li>
                <li>{brands[0].brandName}</li>
                <li>{delivery.area[0]}</li>
                <li>{`${stock.amount} ${stock.measure}`}</li>
              </ul>
            </div>
          </Accordion>
        </div>

        <div className={style.price_and_delivery_container}>
          <div className={style.price}>
            <p>{`${productPrice} ${price.currency}`}</p>

            {price.discount ? <span>{price.amount.toFixed(2)}</span> : null}
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