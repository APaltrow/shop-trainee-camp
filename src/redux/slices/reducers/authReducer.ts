import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AuthState, IUser } from '@types';

const initialState: AuthState = {
  user: null,
  isAuth: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, { payload }: PayloadAction<IUser>) => {
      state.user = payload;
      state.isAuth = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuth = false;
    },
  },
});

export const { actions: authActions, reducer: authReducer } = authSlice;
