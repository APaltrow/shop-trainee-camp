import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { INITIAL_BILLING_FORM_VALUES } from '@constants';
import { CartState, IOrderItem } from '@types';

const initialState: CartState = {
  billingInfo: INITIAL_BILLING_FORM_VALUES,
  orders: [],
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
    setAuthUserInfo: (
      state,
      { payload }: PayloadAction<Record<string, string>>,
    ) => {
      state.billingInfo = {
        ...state.billingInfo,
        ...payload,
      };
    },
    resetBillingInfo: (state) => {
      state.billingInfo = INITIAL_BILLING_FORM_VALUES;
    },
    addOrderItem: (state, { payload }: PayloadAction<IOrderItem>) => {
      const existingLot = state.orders.find(
        ({ lotId }) => lotId === payload.lotId,
      );

      if (existingLot) {
        existingLot.totalQuantity += payload.totalQuantity;
        existingLot.totalCost += payload.totalCost;
        return;
      }

      state.orders.unshift(payload);
    },
    removeOrderItem: (state, { payload }: PayloadAction<string>) => {
      state.orders = state.orders.filter(({ lotId }) => lotId !== payload);
    },
    updateOrderItem: (state, { payload }: PayloadAction<IOrderItem>) => {
      const existingLot = state.orders.find(
        ({ lotId }) => lotId === payload.lotId,
      );

      if (!existingLot) return;

      existingLot.totalQuantity = payload.totalQuantity;
      existingLot.totalCost = payload.totalCost;
    },
    resetOrders: (state) => {
      state.orders = [];
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
