import { IPriceRange, ISort } from '@types';

export interface ProductsFilterState {
  activeCategory: null | string;
  activeBrands: string[];
  activeRatings: number[];
  priceRange: IPriceRange;
  activePriceRange: IPriceRange;
  sort: null | ISort;
  searchValue: string;
}
