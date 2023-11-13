import { SortOrder, SortProperty } from '@constants';
import { useActions, useAppSelector } from '@redux';

export const useProductsSort = () => {
  const { sort } = useAppSelector((state) => state.productsFilter);

  const { setSort } = useActions();

  const handleSelectSort = (option: string) => {
    const property = option as SortProperty;

    if (!sort) {
      setSort({
        order: SortOrder.ASCENDING,
        property,
      });

      return;
    }

    setSort({
      ...sort,
      property,
    });
  };

  const handleSortOrderChange = () => {
    if (!sort) return;

    const order =
      sort.order === SortOrder.ASCENDING
        ? SortOrder.DESCENDING
        : SortOrder.ASCENDING;

    setSort({ ...sort, order });
  };

  return {
    sort,

    handleSelectSort,
    handleSortOrderChange,
  };
};
