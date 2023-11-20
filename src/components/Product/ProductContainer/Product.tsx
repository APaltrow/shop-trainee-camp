import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { ErrorsMessages, LIST_DIVIDER } from '@constants';
import { checkIfPlural, getProductDetails, getProductInfo } from '@helpers';
import { Rating, Error, InfoTooltip } from '@components';

import { ProductTooltips } from '../ProductTooltips';
import { ProductGallery } from '../ProductGallery';
import { ProductInfo } from '../ProductInfo';
import { ProductToolbar } from '../ProductToolbar';
import { ProductSkeleton } from '../ProductSkeleton';

import style from './Product.module.scss';

export const Product: FC = () => {
  const { product, isLoading, error } = useAppSelector(
    (state) => state.product,
  );

  const { id } = useParams();
  const { fetchProductThunk } = useActions();

  useEffect(() => {
    if (!id) return;

    fetchProductThunk(id);
  }, [id]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (!product)
    return <Error errorMessage={ErrorsMessages.PRODUCT_DOES_NOT_EXIST} />;

  const {
    imgs,
    productTitle,
    rating,
    reviews,
    description,
    price,
    delivery,
    originCountry,
    category,
    brand,
    buyBy,
    stock,
  } = product;

  const { timeframe } = delivery;

  const buyByOptions = Object.keys(buyBy);
  const stockInfo = `${stock.amount} ${stock.measure}`;
  const buyByInfo = buyByOptions.join(LIST_DIVIDER);
  const deliveryInfo = `${timeframe} ${checkIfPlural('day', timeframe)} `;
  const deliveryArea = delivery.area.join(LIST_DIVIDER);
  const reviewsCount = reviews.length;

  const reviewsInfo = `(${reviewsCount} ${checkIfPlural(
    'Customer review',
    reviewsCount,
  )})`;

  const productDetailsList = getProductDetails(
    originCountry,
    category,
    brand,
    stockInfo,
  );

  const productInfoList = getProductInfo(buyByInfo, deliveryInfo, deliveryArea);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <div className={style.left_section}>
          <ProductTooltips
            discount={price.discount}
            isFreeDelivery={!delivery.cost}
          />

          <ProductGallery
            imgs={imgs}
            alt={productTitle}
          />
        </div>

        <div className={style.right_section}>
          <article className={style.info_wrapper}>
            <div className={style.info_header}>
              <h1 className={style.title}>{productTitle}</h1>
              <div className={style.reviews}>
                <Rating rating={rating} />
                <span className={style.reviews_count}>{reviewsInfo}</span>
              </div>
            </div>

            <p className={style.description}>{description.long}</p>

            <div className={style.additional_info}>
              <ProductInfo infoList={productDetailsList} />
              <ProductInfo infoList={productInfoList} />
            </div>

            <ProductToolbar />
          </article>

          {/* DESCRIPTIONS  REVIEWS QUESTIONS */}

          <div className={style.details_container}>
            <ul className={style.details}>
              <li className={`${style.details_item} ${style.active}`}>
                <h3>Description</h3>
              </li>
              <li className={style.details_item}>
                <h3>Reviews</h3>
                <InfoTooltip info="5" />
              </li>
              <li className={style.details_item}>
                <h3>Questions</h3>
                <InfoTooltip info="3" />
              </li>
            </ul>

            <div>
              <h4>Origins</h4>
              <p>
                We work hard to ensure that the fruit and vegetables we sell are
                fresh and high in quality. If we don’t grow them ourselves, we
                source them from carefully chosen suppliers, preferring to buy
                locally whenever possible.
              </p>

              <h4>How to cook</h4>
              <p>
                From roasts, salads and soups to casseroles and cakes, Carrots
                will lend sweetness, texture and colour to an enormous number of
                recipes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
    </div>
  );
};
