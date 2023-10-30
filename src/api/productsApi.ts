import axios from 'axios';

import { IProduct } from '@types';
import { PRODUCTS_URL } from '@constants';

export const fetchProducts = async () => {
  const { data } = await axios.get<IProduct[]>(PRODUCTS_URL);

  return data;
};
