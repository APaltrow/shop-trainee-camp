import { BuyBy } from '@types';
import { useAppSelector } from '@redux';
import { ARRAY_INDEX_DIFF } from '@constants';

const INITIAL_ZERO = 0;

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

  const getTotalPcsInCart = (buyBy: BuyBy) => {
    return cartOrdersById.reduce((totalPcs, { measure, totalQuantity }) => {
      totalPcs += totalQuantity * buyBy[measure];

      return totalPcs;
    }, INITIAL_ZERO);
  };

  return {
    getTotalPcsInCart,
    getTotalsInCart,
  };
};
