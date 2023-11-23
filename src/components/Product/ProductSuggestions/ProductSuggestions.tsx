import { FC } from 'react';

import { useProductSuggestions } from '@hooks';
import { Carousel } from '@components';

import { ProductSuggestion } from './ProductSuggestion';

import style from './ProductSuggestions.module.scss';

export const ProductSuggestions: FC = () => {
  const suggestions = useProductSuggestions();

  if (!suggestions) return null;

  const { suggestionsList } = suggestions;

  if (!suggestionsList.length) return null;

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
