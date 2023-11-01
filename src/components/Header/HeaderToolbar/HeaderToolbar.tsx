import { ChangeEvent, FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import {
  ErrorsMessages,
  IconsTypes,
  NavigationPaths,
  SelectVariants,
} from '@constants';

import { useSearch, useSearchSuggestions, useToggle } from '@hooks';
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

export const HeaderToolbar: FC = () => {
  const { categories } = useAppSelector((state) => state.products);
  const { activeCategory } = useAppSelector((state) => state.productsFilter);

  const { setActiveCategory, setActiveBrand } = useActions();

  const { searchValue, onSearch } = useSearch();

  const { isOpened, onOpen, onClose } = useToggle();

  const { searchSuggestions, isAnyResultFound, isSuggestionsShown } =
    useSearchSuggestions();

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
      isOpened={isSuggestionsShown && isOpened}
      onClose={onClose}
    >
      {isAnyResultFound ? (
        searchSuggestions.map(({ productTitle, productId }) => (
          <DropdownItem
            key={`search_option_${productId}`}
            option={productTitle}
            onSelect={() => handleSuggestionClick(productId)}
          />
        ))
      ) : (
        <DropdownItem
          option={ErrorsMessages.NO_RESULTS}
          isDisabled
        />
      )}
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
