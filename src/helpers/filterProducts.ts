import { IProduct } from '@types';

export const filterProducts = {
  byCategory: (products: IProduct[], activeCategory: string | null) => {
    if (!activeCategory) return products;

    return products.filter(({ category }) => category === activeCategory);
  },
  byBrands: (products: IProduct[], activeBrands: string[]) => {
    if (!activeBrands.length) return products;

    return products.filter(({ brand }) => activeBrands.includes(brand));
  },
  byRatings: (products: IProduct[], activeRatings: number[]) => {
    if (!activeRatings.length) return products;

    return products.filter(({ rating }) => activeRatings.includes(rating));
  },
  bySearchValue: (products: IProduct[], searchValue: string) => {
    if (!searchValue) return products;

    return products.filter(({ productTitle }) =>
      productTitle.toLowerCase().includes(searchValue.toLowerCase()),
    );
  },
};
