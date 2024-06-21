import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, orderBurger } from '../thunks/orderThunks';

interface IOrderState {
  orderData: TOrder | null;
  isOrderRequest: boolean;
  orderByNumber: TOrder | null;
}

const initialState: IOrderState = {
  orderData: null,
  isOrderRequest: false,
  orderByNumber: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    closeModalOrder: (state) => {
      state.orderData = null;
      state.isOrderRequest = false;
    }
  },
  selectors: {
    selectIsOrderRequest: (state) => state.isOrderRequest,
    selectOrderData: (state) => state.orderData,
    selectOrderByNumber: (state) => state.orderByNumber
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isOrderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.isOrderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.orderData = action.payload;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.orderByNumber = action.payload[0];
      });
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice.reducer;
