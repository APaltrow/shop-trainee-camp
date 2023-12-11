import { FC } from 'react';

import { useAlert } from '@hooks';
import { useActions, useAppSelector } from '@redux';
import { Alert, CustomButton, Icon, ProductsSkeleton } from '@components';
import {
  AlertMessages,
  ButtonSizes,
  ButtonVariants,
  IconsTypes,
} from '@constants';

import { WishlistProducts } from '../WishlistProducts';

import style from './Wishlist.module.scss';

export const Wishlist: FC = () => {
  const { productsList, isLoading } = useAppSelector((state) => state.products);
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const { clearWishlist } = useActions();
  const { alert, onAlertCall, onAlertCancel } = useAlert();

  const wishlistedProducts = productsList.filter(({ productId }) =>
    wishlist.includes(productId),
  );

  const handleClearWishlist = () => {
    onAlertCall({
      text: AlertMessages.CLEAR_WISHLIST,
      onConfirm: () => {
        clearWishlist();
        onAlertCancel();
      },
    });
  };

  return (
    <div className={style.container}>
      <div className={style.header}>
        <article className={style.info}>
          <h1 className={style.title}>Wish list</h1>
          <p className={style.text}>Here are products you like</p>
        </article>
        {!!wishlist.length && (
          <CustomButton
            onClick={handleClearWishlist}
            size={ButtonSizes.MID}
            variant={ButtonVariants.SECONDARY}
          >
            <Icon iconName={IconsTypes.HEART_BROKEN} />
            Clear wish list
          </CustomButton>
        )}
      </div>

      {isLoading ? (
        <ProductsSkeleton />
      ) : (
        <WishlistProducts list={wishlistedProducts} />
      )}

      {!!alert && (
        <Alert
          text={alert.text}
          onCancel={onAlertCancel}
          onConfirm={alert.onConfirm}
        />
      )}
    </div>
  );
};
