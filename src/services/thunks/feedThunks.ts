import { getFeedsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getFeeds = createAsyncThunk('orders/getFeeds', async () => {
  const orders = await getFeedsApi();
  return orders;
});
