import { ZERO_INDEX } from '@constants';
import { IPriceRange, IProduct } from '@types';
import { getActualProductPrice } from '@helpers';

export const getProductsMinMaxPrice = (products: IProduct[]): IPriceRange => {
  if (!products.length) return { min: 0, max: 0 };

  const initialPrice = getActualProductPrice(products[ZERO_INDEX].price);

  let currentMinPrice = initialPrice;
  let currentMaxPrice = initialPrice;

  products.forEach(({ price }) => {
    const actualPrice = getActualProductPrice(price);

    currentMinPrice =
      actualPrice < currentMinPrice ? actualPrice : currentMinPrice;
    currentMaxPrice =
      actualPrice > currentMaxPrice ? actualPrice : currentMaxPrice;
  });

  return { min: currentMinPrice, max: currentMaxPrice };
};
