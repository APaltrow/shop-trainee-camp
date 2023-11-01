import { FC, useEffect } from 'react';

import { useAppSelector } from '@redux';
import { useMedia, useProductsFilter, useToggle } from '@hooks';
import { IconsTypes, NO_SCROLL_CLASS } from '@constants';
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

  if (error) {
    return <Error errorMessage={error} />;
  }

  const sidebar = !isTablet ? (
    <Sidebar />
  ) : (
    <Portal>
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

  useEffect(() => {
    if (isOpened) {
      document.body.classList.add(NO_SCROLL_CLASS);
    } else {
      document.body.classList.remove(NO_SCROLL_CLASS);
    }
  }, [isOpened]);

  return (
    <div>
      <div className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={`${totalFilteredProducts}`} />
          <span>Products</span>
        </div>
      </div>
      {isTablet ? (
        <div className={style.sort_container}>{filterButton}</div>
      ) : null}
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
