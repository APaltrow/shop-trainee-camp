import { IPrice } from './priceTypes';
import { IStock } from './stockTypes';
import { IDescription } from './descriptionTypes';
import { IDelivery } from './deliveryTypes';
import { BuyBy } from './buyByTypes';

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
