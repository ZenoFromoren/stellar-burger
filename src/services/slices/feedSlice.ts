import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeeds } from '../thunks/feedThunks';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | undefined;
}

export const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: undefined
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
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(getFeeds.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = undefined;
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
    builder.addCase(getFeeds.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message!;
    });
  }
});

export const feedsActions = feedsSlice.actions;
export const feedsSelectors = feedsSlice.selectors;

export default feedsSlice.reducer;
