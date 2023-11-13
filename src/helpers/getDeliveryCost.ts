import { FREE_SHIPPING } from '@constants';

export const getDeliveryCost = (cost: number, currency: string) => {
  return cost ? `${cost} ${currency}` : FREE_SHIPPING;
};
