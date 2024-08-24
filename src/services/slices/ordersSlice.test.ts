import { expect } from '@jest/globals';
import ordersReducer, { initialState } from './ordersSlice';
import { getOrdersAll } from '../thunks/ordersThunks';

const mockOrders = {
  success: true,
  orders: [
    {
      _id: '66c75bc6119d45001b501723',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093c'
      ],
      owner: '66c5df17119d45001b5012d3',
      status: 'done',
      name: 'Краторный spicy био-марсианский бургер',
      createdAt: '2024-08-22T15:39:50.837Z',
      updatedAt: '2024-08-22T15:39:51.414Z',
      number: 50636,
      __v: 0
    },
    {
      _id: '66c77092119d45001b501791',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa093c'
      ],
      owner: '66c5df17119d45001b5012d3',
      status: 'done',
      name: 'Краторный био-марсианский люминесцентный бургер',
      createdAt: '2024-08-22T17:08:34.359Z',
      updatedAt: '2024-08-22T17:08:34.860Z',
      number: 50649,
      __v: 0
    }
  ],
  totalToday: 210,
  total: 50263
};

describe('проверка ordersSlice', () => {
  it('проверка в состоянии getOrdersAll.pending', () => {
    const newOrdersState = ordersReducer(
      initialState,
      getOrdersAll.pending('isPending')
    );

    expect(newOrdersState.isLoading).toBeTruthy();
    expect(newOrdersState.error).toBeUndefined();
  });

  it('проверка в состоянии getOrdersAll.fulfiled', () => {
    const newOrdersState = ordersReducer(
      initialState,
      getOrdersAll.fulfilled(mockOrders, 'isFulfilled')
    );

    expect(newOrdersState.isLoading).toBeFalsy();
    expect(newOrdersState.error).toBeUndefined();
    expect(newOrdersState.orders).toEqual(mockOrders.orders);
  });

  it('проверка в состоянии getOrdersAll.rejected', () => {
    const error = new Error('Возникла ошибка при получении списка заказов');

    const newOrdersState = ordersReducer(
      initialState,
      getOrdersAll.rejected(error, 'isRejected')
    );

    expect(newOrdersState.isLoading).toBeFalsy();
    expect(newOrdersState.error).toEqual(error.message!);
  });
});
