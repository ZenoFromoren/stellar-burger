import { expect } from '@jest/globals';
import feedReducer, { initialState } from './feedSlice';
import { getFeeds } from '../thunks/feedThunks';

const mockFeed = {
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
    }
  ],
  totalToday: 210,
  total: 50263
};

describe('проверка feedSlice', () => {
  it('проверка в состоянии getFeeds.pending', () => {
    const newFeedState = feedReducer(
      initialState,
      getFeeds.pending('isPending')
    );

    expect(newFeedState.isLoading).toBeTruthy();
    expect(newFeedState.error).toBeUndefined();
  });

  it('проверка в состоянии getFeeds.fulfiled', () => {
    const newFeedState = feedReducer(
      initialState,
      getFeeds.fulfilled(mockFeed, 'isFulfilled')
    );

    expect(newFeedState.isLoading).toBeFalsy();
    expect(newFeedState.error).toBeUndefined();

    expect(newFeedState.orders).toEqual(mockFeed.orders);
    expect(newFeedState.totalToday).toEqual(mockFeed.totalToday);
    expect(newFeedState.total).toEqual(mockFeed.total);
  });

  it('проверка в состоянии getFeeds.rejected', () => {
    const error = new Error('Возникла ошибка при получении списка заказов');

    const newFeedState = feedReducer(
      initialState,
      getFeeds.rejected(error, 'isRejected')
    );

    expect(newFeedState.isLoading).toBeFalsy();
    expect(newFeedState.error).toEqual(error.message!);
  });
});
