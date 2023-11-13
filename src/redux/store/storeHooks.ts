import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { ActionCreators } from '../slices/reducers';

import type { AppDispatch, RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const appDispatch: AppDispatch = useDispatch();

  return bindActionCreators(ActionCreators, appDispatch);
};
