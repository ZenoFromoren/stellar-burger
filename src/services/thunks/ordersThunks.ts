import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getOrdersAll = createAsyncThunk(
  'orders/getOrdersAll',
  async () => {
    const orders = await getOrdersApi();
    return orders;
  }
);
