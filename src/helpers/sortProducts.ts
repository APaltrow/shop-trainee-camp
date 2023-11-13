import { SortOrder, SortProperty } from '@constants';
import { getActualProductPrice, compareTitles } from '@helpers';
import { IProduct, ISort } from '@types';

export const sortProducts = (products: IProduct[], sort: ISort | null) => {
  if (!products.length) return products;
  if (!sort) return products;

  const { property, order } = sort;

  return [...products].sort((firstProduct, secondProduct) => {
    const isAscendingOrder = order === SortOrder.ASCENDING;

    if (property === SortProperty.TITLE) {
      const firstTitle = firstProduct.productTitle;
      const secondTitle = secondProduct.productTitle;

      return isAscendingOrder
        ? compareTitles(firstTitle, secondTitle)
        : compareTitles(secondTitle, firstTitle);
    }

    if (property === SortProperty.PRICE) {
      const firstPrice = getActualProductPrice(firstProduct.price);
      const secondPrice = getActualProductPrice(secondProduct.price);

      return isAscendingOrder
        ? firstPrice - secondPrice
        : secondPrice - firstPrice;
    }

    const firstRating = firstProduct.rating;
    const secondRating = secondProduct.rating;

    return isAscendingOrder
      ? firstRating - secondRating
      : secondRating - firstRating;
  });
};
