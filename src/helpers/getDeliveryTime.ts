import { formatPlural } from '@helpers';

export const getDeliveryTime = (timeframe: number) => {
  return `Delivery in ${timeframe} ${formatPlural('day', timeframe)}`;
};
