import { createSlice } from '@reduxjs/toolkit';

import { ProductState } from '@types';
import { ErrorsMessages } from '@constants';

import { fetchProductThunk } from '../thunks';

const initialState: ProductState = {
  product: null,
  additionalInfo: null,

  isLoading: false,
  error: null,
};

export const productsSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;

        state.product = null;
        state.additionalInfo = null;
      })
      .addCase(fetchProductThunk.fulfilled, (state, { payload }) => {
        const { product, additionalInfo } = payload;

        state.product = product;
        state.additionalInfo = additionalInfo;
        state.isLoading = false;
      })
      .addCase(fetchProductThunk.rejected, (state, { error }) => {
        state.error = error.message || ErrorsMessages.DEFAULT;
        state.isLoading = false;
      });
  },
});

export const { reducer: productReducer } = productsSlice;
