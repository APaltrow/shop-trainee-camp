import { FC } from 'react';

import { useAppSelector } from '@redux';
import { getPaginatedList } from '@helpers';
import {
  useMedia,
  useNoScroll,
  usePagination,
  useProductsFilter,
  useToggle,
} from '@hooks';
import { ButtonSizes, ButtonVariants, IconsTypes } from '@constants';
import {
  InfoTooltip,
  Error,
  Sidebar,
  Portal,
  CustomButton,
  Icon,
  Pagination,
} from '@components';

import { ProductsToolbar } from '../ProductsToolbar';
import { ProductsList } from '../ProductsList';

import style from './Products.module.scss';

export const Products: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const filter = useAppSelector((state) => state.productsFilter);

  const { products, totalProducts, totalFilteredProducts } =
    useProductsFilter();

  const { isTablet } = useMedia();

  const { isOpened, toggle } = useToggle();

  const {
    pagesList,
    activePage,
    isShowMoreVisible,

    onShowMore,
    onActivePageChange,
  } = usePagination(totalFilteredProducts, [filter]);

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

  const paginatedProducts = getPaginatedList(pagesList, products, activePage);

  return (
    <div>
      <div className={style.header}>
        <h1 className={style.title}>All products</h1>

        <p className={style.totals}>
          <InfoTooltip info={`${totalFilteredProducts}`} />
          <span>Products</span>
        </p>
      </div>

      <ProductsToolbar toggle={toggle} />

      <div className={style.main}>
        {sidebar}
        <ProductsList
          productsList={paginatedProducts}
          isLoading={isLoading}
        />
      </div>

      <div className={style.footer}>
        <div className={style.pagination_container}>
          {!!pagesList.length && <span>Page :</span>}
          {!!pagesList.length && (
            <Pagination
              pagesList={pagesList}
              activePage={activePage}
              onActivePageChange={onActivePageChange}
            />
          )}
        </div>

        {isShowMoreVisible && (
          <CustomButton
            onClick={() => onShowMore(activePage)}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Show more products
            <Icon iconName={IconsTypes.ARROW_DOWN} />
          </CustomButton>
        )}

        <p className={style.totals}>
          <InfoTooltip info={`${totalProducts}`} />
          <span>Products</span>
        </p>
      </div>
    </div>
  );
};
