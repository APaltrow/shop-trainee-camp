import { combineReducers } from '@reduxjs/toolkit';

import * as thunks from '../thunks';

import { productsActions, productsReducer } from './productsReducer';
import { cartReducer, cartActions } from './cartReducer';
import { productReducer } from './productReducer';
import { wishlistReducer, wishlistActions } from './wishlistReducer';
import {
  addressAutocompleteReducer,
  addressAutocompleteActions,
} from './addressAutocompleteReducer';
import {
  productsFilterActions,
  productsFilterReducer,
} from './productsFilterReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  productsFilter: productsFilterReducer,
  product: productReducer,
  cart: cartReducer,
  addressAutocomplete: addressAutocompleteReducer,
  wishlist: wishlistReducer,
});

export const ActionCreators = {
  ...thunks,
  ...productsActions,
  ...productsFilterActions,
  ...cartActions,
  ...addressAutocompleteActions,
  ...wishlistActions,
};
