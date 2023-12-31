import { Categories, IProduct } from '@types';

export const getCategories = (productsList: IProduct[]) => {
  return productsList.reduce((acc, { category, brand }) => {
    const allBrands: string[] = acc[category]
      ? [...acc[category], brand]
      : [brand];

    const uniqueBrands = new Set<string>(allBrands);

    acc[category] = [...uniqueBrands];

    return acc;
  }, {} as Categories);
};
