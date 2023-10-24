import { IProduct } from '@types';

type Categories = Record<string, string[]>;

export const getCategories = (productsList: IProduct[]) => {
  return productsList.reduce((acc, { category, brands }) => {
    const formattedBrands = brands.map(({ brandName }) => brandName);

    const allBrands: string[] = acc[category]
      ? [...acc[category], ...formattedBrands]
      : formattedBrands;

    const uniqueBrands = new Set<string>(allBrands);

    acc[category] = [...uniqueBrands];

    return acc;
  }, {} as Categories);
};
