import { combineReducers } from '@reduxjs/toolkit';

import * as thunks from '../thunks';

import { productsActions, productsReducer } from './productsReducer';

export const rootReducer = combineReducers({
  products: productsReducer,
});

export const ActionCreators = {
  ...thunks,
  ...productsActions,
};
