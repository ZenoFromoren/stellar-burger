import { expect } from '@jest/globals';
import { fetchIngredients } from '../thunks/ingredientsThunks';
import ingredientsReducer, { initialState } from './ingredientsSlice';

const mockIngredient = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    __v: 0
  }
];

describe('проверка ingredientsSlice', () => {
  it('проверка в состоянии fetchIngredients.pending', () => {
    const newIngredientsState = ingredientsReducer(
      initialState,
      fetchIngredients.pending('isPending')
    );

    expect(newIngredientsState.isLoading).toBeTruthy();
    expect(newIngredientsState.error).toBeUndefined();
  });

  it('проверка в состоянии fetchIngredients.fulfiled', () => {
    const newIngredientsState = ingredientsReducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredient, 'isFulfilled')
    );

    expect(newIngredientsState.isLoading).toBeFalsy();
    expect(newIngredientsState.error).toBeUndefined();
    expect(newIngredientsState.ingredients).toEqual(mockIngredient);
  });

  it('проверка в состоянии fetchIngredients.rejected', () => {
    const error = new Error('Возникла ошибка при получении списка ингридиентов');

    const newIngredientsState = ingredientsReducer(
      initialState,
      fetchIngredients.rejected(error, 'isRejected')
    );

    expect(newIngredientsState.isLoading).toBeFalsy();
    expect(newIngredientsState.error).toEqual(error.message!);
  });
});
