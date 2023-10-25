import { IProduct } from '@types';

export const filterProducts = {
  byCategory: (products: IProduct[], activeCategory: string | null) => {
    if (!activeCategory) return products;

    return products.filter(({ category }) => category === activeCategory);
  },
  byBrands: (products: IProduct[], activeBrands: string[]) => {
    if (!activeBrands.length) return products;

    return products.filter(({ brands }) =>
      brands.some((brand: string) => activeBrands.includes(brand)),
    );
  },
  bySearchValue: (products: IProduct[], searchValue: string) => {
    if (!searchValue) return products;

    return products.filter(({ productTitle }) =>
      productTitle.toLowerCase().includes(searchValue.toLowerCase()),
    );
  },
};
