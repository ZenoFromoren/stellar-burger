import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (burgerData: string[]) => {
    const orderData = await orderBurgerApi(burgerData);
    return orderData.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => {
    const orderData = await getOrderByNumberApi(number);
    return orderData.orders;
  }
);
