import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IPriceRange, ProductsFilterState } from '@types';

const initialState: ProductsFilterState = {
  activeCategory: null,
  activeBrands: [],
  activeRatings: [1, 2, 3, 4, 5],
  priceRange: {
    min: 0,
    max: 0,
  },
  activePriceRange: {
    min: 0,
    max: 0,
  },
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
    },
    setActivePriceRange: (state, { payload }: PayloadAction<IPriceRange>) => {
      state.activePriceRange = { ...state.activePriceRange, ...payload };
    },
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
  },
});

export const {
  actions: productsFilterActions,
  reducer: productsFilterReducer,
} = productsFilterSlice;
