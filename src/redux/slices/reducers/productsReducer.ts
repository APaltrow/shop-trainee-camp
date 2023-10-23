import { createSlice } from '@reduxjs/toolkit';

import { ErrorsMessages } from '@constants';
import { ProductsState } from '@types';

import { fetchProductsThunk } from '../thunks';

const initialState: ProductsState = {
  productsList: [],

  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;

        state.productsList = [];
      })
      .addCase(fetchProductsThunk.fulfilled, (state, { payload }) => {
        state.productsList = payload;

        state.isLoading = false;
      })
      .addCase(fetchProductsThunk.rejected, (state, { error }) => {
        state.error = error.message || ErrorsMessages.DEFAULT;
        state.isLoading = false;
      });
  },
});

export const { actions: productsActions, reducer: productsReducer } =
  productsSlice;
