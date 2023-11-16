import axios from 'axios';

import { SINGLE_PRODUCT_URL, ZERO_INDEX } from '@constants';
import { IProduct } from '@types';

export const fetchProduct = async (id: string) => {
  const url = `${SINGLE_PRODUCT_URL}${id}`;

  const { data } = await axios.get<IProduct[]>(url);

  return data[ZERO_INDEX];
};
