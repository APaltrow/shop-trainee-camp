import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { ErrorsMessages, LIST_DIVIDER } from '@constants';
import { checkIfPlural, getProductDetails } from '@helpers';
import { Rating, Error } from '@components';

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
    buyByInfo,
    deliveryInfo,
    deliveryArea,
  );

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
            <ProductInfo infoList={productDetailsList} />
            <ProductToolbar />
          </article>

          {/* DESCRIPTIONS  REVIEWS QUESTIONS */}
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
    </div>
  );
};
