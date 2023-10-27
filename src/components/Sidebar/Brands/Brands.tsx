import { FC } from 'react';

import { useAppSelector } from '@redux';
import { Checkbox } from '@components';

import style from './Brands.module.scss';

interface BrandsProps {}

export const Brands: FC<BrandsProps> = () => {
  const { activeCategory, activeBrands } = useAppSelector(
    (state) => state.productsFilter,
  );
  const categories = useAppSelector((state) => state.products.categories);

  const allBrands = categories ? Object.values(categories) : [];
  const brandsByCategory =
    categories && activeCategory ? categories[activeCategory] : [];

  const brandsList = activeCategory ? brandsByCategory : allBrands.flat();

  return (
    <section className={style.container}>
      <h4>Brands</h4>
      <ul className={style.list}>
        {brandsList.map((brand, idx) => (
          <li key={`sidebar_brands_${brand}_${idx + 1}`}>
            <Checkbox
              id={brand}
              isChecked={activeBrands.includes(brand)}
              onChange={() => {}}
            />
            <span>{brand}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
