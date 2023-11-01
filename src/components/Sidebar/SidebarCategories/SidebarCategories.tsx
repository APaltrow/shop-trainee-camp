import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { useCategoryTotals } from '@hooks';
import { CustomButton, InfoTooltip } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './SidebarCategories.module.scss';

interface SidebarCategoriesProps {}

export const SidebarCategories: FC<SidebarCategoriesProps> = () => {
  const { categories } = useAppSelector((state) => state.products);
  const { activeCategory } = useAppSelector((state) => state.productsFilter);

  const categoryTotals = useCategoryTotals();

  const { setActiveCategory, setActiveBrand } = useActions();

  const categoriesList = categories ? Object.keys(categories) : [];

  const handleCategorySelect = (category: string) => {
    if (!categories) return;

    setActiveCategory(category);
    setActiveBrand(categories[category]);
  };

  return (
    <SidebarBlock title="Categories">
      <ul className={style.list}>
        {categoriesList.map((category, idx) => (
          <li key={`sidebar_${category}_${idx + 1}`}>
            <CustomButton onClick={() => handleCategorySelect(category)}>
              <span
                className={`${style.category_text} ${
                  category === activeCategory ? style.active : ''
                }`}
              >
                {category}
              </span>
            </CustomButton>
            <InfoTooltip info={`${categoryTotals[category]}`} />
          </li>
        ))}
      </ul>
    </SidebarBlock>
  );
};
