import { createAsyncThunk } from '@reduxjs/toolkit';

import { fetchProducts } from '@api';
import { getCategories } from '@helpers';

export const fetchProductsThunk = createAsyncThunk(
  'products/fetchProductsThunk',
  async () => {
    const products = await fetchProducts();
    const categories = getCategories(products);

    return { products, categories };
  },
);
