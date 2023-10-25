import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductsFilterState } from '@types';

const initialState: ProductsFilterState = {
  activeCategory: null,
  activeBrands: [],
  searchValue: '',
};

export const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    setActiveCategory: (state, { payload }: PayloadAction<string | null>) => {
      state.activeCategory = payload;
    },
    setActiveBrand: (state, { payload }: PayloadAction<string>) => {
      state.activeBrands = [payload];
    },
    resetBrands: (state) => {
      state.activeBrands = [];
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
