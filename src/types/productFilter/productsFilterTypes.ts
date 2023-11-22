import { IPriceRange, ISort } from '@types';

export interface ProductsFilterState {
  activeCategory: string | null;
  activeBrands: string[];
  activeRatings: number[];
  priceRange: IPriceRange;
  activePriceRange: IPriceRange;
  sort: ISort | null;
  searchValue: string;
}
