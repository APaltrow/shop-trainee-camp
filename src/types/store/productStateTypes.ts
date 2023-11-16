import { IState } from '@types';

import { IProduct } from '../product/productTypes';

export type Categories = Record<string, string[]>;

export interface ProductsState extends IState {
  productsList: IProduct[];
  categories: Categories | null;
}

export interface ProductState extends IState {
  product: null | IProduct;
}
