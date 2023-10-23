import { FC } from 'react';

import { CustomSelect } from '@components';

import style from './HeaderCategories.module.scss';

interface CategoriesProps {
  categories: string[];
}

const DEFAULT_BRANDS = ['Brand 1', 'Brand 2', 'Brand 3', 'Brand 4'];

export const HeaderCategories: FC<CategoriesProps> = ({ categories }) => {
  return (
    <ul className={style.navbar}>
      {categories.map((category) => (
        <li key={`category_${category}`}>
          <CustomSelect
            isReadOnly
            defaultValue={category}
            options={DEFAULT_BRANDS}
            onChange={() => {}}
          />
        </li>
      ))}
    </ul>
  );
};
