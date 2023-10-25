import { combineReducers } from '@reduxjs/toolkit';

import * as thunks from '../thunks';

import { productsActions, productsReducer } from './productsReducer';
import {
  productsFilterActions,
  productsFilterReducer,
} from './productsFilterReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
  productsFilter: productsFilterReducer,
});

export const ActionCreators = {
  ...thunks,
  ...productsActions,
  ...productsFilterActions,
};
