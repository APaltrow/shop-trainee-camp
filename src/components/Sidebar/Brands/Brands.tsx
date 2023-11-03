import { FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { Checkbox } from '@components';

import { SidebarBlock } from '../SidebarBlock';
import { SidebarSkeleton } from '../Skeletons';

import style from './Brands.module.scss';

export const Brands: FC = () => {
  const { activeCategory, activeBrands } = useAppSelector(
    (state) => state.productsFilter,
  );
  const { categories, isLoading } = useAppSelector((state) => state.products);

  const { setActiveBrand } = useActions();

  const allBrands = categories ? Object.values(categories) : [];
  const brandsByCategory =
    categories && activeCategory ? categories[activeCategory] : [];

  const brandsList = activeCategory ? brandsByCategory : allBrands.flat();

  const handleBrandCheck = (brandName: string, isSelected: boolean) => {
    const updatedBrandsList = isSelected
      ? [...activeBrands, brandName]
      : activeBrands.filter((brand) => brand !== brandName);

    setActiveBrand(updatedBrandsList);
  };

  if (isLoading) {
    return (
      <SidebarBlock title="Brands">
        <SidebarSkeleton />
      </SidebarBlock>
    );
  }

  return (
    <SidebarBlock title="Brands">
      <ul className={style.list}>
        {brandsList.map((brand, idx) => (
          <li key={`brands_${brand}_${idx + 1}`}>
            <Checkbox
              id={brand}
              isChecked={activeBrands.includes(brand)}
              onChange={(e) => handleBrandCheck(brand, e.target.checked)}
            />
            <span>{brand}</span>
          </li>
        ))}
      </ul>
    </SidebarBlock>
  );
};
