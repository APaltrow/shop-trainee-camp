import { ChangeEvent, FC } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { IconsTypes, NavigationPaths } from '@constants';
import { useSearch } from '@hooks';
import { BinarySection, CustomSelect, Icon, Search } from '@components';
import logo from '@assets/Freshnesecom.svg';

import style from './HeaderToolbar.module.scss';

const ALL_CATEGORIES = 'All categories';
const LOGO_ALT = 'Freshnesecom logo';
const SEARCH_PLACEHOLDER = 'Search products...';

export const HeaderToolbar: FC = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const { activeCategory } = useAppSelector((state) => state.productsFilter);

  const { setActiveCategory } = useActions();

  const { searchValue, onSearch } = useSearch();

  const navigate = useNavigate();

  const handleCategoryChange = (option: string) => {
    navigate(NavigationPaths.ALL_PRODUCTS);

    if (option === ALL_CATEGORIES) {
      setActiveCategory(null);
    } else {
      setActiveCategory(option);
    }
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e);
    navigate(NavigationPaths.ALL_PRODUCTS);
  };

  const categoriesList = categories ? Object.keys(categories) : [];

  const categoriesOptions = activeCategory
    ? [ALL_CATEGORIES, ...categoriesList]
    : categoriesList;

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
              selected={activeCategory || ALL_CATEGORIES}
              options={categoriesOptions}
              onChange={handleCategoryChange}
            />
          }
          rightElement={
            <Search
              value={searchValue}
              onChange={handleSearch}
              placeholder={SEARCH_PLACEHOLDER}
            />
          }
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
