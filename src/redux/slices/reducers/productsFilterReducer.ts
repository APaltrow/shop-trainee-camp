import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ProductsFilterState } from '@types';

const initialState: ProductsFilterState = {
  activeCategory: null,
  searchValue: '',
};

export const productsFilterSlice = createSlice({
  name: 'productsFilter',
  initialState,
  reducers: {
    setSearch: (state, { payload }: PayloadAction<string>) => {
      state.searchValue = payload;
    },
    setActiveCategory: (state, { payload }: PayloadAction<string | null>) => {
      state.activeCategory = payload;
    },
  },
});

export const {
  actions: productsFilterActions,
  reducer: productsFilterReducer,
} = productsFilterSlice;
