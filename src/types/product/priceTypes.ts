export interface IPrice {
  amount: number;
  discountedAmount: number;
  discount: number;
  currency: string;
}

export interface IPriceRange {
  min: number;
  max: number;
}
