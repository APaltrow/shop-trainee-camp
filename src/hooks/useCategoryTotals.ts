import { useMemo } from 'react';

import { useAppSelector } from '@redux';

type CategoriesTotals = Record<string, number>;

export const useCategoryTotals = () => {
  const { productsList } = useAppSelector((state) => state.products);

  const categoriesTotals = useMemo(() => {
    return productsList.reduce((totals, { category }) => {
      if (totals[category] === undefined) {
        totals[category] = 1;
        return totals;
      }

      totals[category] += 1;
      return totals;
    }, {} as CategoriesTotals);
  }, [productsList]);

  return categoriesTotals;
};
