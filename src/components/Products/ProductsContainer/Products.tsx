import { FC } from 'react';

import { useAppSelector } from '@redux';
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
} from '@components';

import { ProductsToolbar } from '../ProductsToolbar';
import { ProductsList } from '../ProductsList';

import style from './Products.module.scss';

export const Products: FC = () => {
  const { isLoading, error } = useAppSelector((state) => state.products);
  const { products, totalProducts, totalFilteredProducts } =
    useProductsFilter();

  const { isTablet } = useMedia();

  const { isOpened, toggle } = useToggle();

  const {
    activePage,
    pagesList,
    itemsPerPage,

    onActivePageChange,
    onItemsPerPageChange,
  } = usePagination(totalFilteredProducts);

  useNoScroll(isOpened);

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

  const startPoint = itemsPerPage * (activePage - 1);
  const endPotint = activePage * itemsPerPage;

  //  1: 1-5; 2: 5-10

  // (4 * (activePage - 1), activePage * 4)

  const productsWithPaggination = products.slice(startPoint, endPotint);

  return (
    <div>
      <div className={style.header}>
        <h1>All products</h1>

        <div className={style.totals}>
          <InfoTooltip info={`${totalFilteredProducts}`} />
          <span>Products</span>
        </div>
      </div>

      <ProductsToolbar toggle={toggle} />

      <div className={style.main}>
        {sidebar}
        <ProductsList
          productsList={productsWithPaggination}
          isLoading={isLoading}
        />
      </div>

      <div className={style.footer}>
        <div className={style.pagination}>
          <span className={style.title}>Page: </span>
          <ul className={style.pagination_list}>
            {pagesList.map((page, idx) => {
              const pageNumber = idx + 1;
              const isActive = pageNumber === activePage;

              return (
                <li key={`${page}_${pageNumber}`}>
                  <CustomButton onClick={() => onActivePageChange(pageNumber)}>
                    <span
                      className={`${style.btn_text} ${
                        isActive ? style.active : ''
                      }`}
                    >
                      {pageNumber}
                    </span>
                  </CustomButton>
                </li>
              );
            })}
          </ul>
        </div>

        <CustomButton
          onClick={onItemsPerPageChange}
          variant={ButtonVariants.PRIMARY}
          size={ButtonSizes.MID}
        >
          Show more products
          <Icon iconName={IconsTypes.ARROW_DOWN} />
        </CustomButton>

        <div className={style.totals}>
          <InfoTooltip info={`${totalProducts}`} />

          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
