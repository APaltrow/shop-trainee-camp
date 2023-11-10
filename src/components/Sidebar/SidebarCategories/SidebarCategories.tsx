import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { useCategoryTotals } from '@hooks';
import { getAlreadyActiveBrands } from '@helpers';
import { CustomButton, InfoTooltip } from '@components';

import { SidebarBlock } from '../SidebarBlock';
import { SidebarSkeleton } from '../Skeletons';

import style from './SidebarCategories.module.scss';

export const SidebarCategories: FC = () => {
  const { categories, isLoading } = useAppSelector((state) => state.products);
  const { activeCategory, activeBrands } = useAppSelector(
    (state) => state.productsFilter,
  );

  const categoryTotals = useCategoryTotals();

  const { setActiveCategory, setActiveBrand } = useActions();

  const categoriesList = categories ? Object.keys(categories) : [];

  const handleCategorySelect = (category: string) => {
    if (!categories) return;

    setActiveCategory(category);

    const alreadyActiveBrands = getAlreadyActiveBrands(
      categories[category],
      activeBrands,
    );

    setActiveBrand(alreadyActiveBrands);
  };

  if (isLoading) {
    return (
      <SidebarBlock title="Categories">
        <SidebarSkeleton />
      </SidebarBlock>
    );
  }

  return (
    <SidebarBlock title="Categories">
      <ul className={style.list}>
        {categoriesList.map((category, idx) => {
          const isActive = category === activeCategory;

          return (
            <li key={`sidebar_${category}_${idx + 1}`}>
              <CustomButton onClick={() => handleCategorySelect(category)}>
                <span
                  className={`${style.text} ${isActive ? style.active : ''}`}
                >
                  {category}
                </span>
                <InfoTooltip info={`${categoryTotals[category]}`} />
              </CustomButton>
            </li>
          );
        })}
      </ul>
    </SidebarBlock>
  );
};
