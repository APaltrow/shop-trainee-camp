import { combineReducers } from '@reduxjs/toolkit';

import * as thunks from '../thunks';

import { productsActions, productsReducer } from './productsReducer';
import { productReducer } from './productReducer';
import {
  productsFilterActions,
  productsFilterReducer,
} from './productsFilterReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  productsFilter: productsFilterReducer,
  product: productReducer,
});

export const ActionCreators = {
  ...thunks,
  ...productsActions,
  ...productsFilterActions,
};
