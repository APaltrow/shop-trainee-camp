import { IState } from '@types';

import { IProduct } from './productTypes';

export interface ProductsState extends IState {
  productsList: IProduct[];
  categories: Record<string, string[]> | null;
}
