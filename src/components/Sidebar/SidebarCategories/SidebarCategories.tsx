import { FC } from 'react';

import { useAppSelector } from '@redux';
import { useCategoryTotals } from '@hooks';
import { Accordion, CustomButton, InfoTooltip } from '@components';

import style from './SidebarCategories.module.scss';

interface SidebarCategoriesProps {}

export const SidebarCategories: FC<SidebarCategoriesProps> = () => {
  const { categories } = useAppSelector((state) => state.products);
  const { activeCategory } = useAppSelector((state) => state.productsFilter);

  const categoryTotals = useCategoryTotals();

  const categoriesList = categories ? Object.keys(categories) : [];
  return (
    <Accordion title="Categories">
      <ul className={style.list}>
        {categoriesList.map((category, idx) => (
          <li key={`sidebar_${category}_${idx + 1}`}>
            <CustomButton onClick={() => {}}>
              <span
                className={`${style.category_text} ${
                  category === activeCategory ? style.active : ''
                }`}
              >
                {category}
              </span>
            </CustomButton>
            <InfoTooltip info={categoryTotals[category]} />
          </li>
        ))}
      </ul>
    </Accordion>
  );
};
