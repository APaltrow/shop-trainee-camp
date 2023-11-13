import { IStock } from '@types';

export const getAdditionalInfo = (
  origin: string,
  brand: string,
  delivery: string,
  stock: IStock,
) => {
  const { amount, measure } = stock;

  return Object.entries({
    origin,
    brand,
    delivery,
    stock: `${amount} ${measure}`,
  });
};
