import { useActions, useAppSelector } from '@redux';

export const useWishlist = () => {
  const { wishlist } = useAppSelector((state) => state.wishlist);

  const { addToWishlist, removeFromWishlist } = useActions();

  const checkIsInWishlist = (prodId: string) => {
    return !!wishlist.find((id) => id === prodId);
  };

  const onWishlistToggle = (prodId: string) => {
    if (checkIsInWishlist(prodId)) {
      removeFromWishlist(prodId);
      return;
    }

    addToWishlist(prodId);
  };

  return {
    checkIsInWishlist,
    onWishlistToggle,
  };
};
