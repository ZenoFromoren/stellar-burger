import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { orderBurger } from '../thunks/orderThunks';
import { getOrdersAll } from '../thunks/ordersThunks';

interface IOrdersState {
  orders: TOrder[];
}

const initialState: IOrdersState = {
  orders: []
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
      .addCase(
        orderBurger.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orders.push(action.payload);
        }
      )
      .addCase(getOrdersAll.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  }
});

export const ordersActions = ordersSlice.actions;
export const ordersSelectors = ordersSlice.selectors;

export default ordersSlice.reducer;
