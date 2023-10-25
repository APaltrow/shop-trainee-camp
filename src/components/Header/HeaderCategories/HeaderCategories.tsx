import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { NavigationPaths } from '@constants';
import { CustomSelect } from '@components';

import { CategorySkeleton } from './CategorySkeleton';

import style from './HeaderCategories.module.scss';

interface CategoriesProps {
  categories: [string, string[]][];
}

export const HeaderCategories: FC<CategoriesProps> = ({ categories }) => {
  const isLoading = useAppSelector((state) => state.products.isLoading);

  const { setActiveCategory, setActiveBrand } = useActions();

  const navigate = useNavigate();

  const handleBrandSelect = (category: string, brand: string) => {
    setActiveCategory(category);
    setActiveBrand(brand);

    navigate(NavigationPaths.ALL_PRODUCTS);
  };

  if (isLoading) {
    return <CategorySkeleton />;
  }

  return (
    <ul className={style.navbar}>
      {categories.map(([category, brands]) => (
        <li key={`category_${category}`}>
          <CustomSelect
            selected={category}
            options={brands}
            onChange={(selectedBrand) =>
              handleBrandSelect(category, selectedBrand)
            }
          />
        </li>
      ))}
    </ul>
  );
};
