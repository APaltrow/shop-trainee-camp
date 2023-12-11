import { FC } from 'react';

import { IProduct } from '@types';
import { getPaginatedList } from '@helpers';
import { usePagination } from '@hooks';
import { ButtonSizes, ButtonVariants, IconsTypes } from '@constants';
import { CustomButton, Icon, Pagination, ProductsItem } from '@components';

import { EmptyWishlist } from '../EmptyWishlist';

import style from './WishlistProducts.module.scss';

interface WishlistProductsProps {
  list: IProduct[];
}

export const WishlistProducts: FC<WishlistProductsProps> = ({ list }) => {
  if (!list.length) return <EmptyWishlist />;

  const {
    pagesList,
    activePage,
    isShowMoreVisible,

    onShowMore,
    onActivePageChange,
  } = usePagination(list.length, [list]);

  const paginatedList = getPaginatedList(pagesList, list, activePage);

  return (
    <>
      <ul className={style.wishlist_container}>
        {paginatedList.map((product) => (
          <li key={product.productId}>
            <ProductsItem product={product} />
          </li>
        ))}
      </ul>
      <div className={style.pagination_container}>
        {!!pagesList.length && (
          <Pagination
            pagesList={pagesList}
            activePage={activePage}
            onActivePageChange={onActivePageChange}
          />
        )}
        <div className={style.show_more_btn}>
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
        </div>
      </div>
    </>
  );
};
