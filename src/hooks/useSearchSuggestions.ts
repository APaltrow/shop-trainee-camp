import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { NavigationPaths } from '@constants';
import { filterProducts } from '@helpers';

const MIN_SEARCH_LENGTH = 2;

export const useSearchSuggestions = () => {
  const { productsList } = useAppSelector((state) => state.products);
  const { searchValue } = useAppSelector((state) => state.productsFilter);

  const { pathname } = useLocation();

  const isAllProductsPage =
    pathname.split('/').at(-1) === NavigationPaths.ALL_PRODUCTS;

  const isSearchValueSutable = searchValue.length > MIN_SEARCH_LENGTH;

  const isSuggestionsShown = isSearchValueSutable && !isAllProductsPage;

  const searchSuggestions = isSuggestionsShown
    ? filterProducts.bySearchValue(productsList, searchValue)
    : [];

  return searchSuggestions;
};
