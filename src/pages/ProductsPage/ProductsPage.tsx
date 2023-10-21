import { FC } from 'react';

import { IconsTypes, ButtonSizes, ButtonVariants } from '@constants';
import { CustomButton, Icon, Rating } from '@components';

import style from './ProductsPage.module.scss';

export const ProductsPage: FC = () => {
  const productsList = new Array(10).fill('Product Item #');

  return (
    <div>
      <section className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <span className={style.count}>117</span>
          <span>Products</span>
        </div>
      </section>

      <section className={style.products_container}>
        <ul className={style.products_list}>
          {productsList.map((product, idx) => (
            <li key={`${product} ${idx + 1}`}>
              <div className={style.product_item_container}>
                <div className={style.img_container}>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/9/91/Pizza-3007395.jpg"
                    alt="pizza"
                  />
                </div>

                <article className={style.content_container}>
                  <div className={style.product_info}>
                    <div className={style.description}>
                      <h2>Product title - {idx + 1}</h2>
                      <p>Space for a small product description</p>
                      <Rating rating={4} />
                    </div>
                    <div className={style.additional_info_container}>
                      <ul className={style.additional_info}>
                        <li>Freshness</li>
                        <li>Brand</li>
                        <li>Delivery</li>
                        <li>Stock</li>
                      </ul>
                      <ul className={style.additional_info}>
                        <li>New (Extra fresh)</li>
                        <li>Dominos</li>
                        <li>Europe</li>
                        <li>320 pcs</li>
                      </ul>
                    </div>
                  </div>

                  <div className={style.price_and_delivery_container}>
                    <div className={style.price}>
                      <p>36.99 USD</p>
                      <span>48.56</span>
                    </div>

                    <div className={style.delivery_info}>
                      <p>Free Shipping</p>
                      <span>Delivery in 1 day</span>
                    </div>

                    <div className={style.btns}>
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
          <span className={style.count}>336</span>
          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
