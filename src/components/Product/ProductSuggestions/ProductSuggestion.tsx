import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { IProduct } from '@types';
import { formatPrice, getActualProductPrice } from '@helpers';
import {
  ButtonSizes,
  ButtonVariants,
  PRICE_DECIMALS,
  RoutesPaths,
  ZERO_INDEX,
} from '@constants';

import { CustomButton, InfoTooltip, CustomImage } from '@components';

import style from './ProductSuggestions.module.scss';

interface ProductSuggestionProps {
  product: IProduct;
}

export const ProductSuggestion: FC<ProductSuggestionProps> = ({ product }) => {
  const { imgs, productTitle, description, price, productId } = product;

  const { discount, amount, currency } = price;
  const imgUrl = imgs[ZERO_INDEX];
  const navPath = `../${RoutesPaths.ALL_PRODUCTS}/${productId}`;
  const actualPrice = formatPrice(getActualProductPrice(price), currency);
  const priceBeforeDiscount = formatPrice(amount, currency);

  return (
    <article className={style.carousel_item}>
      <NavLink to={navPath}>
        <div className={style.img_container}>
          <CustomImage
            src={imgUrl}
            alt={productTitle}
            fullSize
          />

          {!!discount && (
            <span className={style.discount}>
              <InfoTooltip info={`- ${discount} %`} />
            </span>
          )}
        </div>
      </NavLink>

      <div className={style.item_info}>
        <NavLink to={navPath}>
          <h4 className={style.item_title}>{productTitle}</h4>
        </NavLink>

        <p className={style.item_description}>{description.short}</p>
      </div>

      <div className={style.item_price_container}>
        <div className={style.item_prices}>
          <p className={style.item_price}>{actualPrice}</p>
          {!!discount && (
            <p className={style.item_price_discounted}>{priceBeforeDiscount}</p>
          )}
        </div>

        <NavLink to={navPath}>
          <CustomButton
            onClick={() => {}}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.SMALL}
          >
            Buy now
          </CustomButton>
        </NavLink>
      </div>
    </article>
  );
};
