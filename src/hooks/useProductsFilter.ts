import { useAppSelector } from '@redux';
import { filterProducts } from '@helpers';

export const useProductsFilter = () => {
  const { productsList } = useAppSelector((state) => state.products);

  const { searchValue, activeCategory } = useAppSelector(
    (state) => state.productsFilter,
  );

  const filteredByCategory = filterProducts.byCategory(
    productsList,
    activeCategory,
  );

  const filteredBySearchValue = filterProducts.bySearchValue(
    filteredByCategory,
    searchValue,
  );

  return {
    products: filteredBySearchValue,

    totalProducts: productsList.length,
    totalFilteredProducts: filteredBySearchValue.length,
  };
};
