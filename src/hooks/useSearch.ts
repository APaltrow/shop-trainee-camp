import { ChangeEvent, useState } from 'react';

import { useDebounce } from '@hooks';
import { useActions, useAppSelector } from '@redux';

const DELAY = 300;

export const useSearch = () => {
  const { searchValue: initialSearchValue } = useAppSelector(
    (state) => state.productsFilter,
  );
  const { setSearch } = useActions();

  const [searchValue, setSearchValue] = useState(initialSearchValue);

  const debouncedSearch = useDebounce(
    (searchText: string) => setSearch(searchText),
    DELAY,
  );

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;

    setSearchValue(searchText);
    debouncedSearch(searchText.trim());
  };

  return { searchValue, onSearch };
};
