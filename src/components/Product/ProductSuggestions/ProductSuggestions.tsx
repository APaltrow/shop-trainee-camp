import { FC } from 'react';

import { useAppSelector } from '@redux';
import { Carousel } from '@components';

import { ProductSuggestion } from './ProductSuggestion';

import style from './ProductSuggestions.module.scss';

export const ProductSuggestions: FC = () => {
  const { product } = useAppSelector((state) => state.product);
  const { productsList } = useAppSelector((state) => state.products);

  if (!product) return null;

  const suggestionsList = productsList.filter(({ category, productId }) => {
    const isSameCategory = category === product.category;
    const isSameProduct = productId === product.productId;

    return isSameCategory && !isSameProduct;
  });

  return (
    <section className={style.container}>
      <h3 className={style.title}>You will maybe love</h3>

      <Carousel>
        {suggestionsList.map((suggestedProduct) => (
          <li key={suggestedProduct.productId}>
            <ProductSuggestion product={suggestedProduct} />
          </li>
        ))}
      </Carousel>
    </section>
  );
};
