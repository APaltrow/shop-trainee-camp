import { FC, useEffect } from 'react';

import { useActions, useAppSelector } from '@redux';
import { IconsTypes, ButtonSizes, ButtonVariants } from '@constants';
import {
  Accordion,
  CustomButton,
  Icon,
  InfoTooltip,
  Rating,
} from '@components';

import style from './ProductsPage.module.scss';

export const ProductsPage: FC = () => {
  const { productsList, isLoading, error } = useAppSelector(
    (state) => state.products,
  );

  const { fetchProductsThunk } = useActions();

  useEffect(() => {
    fetchProductsThunk();
  }, []);

  if (isLoading) {
    return <h2>Loading ....</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <section className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={productsList.length} />
          <span>Products</span>
        </div>
      </section>

      <section className={style.products_container}>
        <ul className={style.products_list}>
          {productsList.map((product) => (
            <li key={product.productId}>
              <div className={style.product_item_container}>
                <div className={style.img_container}>
                  <img
                    src={product.imgs[0]}
                    alt="pizza"
                  />
                </div>

                <article className={style.content_container}>
                  <div className={style.product_info}>
                    <div className={style.description}>
                      <h2>{product.productTitle}</h2>
                      <p>{product.description.short}</p>
                      <Rating rating={product.rating} />
                    </div>
                    <Accordion>
                      <div className={style.additional_info_container}>
                        <ul className={style.additional_info}>
                          <li>Origin</li>
                          <li>Brand</li>
                          <li>Delivery</li>
                          <li>Stock</li>
                        </ul>
                        <ul className={style.additional_info}>
                          <li>{product.originCountry}</li>
                          <li>{product.brands[0].brandName}</li>
                          <li>{product.delivery.area[0]}</li>
                          <li>{`${product.stock.amount} ${product.stock.measure}`}</li>
                        </ul>
                      </div>
                    </Accordion>
                  </div>

                  <div className={style.price_and_delivery_container}>
                    <div className={style.price}>
                      <p>{`${product.price.amount} ${product.price.currency}`}</p>
                      <span>{product.price.discount} %</span>
                    </div>

                    <div className={style.delivery_info}>
                      <p>
                        {product.delivery.cost
                          ? `${product.delivery.cost} ${product.price.currency}`
                          : 'Free Shipping'}
                      </p>
                      <span>Delivery in {product.delivery.timeframe} day</span>
                    </div>

                    <div className={style.btns}>
                      <div className={style.arrow}>
                        <CustomButton
                          variant={ButtonVariants.PRIMARY}
                          size={ButtonSizes.MID}
                          onClick={() => {}}
                        >
                          Product details
                          <Icon iconName={IconsTypes.ARROW_DOWN} />
                        </CustomButton>
                      </div>

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
                </article>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <div className={style.footer}>
        <p>Page: 1 2 3 4 5</p>

        <CustomButton
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
          onClick={() => {}}
        >
          Show more products
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </CustomButton>

        <div className={style.totals}>
          <InfoTooltip info={336} />
          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
