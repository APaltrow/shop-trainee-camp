import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { ErrorsMessages, LIST_DIVIDER } from '@constants';
import { formatPlural, getProductDetails, scrollToTop } from '@helpers';
import { Rating, Error, Tabs } from '@components';

import { ProductTooltips } from '../ProductTooltips';
import { ProductGallery } from '../ProductGallery';
import { ProductInfo } from '../ProductInfo';
import { ProductToolbar } from '../ProductToolbar';
import { ProductSkeleton } from '../ProductSkeleton';
import { ProductDescription } from '../ProductDescription';
import { ProductComments } from '../ProductComments';
import { ProductSuggestions } from '../ProductSuggestions';

import style from './Product.module.scss';

export const Product: FC = () => {
  const { product, additionalInfo, isLoading, error } = useAppSelector(
    (state) => state.product,
  );

  const { id } = useParams();
  const { fetchProductThunk } = useActions();

  useEffect(() => {
    if (!id) return;

    scrollToTop();

    fetchProductThunk(id);
  }, [id]);

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (!product || !additionalInfo) {
    return <Error errorMessage={ErrorsMessages.PRODUCT_DOES_NOT_EXIST} />;
  }

  const {
    imgs,
    productTitle,
    rating,
    description,
    price,
    delivery,
    originCountry,
    category,
    brand,
    buyBy,
    stock,
  } = product;

  const { reviews, questions, description: fullDescription } = additionalInfo;

  const { timeframe } = delivery;

  const buyByOptions = Object.keys(buyBy);
  const stockInfo = `${stock.amount} ${stock.measure}`;
  const buyByInfo = buyByOptions.join(LIST_DIVIDER);
  const deliveryInfo = `${timeframe} ${formatPlural('day', timeframe)} `;
  const deliveryArea = delivery.area.join(LIST_DIVIDER);
  const reviewsCount = reviews.length;

  const reviewsInfo = `(${reviewsCount} ${formatPlural(
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

  const tabsCountDTO = {
    description: null,
    reviews: reviewsCount,
    questions: questions.length,
  };

  const tabsElementsDTO = {
    description: (
      <ProductDescription description={Object.entries(fullDescription)} />
    ),
    reviews: <ProductComments list={reviews} />,
    questions: <ProductComments list={questions} />,
  };

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

          <Tabs
            tabsCount={tabsCountDTO}
            tabsElements={tabsElementsDTO}
          />
        </div>
      </div>

      <ProductSuggestions />
    </div>
  );
};
