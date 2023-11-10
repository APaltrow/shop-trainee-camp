import { IPriceRange } from '@types';

export interface ProductsFilterState {
  activeCategory: null | string;
  activeBrands: string[];
  activeRatings: number[];
  priceRange: IPriceRange;
  activePriceRange: IPriceRange;
  searchValue: string;
}
