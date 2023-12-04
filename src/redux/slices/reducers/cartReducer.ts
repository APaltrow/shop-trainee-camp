import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { INITIAL_BILLING_FORM_VALUES } from '@constants';
import { CartState } from '@types';

const initialState: CartState = {
  billingInfo: INITIAL_BILLING_FORM_VALUES,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setBillingInfo: (
      state,
      { payload }: PayloadAction<[string, string | boolean]>,
    ) => {
      const [name, value] = payload;

      state.billingInfo[name] = value;
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
