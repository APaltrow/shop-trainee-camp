import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@redux';
import {
  LAST_ELEMENT_INDEX,
  MIN_SEARCH_LENGTH,
  NavigationPaths,
  PATH_DIVIDER,
} from '@constants';
import { useProductsFilter } from '@hooks';

export const useSearchSuggestions = () => {
  const { searchValue } = useAppSelector((state) => state.productsFilter);
  const { searchSuggestionsList } = useProductsFilter();

  const { pathname } = useLocation();

  const isAllProductsPage =
    pathname.split(PATH_DIVIDER).at(LAST_ELEMENT_INDEX) ===
    NavigationPaths.ALL_PRODUCTS;

  const isSearchValueSutable = searchValue.length > MIN_SEARCH_LENGTH;

  const isAnyResultFound = !!searchSuggestionsList.length;

  const isSuggestionsShown = isSearchValueSutable && !isAllProductsPage;

  return {
    searchSuggestions: searchSuggestionsList,
    isAnyResultFound,
    isSuggestionsShown,
  };
};
