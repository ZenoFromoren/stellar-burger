import rootReducer from './index';
import store from '../store';
import { expect, test } from '@jest/globals';

describe('проверка rootReducer', () => {
  test('проверка правильной инициализации rootReducer', () => {
    const initialState = store.getState();
    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });

    expect(state).toEqual(initialState);
  });
});
