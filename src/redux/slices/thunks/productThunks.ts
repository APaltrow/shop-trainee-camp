import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchProduct } from '@api';

export const fetchProductThunk = createAsyncThunk(
  'product/fetchProductThunk',
  fetchProduct,
);
