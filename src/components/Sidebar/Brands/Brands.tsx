import { FC } from 'react';

import style from './Brands.module.scss';
import { Checkbox } from '@/components';

interface BrandsProps {}

export const Brands: FC<BrandsProps> = () => {
  const brandsList = new Array(5).fill('Brand');

  return (
    <section className={style.container}>
      <h4>Brands</h4>
      <ul className={style.list}>
        {brandsList.map((brand, idx) => (
          <li key={`sidebar_brands_${brand}_${idx + 1}`}>
            <Checkbox isChecked={idx % 2} />{' '}
            <span>{`${brand} ${idx + 1}`}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
