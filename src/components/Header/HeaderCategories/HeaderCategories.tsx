import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useActions, useAppSelector } from '@redux';
import { ALL_BRANDS, NavigationPaths, SelectVariants } from '@constants';
import { CustomSelect } from '@components';

import { CategorySkeleton } from './CategorySkeleton';

import style from './HeaderCategories.module.scss';

export const HeaderCategories: FC = () => {
  const { categories, isLoading } = useAppSelector((state) => state.products);

  const { setActiveCategory, setActiveBrand } = useActions();

  const navigate = useNavigate();

  const handleBrandSelect = (category: string, brand: string) => {
    setActiveCategory(category);

    if (brand === ALL_BRANDS && categories) {
      setActiveBrand(categories[category]);
    } else {
      setActiveBrand([brand]);
    }

    navigate(NavigationPaths.ALL_PRODUCTS);
  };

  if (isLoading) {
    return <CategorySkeleton />;
  }

  const categoriesList = categories ? Object.entries(categories) : [];

  return (
    <ul className={style.navbar}>
      {categoriesList.map(([category, brands]) => (
        <li
          key={`category_${category}`}
          className={style.item}
        >
          <CustomSelect
            variant={SelectVariants.SECONDARY}
            selected={category}
            options={[ALL_BRANDS, ...brands]}
            onChange={(selectedBrand) =>
              handleBrandSelect(category, selectedBrand)
            }
          />
        </li>
      ))}
    </ul>
  );
};
