import { IState } from '@types';

export interface IStock {
  amount: number;
  measure: BuyBy;
}

export interface IPrice {
  amount: number;
  discountedAmount: number;
  discount: number;
  currency: string;
}

export interface IDescription {
  short: string;
  long: string;
  full: string;
}

export interface IDelivery {
  timeframe: number;
  cost: number;
  area: string[];
}

export enum BuyBy {
  PSC = 'pcs',
  KGS = 'kgs',
  BOX = 'box',
  PACK = 'pack',
}

export interface IProduct {
  productId: string;
  productTitle: string;
  rating: number;
  originCountry: string;
  category: string;

  price: IPrice;
  stock: IStock;
  description: IDescription;
  delivery: IDelivery;
  buyBy: BuyBy[];

  brands: string[];
  imgs: string[];
  reviews: string[];
  questions: string[];
}

export interface ProductsState extends IState {
  productsList: IProduct[];
  categories: Record<string, string[]> | null;
}
