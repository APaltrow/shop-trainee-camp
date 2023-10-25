import { useAppSelector } from '@redux';
import { filterProducts } from '@helpers';

export const useProductsFilter = () => {
  const { productsList } = useAppSelector((state) => state.products);

  const { activeCategory, activeBrands, searchValue } = useAppSelector(
    (state) => state.productsFilter,
  );

  const filteredByCategory = filterProducts.byCategory(
    productsList,
    activeCategory,
  );

  const filteredByBrands = filterProducts.byBrands(
    filteredByCategory,
    activeBrands,
  );

  const filteredBySearchValue = filterProducts.bySearchValue(
    filteredByBrands,
    searchValue,
  );

  return {
    products: filteredBySearchValue,

    totalProducts: productsList.length,
    totalFilteredProducts: filteredBySearchValue.length,
  };
};
