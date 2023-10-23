import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchProducts } from '@api';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProductsThunk',
  fetchProducts,
);
