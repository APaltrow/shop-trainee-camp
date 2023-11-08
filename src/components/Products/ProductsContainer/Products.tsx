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
    pagesList,
    activePage,
    isShowMoreVisible,

    onShowMore,
    onActivePageChange,
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

  const activePageItem = pagesList[activePage - 1] || 0;
  const startPoint = activePageItem?.range?.start || 0;
  const endPoint = activePageItem?.range?.end || 0;

  const productsWithPaggination = activePageItem
    ? products.slice(startPoint, endPoint)
    : products;

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

          <span className={style.prev_btn}>
            <CustomButton>
              <Icon iconName={IconsTypes.ARROW_DOWN} />
            </CustomButton>
          </span>
          <ul className={style.pagination_list}>
            {pagesList.map(({ number }) => {
              const isActive = number === activePage;

              return (
                <li key={`page_${number}`}>
                  <CustomButton onClick={() => onActivePageChange(number)}>
                    <span
                      className={`${style.btn_text} ${
                        isActive ? style.active : ''
                      }`}
                    >
                      {number}
                    </span>
                  </CustomButton>
                </li>
              );
            })}
          </ul>

          <span className={style.next_btn}>
            <CustomButton>
              <Icon iconName={IconsTypes.ARROW_DOWN} />
            </CustomButton>
          </span>
        </div>

        {!isShowMoreVisible && (
          <CustomButton
            onClick={() => onShowMore(activePage)}
            variant={ButtonVariants.PRIMARY}
            size={ButtonSizes.MID}
          >
            Show more products
            <Icon iconName={IconsTypes.ARROW_DOWN} />
          </CustomButton>
        )}

        <div className={style.totals}>
          <InfoTooltip info={`${totalProducts}`} />

          <span>Products</span>
        </div>
      </div>
    </div>
  );
};
