import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IPriceRange, ISort, ProductsFilterState } from '@types';

const initialState: ProductsFilterState = {
  activeCategory: null,
  activeBrands: [],
  activeRatings: [],
  priceRange: {
    min: 0,
    max: 0,
  },
  activePriceRange: {
    min: 0,
    max: 0,
  },
  sort: null,
  searchValue: '',
};

export const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    setActiveCategory: (state, { payload }: PayloadAction<string | null>) => {
      state.activeCategory = payload;
    },
    setActiveBrand: (state, { payload }: PayloadAction<string[]>) => {
      state.activeBrands = payload;
    },
    setActiveRatings: (state, { payload }: PayloadAction<number[]>) => {
      state.activeRatings = payload;
    },
    setPriceRange: (state, { payload }: PayloadAction<IPriceRange>) => {
      state.priceRange = payload;
      state.activePriceRange = payload;
    },
    setActivePriceRange: (state, { payload }: PayloadAction<IPriceRange>) => {
      state.activePriceRange = { ...state.activePriceRange, ...payload };
    },
    setSort: (state, { payload }: PayloadAction<ISort>) => {
      state.sort = payload;
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    resetFilters: (state) => {
      state.activeCategory = null;
      state.activeBrands = [];
      state.activeRatings = [];
      state.priceRange = {
        min: 0,
        max: 0,
      };
      state.activePriceRange = {
        min: 0,
        max: 0,
      };
      state.searchValue = '';
    },
  },
});

export const {
  actions: productsFilterActions,
  reducer: productsFilterReducer,
} = productsFilterSlice;
