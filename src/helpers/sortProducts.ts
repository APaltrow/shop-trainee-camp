import { SortOrder, SortProperty } from '@constants';
import { IPrice, IProduct, ISort } from '@types';

export const sortProducts = (products: IProduct[], sort: ISort | null) => {
  if (!sort) return products;

  const { property, order } = sort;
  const key = property as keyof IProduct;

  return products.sort((firstProduct, secondProduct) => {
    let firstProp: number | IPrice;
    let secondProp: number | IPrice;

    if (property === SortProperty.PRICE) {
      const firstPrice = firstProduct[key] as IPrice;
      const secondPrice = secondProduct[key] as IPrice;

      firstProp = firstPrice.discount
        ? firstPrice.discountedAmount
        : firstPrice.amount;

      secondProp = secondPrice.discount
        ? secondPrice.discountedAmount
        : secondPrice.amount;
    } else {
      firstProp = firstProduct[key] as number;
      secondProp = secondProduct[key] as number;
    }

    const onAscending = firstProp - secondProp;
    const onDescending = secondProp - firstProp;

    return order === SortOrder.ASCENDING ? onAscending : onDescending;
  });
};
