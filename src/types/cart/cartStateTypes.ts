import { FormValues, IOrderItem } from '@types';

export interface CartState {
  billingInfo: FormValues;
  orders: IOrderItem[];
}
