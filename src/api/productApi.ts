import axios from 'axios';

import {
  SINGLE_PRODUCT_INFO_URL,
  SINGLE_PRODUCT_URL,
  ZERO_INDEX,
} from '@constants';
import { IProduct, IAdditionalInfo } from '@types';

export const fetchProduct = async (id: string) => {
  const productUrl = `${SINGLE_PRODUCT_URL}${id}`;
  const productInfoUrl = `${SINGLE_PRODUCT_INFO_URL}${id}`;

  const { data: product } = await axios.get<IProduct[]>(productUrl);
  const { data: productInfo } =
    await axios.get<IAdditionalInfo[]>(productInfoUrl);

  return {
    product: product[ZERO_INDEX],
    additionalInfo: productInfo[ZERO_INDEX],
  };
};
