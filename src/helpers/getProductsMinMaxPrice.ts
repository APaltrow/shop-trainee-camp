import { IPriceRange, IProduct } from '@types';

export const getProductsMinMaxPrice = (products: IProduct[]): IPriceRange => {
  if (!products.length) return { min: 0, max: 0 };

  const { discount, discountedAmount, amount } = products[0].price;
  const initialPrice = discount ? discountedAmount : amount;

  let currentMinPrice = initialPrice;
  let currentMaxPrice = initialPrice;

  products.forEach(({ price }) => {
    const { discount, discountedAmount, amount } = price;

    if (discount) {
      currentMinPrice =
        discountedAmount < currentMinPrice ? discountedAmount : currentMinPrice;

      currentMaxPrice =
        discountedAmount > currentMaxPrice ? discountedAmount : currentMaxPrice;
    } else {
      currentMinPrice = amount < currentMinPrice ? amount : currentMinPrice;

      currentMaxPrice = amount > currentMaxPrice ? amount : currentMaxPrice;
    }
  });

  return { min: currentMinPrice, max: currentMaxPrice };
};
