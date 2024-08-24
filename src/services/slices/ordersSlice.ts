import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from '../thunks/orderThunks';
import { getOrdersAll } from '../thunks/ordersThunks';

interface IOrdersState {
  orders: TOrder[];
  isLoading: boolean;
  isOrderRequest: boolean;
  error: string | undefined;
}

export const initialState: IOrdersState = {
  orders: [],
  isLoading: false,
  isOrderRequest: false,
  error: undefined
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<TOrder>) => {
      state.orders.push(action.payload);
    }
  },
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.isOrderRequest = true;
        state.error = undefined;
      })
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.isOrderRequest = false;
          state.error = undefined;
          state.orders.push(action.payload);
        }
      )
      .addCase(orderBurger.rejected, (state, action) => {
        state.isOrderRequest = false;
        state.error = action.error.message!;
      })
      .addCase(getOrdersAll.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = undefined;
        state.orders = action.payload.orders;
      })
      .addCase(getOrdersAll.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      });
  }
});

export const ordersActions = ordersSlice.actions;
export const ordersSelectors = ordersSlice.selectors;

export default ordersSlice.reducer;
