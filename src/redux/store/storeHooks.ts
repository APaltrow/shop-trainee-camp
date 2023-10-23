import { useSelector, TypedUseSelectorHook, useDispatch } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import { ActionCreators } from '../slices/reducers';

import type { RootState } from './store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(ActionCreators, dispatch);
};
