import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { WishlistState } from '@types';

const initialState: WishlistState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, { payload: prodId }: PayloadAction<string>) => {
      state.wishlist.unshift(prodId);
    },
    removeFromWishlist: (state, { payload: prodId }: PayloadAction<string>) => {
      state.wishlist = state.wishlist.filter((id) => id !== prodId);
    },
  },
});

export const { actions: wishlistActions, reducer: wishlistReducer } =
  wishlistSlice;
