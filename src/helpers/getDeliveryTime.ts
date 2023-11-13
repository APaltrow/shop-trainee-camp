import { ONE_DAY } from '@constants';

export const getDeliveryTime = (timeframe: number) => {
  return `Delivery in ${timeframe} day${timeframe > ONE_DAY ? 's' : ''}`;
};
