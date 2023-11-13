import { useState } from 'react';

import { useDebounce } from '@hooks';
import { useActions, useAppSelector } from '@redux';

export const useSearch = () => {
  const { searchValue: initialSearchValue } = useAppSelector(
    (state) => state.productsFilter,
  );
  const { setSearch } = useActions();

  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const debouncedSearch = useDebounce((searchText: string) =>
    setSearch(searchText),
  );

  const onSearch = (searchText: string) => {
    setSearchValue(searchText);

    debouncedSearch(searchText.trim());
  };

  return { searchValue, onSearch };
};
