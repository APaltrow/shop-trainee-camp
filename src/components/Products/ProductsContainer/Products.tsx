import { FC } from 'react';

import { useAppSelector } from '@redux';
import { useMedia, useNoScroll, useProductsFilter, useToggle } from '@hooks';
import { IconsTypes } from '@constants';
import {
  InfoTooltip,
  Error,
  Sidebar,
  Icon,
  CustomButton,
  Portal,
} from '@components';

import { ProductsList } from '../ProductsList';

import style from './Products.module.scss';

export const Products: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const { products, totalProducts, totalFilteredProducts } =
    useProductsFilter();

  const { isTablet } = useMedia();

  const { isOpened, toggle } = useToggle();

  useNoScroll(isOpened);

  if (error) {
    return <Error errorMessage={error} />;
  }

  const sidebar = !isTablet ? (
    <Sidebar />
  ) : (
    <Portal>
      {isOpened && (
        <div
          className={style.overlay}
          onClick={toggle}
        />
      )}
      <Sidebar
        isOpened={isOpened}
        onClose={toggle}
      />
    </Portal>
  );

  const filterButton = isTablet ? (
    <CustomButton onClick={toggle}>
      <span className={style.filer_btn}>
        <Icon iconName={IconsTypes.FILTER} />
      </span>
      Filters
    </CustomButton>
  ) : null;

  return (
    <div>
      <div className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={`${totalFilteredProducts}`} />
          <span>Products</span>
        </div>
      </div>
      {isTablet && <div className={style.sort_container}>{filterButton}</div>}
      <div className={style.main}>
        {sidebar}
        <ProductsList
          productsList={products}
          isLoading={isLoading}
        />
      </div>

      <div className={style.footer}>
        <div className={style.totals}>
          <InfoTooltip info={`${totalProducts}`} />

          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
