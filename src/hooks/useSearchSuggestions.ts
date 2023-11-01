import { useLocation } from 'react-router-dom';

import { useAppSelector } from '@redux';
import { LAST_ELEMENT_INDEX, NavigationPaths } from '@constants';
import { useProductsFilter } from '@hooks';

const MIN_SEARCH_LENGTH = 2;

export const useSearchSuggestions = () => {
  const { searchValue } = useAppSelector((state) => state.productsFilter);
  const { searchSuggestionsList } = useProductsFilter();

  const { pathname } = useLocation();

  const isAllProductsPage =
    pathname.split('/').at(LAST_ELEMENT_INDEX) === NavigationPaths.ALL_PRODUCTS;

  const isSearchValueSutable = searchValue.length > MIN_SEARCH_LENGTH;

  const isAnyResultFound = !!searchSuggestionsList.length;

  const isSuggestionsShown = isSearchValueSutable && !isAllProductsPage;

  return {
    searchSuggestions: searchSuggestionsList,
    isAnyResultFound,
    isSuggestionsShown,
  };
};
