import { IProduct } from '@types';

export const getCategories = (productsList: IProduct[]) => {
  const categories = new Set<string>();

  productsList.forEach(({ category }) => {
    categories.add(category);
  });

  return [...categories];
};
