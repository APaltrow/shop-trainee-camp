import { checkIfPlural } from '@helpers';

export const getDeliveryTime = (timeframe: number) => {
  return `Delivery in ${timeframe} ${checkIfPlural('day', timeframe)}`;
};
