import { ChangeEvent, FC } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { IconsTypes, NavigationPaths, SelectVariants } from '@constants';
import { filterProducts } from '@helpers';
import { useSearch, useToggle } from '@hooks';
import {
  Icon,
  Search,
  Dropdown,
  DropdownItem,
  BinarySection,
  CustomSelect,
} from '@components';
import logo from '@assets/Freshnesecom.svg';

import style from './HeaderToolbar.module.scss';

const ALL_CATEGORIES = 'All categories';
const LOGO_ALT = 'Freshnesecom logo';
const SEARCH_PLACEHOLDER = 'Search products...';
const MIN_SEARCH_LENGTH = 2;

export const HeaderToolbar: FC = () => {
  const { categories, productsList } = useAppSelector(
    (state) => state.products,
  );
  const { activeCategory, searchValue: searchedValue } = useAppSelector(
    (state) => state.productsFilter,
  );

  const { setActiveCategory, setActiveBrand } = useActions();

  const { searchValue, onSearch } = useSearch();

  const { isOpened, onOpen, onClose } = useToggle();

  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleCategoryChange = (option: string) => {
    if (!categories) return;

    if (option === ALL_CATEGORIES) {
      setActiveCategory(null);
      setActiveBrand([]);
    } else {
      setActiveCategory(option);
      setActiveBrand(categories[option]);
    }

    navigate(NavigationPaths.ALL_PRODUCTS);
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchText = e.target.value;
    onSearch(searchText);
  };

  const handleSuggestionClick = (id: string) => {
    navigate(`${NavigationPaths.ALL_PRODUCTS}/${id}`);
    onSearch('');
    onClose();
  };

  const categoriesList = categories ? Object.keys(categories) : [];

  const categoriesOptions = activeCategory
    ? [ALL_CATEGORIES, ...categoriesList]
    : categoriesList;

  const isSuggestionsShown =
    isOpened &&
    searchedValue.length > MIN_SEARCH_LENGTH &&
    pathname.split('/').at(-1) !== NavigationPaths.ALL_PRODUCTS;

  const searchSuggestions = isSuggestionsShown
    ? filterProducts.bySearchValue(productsList, searchedValue)
    : [];

  const search = (
    <Search
      value={searchValue}
      onFocus={onOpen}
      onChange={handleSearch}
      placeholder={SEARCH_PLACEHOLDER}
    />
  );

  const searchBar = (
    <Dropdown
      anchor={search}
      onClose={onClose}
    >
      {searchSuggestions.length
        ? searchSuggestions.map(({ productTitle, productId }) => (
            <DropdownItem
              key={`search_option_${productId}`}
              option={productTitle}
              onSelect={() => handleSuggestionClick(productId)}
            />
          ))
        : null}
    </Dropdown>
  );

  return (
    <div className={style.container}>
      <NavLink
        className={style.logo}
        to={NavigationPaths.HOME}
      >
        <img
          src={logo}
          alt={LOGO_ALT}
        />
      </NavLink>

      <div className={style.search_bar}>
        <BinarySection
          leftElement={
            <CustomSelect
              variant={SelectVariants.PRIMARY}
              selected={activeCategory || ALL_CATEGORIES}
              options={categoriesOptions}
              onChange={handleCategoryChange}
            />
          }
          rightElement={searchBar}
        />
      </div>
      <div className={style.buttons}>
        <Icon iconName={IconsTypes.PROFILE} />

        <NavLink to={NavigationPaths.CART}>
          <Icon iconName={IconsTypes.CART} />
        </NavLink>
      </div>
    </div>
  );
};
