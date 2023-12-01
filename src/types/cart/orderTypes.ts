export interface IOrderItem {
  productId: string;
  lotId: string;
  totalQuantity: number;
  totalCost: number;
  measure: string;
  currency: string;
  timeframe: number;
}
