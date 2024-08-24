import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrderByNumber, orderBurger } from '../thunks/orderThunks';
import { getUser } from '../thunks/userThunks';

interface IOrderState {
  orderData: TOrder | null;
  isOrderRequest: boolean;
  orderByNumber: TOrder | null;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IOrderState = {
  orderData: null,
  isOrderRequest: false,
  orderByNumber: null,
  isLoading: false,
  error: undefined
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
        state.error = undefined;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.error = undefined;
        state.orderData = action.payload;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.isOrderRequest = true;
        state.error = undefined;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.isOrderRequest = false;
        state.error = undefined;
        state.orderByNumber = action.payload[0];
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message!;
      });
  }
});

export const orderActions = orderSlice.actions;
export const orderSelectors = orderSlice.selectors;

export default orderSlice.reducer;
