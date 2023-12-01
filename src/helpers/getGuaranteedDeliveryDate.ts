import { IOrderItem } from '@types';

const INITIAL_TIMEFRAME = 0;

export const getGuaranteedDeliveryDate = (orders: IOrderItem[]) => {
  let latestTimeframe = INITIAL_TIMEFRAME;

  orders.forEach(({ timeframe }) => {
    if (timeframe > latestTimeframe) {
      latestTimeframe = timeframe;
    }
  });

  const date = new Date();
  date.setDate(date.getDate() + latestTimeframe);

  return date.toLocaleDateString('en-En', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
