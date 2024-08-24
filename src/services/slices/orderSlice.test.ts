import { expect } from '@jest/globals';
import orderReducer, { initialState } from './orderSlice';
import { orderBurger } from '../thunks/orderThunks';

const mockOrder =
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
  };

describe('проверка orderSlice', () => {
  it('проверка в состоянии orderBurger.pending', () => {
    const newOrderState = orderReducer(
      initialState,
      orderBurger.pending('isPending', ['1'])
    );

    expect(newOrderState.isOrderRequest).toBeTruthy();
    expect(newOrderState.error).toBeUndefined();
  });

  it('проверка в состоянии orderBurger.fulfiled', () => {
    const newOrderState = orderReducer(
      initialState,
      orderBurger.fulfilled(mockOrder, 'isFulfilled', ['1'])
    );

    expect(newOrderState.isOrderRequest).toBeFalsy();
    expect(newOrderState.error).toBeUndefined();
    expect(newOrderState.orderData).toEqual(mockOrder);
  });

  it('проверка в состоянии orderBurger.rejected', () => {
    const error = new Error('Возникла ошибка при создании заказа');

    const newOrderState = orderReducer(
      initialState,
      orderBurger.rejected(error, 'isRejected', ['1'])
    );

    expect(newOrderState.isOrderRequest).toBeFalsy();
    expect(newOrderState.error).toEqual(error.message!);
  });
});
