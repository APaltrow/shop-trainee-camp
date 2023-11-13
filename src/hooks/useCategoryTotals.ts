import { useMemo } from 'react';

import { useAppSelector } from '@redux';
import { SINGLE_CATEGORY_ITEM } from '@constants';

type CategoriesTotals = Record<string, number>;

export const useCategoryTotals = () => {
  const { productsList } = useAppSelector((state) => state.products);

  const categoriesTotals = useMemo(() => {
    return productsList.reduce((totals, { category }) => {
      if (totals[category] === undefined) {
        totals[category] = SINGLE_CATEGORY_ITEM;
        return totals;
      }

      totals[category] += SINGLE_CATEGORY_ITEM;
      return totals;
    }, {} as CategoriesTotals);
  }, [productsList]);

  return categoriesTotals;
};
