import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from '../thunks/feedThunks';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeeds: (state) => state.orders,
    selectTotalFeeds: (state) => state.total,
    selectTotalTodayFeeds: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

export const feedsActions = feedsSlice.actions;
export const feedsSelectors = feedsSlice.selectors;

export default feedsSlice.reducer;
