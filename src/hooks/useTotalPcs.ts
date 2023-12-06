import { BuyBy } from '@types';
import { useAppSelector } from '@redux';
import { ARRAY_INDEX_DIFF } from '@constants';

const INITIAL_AMOUNT = 0;

export const useTotalPcs = (currentProdId: string) => {
  const { orders } = useAppSelector((state) => state.cart);

  const cartOrdersById = orders.filter(
    ({ productId }) => productId === currentProdId,
  );

  const getTotalsInCart = () => {
    return cartOrdersById.reduce((mgs, { measure, totalQuantity }, idx) => {
      const isLast = idx === orders.length - ARRAY_INDEX_DIFF;

      mgs += `${measure} ${totalQuantity}${isLast ? '' : ','} `;

      return mgs;
    }, '');
  };

  const getTotalPcsInCart = (buyBy: BuyBy, omitMeasure?: string) => {
    return cartOrdersById.reduce((totalPcs, { measure, totalQuantity }) => {
      if (omitMeasure === measure) {
        return totalPcs;
      }

      totalPcs += totalQuantity * buyBy[measure];

      return totalPcs;
    }, INITIAL_AMOUNT);
  };

  return {
    getTotalPcsInCart,
    getTotalsInCart,
  };
};
