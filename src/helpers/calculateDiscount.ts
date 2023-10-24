const HUNDRED_PERCENT = 100;
const DESCIMALS = 2;

export const calculateDiscount = (price: number, discountPercent: number) => {
  const discountAmount = (price / HUNDRED_PERCENT) * discountPercent;

  const discountedPrice = price - discountAmount;

  return +discountedPrice.toFixed(DESCIMALS);
};
