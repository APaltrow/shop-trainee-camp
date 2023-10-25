import { FC } from 'react';

import { useAppSelector } from '@redux';
import { CustomSelect } from '@components';

import { CategorySkeleton } from './CategorySkeleton';

import style from './HeaderCategories.module.scss';

interface CategoriesProps {
  categories: [string, string[]][];
}

export const HeaderCategories: FC<CategoriesProps> = ({ categories }) => {
  const isLoading = useAppSelector((state) => state.products.isLoading);

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
            onChange={() => {}}
          />
        </li>
      ))}
    </ul>
  );
};
