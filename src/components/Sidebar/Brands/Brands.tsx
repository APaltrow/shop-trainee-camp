import { ChangeEvent, FC } from 'react';

import { useActions, useAppSelector } from '@redux';
import { Checkbox } from '@components';

import { SidebarBlock } from '../SidebarBlock';

import style from './Brands.module.scss';

interface BrandsProps {}

export const Brands: FC<BrandsProps> = () => {
  const { activeCategory, activeBrands } = useAppSelector(
    (state) => state.productsFilter,
  );
  const categories = useAppSelector((state) => state.products.categories);

  const { setActiveBrand } = useActions();

  const allBrands = categories ? Object.values(categories) : [];
  const brandsByCategory =
    categories && activeCategory ? categories[activeCategory] : [];

  const brandsList = activeCategory ? brandsByCategory : allBrands.flat();

  const handleBrandCheck = (
    brandName: string,
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    const isSelected = e.target.checked;

    const updatedBrandsList = isSelected
      ? [...activeBrands, brandName]
      : activeBrands.filter((brand) => brand !== brandName);

    setActiveBrand(updatedBrandsList);
  };

  return (
    <SidebarBlock title="Brands">
      <ul className={style.list}>
        {brandsList.map((brand, idx) => (
          <li key={`sidebar_brands_${brand}_${idx + 1}`}>
            <Checkbox
              id={brand}
              isChecked={activeBrands.includes(brand)}
              onChange={(e) => handleBrandCheck(brand, e)}
            />
            <span>{brand}</span>
          </li>
        ))}
      </ul>
    </SidebarBlock>
  );
};
