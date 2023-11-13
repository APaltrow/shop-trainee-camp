import { useActions, useAppSelector } from '@redux';
import { filterProducts, getProductsMinMaxPrice, sortProducts } from '@helpers';
import { useEffect } from 'react';

export const useProductsFilter = () => {
  const { productsList } = useAppSelector((state) => state.products);

  const {
    activeCategory,
    activeBrands,
    activeRatings,
    activePriceRange,
    sort,
    searchValue,
  } = useAppSelector((state) => state.productsFilter);

  const { setActivePriceRange, setPriceRange } = useActions();

  const filteredByCategory = filterProducts.byCategory(
    productsList,
    activeCategory,
  );

  const filteredByBrands = filterProducts.byBrands(
    filteredByCategory,
    activeBrands,
  );

  const filteredByRatings = filterProducts.byRatings(
    filteredByBrands,
    activeRatings,
  );

  const filteredByPriceRange = filterProducts.byPriceRange(
    filteredByRatings,
    activePriceRange,
  );

  const sortedProducts = sortProducts(filteredByPriceRange, sort);

  const filteredBySearchValue = filterProducts.bySearchValue(
    sortedProducts,
    searchValue,
  );

  const searchSuggestionsList = filterProducts.bySearchValue(
    filteredByCategory,
    searchValue,
  );

  useEffect(() => {
    const priceRange = getProductsMinMaxPrice(filteredByRatings);
    setPriceRange(priceRange);
    setActivePriceRange(priceRange);
  }, [productsList, activeCategory, activeBrands, activeRatings]);

  return {
    products: filteredBySearchValue,

    totalProducts: productsList.length,
    totalFilteredProducts: filteredBySearchValue.length,
    searchSuggestionsList,
  };
};
