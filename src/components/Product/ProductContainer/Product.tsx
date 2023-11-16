import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { getProductDetails, getProductInfo } from '@helpers';
import { Rating, Error } from '@components';

import { ProductTooltips } from '../ProductTooltips';
import { ProductGallery } from '../ProductGallery';
import { ProductInfo } from '../ProductInfo';
import { ProductToolbar } from '../ProductToolbar';

import style from './Product.module.scss';

const DEFAULT_DESCRIPTION = `Carrots from Tomissy Farm are one of the best on the market.
Tomisso and his family are giving a full love to his Bio products.
To misso’s carrots are growing on the fields naturally. *****`;

const DEFAULT_SIZES = 'all sizes ???';

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
    return <span>Loading ...</span>;
  }

  if (error) {
    return <Error errorMessage={error} />;
  }

  if (!product) return null;

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

  const buyByOptions = Object.keys(buyBy);
  const stockInfo = `${stock.amount} ${stock.measure}`;
  const buyByInfo = buyByOptions.join(', ');
  const deliveryInfo = `${delivery.timeframe} days`;
  const deliveryArea = delivery.area.join(', ');

  const productDetailsList = getProductDetails(
    originCountry,
    category,
    brand,
    stockInfo,
  );

  const productInfoList = getProductInfo(
    DEFAULT_SIZES,
    buyByInfo,
    deliveryInfo,
    deliveryArea,
  );

  const reviewsCount = `(${reviews.length} Customer review)`;

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {/* LEFT SECTION */}
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

        {/* RIGHT SECTION */}
        <div className={style.right_section}>
          {/* INFO CONTAINER */}
          <article className={style.info_wrapper}>
            <div className={style.info_header}>
              <h1 className={style.title}>{productTitle}</h1>
              <div className={style.reviews}>
                <Rating rating={rating} />
                <span className={style.reviews_count}>{reviewsCount}</span>
              </div>
            </div>

            <p className={style.description}>
              {DEFAULT_DESCRIPTION + description.long}
            </p>

            <div className={style.additional_info}>
              <ProductInfo infoList={productDetailsList} />
              <ProductInfo infoList={productInfoList} />
            </div>

            <ProductToolbar />
          </article>

          {/* DESCRIPTIONS  REVIEWS QUESTIONS */}
          <div>TABS</div>
        </div>
      </div>

      {/* SUGGESTED PRODUCTS */}
      <div>maybe love products</div>
    </div>
  );
};
